import { prepareRequest, sendJson } from "../lib/api-http.js";

export default function handler(request, response) {
  if (!prepareRequest(request, response, "GET")) return;
  sendJson(response, 200, { status: "ok" });
}
