import assert from "node:assert/strict";
import { once } from "node:events";
import express from "express";
import { after, before, test } from "node:test";
import { handleChat } from "../chat.js";

const configKeys = [
  "UPSTASH_REDIS_REST_URL",
  "UPSTASH_REDIS_REST_TOKEN",
  "CONTACT_IP_HASH_SECRET",
  "OPENAI_API_KEY",
  "OPENAI_MODEL",
];
const previousConfig = new Map(
  configKeys.map((key) => [key, process.env[key]]),
);
const originalFetch = globalThis.fetch;
let server;
let baseUrl;

before(async () => {
  process.env.UPSTASH_REDIS_REST_URL = "https://redis.example.test";
  process.env.UPSTASH_REDIS_REST_TOKEN = "test-token";
  process.env.CONTACT_IP_HASH_SECRET = "test-chat-secret-1234567890-extra";
  process.env.OPENAI_API_KEY = "test-openai-key";
  delete process.env.OPENAI_MODEL;

  const app = express();
  app.use(express.json());
  app.post("/api/chat", handleChat);
  server = app.listen(0, "127.0.0.1");
  await once(server, "listening");
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

after(async () => {
  globalThis.fetch = originalFetch;

  for (const [key, value] of previousConfig) {
    if (value === undefined) {
      delete process.env[key];
    } else {
      process.env[key] = value;
    }
  }

  if (server?.listening) {
    server.close();
    await once(server, "close");
  }
});

test("chat validates message and limits conversation history to five prior messages", async () => {
  let redisRequest;
  let openAiRequest;
  globalThis.fetch = async (input, init) => {
    const url = new URL(String(input));

    if (url.hostname === "127.0.0.1") {
      return originalFetch(input, init);
    }

    if (url.hostname === "redis.example.test") {
      redisRequest = { url, init };
      return new Response(JSON.stringify({ result: "reserved" }), {
        status: 200,
      });
    }

    if (url.hostname === "api.openai.com") {
      openAiRequest = { url, init };
      return new Response(
        JSON.stringify({
          choices: [{ message: { content: "Here is a portfolio answer." } }],
        }),
        { status: 200 },
      );
    }

    throw new Error(`Unexpected upstream host: ${url.hostname}`);
  };

  const response = await fetch(`${baseUrl}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message: "  Tell me about his work.  ",
      previousMessages: Array.from({ length: 5 }, (_, index) => ({
        role: index % 2 === 0 ? "user" : "assistant",
        content: `Previous message ${index + 3}`,
      })),
    }),
  });

  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), {
    reply: "Here is a portfolio answer.",
  });

  const redisCommand = JSON.parse(redisRequest.init.body);
  assert.equal(redisCommand[0], "EVAL");
  assert.match(redisCommand[1], /ZREMRANGEBYSCORE/);
  assert.match(redisCommand[1], /ZADD/);
  assert.equal(redisCommand[4], "5");
  assert.equal(redisRequest.init.headers.Authorization, "Bearer test-token");
  assert.doesNotMatch(redisCommand[3], /127\.0\.0\.1/);

  const openAiPayload = JSON.parse(openAiRequest.init.body);
  assert.equal(openAiRequest.url.href, "https://api.openai.com/v1/chat/completions");
  assert.equal(openAiRequest.init.headers.Authorization, "Bearer test-openai-key");
  assert.equal(openAiPayload.model, "gpt-4o-mini");
  assert.equal(openAiPayload.max_tokens, 350);
  assert.deepEqual(
    openAiPayload.messages.slice(-6),
    [
      ...Array.from({ length: 5 }, (_, index) => ({
        role: index % 2 === 0 ? "user" : "assistant",
        content: `Previous message ${index + 3}`,
      })),
      { role: "user", content: "Tell me about his work." },
    ],
  );
});

test("chat rejects invalid or oversized history before calling providers", async () => {
  let providerCalls = 0;
  globalThis.fetch = async (input, init) => {
    if (new URL(String(input)).hostname === "127.0.0.1") {
      return originalFetch(input, init);
    }

    providerCalls += 1;
    throw new Error("Provider must not be called for invalid input.");
  };

  const response = await fetch(`${baseUrl}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message: "A valid question",
      previousMessages: Array.from({ length: 6 }, () => ({
        role: "user",
        content: "Previous message",
      })),
    }),
  });

  assert.equal(response.status, 400);
  assert.deepEqual(await response.json(), {
    message: "Please provide a valid message and up to five prior messages.",
  });
  assert.equal(providerCalls, 0);
});

test("chat returns 429 when the visitor has sent five messages in the window", async () => {
  const upstreamCalls = [];
  globalThis.fetch = async (input, init) => {
    const url = new URL(String(input));

    if (url.hostname === "127.0.0.1") {
      return originalFetch(input, init);
    }

    upstreamCalls.push(url.hostname);
    return new Response(JSON.stringify({ result: "limited" }), {
      status: 200,
    });
  };

  const response = await fetch(`${baseUrl}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: "A valid question" }),
  });

  assert.equal(response.status, 429);
  assert.match((await response.json()).message, /five messages per minute/);
  assert.deepEqual(upstreamCalls, ["redis.example.test"]);
});

test("chat fails closed when Redis is unavailable", async () => {
  const upstreamCalls = [];
  globalThis.fetch = async (input, init) => {
    const url = new URL(String(input));

    if (url.hostname === "127.0.0.1") {
      return originalFetch(input, init);
    }

    upstreamCalls.push(url.hostname);
    return new Response("unavailable", { status: 503 });
  };

  const response = await fetch(`${baseUrl}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: "A valid question" }),
  });

  assert.equal(response.status, 503);
  assert.deepEqual(await response.json(), {
    message: "The assistant is temporarily unavailable.",
  });
  assert.deepEqual(upstreamCalls, ["redis.example.test"]);
});

test("chat returns a provider error without exposing provider responses", async () => {
  globalThis.fetch = async (input, init) => {
    const url = new URL(String(input));

    if (url.hostname === "127.0.0.1") {
      return originalFetch(input, init);
    }

    if (url.hostname === "redis.example.test") {
      return new Response(JSON.stringify({ result: "reserved" }), {
        status: 200,
      });
    }

    return new Response("private provider details", { status: 401 });
  };

  const response = await fetch(`${baseUrl}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: "A valid question" }),
  });

  assert.equal(response.status, 502);
  assert.deepEqual(await response.json(), {
    message: "The assistant could not reply right now. Please try again.",
  });
});
