import { demoFeedback, demoMission, demoSetupForm, demoTopicBosses } from "./demoData";
import {
  calculateBossDamage,
  calculateDaysLeft,
  createBossesFromTopics,
  normalizeLevel,
  slugifyTopic
} from "./gameLogic";
import type { ExamBossState, Feedback, Mission, SetupFormData, TopicBoss } from "./types";

export const mockSprintPlan = {
  subject: demoSetupForm.subject,
  examDate: demoSetupForm.examDate,
  topicBosses: demoTopicBosses,
  recommendedMission: demoMission
};

export const mockMission: Mission = demoMission;

export const mockFeedback: Feedback = demoFeedback;

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function parseTopics(topics: string): string[] {
  const parsedTopics = topics
    .split(/,|\n/)
    .map((topic) => topic.trim())
    .filter(Boolean);

  return parsedTopics.length > 0 ? parsedTopics : demoSetupForm.topics.split(", ");
}

function createMissionForTopic(topic: TopicBoss): Mission {
  if (topic.id === "normal-distribution") {
    return { ...demoMission };
  }

  return {
    id: `mission-${slugifyTopic(topic.name)}`,
    topicId: topic.id,
    title: `Build core intuition for ${topic.name}`,
    shortExplanation: `${topic.name} is easier to remember when you connect the formula to one plain-language idea.`,
    question: `In one or two sentences, what is the main idea behind ${topic.name}?`,
    hint: "Focus on the meaning first, not memorizing a formula."
  };
}

export async function generateMockSprintPlan(formData: SetupFormData): Promise<ExamBossState> {
  await sleep(350);

  const topics = parseTopics(formData.topics);
  const topicBosses = createBossesFromTopics(topics);
  const activeBoss = topicBosses.find((boss) => boss.status === "active") ?? topicBosses[0];

  return {
    exam: {
      subject: formData.subject.trim() || demoSetupForm.subject,
      examDate: formData.examDate || demoSetupForm.examDate,
      level: normalizeLevel(formData.level),
      timePerDay: Number(formData.timePerDay) || demoSetupForm.timePerDay,
      daysLeft: calculateDaysLeft(formData.examDate || demoSetupForm.examDate)
    },
    game: {
      xp: 0,
      streak: 0,
      progress: 0,
      badges: []
    },
    topicBosses,
    currentMission: createMissionForTopic(activeBoss),
    completedMissions: [],
    lastFeedback: null
  };
}

export async function generateMockMission(topicBoss: TopicBoss): Promise<Mission> {
  await sleep(200);

  return createMissionForTopic(topicBoss);
}

export async function checkStudentAnswer(): Promise<Feedback> {
  await sleep(450);

  const score = mockFeedback.score;

  return {
    ...mockFeedback,
    xpEarned: score,
    bossDamage: calculateBossDamage(score)
  };
}
