const maxBodyLength = 10_240;

function getHeader(request, name) {
  const value = request.headers[name];
  return Array.isArray(value) ? value[0] : value;
}

function sendJson(response, statusCode, body) {
  response.statusCode = statusCode;
  response.setHeader("Content-Type", "application/json; charset=utf-8");
  response.end(JSON.stringify(body));
}

function isSameOriginRequest(request) {
  const origin = getHeader(request, "origin");
  if (!origin) return true;

  let originUrl;
  try {
    originUrl = new URL(origin);
  } catch {
    return false;
  }

  const host =
    getHeader(request, "x-forwarded-host") ?? getHeader(request, "host");
  return (
    (originUrl.protocol === "https:" || originUrl.protocol === "http:") &&
    typeof host === "string" &&
    originUrl.host.toLowerCase() === host.toLowerCase()
  );
}

export function prepareRequest(request, response, allowedMethod) {
  response.setHeader("Cache-Control", "no-store");
  response.setHeader("X-Content-Type-Options", "nosniff");
  response.setHeader("X-Frame-Options", "DENY");
  response.setHeader("Referrer-Policy", "no-referrer");

  if (!isSameOriginRequest(request)) {
    sendJson(response, 403, { message: "Request origin is not allowed." });
    return false;
  }

  const origin = getHeader(request, "origin");
  if (origin) {
    response.setHeader("Access-Control-Allow-Origin", origin);
    response.setHeader("Vary", "Origin");
    response.setHeader(
      "Access-Control-Allow-Methods",
      `${allowedMethod}, OPTIONS`,
    );
    response.setHeader("Access-Control-Allow-Headers", "Content-Type");
    response.setHeader("Access-Control-Max-Age", "600");
  }

  if (request.method === "OPTIONS") {
    response.statusCode = 204;
    response.end();
    return false;
  }

  if (request.method !== allowedMethod) {
    response.setHeader("Allow", `${allowedMethod}, OPTIONS`);
    sendJson(response, 405, { message: "Method not allowed." });
    return false;
  }

  const contentLength = Number(getHeader(request, "content-length"));
  const bodyLength =
    request.body === undefined
      ? 0
      : Buffer.byteLength(
          typeof request.body === "string"
            ? request.body
            : JSON.stringify(request.body),
        );

  if (
    (Number.isFinite(contentLength) && contentLength > maxBodyLength) ||
    bodyLength > maxBodyLength
  ) {
    sendJson(response, 413, { message: "Request is too large." });
    return false;
  }

  return true;
}

export function getClientIp(request) {
  const forwardedFor = getHeader(request, "x-forwarded-for");
  const forwardedIp =
    typeof forwardedFor === "string" ? forwardedFor.split(",")[0].trim() : "";
  return forwardedIp || request.socket?.remoteAddress || "";
}

export { sendJson };
