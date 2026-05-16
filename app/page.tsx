"use client";

import { useState } from "react";
import { Dashboard } from "@/components/Dashboard";
import { ExamSetup } from "@/components/ExamSetup";
import { FeedbackScreen } from "@/components/FeedbackScreen";
import { HomeScreen } from "@/components/HomeScreen";
import { MissionScreen } from "@/components/MissionScreen";
import { MySprintsPanel } from "@/components/MySprintsPanel";
import { LeaderboardPanel } from "@/components/LeaderboardPanel";
import { applyFeedbackToState, calculateDaysLeft, normalizeLevel } from "@/lib/gameLogic";
import {
  clearStoredState,
  saveSprint,
  saveStoredState,
  updateSprint
} from "@/lib/storage";
import type {
  ExamBossState,
  Feedback,
  GeneratedPlan,
  Mission,
  NextMissionRecommendation,
  SetupFormData
} from "@/lib/types";

type Screen = "home" | "setup" | "dashboard" | "mission" | "feedback";

const AI_ERROR_MESSAGE = "AI request failed. Check API key or internet connection.";
const NEXT_MISSION_SOFT_ERROR =
  "Answer saved, but the next mission could not be generated. Try starting the next attack again.";

async function postJson<TResponse>(url: string, body: unknown): Promise<TResponse> {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    throw new Error(AI_ERROR_MESSAGE);
  }

  return (await response.json()) as TResponse;
}

/** Extract a valid Mission from a NextMissionRecommendation if all fields are present. */
function missionFromRecommendation(
  rec: NextMissionRecommendation,
  targetTopicId: string,
  state: ExamBossState
): Mission | null {
  if (
    !rec.id ||
    !rec.title ||
    !rec.question ||
    !rec.hint ||
    !rec.shortExplanation
  ) {
    return null;
  }

  const resolvedTopicId =
    rec.topicId?.trim() ||
    rec.nextTopic?.trim() ||
    targetTopicId;

  const bossExists = state.topicBosses.some((b) => b.id === resolvedTopicId);
  if (!bossExists) {
    return null;
  }

  if (targetTopicId && resolvedTopicId !== targetTopicId) {
    return null;
  }

  return {
    id: rec.id,
    topicId: resolvedTopicId,
    title: rec.title,
    shortExplanation: rec.shortExplanation,
    question: rec.question,
    hint: rec.hint
  };
}

/** Persist state + update sprint list entry if one is active. */
function persistAll(state: ExamBossState, sprintId: string | null): void {
  saveStoredState(state);
  if (sprintId) {
    updateSprint(sprintId, state);
  }
}

export default function Page() {
  const [screen, setScreen] = useState<Screen>("home");
  const [state, setState] = useState<ExamBossState | null>(null);
  const [currentSprintId, setCurrentSprintId] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [sprintsOpen, setSprintsOpen] = useState(false);
  const [leaderboardOpen, setLeaderboardOpen] = useState(false);

  function handleLoadDemo() {
    clearStoredState();
    setState(null);
    setCurrentSprintId(null);
    setErrorMessage(null);
    setScreen("setup");
  }

  async function handleGenerateSprint(formData: SetupFormData) {
    setIsGenerating(true);
    setErrorMessage(null);

    try {
      const plan = await postJson<GeneratedPlan>("/api/generate-plan", formData);
      const nextState: ExamBossState = {
        exam: {
          subject: formData.subject.trim(),
          examDate: formData.examDate,
          level: normalizeLevel(formData.level),
          timePerDay: Number(formData.timePerDay),
          daysLeft: calculateDaysLeft(formData.examDate)
        },
        game: {
          xp: 0,
          streak: 0,
          progress: 0,
          badges: []
        },
        topicBosses: plan.topicBosses,
        currentMission: plan.recommendedMission,
        completedMissions: [],
        lastFeedback: null,
        nextRecommendation: null
      };

      // Save to current-sprint slot and sprint list
      const saved = saveSprint(nextState);
      setCurrentSprintId(saved.id);
      saveStoredState(nextState);

      setState(nextState);
      setScreen("dashboard");
    } catch {
      setErrorMessage(AI_ERROR_MESSAGE);
    } finally {
      setIsGenerating(false);
    }
  }

  async function handleStartMission(topicId: string) {
    if (!state) {
      return;
    }

    const boss = state.topicBosses.find((topicBoss) => topicBoss.id === topicId);

    if (!boss || boss.status !== "active") {
      return;
    }

    if (state.currentMission.topicId === topicId) {
      const nextState = { ...state, lastFeedback: null };
      setState(nextState);
      persistAll(nextState, currentSprintId);
      setScreen("mission");
      return;
    }

    setIsGenerating(true);
    setErrorMessage(null);

    try {
      const rec = await postJson<NextMissionRecommendation>("/api/adapt-next-mission", {
        state,
        targetTopicId: topicId
      });

      const newMission = missionFromRecommendation(rec, topicId, state);

      if (!newMission) {
        setErrorMessage("Could not generate a mission for this topic. Please try again.");
        return;
      }

      const nextState: ExamBossState = {
        ...state,
        currentMission: newMission,
        nextRecommendation: rec,
        lastFeedback: null
      };

      setState(nextState);
      persistAll(nextState, currentSprintId);
      setScreen("mission");
    } catch {
      setErrorMessage("Could not generate a mission for this topic. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  }

  async function handleSubmitAnswer(answer: string) {
    if (!state) {
      return;
    }

    const targetTopicId = state.currentMission.topicId;

    setIsChecking(true);
    setErrorMessage(null);

    try {
      const feedback = await postJson<Feedback>("/api/check-answer", {
        state,
        answer
      });

      const feedbackState = applyFeedbackToState(state, feedback);

      let nextRecommendation: NextMissionRecommendation | null = null;
      let nextCurrentMission: Mission = feedbackState.currentMission;
      let nextMissionError = false;

      try {
        nextRecommendation = await postJson<NextMissionRecommendation>(
          "/api/adapt-next-mission",
          { state: feedbackState, targetTopicId }
        );

        const candidate = missionFromRecommendation(nextRecommendation, targetTopicId, feedbackState);
        if (candidate) {
          nextCurrentMission = candidate;
        }
      } catch {
        nextMissionError = true;
      }

      const nextState: ExamBossState = {
        ...feedbackState,
        nextRecommendation,
        currentMission: nextCurrentMission
      };

      setState(nextState);
      persistAll(nextState, currentSprintId);

      if (nextMissionError) {
        setErrorMessage(NEXT_MISSION_SOFT_ERROR);
      }

      setScreen("feedback");
    } catch {
      setErrorMessage(AI_ERROR_MESSAGE);
    } finally {
      setIsChecking(false);
    }
  }

  function handleReset() {
    clearStoredState();
    setState(null);
    setCurrentSprintId(null);
    setScreen("home");
  }

  function handleLoadFromSprints(id: string, loadedState: ExamBossState) {
    setCurrentSprintId(id);
    setState(loadedState);
    saveStoredState(loadedState);
    setSprintsOpen(false);
    setLeaderboardOpen(false);
    setErrorMessage(null);
    setScreen("dashboard");
  }

  function handleOpenSprints() {
    setSprintsOpen(true);
  }

  function handleOpenLeaderboard() {
    setLeaderboardOpen(true);
  }

  if (screen === "setup") {
    return (
      <ExamSetup
        errorMessage={errorMessage}
        isGenerating={isGenerating}
        onBack={() => setScreen("home")}
        onGenerate={handleGenerateSprint}
      />
    );
  }

  if (screen === "dashboard" && state) {
    return (
      <>
        <Dashboard
          state={state}
          onLoadDemo={handleLoadDemo}
          onNewSprint={() => setScreen("setup")}
          onReset={handleReset}
          onStartMission={handleStartMission}
          onOpenSprints={handleOpenSprints}
          onOpenLeaderboard={handleOpenLeaderboard}
        />
        {sprintsOpen && (
          <MySprintsPanel
            onClose={() => setSprintsOpen(false)}
            onLoad={handleLoadFromSprints}
          />
        )}
        {leaderboardOpen && (
          <LeaderboardPanel
            onClose={() => setLeaderboardOpen(false)}
            onLoad={handleLoadFromSprints}
          />
        )}
      </>
    );
  }

  if (screen === "mission" && state) {
    return (
      <MissionScreen
        errorMessage={errorMessage}
        isChecking={isChecking}
        state={state}
        onBack={() => setScreen("dashboard")}
        onSubmitAnswer={handleSubmitAnswer}
      />
    );
  }

  if (screen === "feedback" && state) {
    return (
      <FeedbackScreen
        errorMessage={errorMessage}
        state={state}
        onContinue={() => {
          setErrorMessage(null);
          setScreen("dashboard");
        }}
      />
    );
  }

  return (
    <>
      <HomeScreen
        onLoadDemo={handleLoadDemo}
        onStart={() => setScreen("setup")}
        onOpenSprints={handleOpenSprints}
        onOpenLeaderboard={handleOpenLeaderboard}
      />
      {sprintsOpen && (
        <MySprintsPanel
          onClose={() => setSprintsOpen(false)}
          onLoad={handleLoadFromSprints}
        />
      )}
      {leaderboardOpen && (
        <LeaderboardPanel
          onClose={() => setLeaderboardOpen(false)}
          onLoad={handleLoadFromSprints}
        />
      )}
    </>
  );
}

