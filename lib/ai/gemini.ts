import "server-only";

import { GoogleGenAI } from "@google/genai";

export const AI_ERROR_MESSAGE = "AI request failed. Check API key or internet connection.";

const DEFAULT_GEMINI_MODEL = "gemini-2.5-flash";

export function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("Missing GEMINI_API_KEY");
  }

  return new GoogleGenAI({ apiKey });
}

export async function generateGeminiJson(prompt: string): Promise<string | undefined> {
  const ai = getGeminiClient();

  const response = await ai.models.generateContent({
    model: process.env.GEMINI_MODEL || DEFAULT_GEMINI_MODEL,
    contents: prompt,
    config: {
      temperature: 0.35,
      responseMimeType: "application/json"
    }
  });

  return response.text;
}

export function aiErrorResponse(status = 500): Response {
  return Response.json({ error: AI_ERROR_MESSAGE }, { status });
}
