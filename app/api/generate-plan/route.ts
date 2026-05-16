import { aiErrorResponse, generateGeminiJson } from "@/lib/ai/gemini";
import { parseAiJson } from "@/lib/ai/json";
import { validateGeneratedPlan } from "@/lib/ai/validators";
import { generateSprintPlanPrompt } from "@/lib/prompts";
import type { SetupFormData } from "@/lib/types";

export const runtime = "nodejs";

function buildPrompt(input: SetupFormData) {
  return `${generateSprintPlanPrompt}

User input data:
${JSON.stringify(input, null, 2)}

Return only valid JSON. Do not wrap the response in markdown.`;
}

export async function POST(request: Request) {
  try {
    const input = (await request.json()) as SetupFormData;
    const responseText = await generateGeminiJson(buildPrompt(input));
    const plan = parseAiJson(responseText, validateGeneratedPlan);

    return Response.json(plan);
  } catch (error) {
    console.error("generate-plan route failed", error);
    return aiErrorResponse();
  }
}
