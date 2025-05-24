import type { VercelRequest, VercelResponse } from "@vercel/node";
import axios from "axios";

const RECAPTCHA_SECRET = process.env.RECAPTCHA_SECRET!;


export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, message: "Method Not Allowed" });
  }

  const { token } = req.body;

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
  } catch (error: any) {
    console.error("reCAPTCHA verify error:", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Verification failed" });
  }
}
