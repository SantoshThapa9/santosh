import assert from "node:assert/strict";
import { once } from "node:events";
import express from "express";
import { after, before, test } from "node:test";
import { handleContact } from "../contact.js";

const configKeys = [
  "UPSTASH_REDIS_REST_URL",
  "UPSTASH_REDIS_REST_TOKEN",
  "CONTACT_IP_HASH_SECRET",
  "EMAILJS_SERVICE_ID",
  "EMAILJS_TEMPLATE_ID",
  "EMAILJS_PUBLIC_KEY",
  "EMAILJS_PRIVATE_KEY",
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
  process.env.CONTACT_IP_HASH_SECRET = "test-contact-secret-1234567890-extra";
  process.env.EMAILJS_SERVICE_ID = "test-service";
  process.env.EMAILJS_TEMPLATE_ID = "test-template";
  process.env.EMAILJS_PUBLIC_KEY = "test-public-key";
  delete process.env.EMAILJS_PRIVATE_KEY;

  const app = express();
  app.use(express.json());
  app.post("/api/contact", handleContact);
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

test("valid contact requests pass rate limiting and deliver exactly one email", async () => {
  const upstreamCalls = [];
  globalThis.fetch = async (input, init) => {
    const url = new URL(String(input));

    if (url.hostname === "127.0.0.1") {
      return originalFetch(input, init);
    }

    upstreamCalls.push({ url, init });

    if (url.hostname === "redis.example.test") {
      assert.equal(init.method, "POST");
      assert.equal(JSON.parse(init.body)[0], "EVAL");
      return new Response(JSON.stringify({ result: "reserved" }), {
        status: 200,
      });
    }

    if (url.hostname === "api.emailjs.com") {
      const payload = JSON.parse(init.body);
      assert.equal(payload.service_id, "test-service");
      assert.equal(payload.template_id, "test-template");
      assert.deepEqual(payload.template_params, {
        user_name: "Example Visitor",
        user_email: "visitor@example.com",
        message: "Please get in touch.",
      });
      return new Response(null, { status: 200 });
    }

    throw new Error(`Unexpected upstream host: ${url.hostname}`);
  };

  const response = await fetch(`${baseUrl}/api/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "  Example Visitor ",
      email: " visitor@example.com ",
      message: " Please get in touch. ",
    }),
  });

  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { message: "Message sent." });
  assert.deepEqual(
    upstreamCalls.map(({ url }) => url.hostname),
    ["redis.example.test", "api.emailjs.com"],
  );
});

test("Redis failure returns a service error and does not send email", async () => {
  const upstreamCalls = [];
  globalThis.fetch = async (input, init) => {
    const url = new URL(String(input));

    if (url.hostname === "127.0.0.1") {
      return originalFetch(input, init);
    }

    upstreamCalls.push(url.hostname);
    return new Response("unavailable", { status: 503 });
  };

  const response = await fetch(`${baseUrl}/api/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "Example Visitor",
      email: "visitor@example.com",
      message: "Please get in touch.",
    }),
  });

  assert.equal(response.status, 503);
  assert.deepEqual(
    await response.json(),
    { message: "Contact form is temporarily unavailable." },
  );
  assert.deepEqual(upstreamCalls, ["redis.example.test"]);
});

test("EmailJS failure returns an upstream error after rate limit reservation", async () => {
  const upstreamCalls = [];
  globalThis.fetch = async (input, init) => {
    const url = new URL(String(input));

    if (url.hostname === "127.0.0.1") {
      return originalFetch(input, init);
    }

    upstreamCalls.push(url.hostname);

    if (url.hostname === "redis.example.test") {
      return new Response(JSON.stringify({ result: "reserved" }), {
        status: 200,
      });
    }

    return new Response("provider unavailable", { status: 503 });
  };

  const response = await fetch(`${baseUrl}/api/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "Example Visitor",
      email: "visitor@example.com",
      message: "Please get in touch.",
    }),
  });

  assert.equal(response.status, 502);
  assert.match((await response.json()).message, /could not be sent/);
  assert.deepEqual(upstreamCalls, [
    "redis.example.test",
    "api.emailjs.com",
  ]);
});
