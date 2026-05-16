import type { BossDifficulty, Feedback, ExamBossState, StudentLevel, TopicBoss } from "./types";

const MS_PER_DAY = 24 * 60 * 60 * 1000;

export function slugifyTopic(topic: string): string {
  return topic
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

function getTodayString(): string {
  const today = new Date();
  return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
}

export function normalizeLevel(level: string): StudentLevel {
  const value = level.toLowerCase();

  if (value === "intermediate" || value === "advanced") {
    return value;
  }

  return "beginner";
}

export function calculateDaysLeft(examDate: string, today = new Date()): number {
  if (!examDate) {
    return 0;
  }

  const exam = new Date(`${examDate}T00:00:00`);

  if (Number.isNaN(exam.getTime())) {
    return 0;
  }

  const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const diff = exam.getTime() - startOfToday.getTime();

  return Math.max(0, Math.ceil(diff / MS_PER_DAY));
}

export function calculateBossDamage(score: number): number {
  if (score >= 80) {
    return 35;
  }

  if (score >= 50) {
    return 20;
  }

  return 10;
}

export function calculateProgress(topicBosses: TopicBoss[]): number {
  const totalMaxHp = topicBosses.reduce((sum, boss) => sum + boss.maxHp, 0);
  const totalCurrentHp = topicBosses.reduce((sum, boss) => sum + boss.hp, 0);

  if (totalMaxHp === 0) {
    return 0;
  }

  return Math.round(((totalMaxHp - totalCurrentHp) / totalMaxHp) * 100);
}

export function createBossesFromTopics(topics: string[]): TopicBoss[] {
  return topics.map((topic, index) => {
    const difficulty: BossDifficulty = index < 2 ? "medium" : "hard";
    const maxHp = index === 0 ? 100 : index === 1 ? 120 : 150;

    return {
      id: slugifyTopic(topic) || `topic-${index + 1}`,
      name: topic.trim(),
      hp: maxHp,
      maxHp,
      difficulty,
      status: index === 0 ? "active" : "locked"
    };
  });
}

function unlockNextBoss(topicBosses: TopicBoss[]): TopicBoss[] {
  const hasActiveBoss = topicBosses.some((boss) => boss.status === "active");

  if (hasActiveBoss) {
    return topicBosses;
  }

  const nextLockedBoss = topicBosses.find((boss) => boss.status === "locked");

  if (!nextLockedBoss) {
    return topicBosses;
  }

  return topicBosses.map((boss) =>
    boss.id === nextLockedBoss.id ? { ...boss, status: "active" } : boss
  );
}

export function applyFeedbackToState(state: ExamBossState, feedback: Feedback): ExamBossState {
  const topicBossesAfterDamage = state.topicBosses.map((boss) => {
    if (boss.id !== state.currentMission.topicId) {
      return boss;
    }

    const newHp = Math.max(0, boss.hp - feedback.bossDamage);

    return {
      ...boss,
      hp: newHp,
      status: newHp === 0 ? "defeated" : boss.status
    };
  });

  const topicBosses = unlockNextBoss(topicBossesAfterDamage);
  const completedMissions = state.completedMissions.includes(state.currentMission.id)
    ? state.completedMissions
    : [...state.completedMissions, state.currentMission.id];

  const badgeSet = new Set(state.game.badges);
  const newlyUnlocked: string[] = [];

  if (completedMissions.length >= 1 && !badgeSet.has("First Strike")) {
    badgeSet.add("First Strike");
    newlyUnlocked.push("First Strike");
  }

  if (topicBosses.some((boss) => boss.hp === 0) && !badgeSet.has("Boss Breaker")) {
    badgeSet.add("Boss Breaker");
    newlyUnlocked.push("Boss Breaker");
  }

  if (feedback.score >= 90 && !badgeSet.has("High Scorer")) {
    badgeSet.add("High Scorer");
    newlyUnlocked.push("High Scorer");
  }

  const todayStr = getTodayString();
  const lastStudyDate = state.game.lastStudyDate;
  let newStreak = state.game.streak || 0;

  if (lastStudyDate !== todayStr) {
    if (!lastStudyDate) {
      newStreak = 1;
    } else {
      const todayDate = new Date(todayStr);
      const lastDate = new Date(lastStudyDate);
      const diffTime = todayDate.getTime() - lastDate.getTime();
      const diffDays = Math.round(diffTime / (1000 * 3600 * 24));

      if (diffDays === 1) {
        newStreak += 1;
      } else if (diffDays > 1) {
        newStreak = 1;
      }
    }
  }

  return {
    ...state,
    game: {
      xp: state.game.xp + feedback.xpEarned,
      streak: newStreak,
      progress: calculateProgress(topicBosses),
      badges: Array.from(badgeSet),
      lastStudyDate: todayStr
    },
    topicBosses,
    completedMissions,
    lastFeedback: {
      ...feedback,
      badgeUnlocked: newlyUnlocked[0] ?? null
    }
  };
}
