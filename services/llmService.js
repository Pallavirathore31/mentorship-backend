import { GoogleGenerativeAI } from "@google/generative-ai";
import OpenAI from "openai";

const geminiModelId = process.env.GEMINI_MODEL || "gemini-2.0-flash";
const openaiModelId = process.env.OPENAI_MODEL || "gpt-4.1-mini";

function isQuotaOrRateLimitError(err) {
  const msg = err?.message || "";
  const status = err?.status ?? err?.code;
  return status === 429 || /(?:\b429\b|Too Many Requests|quota exceeded|rate limit)/i.test(msg);
}

async function summarizeWithGemini(text) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY missing");
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: geminiModelId });

  const prompt = `
Summarize the following text in 3-6 bullet points under 120 words:

${text}
`;

  const result = await model.generateContent(prompt);
  const response = await result.response;

  return { summary: response.text(), model: geminiModelId };
}

async function summarizeWithOpenAI(text) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY missing");
  }

  const client = new OpenAI({ apiKey });

  const response = await client.responses.create({
    model: openaiModelId,
    input: `Summarize the following text in 3-6 bullet points under 120 words:\n\n${text}`,
  });

  return { summary: response.output_text, model: openaiModelId };
}

export const summarizeText = async (text) => {
  const provider = (process.env.LLM_PROVIDER || "gemini").toLowerCase();
  const fallback = (process.env.LLM_FALLBACK || "").toLowerCase();

  if (provider === "openai") {
    return await summarizeWithOpenAI(text);
  }

  try {
    return await summarizeWithGemini(text);
  } catch (err) {
    const canFallbackToOpenAI = fallback === "openai" && !!process.env.OPENAI_API_KEY;
    if (canFallbackToOpenAI && isQuotaOrRateLimitError(err)) {
      return await summarizeWithOpenAI(text);
    }
    throw err;
  }
};