import crypto from "node:crypto";

const rateLimitTtlSeconds = 172800;
const emailjsMinimumIntervalMs = 1000;
const emailjsTimeoutMs = 15_000;

let emailjsQueue = Promise.resolve();
let lastEmailjsRequestAt = 0;

function scheduleEmailjsRequest() {
  const previousRequest = emailjsQueue;
  let releaseRequest;

  emailjsQueue = new Promise((resolve) => {
    releaseRequest = resolve;
  });

  return previousRequest.then(async () => {
    const delay =
      emailjsMinimumIntervalMs - (Date.now() - lastEmailjsRequestAt);

    if (delay > 0) {
      await new Promise((resolve) => setTimeout(resolve, delay));
    }

    lastEmailjsRequestAt = Date.now();
    releaseRequest();
  });
}

const rateLimitScript = `
local visitorCount = tonumber(redis.call("GET", KEYS[1]) or "0")

if visitorCount >= 2 then
  return "visitor_limit"
end

visitorCount = redis.call("INCR", KEYS[1])
if visitorCount == 1 then
  redis.call("EXPIRE", KEYS[1], ARGV[1])
end

return "reserved"
`;

const chatRateLimitScript = `
local now = redis.call("TIME")
local nowMillis = (tonumber(now[1]) * 1000) + math.floor(tonumber(now[2]) / 1000)

redis.call("ZREMRANGEBYSCORE", KEYS[1], "-inf", nowMillis - 60000)
local messageCount = redis.call("ZCARD", KEYS[1])

if messageCount >= tonumber(ARGV[1]) then
  return "limited"
end

redis.call("ZADD", KEYS[1], nowMillis, ARGV[2])
redis.call("EXPIRE", KEYS[1], 60)
return "reserved"
`;

function getRedisConfiguration() {
  const keys = [
    "UPSTASH_REDIS_REST_URL",
    "UPSTASH_REDIS_REST_TOKEN",
    "CONTACT_IP_HASH_SECRET",
  ];
  const missing = keys.filter((key) => !process.env[key]);

  if (missing.length) {
    throw new Error(`Missing environment variables: ${missing.join(", ")}`);
  }

  const ipHashSecret = process.env.CONTACT_IP_HASH_SECRET;
  if (ipHashSecret.length < 32) {
    throw new Error(
      "CONTACT_IP_HASH_SECRET must contain at least 32 characters.",
    );
  }

  const redisUrl = new URL(process.env.UPSTASH_REDIS_REST_URL);
  if (
    redisUrl.protocol !== "https:" ||
    redisUrl.username ||
    redisUrl.password
  ) {
    throw new Error("Invalid Upstash Redis URL.");
  }

  return {
    redisUrl: redisUrl.toString(),
    redisToken: process.env.UPSTASH_REDIS_REST_TOKEN,
    ipHashSecret,
  };
}

export function requiredConfiguration() {
  const keys = [
    "UPSTASH_REDIS_REST_URL",
    "UPSTASH_REDIS_REST_TOKEN",
    "CONTACT_IP_HASH_SECRET",
    "EMAILJS_SERVICE_ID",
    "EMAILJS_TEMPLATE_ID",
    "EMAILJS_PUBLIC_KEY",
  ];

  const missing = keys.filter((key) => !process.env[key]);

  if (missing.length) {
    throw new Error(`Missing environment variables: ${missing.join(", ")}`);
  }

  const redisConfiguration = getRedisConfiguration();

  return {
    ...redisConfiguration,
    emailServiceId: process.env.EMAILJS_SERVICE_ID,
    emailTemplateId: process.env.EMAILJS_TEMPLATE_ID,
    emailPublicKey: process.env.EMAILJS_PUBLIC_KEY,
    emailPrivateKey: process.env.EMAILJS_PRIVATE_KEY,
  };
}

export function requiredChatConfiguration() {
  const redisConfiguration = getRedisConfiguration();
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error("Missing environment variable: OPENAI_API_KEY");
  }

  return {
    ...redisConfiguration,
    apiKey,
    model: "gpt-6-luna",
  };
}

export async function reserveChatMessage(config, ip) {
  const ipDigest = crypto
    .createHmac("sha256", config.ipHashSecret)
    .update(ip)
    .digest("hex");
  const visitorKey = `chat:window:${ipDigest}`;
  const response = await fetch(config.redisUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.redisToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify([
      "EVAL",
      chatRateLimitScript,
      "1",
      visitorKey,
      "5",
      crypto.randomUUID(),
    ]),
    signal: AbortSignal.timeout(10_000),
  });

  if (!response.ok) {
    throw new Error(`Upstash Redis returned ${response.status}.`);
  }

  const result = await response.json();
  if (result.result !== "reserved" && result.result !== "limited") {
    throw new Error("Invalid Redis chat rate-limit result.");
  }

  return result.result;
}

export async function requestChatReply(config, messages) {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: config.model,
      messages,
    }),
    signal: AbortSignal.timeout(20_000),
  });

  if (!response.ok) {
    const providerMessage = (await response.text())
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 300);
    const detail = providerMessage ? `: ${providerMessage}` : "";
    throw new Error(`OpenAI returned ${response.status}${detail}.`);
  }

  const result = await response.json();
  const reply = result.choices?.[0]?.message?.content;
  if (typeof reply !== "string" || !reply.trim()) {
    throw new Error("OpenAI returned an invalid chat response.");
  }

  return reply.trim();
}

export async function reserveDailySend(config, ip) {
  const ipDigest = crypto
    .createHmac("sha256", config.ipHashSecret)
    .update(ip)
    .digest("hex");

  const utcDay = new Date().toISOString().slice(0, 10);
  const visitorKey = `contact:daily:${utcDay}:${ipDigest}`;

  const response = await fetch(config.redisUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.redisToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify([
      "EVAL",
      rateLimitScript,
      "1",
      visitorKey,
      String(rateLimitTtlSeconds),
    ]),
    signal: AbortSignal.timeout(10_000),
  });

  if (!response.ok) {
    throw new Error(`Upstash Redis returned ${response.status}.`);
  }

  const result = await response.json();

  if (result.result !== "reserved" && result.result !== "visitor_limit") {
    throw new Error("Invalid Redis rate-limit result.");
  }

  return result.result;
}

export async function sendContactEmail(config, contact) {
  await scheduleEmailjsRequest();

  const payload = {
    service_id: config.emailServiceId,
    template_id: config.emailTemplateId,
    user_id: config.emailPublicKey,
    template_params: {
      user_name: contact.name.trim(),
      user_email: contact.email.trim(),
      message: contact.message.trim(),
    },
  };

  if (config.emailPrivateKey) {
    payload.accessToken = config.emailPrivateKey;
  }

  let response;

  try {
    response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(emailjsTimeoutMs),
    });
  } catch (error) {
    if (error.name === "TimeoutError") {
      throw new Error(
        `EmailJS request timed out after ${emailjsTimeoutMs / 1000} seconds.`,
        { cause: error },
      );
    }

    throw error;
  }

  if (!response.ok) {
    const providerMessage = (await response.text())
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 300);
    const detail = providerMessage ? `: ${providerMessage}` : "";

    throw new Error(`EmailJS returned ${response.status}${detail}.`);
  }
}
