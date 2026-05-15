import type { ExamBossState, Feedback, Mission, SetupFormData, TopicBoss } from "./types";

export const demoSetupForm: SetupFormData = {
  subject: "Probability and Statistics",
  examDate: "2026-05-20",
  topics: "Normal Distribution, Confidence Interval, Hypothesis Testing",
  level: "beginner",
  timePerDay: 20
};

export const demoTopicBosses: TopicBoss[] = [
  {
    id: "normal-distribution",
    name: "Normal Distribution",
    hp: 100,
    maxHp: 100,
    difficulty: "medium",
    status: "active"
  },
  {
    id: "confidence-interval",
    name: "Confidence Interval",
    hp: 120,
    maxHp: 120,
    difficulty: "medium",
    status: "locked"
  },
  {
    id: "hypothesis-testing",
    name: "Hypothesis Testing",
    hp: 150,
    maxHp: 150,
    difficulty: "hard",
    status: "locked"
  }
];

export const demoMission: Mission = {
  id: "mission-1",
  topicId: "normal-distribution",
  title: "Understand z-score basics",
  shortExplanation: "A z-score shows how far a value is from the mean in standard deviations.",
  question: "What does a z-score show?",
  hint: "Think about distance from the mean and standard deviation."
};

export const demoFeedback: Feedback = {
  score: 85,
  result: "partly_correct",
  whatWasGood: "You correctly explained that a z-score shows distance from the mean.",
  whatWasMissing: "You should mention that this distance is measured in standard deviations.",
  shortExplanation: "A z-score tells how many standard deviations a value is above or below the mean.",
  xpEarned: 85,
  bossDamage: 35,
  nextAction: "Try one more z-score practice question.",
  badgeUnlocked: "First Strike"
};

export const demoState: ExamBossState = {
  exam: {
    subject: demoSetupForm.subject,
    examDate: demoSetupForm.examDate,
    level: demoSetupForm.level,
    timePerDay: demoSetupForm.timePerDay,
    daysLeft: 5
  },
  game: {
    xp: 0,
    streak: 0,
    progress: 0,
    badges: []
  },
  topicBosses: demoTopicBosses,
  currentMission: demoMission,
  completedMissions: [],
  lastFeedback: null
};

export function createDemoState(): ExamBossState {
  return {
    exam: { ...demoState.exam },
    game: { ...demoState.game, badges: [...demoState.game.badges] },
    topicBosses: demoState.topicBosses.map((boss) => ({ ...boss })),
    currentMission: { ...demoState.currentMission },
    completedMissions: [...demoState.completedMissions],
    lastFeedback: demoState.lastFeedback ? { ...demoState.lastFeedback } : null
  };
}
