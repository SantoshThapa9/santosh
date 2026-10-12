import process from "node:process";
import { fileURLToPath } from "node:url";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import { handleContact } from "./contact.js";

dotenv.config({ path: fileURLToPath(new URL(".env", import.meta.url)) });
dotenv.config({ path: fileURLToPath(new URL("../.env", import.meta.url)) });

const app = express();
const port = Number(process.env.PORT || 4000);

const allowedOrigins = (
  process.env.FRONTEND_ORIGIN ||
  "http://localhost:3000,http://127.0.0.1:3000"
)
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error("PORT must be a valid TCP port number.");
}

if (process.env.TRUST_PROXY === "1") {
  app.set("trust proxy", 1);
}

app.disable("x-powered-by");
app.use(helmet());

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Request origin is not allowed."));
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
    maxAge: 600,
  }),
);

app.use(express.json({ limit: "10kb", strict: true }));

app.use((request, response, next) => {
  response.setHeader("Cache-Control", "no-store");
  next();
});

app.get("/health", (request, response) => {
  response.status(200).json({ status: "ok" });
});

app.post("/api/contact", handleContact);

app.use((error, request, response, next) => {
  if (response.headersSent) {
    return next(error);
  }

  if (error.status === 413 || error.type === "entity.too.large") {
    return response.status(413).json({
      message: "Request is too large.",
    });
  }

  if (
    error.type === "entity.parse.failed" ||
    (error instanceof SyntaxError && "body" in error)
  ) {
    return response.status(400).json({
      message: "Invalid JSON request.",
    });
  }

  if (error.message === "Request origin is not allowed.") {
    return response.status(403).json({ message: error.message });
  }

  console.error("Unhandled server error.", error);

  return response.status(500).json({
    message: "Contact form is temporarily unavailable.",
  });
});

app.listen(port, () => {
  console.log(`Contact server listening on port ${port}.`);
});
