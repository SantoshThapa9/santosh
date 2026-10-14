import {
  requiredConfiguration,
  reserveDailySend,
  sendContactEmail,
} from "../lib/api-services.js";
import { getClientIp, prepareRequest, sendJson } from "../lib/api-http.js";

export const config = {
  api: { bodyParser: { sizeLimit: "10kb" } },
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isContactForm(body) {
  return (
    body !== null &&
    typeof body === "object" &&
    !Array.isArray(body) &&
    typeof body.name === "string" &&
    body.name.trim().length > 0 &&
    body.name.trim().length <= 100 &&
    typeof body.email === "string" &&
    body.email.trim().length <= 254 &&
    emailPattern.test(body.email.trim()) &&
    typeof body.message === "string" &&
    body.message.trim().length > 0 &&
    body.message.trim().length <= 5000
  );
}

export default async function handler(request, response) {
  if (!prepareRequest(request, response, "POST")) return;

  const contact = request.body;
  if (!isContactForm(contact)) {
    return sendJson(response, 400, {
      message: "Please provide a valid name, email, and message.",
    });
  }

  let config;
  try {
    config = requiredConfiguration();
  } catch (error) {
    console.error("Invalid server configuration.", error);
    return sendJson(response, 503, {
      message: "Contact form is temporarily unavailable.",
    });
  }

  const ip = getClientIp(request);
  if (!ip || ip.length > 64 || !/^[\da-f:.]+$/i.test(ip)) {
    return sendJson(response, 503, {
      message: "Contact form is temporarily unavailable.",
    });
  }

  let rateLimitResult;
  try {
    rateLimitResult = await reserveDailySend(config, ip);
  } catch (error) {
    console.error("Redis rate-limit failure.", error);
    return sendJson(response, 503, {
      message: "Contact form is temporarily unavailable.",
    });
  }

  if (rateLimitResult === "visitor_limit") {
    return sendJson(response, 429, {
      message: "This visitor can send two messages per day.",
    });
  }

  try {
    await sendContactEmail(config, contact);
    return sendJson(response, 200, { message: "Message sent." });
  } catch (error) {
    console.error("Email delivery failed.", error);
    return sendJson(response, 502, {
      message: "Your message could not be sent.",
    });
  }
}
