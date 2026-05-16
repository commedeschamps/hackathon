export type StudentLevel = "beginner" | "intermediate" | "advanced";

export type BossDifficulty = "easy" | "medium" | "hard";

export type BossStatus = "active" | "locked" | "defeated";

export type FeedbackResult = "correct" | "partly_correct" | "incorrect";

export type MissionType = "review" | "practice" | "boss_fight";

export interface Exam {
  subject: string;
  examDate: string;
  level: StudentLevel;
  timePerDay: number;
  daysLeft: number;
}

export interface GameState {
  xp: number;
  streak: number;
  progress: number;
  badges: string[];
}

export interface TopicBoss {
  id: string;
  name: string;
  hp: number;
  maxHp: number;
  difficulty: BossDifficulty;
  status: BossStatus;
}

export interface Mission {
  id: string;
  topicId: string;
  title: string;
  shortExplanation: string;
  question: string;
  hint: string;
}

export interface GeneratedPlan {
  topicBosses: TopicBoss[];
  recommendedMission: Mission;
}

export interface Feedback {
  score: number;
  result: FeedbackResult;
  whatWasGood: string;
  whatWasMissing: string;
  shortExplanation: string;
  xpEarned: number;
  bossDamage: number;
  nextAction: string;
  badgeUnlocked?: string | null;
}

export interface NextMissionRecommendation {
  nextTopic: string;
  nextDifficulty: BossDifficulty;
  missionType: MissionType;
  reason: string;
  unlockMessage: string;
  id?: string;
  topicId?: string;
  title?: string;
  shortExplanation?: string;
  question?: string;
  hint?: string;
}

export interface ExamBossState {
  exam: Exam;
  game: GameState;
  topicBosses: TopicBoss[];
  currentMission: Mission;
  completedMissions: string[];
  lastFeedback: Feedback | null;
  nextRecommendation: NextMissionRecommendation | null;
}

export interface SetupFormData {
  subject: string;
  examDate: string;
  topics: string;
  level: StudentLevel;
  timePerDay: number;
}
