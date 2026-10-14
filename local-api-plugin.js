import chatHandler from "./api/chat.js";
import contactHandler from "./api/contact.js";
import healthHandler from "./api/health.js";

const maxBodyLength = 10 * 1024;
const handlers = new Map([
  ["/api/chat", chatHandler],
  ["/api/contact", contactHandler],
  ["/api/health", healthHandler],
]);

function writeJson(response, statusCode, body) {
  response.statusCode = statusCode;
  response.setHeader("Content-Type", "application/json; charset=utf-8");
  response.setHeader("Cache-Control", "no-store");
  response.end(JSON.stringify(body));
}

async function readJsonBody(request) {
  if (
    request.method !== "POST" ||
    !request.headers["content-type"]?.toLowerCase().includes("application/json")
  ) {
    return { body: undefined };
  }

  const chunks = [];
  let bodyLength = 0;
  for await (const chunk of request) {
    const buffer = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
    bodyLength += buffer.length;
    if (bodyLength > maxBodyLength) {
      return { error: "large" };
    }
    chunks.push(buffer);
  }

  if (!bodyLength) {
    return { body: undefined };
  }

  try {
    const parsed = JSON.parse(Buffer.concat(chunks).toString("utf8"));
    if (parsed === null || typeof parsed !== "object") {
      return { error: "json" };
    }
    return { body: parsed };
  } catch {
    return { error: "json" };
  }
}

function createResponseAdapter(response) {
  const adapter = {
    setHeader(name, value) {
      response.setHeader(name, value);
    },
    get statusCode() {
      return response.statusCode;
    },
    set statusCode(statusCode) {
      response.statusCode = statusCode;
    },
    status(statusCode) {
      response.statusCode = statusCode;
      return adapter;
    },
    json(body) {
      writeJson(response, response.statusCode, body);
      return adapter;
    },
    end(body) {
      response.end(body);
    },
  };
  return adapter;
}

export function localApiPlugin() {
  return {
    name: "local-api-functions",
    apply: "serve",
    configureServer(server) {
      server.middlewares.use(async (request, response, next) => {
        const pathname = new URL(request.url ?? "/", "http://localhost").pathname;
        const handler = handlers.get(pathname);
        if (!handler) {
          if (pathname === "/api" || pathname.startsWith("/api/")) {
            return writeJson(response, 404, {
              message: "API endpoint not found.",
            });
          }
          return next();
        }

        try {
          const parsed = await readJsonBody(request);
          if (parsed.error === "large") {
            return writeJson(response, 413, {
              message: "Request is too large.",
            });
          }
          if (parsed.error === "json") {
            return writeJson(response, 400, {
              message: "Invalid JSON request.",
            });
          }

          request.body = parsed.body;
          await handler(request, createResponseAdapter(response));
        } catch (error) {
          console.error("Local API handler failed.", error);
          if (!response.headersSent) {
            writeJson(response, 500, {
              message: "The API request could not be completed.",
            });
          }
        }
      });
    },
  };
}
