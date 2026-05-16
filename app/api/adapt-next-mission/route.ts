import { aiErrorResponse, generateGeminiJson } from "@/lib/ai/gemini";
import { parseAiJson } from "@/lib/ai/json";
import { validateNextMissionRecommendation } from "@/lib/ai/validators";
import { adaptNextMissionPrompt } from "@/lib/prompts";
import type { ExamBossState } from "@/lib/types";

export const runtime = "nodejs";

function buildPrompt(state: ExamBossState) {
  return `${adaptNextMissionPrompt}

User input data:
${JSON.stringify(
  {
    exam: state.exam,
    topicBosses: state.topicBosses,
    completedMissions: state.completedMissions,
    lastFeedback: state.lastFeedback,
    availableStudyTimePerDay: state.exam.timePerDay
  },
  null,
  2
)}

Return only valid JSON. Do not wrap the response in markdown.`;
}

export async function POST(request: Request) {
  try {
    const state = (await request.json()) as ExamBossState;
    const responseText = await generateGeminiJson(buildPrompt(state));
    const recommendation = parseAiJson(responseText, validateNextMissionRecommendation);

    return Response.json(recommendation);
  } catch (error) {
    console.error("adapt-next-mission route failed", error);
    return aiErrorResponse();
  }
}
