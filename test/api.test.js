import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import chatHandler from "../api/chat.js";
import contactHandler from "../api/contact.js";
import healthHandler from "../api/health.js";

const configKeys = [
  "UPSTASH_REDIS_REST_URL",
  "UPSTASH_REDIS_REST_TOKEN",
  "CONTACT_IP_HASH_SECRET",
  "EMAILJS_SERVICE_ID",
  "EMAILJS_TEMPLATE_ID",
  "EMAILJS_PUBLIC_KEY",
  "EMAILJS_PRIVATE_KEY",
  "OPENAI_API_KEY",
  "OPENAI_MODEL",
];
const originalConfig = new Map(
  configKeys.map((key) => [key, process.env[key]]),
);
const originalFetch = globalThis.fetch;

before(() => {
  process.env.UPSTASH_REDIS_REST_URL = "https://redis.example.test";
  process.env.UPSTASH_REDIS_REST_TOKEN = "test-token";
  process.env.CONTACT_IP_HASH_SECRET = "test-contact-secret-1234567890-extra";
  process.env.EMAILJS_SERVICE_ID = "test-service";
  process.env.EMAILJS_TEMPLATE_ID = "test-template";
  process.env.EMAILJS_PUBLIC_KEY = "test-public-key";
  process.env.OPENAI_API_KEY = "test-openai-key";
  delete process.env.EMAILJS_PRIVATE_KEY;
  delete process.env.OPENAI_MODEL;
});

after(() => {
  globalThis.fetch = originalFetch;
  for (const [key, value] of originalConfig) {
    if (value === undefined) {
      delete process.env[key];
    } else {
      process.env[key] = value;
    }
  }
});

async function invoke(handler, { method = "POST", body, headers = {} } = {}) {
  const responseHeaders = new Map();
  let responseBody = "";
  const response = {
    statusCode: 200,
    setHeader(name, value) {
      responseHeaders.set(name.toLowerCase(), value);
    },
    end(value = "") {
      responseBody = value;
    },
  };
  const request = {
    method,
    body,
    headers: { host: "portfolio.example", ...headers },
    socket: { remoteAddress: "127.0.0.1" },
  };

  await handler(request, response);

  return {
    status: response.statusCode,
    headers: responseHeaders,
    body: responseBody ? JSON.parse(responseBody) : undefined,
  };
}

test("health function returns uncached JSON", async () => {
  const response = await invoke(healthHandler, { method: "GET" });

  assert.equal(response.status, 200);
  assert.equal(response.headers.get("cache-control"), "no-store");
  assert.deepEqual(response.body, { status: "ok" });
});

test("contact function rate limits then delivers one EmailJS request", async () => {
  const upstreamHosts = [];
  globalThis.fetch = async (input, init) => {
    const url = new URL(String(input));
    upstreamHosts.push(url.hostname);

    if (url.hostname === "redis.example.test") {
      assert.equal(JSON.parse(init.body)[0], "EVAL");
      return new Response(JSON.stringify({ result: "reserved" }), {
        status: 200,
      });
    }

    assert.equal(url.hostname, "api.emailjs.com");
    const payload = JSON.parse(init.body);
    assert.equal(payload.service_id, "test-service");
    assert.equal(payload.template_id, "test-template");
    assert.deepEqual(payload.template_params, {
      user_name: "Example Visitor",
      user_email: "visitor@example.com",
      message: "Please get in touch.",
    });
    return new Response(null, { status: 200 });
  };

  const response = await invoke(contactHandler, {
    body: {
      name: "  Example Visitor ",
      email: " visitor@example.com ",
      message: " Please get in touch. ",
    },
    headers: { "x-forwarded-for": "203.0.113.10, 10.0.0.1" },
  });

  assert.equal(response.status, 200);
  assert.deepEqual(response.body, { message: "Message sent." });
  assert.deepEqual(upstreamHosts, ["redis.example.test", "api.emailjs.com"]);
});

test("contact function rejects invalid input before calling providers", async () => {
  let providerCalls = 0;
  globalThis.fetch = async () => {
    providerCalls += 1;
    throw new Error("Providers must not be called for invalid input.");
  };

  const response = await invoke(contactHandler, { body: {} });

  assert.equal(response.status, 400);
  assert.deepEqual(response.body, {
    message: "Please provide a valid name, email, and message.",
  });
  assert.equal(providerCalls, 0);
});

test("chat function preserves the conversation and caps completion tokens", async () => {
  let completionRequest;
  globalThis.fetch = async (input, init) => {
    const url = new URL(String(input));

    if (url.hostname === "redis.example.test") {
      return new Response(JSON.stringify({ result: "reserved" }), {
        status: 200,
      });
    }

    assert.equal(url.hostname, "api.openai.com");
    completionRequest = { url, init };
    return new Response(
      JSON.stringify({
        choices: [{ message: { content: "Here is a portfolio answer." } }],
      }),
      { status: 200 },
    );
  };

  const previousMessages = Array.from({ length: 5 }, (_, index) => ({
    role: index % 2 === 0 ? "user" : "assistant",
    content: `Previous message ${index}`,
  }));
  const response = await invoke(chatHandler, {
    body: {
      message: "  Tell me about his work.  ",
      previousMessages,
    },
    headers: { "x-forwarded-for": "203.0.113.11" },
  });

  assert.equal(response.status, 200);
  assert.deepEqual(response.body, {
    reply: "Here is a portfolio answer.",
  });

  const payload = JSON.parse(completionRequest.init.body);
  assert.equal(completionRequest.url.href, "https://api.openai.com/v1/chat/completions");
  assert.equal(payload.model, "gpt-4o-mini");
  assert.equal(payload.max_tokens, 350);
  assert.deepEqual(payload.messages.slice(-6), [
    ...previousMessages,
    { role: "user", content: "Tell me about his work." },
  ]);
});

test("functions reject a cross-origin request and oversized payloads", async () => {
  const originResponse = await invoke(healthHandler, {
    method: "GET",
    headers: { origin: "https://attacker.example" },
  });
  assert.equal(originResponse.status, 403);
  assert.deepEqual(originResponse.body, {
    message: "Request origin is not allowed.",
  });

  const oversizedResponse = await invoke(contactHandler, {
    body: { name: "x".repeat(11 * 1024) },
  });
  assert.equal(oversizedResponse.status, 413);
  assert.deepEqual(oversizedResponse.body, {
    message: "Request is too large.",
  });
});
