import { summarizeText } from "../services/llmService.js";

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

    const summary = await summarizeText(text);

    res.json({
      summary,
      model: "gemini-1.5-flash"
    });

  } catch (error) {

    res.status(502).json({
      message: "LLM service error",
      error: error.message
    });

  }

};