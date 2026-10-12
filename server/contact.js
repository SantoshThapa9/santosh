import {
  requiredConfiguration,
  reserveDailySend,
  sendContactEmail,
} from "./services.js";

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

export async function handleContact(request, response) {
  const contact = request.body;

  if (!isContactForm(contact)) {
    return response.status(400).json({
      message: "Please provide a valid name, email, and message.",
    });
  }

  let config;

  try {
    config = requiredConfiguration();
  } catch (error) {
    console.error("Invalid server configuration.", error);
    return response.status(503).json({
      message: "Contact form is temporarily unavailable.",
    });
  }

  const ip = request.ip;

  if (!ip || ip.length > 64 || !/^[\da-f:.]+$/i.test(ip)) {
    return response.status(503).json({
      message: "Contact form is temporarily unavailable.",
    });
  }

  let rateLimitResult;

  try {
    rateLimitResult = await reserveDailySend(config, ip);
  } catch (error) {
    console.error("Redis rate-limit failure.", error);
    return response.status(503).json({
      message: "Contact form is temporarily unavailable.",
    });
  }

  if (rateLimitResult === "visitor_limit") {
    return response.status(429).json({
      message: "This visitor can send two messages per day.",
    });
  }

  try {
    await sendContactEmail(config, contact);

    return response.status(200).json({
      message: "Message sent.",
    });
  } catch (error) {
    console.error("Email delivery failed.", error);
    return response.status(502).json({
      message: "Your message could not be sent.",
    });
  }
}
