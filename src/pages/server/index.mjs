import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const RECAPTCHA_SECRET = process.env.RECAPTCHA_SECRET;
import rateLimit from "express-rate-limit";

const recaptchaLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: {
    success: false,
    message: "Too many requests, please try again later.",
  },
});

app.use("/verify-recaptcha", recaptchaLimiter);

app.post("/verify-recaptcha", async (req, res) => {
  const token = req.body.token;

  if (!token) {
    return res
      .status(400)
      .json({ success: false, message: "Token is missing" });
  }

  try {
    const response = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify`,
      null,
      {
        params: {
          secret: RECAPTCHA_SECRET,
          response: token,
        },
      }
    );

    const data = response.data;

    if (data.success && data.score >= 0.5) {
      return res.json({ success: true, score: data.score });
    } else {
      return res.status(403).json({
        success: false,
        message: "Low score or failed verification",
        score: data.score,
      });
    }
  } catch (error) {
    console.error("reCAPTCHA verify error:", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Verification failed" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
