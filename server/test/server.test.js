import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { once } from "node:events";
import net from "node:net";
import { after, before, test } from "node:test";
import { fileURLToPath } from "node:url";

const serverDirectory = fileURLToPath(new URL("../", import.meta.url));
const allowedOrigin = "http://localhost:3000";
let serverProcess;
let baseUrl;

before(async () => {
  const portProbe = net.createServer();
  await new Promise((resolve, reject) => {
    portProbe.once("error", reject);
    portProbe.listen(0, "127.0.0.1", resolve);
  });
  const { port } = portProbe.address();
  await new Promise((resolve, reject) => {
    portProbe.close((error) => (error ? reject(error) : resolve()));
  });

  baseUrl = `http://127.0.0.1:${port}`;
  serverProcess = spawn(process.execPath, ["index.js"], {
    cwd: serverDirectory,
    env: {
      ...process.env,
      PORT: String(port),
      FRONTEND_ORIGIN: `${allowedOrigin},https://santosh-gamma.vercel.app`,
      TRUST_PROXY: "0",
    },
    stdio: "ignore",
  });

  for (let attempt = 0; attempt < 40; attempt += 1) {
    if (serverProcess.exitCode !== null) {
      throw new Error(
        `Contact server exited during startup with code ${serverProcess.exitCode}.`,
      );
    }

    try {
      const response = await fetch(`${baseUrl}/health`, {
        signal: AbortSignal.timeout(500),
      });

      if (response.ok) {
        return;
      }
    } catch (error) {
      if (!(error instanceof TypeError) && error.name !== "TimeoutError") {
        throw error;
      }
    }

    await new Promise((resolve) => setTimeout(resolve, 250));
  }

  throw new Error("Contact server did not become ready within 10 seconds.");
});

after(async () => {
  if (serverProcess && serverProcess.exitCode === null) {
    const exited = once(serverProcess, "exit");
    serverProcess.kill();
    await exited;
  }
});

test("health endpoint returns an uncached JSON readiness response", async () => {
  const response = await fetch(`${baseUrl}/health`);

  assert.equal(response.status, 200);
  assert.equal(response.headers.get("cache-control"), "no-store");
  assert.deepEqual(await response.json(), { status: "ok" });
});

test("contact preflight allows the configured local frontend origin", async () => {
  const response = await fetch(`${baseUrl}/api/contact`, {
    method: "OPTIONS",
    headers: {
      Origin: allowedOrigin,
      "Access-Control-Request-Method": "POST",
      "Access-Control-Request-Headers": "content-type",
    },
  });

  assert.equal(response.status, 204);
  assert.equal(
    response.headers.get("access-control-allow-origin"),
    allowedOrigin,
  );
  assert.match(
    response.headers.get("access-control-allow-methods"),
    /POST/,
  );
});

test("contact preflight allows the production Vercel origin", async () => {
  const response = await fetch(`${baseUrl}/api/contact`, {
    method: "OPTIONS",
    headers: {
      Origin: "https://santosh-gamma.vercel.app",
      "Access-Control-Request-Method": "POST",
      "Access-Control-Request-Headers": "content-type",
    },
  });

  assert.equal(response.status, 204);
  assert.equal(
    response.headers.get("access-control-allow-origin"),
    "https://santosh-gamma.vercel.app",
  );
});

test("contact endpoint rejects invalid input before contacting providers", async () => {
  const response = await fetch(`${baseUrl}/api/contact`, {
    method: "POST",
    headers: {
      Origin: allowedOrigin,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  });

  assert.equal(response.status, 400);
  assert.deepEqual(await response.json(), {
    message: "Please provide a valid name, email, and message.",
  });
});

test("contact endpoint rejects malformed JSON", async () => {
  const response = await fetch(`${baseUrl}/api/contact`, {
    method: "POST",
    headers: {
      Origin: allowedOrigin,
      "Content-Type": "application/json",
    },
    body: "{",
  });

  assert.equal(response.status, 400);
  assert.deepEqual(await response.json(), {
    message: "Invalid JSON request.",
  });
});

test("contact endpoint rejects unconfigured cross-origin requests", async () => {
  const response = await fetch(`${baseUrl}/api/contact`, {
    method: "POST",
    headers: {
      Origin: "https://untrusted.example",
      "Content-Type": "application/json",
    },
    body: "{}",
  });

  assert.equal(response.status, 403);
  assert.deepEqual(await response.json(), {
    message: "Request origin is not allowed.",
  });
});
