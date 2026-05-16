"use client";

import { useState } from "react";
import { AITrustLabel } from "./AITrustLabel";
import { SparkleButton } from "./SparkleButton";
import { demoSetupForm } from "@/lib/demoData";
import type { SetupFormData, StudentLevel } from "@/lib/types";

interface ExamSetupProps {
  errorMessage: string | null;
  isGenerating: boolean;
  onBack: () => void;
  onGenerate: (formData: SetupFormData) => void;
}

export function ExamSetup({ errorMessage, isGenerating, onBack, onGenerate }: ExamSetupProps) {
  const [subject, setSubject] = useState(demoSetupForm.subject);
  const [examDate, setExamDate] = useState(demoSetupForm.examDate);
  const [topics, setTopics] = useState(demoSetupForm.topics);
  const [level, setLevel] = useState<StudentLevel>(demoSetupForm.level);
  const [timePerDay, setTimePerDay] = useState(demoSetupForm.timePerDay);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onGenerate({
      subject,
      examDate,
      topics,
      level,
      timePerDay
    });
  }

  return (
    <section className="mx-auto min-h-screen w-full max-w-5xl px-6 py-10">
      <button
        className="mb-6 text-sm font-semibold text-slate-600 transition hover:text-slate-950"
        onClick={onBack}
        type="button"
      >
        Back
      </button>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="rounded-xl border border-slate-200 bg-white/90 p-6 shadow-soft md:p-8">
          <div className="mb-8">
            <AITrustLabel>Campaign setup</AITrustLabel>
            <h1 className="mt-4 text-3xl font-black text-slate-950">Build Your Exam Campaign</h1>
            <p className="mt-2 text-base leading-7 text-slate-600">
              Enter exam topics. Gemini turns them into bosses, missions, and a study sprint.
            </p>
          </div>

          <form className="grid gap-5" onSubmit={handleSubmit}>
            <label className="grid gap-2">
              <span className="text-sm font-bold text-slate-700">Subject</span>
              <input
                className="rounded-md border border-slate-300 bg-white px-4 py-3 text-base text-slate-950 outline-none transition focus:border-slate-700 focus:ring-2 focus:ring-slate-200"
                onChange={(event) => setSubject(event.target.value)}
                value={subject}
              />
            </label>

            <div className="grid gap-5 md:grid-cols-3">
              <label className="grid gap-2">
                <span className="text-sm font-bold text-slate-700">Exam Date</span>
                <input
                  className="rounded-md border border-slate-300 bg-white px-4 py-3 text-base text-slate-950 outline-none transition focus:border-slate-700 focus:ring-2 focus:ring-slate-200"
                  onChange={(event) => setExamDate(event.target.value)}
                  type="date"
                  value={examDate}
                />
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-bold text-slate-700">Student Level</span>
                <select
                  className="rounded-md border border-slate-300 bg-white px-4 py-3 text-base capitalize text-slate-950 outline-none transition focus:border-slate-700 focus:ring-2 focus:ring-slate-200"
                  onChange={(event) => setLevel(event.target.value as StudentLevel)}
                  value={level}
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-bold text-slate-700">Time per day</span>
                <div className="flex items-center rounded-md border border-slate-300 bg-white focus-within:border-slate-700 focus-within:ring-2 focus-within:ring-slate-200">
                  <input
                    className="min-w-0 flex-1 rounded-md px-4 py-3 text-base text-slate-950 outline-none"
                    min={5}
                    onChange={(event) => setTimePerDay(Number(event.target.value))}
                    type="number"
                    value={timePerDay}
                  />
                  <span className="pr-4 text-sm font-semibold text-slate-500">minutes</span>
                </div>
              </label>
            </div>

            <label className="grid gap-2">
              <span className="text-sm font-bold text-slate-700">Exam Topics</span>
              <textarea
                className="min-h-32 rounded-md border border-slate-300 bg-white px-4 py-3 text-base leading-7 text-slate-950 outline-none transition focus:border-slate-700 focus:ring-2 focus:ring-slate-200"
                onChange={(event) => setTopics(event.target.value)}
                value={topics}
              />
            </label>

            <SparkleButton
              className="mt-2"
              disabled={isGenerating}
              isLoading={isGenerating}
              type="submit"
            >
              {isGenerating ? "AI is building your boss plan..." : "Generate AI Sprint"}
            </SparkleButton>

            {errorMessage ? (
              <p className="rounded-md border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-800">
                {errorMessage}
              </p>
            ) : null}
          </form>
        </div>

        <aside className="rounded-xl border border-indigo-100 bg-gradient-to-br from-slate-950 to-indigo-950 p-5 text-white shadow-soft">
          <p className="text-sm font-black uppercase tracking-[0.08em] text-cyan-200">Campaign logic</p>
          <h2 className="mt-3 text-2xl font-black">One sprint, one clear next move.</h2>
          <div className="mt-5 grid gap-3">
            {["Topics become bosses", "AI creates the first attack", "Feedback turns into XP and HP damage"].map(
              (step, index) => (
                <div className="rounded-lg border border-white/10 bg-white/10 p-3" key={step}>
                  <p className="text-xs font-black text-cyan-200">0{index + 1}</p>
                  <p className="mt-1 text-sm font-bold leading-6">{step}</p>
                </div>
              )
            )}
          </div>
        </aside>
      </div>
    </section>
  );
}
