"use client";

import { useState } from "react";
import { demoSetupForm } from "@/lib/demoData";
import type { SetupFormData, StudentLevel } from "@/lib/types";

interface ExamSetupProps {
  isGenerating: boolean;
  onBack: () => void;
  onGenerate: (formData: SetupFormData) => void;
}

export function ExamSetup({ isGenerating, onBack, onGenerate }: ExamSetupProps) {
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
    <section className="mx-auto min-h-screen w-full max-w-4xl px-6 py-10">
      <button
        className="mb-6 text-sm font-semibold text-slate-600 transition hover:text-slate-950"
        onClick={onBack}
        type="button"
      >
        Back
      </button>

      <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-soft md:p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-slate-950">Exam Setup</h1>
          <p className="mt-2 text-base text-slate-600">Create a focused sprint from the exam details.</p>
        </div>

        <form className="grid gap-5" onSubmit={handleSubmit}>
          <label className="grid gap-2">
            <span className="text-sm font-bold text-slate-700">Subject</span>
            <input
              className="rounded-md border border-slate-300 px-4 py-3 text-base text-slate-950 outline-none transition focus:border-slate-700 focus:ring-2 focus:ring-slate-200"
              onChange={(event) => setSubject(event.target.value)}
              value={subject}
            />
          </label>

          <div className="grid gap-5 md:grid-cols-3">
            <label className="grid gap-2">
              <span className="text-sm font-bold text-slate-700">Exam Date</span>
              <input
                className="rounded-md border border-slate-300 px-4 py-3 text-base text-slate-950 outline-none transition focus:border-slate-700 focus:ring-2 focus:ring-slate-200"
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
              <div className="flex items-center rounded-md border border-slate-300 focus-within:border-slate-700 focus-within:ring-2 focus-within:ring-slate-200">
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
              className="min-h-32 rounded-md border border-slate-300 px-4 py-3 text-base leading-7 text-slate-950 outline-none transition focus:border-slate-700 focus:ring-2 focus:ring-slate-200"
              onChange={(event) => setTopics(event.target.value)}
              value={topics}
            />
          </label>

          <button
            className="mt-2 rounded-md bg-slate-950 px-5 py-3 text-base font-bold text-white shadow-soft transition hover:bg-slate-700 disabled:cursor-wait disabled:bg-slate-400"
            disabled={isGenerating}
            type="submit"
          >
            {isGenerating ? "Generating Sprint..." : "Generate Sprint"}
          </button>
        </form>
      </div>
    </section>
  );
}
