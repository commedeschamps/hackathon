import { aiErrorResponse, generateGeminiJson } from "@/lib/ai/gemini";
import { parseAiJson } from "@/lib/ai/json";
import { validateFeedback } from "@/lib/ai/validators";
import { checkStudentAnswerPrompt } from "@/lib/prompts";
import type { ExamBossState } from "@/lib/types";

export const runtime = "nodejs";

interface CheckAnswerRequest {
  state: ExamBossState;
  answer: string;
}

function buildPrompt(input: CheckAnswerRequest) {
  const currentBoss = input.state.topicBosses.find(
    (boss) => boss.id === input.state.currentMission.topicId
  );

  return `${checkStudentAnswerPrompt}

User input data:
${JSON.stringify(
  {
    subject: input.state.exam.subject,
    examDate: input.state.exam.examDate,
    level: input.state.exam.level,
    timePerDay: input.state.exam.timePerDay,
    topic: currentBoss?.name ?? input.state.currentMission.topicId,
    mission: input.state.currentMission,
    studentAnswer: input.answer
  },
  null,
  2
)}

Scoring rules:
- score must be from 0 to 100
- xpEarned must equal score
- bossDamage must be 35 if score >= 80, 20 if score >= 50, and 10 if score < 50

Return only valid JSON. Do not wrap the response in markdown.`;
}

export async function POST(request: Request) {
  try {
    const input = (await request.json()) as CheckAnswerRequest;
    const responseText = await generateGeminiJson(buildPrompt(input));
    const feedback = parseAiJson(responseText, validateFeedback);

    return Response.json(feedback);
  } catch (error) {
    console.error("check-answer route failed", error);
    return aiErrorResponse();
  }
}
