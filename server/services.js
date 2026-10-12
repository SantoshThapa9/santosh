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
    emailServiceId: process.env.EMAILJS_SERVICE_ID,
    emailTemplateId: process.env.EMAILJS_TEMPLATE_ID,
    emailPublicKey: process.env.EMAILJS_PUBLIC_KEY,
    emailPrivateKey: process.env.EMAILJS_PRIVATE_KEY,
  };
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
