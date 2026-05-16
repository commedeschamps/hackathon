"use client";

import { useState } from "react";
import { Dashboard } from "@/components/Dashboard";
import { ExamSetup } from "@/components/ExamSetup";
import { FeedbackScreen } from "@/components/FeedbackScreen";
import { HomeScreen } from "@/components/HomeScreen";
import { MissionScreen } from "@/components/MissionScreen";
import { applyFeedbackToState, calculateDaysLeft, normalizeLevel } from "@/lib/gameLogic";
import { clearStoredState, saveStoredState } from "@/lib/storage";
import type {
  ExamBossState,
  Feedback,
  GeneratedPlan,
  NextMissionRecommendation,
  SetupFormData
} from "@/lib/types";

type Screen = "home" | "setup" | "dashboard" | "mission" | "feedback";

const AI_ERROR_MESSAGE = "AI request failed. Check API key or internet connection.";

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

export default function Page() {
  const [screen, setScreen] = useState<Screen>("home");
  const [state, setState] = useState<ExamBossState | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  function handleLoadDemo() {
    clearStoredState();
    setState(null);
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

      setState(nextState);
      saveStoredState(nextState);
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

    const nextState = {
      ...state,
      lastFeedback: null
    };

    setState(nextState);
    saveStoredState(nextState);
    setScreen("mission");
  }

  async function handleSubmitAnswer(answer: string) {
    if (!state) {
      return;
    }

    setIsChecking(true);
    setErrorMessage(null);

    try {
      const feedback = await postJson<Feedback>("/api/check-answer", {
        state,
        answer
      });
      const feedbackState = applyFeedbackToState(state, feedback);
      let nextRecommendation: NextMissionRecommendation | null = null;

      try {
        nextRecommendation = await postJson<NextMissionRecommendation>(
          "/api/adapt-next-mission",
          feedbackState
        );
      } catch {
        setErrorMessage(AI_ERROR_MESSAGE);
      }

      const nextState = {
        ...feedbackState,
        nextRecommendation
      };

      setState(nextState);
      saveStoredState(nextState);
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
    setScreen("home");
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
      <Dashboard
        state={state}
        onLoadDemo={handleLoadDemo}
        onNewSprint={() => setScreen("setup")}
        onReset={handleReset}
        onStartMission={handleStartMission}
      />
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

  return <HomeScreen onLoadDemo={handleLoadDemo} onStart={() => setScreen("setup")} />;
}
