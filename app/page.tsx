"use client";

import { useState } from "react";
import { Dashboard } from "@/components/Dashboard";
import { ExamSetup } from "@/components/ExamSetup";
import { FeedbackScreen } from "@/components/FeedbackScreen";
import { HomeScreen } from "@/components/HomeScreen";
import { MissionScreen } from "@/components/MissionScreen";
import { createDemoState } from "@/lib/demoData";
import { applyFeedbackToState } from "@/lib/gameLogic";
import { checkStudentAnswer, generateMockMission, generateMockSprintPlan } from "@/lib/mockAi";
import { clearStoredState, saveStoredState } from "@/lib/storage";
import type { ExamBossState, SetupFormData } from "@/lib/types";

type Screen = "home" | "setup" | "dashboard" | "mission" | "feedback";

export default function Page() {
  const [screen, setScreen] = useState<Screen>("home");
  const [state, setState] = useState<ExamBossState | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  function handleLoadDemo() {
    const nextState = createDemoState();
    setState(nextState);
    saveStoredState(nextState);
    setScreen("dashboard");
  }

  async function handleGenerateSprint(formData: SetupFormData) {
    setIsGenerating(true);

    try {
      const nextState = await generateMockSprintPlan(formData);
      setState(nextState);
      saveStoredState(nextState);
      setScreen("dashboard");
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

    const mission = await generateMockMission(boss);
    const nextState = {
      ...state,
      currentMission: mission,
      lastFeedback: null
    };

    setState(nextState);
    saveStoredState(nextState);
    setScreen("mission");
  }

  async function handleSubmitAnswer() {
    if (!state) {
      return;
    }

    setIsChecking(true);

    try {
      const feedback = await checkStudentAnswer();
      const nextState = applyFeedbackToState(state, feedback);
      setState(nextState);
      saveStoredState(nextState);
      setScreen("feedback");
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
        isChecking={isChecking}
        state={state}
        onBack={() => setScreen("dashboard")}
        onSubmitAnswer={handleSubmitAnswer}
      />
    );
  }

  if (screen === "feedback" && state) {
    return <FeedbackScreen state={state} onContinue={() => setScreen("dashboard")} />;
  }

  return <HomeScreen onLoadDemo={handleLoadDemo} onStart={() => setScreen("setup")} />;
}
