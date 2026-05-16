"use client";

import { useState } from "react";
import { AITrustLabel } from "./AITrustLabel";
import { BossAvatar } from "./BossAvatar";
import { DifficultyBadge } from "./DifficultyBadge";
import { HPBar } from "./HPBar";
import type { ExamBossState } from "@/lib/types";

interface MissionScreenProps {
  errorMessage: string | null;
  isChecking: boolean;
  state: ExamBossState;
  onBack: () => void;
  onSubmitAnswer: (answer: string) => void;
}

export function MissionScreen({
  errorMessage,
  isChecking,
  state,
  onBack,
  onSubmitAnswer
}: MissionScreenProps) {
  const [answer, setAnswer] = useState("");
  const currentBoss = state.topicBosses.find((boss) => boss.id === state.currentMission.topicId);
  const hpPercent = currentBoss ? Math.round((currentBoss.hp / currentBoss.maxHp) * 100) : 0;
  const visualState =
    currentBoss?.status === "active" && hpPercent < 50 ? "weakened" : currentBoss?.status;

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!answer.trim()) {
      return;
    }

    onSubmitAnswer(answer);
  }

  return (
    <section className="mx-auto min-h-screen w-full max-w-4xl px-6 py-10">
      <button
        className="mb-6 text-sm font-semibold text-slate-600 transition hover:text-slate-950"
        onClick={onBack}
        type="button"
      >
        Back to Exam Arena
      </button>

      <div className="rounded-xl border border-slate-200 bg-white/90 p-6 shadow-soft md:p-8">
        <div className="grid gap-5 border-b border-slate-200 pb-6 md:grid-cols-[auto_1fr] md:items-center">
          {currentBoss ? (
            <BossAvatar
              difficulty={currentBoss.difficulty}
              size="lg"
              status={visualState ?? currentBoss.status}
            />
          ) : null}
          <div>
            <AITrustLabel>AI-generated mission</AITrustLabel>
            <h1 className="mt-3 text-3xl font-black leading-tight text-slate-950">
              {state.currentMission.title}
            </h1>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <p className="text-base font-semibold text-slate-600">
                Boss: {currentBoss?.name ?? state.currentMission.topicId}
              </p>
              {currentBoss ? <DifficultyBadge difficulty={currentBoss.difficulty} /> : null}
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-5">
          {currentBoss ? (
            <div className="rounded-lg border border-rose-100 bg-rose-50/70 p-4">
              <HPBar current={currentBoss.hp} max={currentBoss.maxHp} size="sm" />
            </div>
          ) : null}

          <div className="rounded-lg border border-slate-200 bg-slate-50/80 p-5">
            <p className="text-sm font-black uppercase tracking-[0.08em] text-slate-500">
              Mission briefing
            </p>
            <p className="mt-2 text-base leading-7 text-slate-700">{state.currentMission.shortExplanation}</p>
          </div>

          <div>
            <p className="text-sm font-black uppercase tracking-[0.08em] text-cyan-700">
              Study attack question
            </p>
            <p className="mt-2 text-2xl font-black text-slate-950">{state.currentMission.question}</p>
          </div>

          <div className="rounded-lg border border-sky-100 bg-sky-50 p-4 text-sm leading-6 text-sky-900">
            <span className="font-bold">Hint from AI coach:</span> {state.currentMission.hint}
          </div>

          <form className="grid gap-4" onSubmit={handleSubmit}>
            <label className="grid gap-2">
              <span className="text-sm font-bold text-slate-700">Your answer</span>
              <textarea
                className="min-h-36 rounded-md border border-slate-300 px-4 py-3 text-base leading-7 text-slate-950 outline-none transition focus:border-slate-700 focus:ring-2 focus:ring-slate-200"
                onChange={(event) => setAnswer(event.target.value)}
                placeholder="Write your own answer so Gemini can evaluate it."
                value={answer}
              />
            </label>

            <button
              className="rounded-md bg-slate-950 px-5 py-3 text-base font-bold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-slate-700 disabled:cursor-wait disabled:bg-slate-400"
              disabled={isChecking || !answer.trim()}
              type="submit"
            >
              {isChecking ? "Gemini is evaluating your answer..." : "Check Answer"}
            </button>

            {errorMessage ? (
              <p className="rounded-md border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-800">
                {errorMessage}
              </p>
            ) : null}
          </form>
        </div>
      </div>
    </section>
  );
}
