import { summarizeText } from "../services/llmService.js";

function parseRetryAfterSeconds(message) {
  if (typeof message !== "string") return null;
  const match = message.match(/Please retry in\s+(\d+(?:\.\d+)?)s/i);
  if (!match) return null;
  const seconds = Number(match[1]);
  return Number.isFinite(seconds) ? Math.ceil(seconds) : null;
}

export const summarize = async (req, res) => {

  try {

    const { text } = req.body;

    if (!text) {
      return res.status(400).json({
        message: "Text is required"
      });
    }

    if (text.length < 50) {
      return res.status(400).json({
        message: "Text must be at least 50 characters"
      });
    }

    if (text.length > 12000) {
      return res.status(413).json({
        message: "Text too large"
      });
    }

    const { summary, model } = await summarizeText(text);

    res.json({
      summary,
      model,
    });

  } catch (error) {

    const errMsg = error?.message || "Unknown error";
    const isQuota =
      (typeof error?.status === "number" && error.status === 429) ||
      (typeof error?.code === "number" && error.code === 429) ||
      /(?:\b429\b|Too Many Requests|quota exceeded)/i.test(errMsg);

    if (isQuota) {
      const retryAfterSeconds = parseRetryAfterSeconds(errMsg);
      if (retryAfterSeconds) {
        res.set("Retry-After", String(retryAfterSeconds));
      }

      return res.status(429).json({
        message: "LLM quota exceeded",
        error: errMsg,
        retryAfterSeconds,
      });
    }

    res.status(502).json({
      message: "LLM service error",
      error: errMsg,
    });

  }

};