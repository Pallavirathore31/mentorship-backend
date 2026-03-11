import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);


export const summarizeText = async (text) => {
console.log("API KEY:", process.env.GEMINI_API_KEY);

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash"
  });

  const result = await model.generateContent(
    `Summarize the following text in 3-6 bullet points under 120 words:

    ${text}`
  );

  return result.response.text();
};