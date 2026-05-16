import { aiErrorResponse, generateGeminiJson } from "@/lib/ai/gemini";
import { parseAiJson } from "@/lib/ai/json";
import { validateNextMissionRecommendation } from "@/lib/ai/validators";
import { adaptNextMissionPrompt } from "@/lib/prompts";
import type { ExamBossState } from "@/lib/types";

export const runtime = "nodejs";

interface AdaptNextMissionBody {
  state: ExamBossState;
  targetTopicId?: string;
}

function buildPrompt(state: ExamBossState, targetTopicId?: string) {
  const targetBoss = targetTopicId
    ? state.topicBosses.find((b) => b.id === targetTopicId)
    : null;

  const targetContext = targetBoss
    ? {
        targetTopicId: targetBoss.id,
        targetTopicName: targetBoss.name,
        targetDifficulty: targetBoss.difficulty
      }
    : null;

  return `${adaptNextMissionPrompt}

User input data:
${JSON.stringify(
  {
    exam: state.exam,
    topicBosses: state.topicBosses,
    completedMissions: state.completedMissions,
    lastFeedback: state.lastFeedback,
    availableStudyTimePerDay: state.exam.timePerDay,
    ...(targetContext ? { targetMission: targetContext } : {})
  },
  null,
  2
)}

Return only valid JSON. Do not wrap the response in markdown.`;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as AdaptNextMissionBody;
    const state = body.state ?? (body as unknown as ExamBossState);
    const targetTopicId = body.targetTopicId;
    const responseText = await generateGeminiJson(buildPrompt(state, targetTopicId));
    const recommendation = parseAiJson(responseText, validateNextMissionRecommendation);

    return Response.json(recommendation);
  } catch (error) {
    console.error("adapt-next-mission route failed", error);
    return aiErrorResponse();
  }
}
