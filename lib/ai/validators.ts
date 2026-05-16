import {
  AiJsonError,
  isRecord,
  requiredEnum,
  requiredNumber,
  requiredString
} from "./json";
import { calculateBossDamage, slugifyTopic } from "@/lib/gameLogic";
import type {
  BossDifficulty,
  Feedback,
  FeedbackResult,
  GeneratedPlan,
  Mission,
  MissionType,
  NextMissionRecommendation,
  TopicBoss
} from "@/lib/types";

const difficulties = ["easy", "medium", "hard"] as const satisfies readonly BossDifficulty[];
const bossStatuses = ["active", "locked"] as const;
const feedbackResults = ["correct", "partly_correct", "incorrect"] as const satisfies readonly FeedbackResult[];
const missionTypes = ["review", "practice", "boss_fight"] as const satisfies readonly MissionType[];

function validateMission(value: unknown): Mission {
  if (!isRecord(value)) {
    throw new AiJsonError("Mission must be an object");
  }

  return {
    id: slugifyTopic(requiredString(value.id, "recommendedMission.id")) || "mission-1",
    topicId: slugifyTopic(requiredString(value.topicId, "recommendedMission.topicId")),
    title: requiredString(value.title, "recommendedMission.title"),
    shortExplanation: requiredString(
      value.shortExplanation,
      "recommendedMission.shortExplanation"
    ),
    question: requiredString(value.question, "recommendedMission.question"),
    hint: requiredString(value.hint, "recommendedMission.hint")
  };
}

function validateTopicBoss(value: unknown, index: number): TopicBoss {
  if (!isRecord(value)) {
    throw new AiJsonError(`topicBosses[${index}] must be an object`);
  }

  const name = requiredString(value.name, `topicBosses[${index}].name`);
  const maxHp = Math.max(50, Math.round(requiredNumber(value.maxHp, `topicBosses[${index}].maxHp`)));
  const rawHp = Math.round(requiredNumber(value.hp, `topicBosses[${index}].hp`));

  return {
    id: slugifyTopic(requiredString(value.id, `topicBosses[${index}].id`) || name),
    name,
    hp: Math.min(maxHp, Math.max(0, rawHp)),
    maxHp,
    difficulty: requiredEnum(value.difficulty, `topicBosses[${index}].difficulty`, difficulties),
    status: requiredEnum(value.status, `topicBosses[${index}].status`, bossStatuses)
  };
}

export function validateGeneratedPlan(value: unknown): GeneratedPlan {
  if (!isRecord(value) || !Array.isArray(value.topicBosses)) {
    throw new AiJsonError("Generated plan is missing topicBosses");
  }

  if (value.topicBosses.length === 0) {
    throw new AiJsonError("Generated plan must include at least one boss");
  }

  const topicBosses = value.topicBosses.map(validateTopicBoss);
  const normalizedBosses: TopicBoss[] = topicBosses.map((boss, index) => ({
    ...boss,
    status: index === 0 ? "active" : "locked"
  }));
  const recommendedMission = validateMission(value.recommendedMission);

  if (!normalizedBosses.some((boss) => boss.id === recommendedMission.topicId)) {
    recommendedMission.topicId = normalizedBosses[0].id;
  }

  return {
    topicBosses: normalizedBosses,
    recommendedMission
  };
}

export function validateFeedback(value: unknown): Feedback {
  if (!isRecord(value)) {
    throw new AiJsonError("Feedback must be an object");
  }

  const score = Math.min(100, Math.max(0, Math.round(requiredNumber(value.score, "score"))));
  const bossDamage = calculateBossDamage(score);

  return {
    score,
    result: requiredEnum(value.result, "result", feedbackResults),
    whatWasGood: requiredString(value.whatWasGood, "whatWasGood"),
    whatWasMissing: requiredString(value.whatWasMissing, "whatWasMissing"),
    shortExplanation: requiredString(value.shortExplanation, "shortExplanation"),
    xpEarned: score,
    bossDamage,
    nextAction: requiredString(value.nextAction, "nextAction"),
    badgeUnlocked:
      typeof value.badgeUnlocked === "string" && value.badgeUnlocked.trim().length > 0
        ? value.badgeUnlocked.trim()
        : null
  };
}

export function validateNextMissionRecommendation(value: unknown): NextMissionRecommendation {
  if (!isRecord(value)) {
    throw new AiJsonError("Next mission recommendation must be an object");
  }

  return {
    nextTopic: requiredString(value.nextTopic, "nextTopic"),
    nextDifficulty: requiredEnum(value.nextDifficulty, "nextDifficulty", difficulties),
    missionType: requiredEnum(value.missionType, "missionType", missionTypes),
    reason: requiredString(value.reason, "reason"),
    unlockMessage: requiredString(value.unlockMessage, "unlockMessage"),
    id: typeof value.id === "string" ? value.id : undefined,
    topicId: typeof value.topicId === "string" ? value.topicId : undefined,
    title: typeof value.title === "string" ? value.title : undefined,
    shortExplanation: typeof value.shortExplanation === "string" ? value.shortExplanation : undefined,
    question: typeof value.question === "string" ? value.question : undefined,
    hint: typeof value.hint === "string" ? value.hint : undefined
  };
}
