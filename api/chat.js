import {
  requestChatReply,
  reserveChatMessage,
  requiredChatConfiguration,
} from "../lib/api-services.js";
import { getClientIp, prepareRequest, sendJson } from "../lib/api-http.js";

export const config = {
  api: { bodyParser: { sizeLimit: "10kb" } },
};

const maxMessageLength = 2000;
const maxHistoryMessageLength = 2000;

const systemPrompt = `
You are the portfolio assistant for Santosh Thapa, a full-stack software engineer based in Jamshedpur, Jharkhand, India.

Background:
- Santosh holds a Bachelor of Computer Applications (BCA) degree from Netaji Subhas University, Jamshedpur.
- He builds responsive, full-stack web applications.

Technical Skills:
- Frontend: React, Next.js, JavaScript, TypeScript, Sass, Tailwind CSS, Framer Motion.
- Backend: Node.js, Express.js, MongoDB, Supabase, Python.
- Tools and Platforms: Git, GitHub, Webpack, Vercel.
- Other technologies: Related tools and frameworks used in full-stack development.

Projects:
1. Geer
   - An internship project: a full-stack e-commerce application.
   - Features: Product discovery, user accounts, shopping cart, checkout, purchase history, Razorpay payments, NextAuth authentication, MongoDB, and an AI shopping assistant.
   - URL: /projects/geer

2. Ninzo Versus
   - A tournament management application built with Next.js and MongoDB.
   - Has more than 50 active users.
   - URL: /projects/ninzo-versus

3. Kura AI
   - A full-stack AI assistant.
   - Features: Multimodal chat, voice interaction, image generation, coding assistance, chat history, MongoDB-based user accounts, and Razorpay subscriptions.
   - URL: /projects/kura

4. Skill Blade
   - Santosh's college final-year project.
   - He served as the full-stack lead.

5. Tic Tac Toe
   - Santosh's first project.
   - A responsive Tic Tac Toe game.

6. Other Projects
   - Explore more projects at /projects/others.

Portfolio and Contact Information:
- Portfolio: https://santosh-gamma.vercel.app/
- Email: st8493510@gmail.com
- GitHub: https://github.com/SantoshThapa9/
- LinkedIn: https://www.linkedin.com/in/santosh986/
- Contact Page: /contact

Response Guidelines:
- Keep responses concise, clear, and direct.
- Avoid unnecessary introductions, repetition, and lengthy explanations.
- Adapt your tone to the user's message and intent.
- Use structured formatting, such as headings and bullet points, when it improves readability.
`;

function isChatRequest(body) {
  return (
    body !== null &&
    typeof body === "object" &&
    !Array.isArray(body) &&
    typeof body.message === "string" &&
    body.message.trim().length > 0 &&
    body.message.trim().length <= maxMessageLength &&
    (body.previousMessages === undefined ||
      (Array.isArray(body.previousMessages) &&
        body.previousMessages.length <= 5 &&
        body.previousMessages.every(
          (item) =>
            item !== null &&
            typeof item === "object" &&
            (item.role === "user" || item.role === "assistant") &&
            typeof item.content === "string" &&
            item.content.trim().length > 0 &&
            item.content.length <= maxHistoryMessageLength,
        )))
  );
}

export default async function handler(request, response) {
  if (!prepareRequest(request, response, "POST")) return;

  const { message, previousMessages = [] } = request.body ?? {};
  if (!isChatRequest(request.body)) {
    return sendJson(response, 400, {
      message: "Please provide a valid message and up to five prior messages.",
    });
  }

  let config;
  try {
    config = requiredChatConfiguration();
  } catch (error) {
    console.error("Invalid chat server configuration.", error);
    return sendJson(response, 503, {
      message: "The assistant is temporarily unavailable.",
    });
  }

  const ip = getClientIp(request);
  if (!ip || ip.length > 64 || !/^[\da-f:.]+$/i.test(ip)) {
    return sendJson(response, 503, {
      message: "The assistant is temporarily unavailable.",
    });
  }

  let rateLimitResult;
  try {
    rateLimitResult = await reserveChatMessage(config, ip);
  } catch (error) {
    console.error("Redis chat rate-limit failure.", error);
    return sendJson(response, 503, {
      message: "The assistant is temporarily unavailable.",
    });
  }

  if (rateLimitResult === "limited") {
    return sendJson(response, 429, {
      message:
        "You’ve reached the limit of five messages per minute. Please try again shortly.",
    });
  }

  const history = previousMessages.slice(-5).map(({ role, content }) => ({
    role,
    content: content.trim(),
  }));

  try {
    const reply = await requestChatReply(config, [
      { role: "system", content: systemPrompt },
      ...history,
      { role: "user", content: message.trim() },
    ]);
    return sendJson(response, 200, { reply });
  } catch (error) {
    console.error("OpenAI chat completion failed.", error);
    return sendJson(response, 502, {
      message: "The assistant could not reply right now. Please try again.",
    });
  }
}
