"use client";

import { useState } from "react";
import { deleteSprint, loadSprints } from "@/lib/storage";
import type { ExamBossState } from "@/lib/types";

interface MySprintsPanelProps {
  onClose: () => void;
  onLoad: (id: string, state: ExamBossState) => void;
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  } catch {
    return "—";
  }
}

export function MySprintsPanel({ onClose, onLoad }: MySprintsPanelProps) {
  const [sprints, setSprints] = useState(() => loadSprints());

  function handleDelete(id: string) {
    deleteSprint(id);
    setSprints((prev) => prev.filter((s) => s.id !== id));
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-sm"
        aria-hidden="true"
        onClick={onClose}
      />

      {/* Panel */}
      <aside
        className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col border-l border-slate-200 bg-white shadow-[−24px_0_60px_rgba(15,23,42,0.18)]"
        role="dialog"
        aria-modal="true"
        aria-label="My Sprints"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-500">
              Saved study campaigns
            </p>
            <h2 className="mt-1 text-xl font-black text-slate-950">My Sprints</h2>
          </div>
          <button
            className="grid h-9 w-9 place-items-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600 transition hover:border-slate-300 hover:bg-slate-100"
            onClick={onClose}
            type="button"
            aria-label="Close My Sprints"
          >
            <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" aria-hidden="true">
              <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto px-4 py-4">
          {sprints.length === 0 ? (
            <div className="mt-12 flex flex-col items-center gap-3 text-center">
              <div className="grid h-14 w-14 place-items-center rounded-2xl border border-slate-200 bg-slate-50 text-slate-400">
                <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" aria-hidden="true">
                  <path d="M12 4 5.5 7.3v4.8c0 3.8 2.2 7.1 6.5 8.9 4.3-1.8 6.5-5.1 6.5-8.9V7.3L12 4Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                </svg>
              </div>
              <p className="text-sm font-semibold text-slate-500">No saved sprints yet.</p>
              <p className="text-sm text-slate-400">Generate an AI sprint to start.</p>
            </div>
          ) : (
            <ul className="grid gap-3">
              {sprints.map((sprint) => {
                const progress = sprint.state.game.progress;
                const xp = sprint.state.game.xp;
                const bossCount = sprint.state.topicBosses.length;

                return (
                  <li key={sprint.id}>
                    <article className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-slate-300 hover:shadow-md">
                      {/* Top accent bar */}
                      <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500" />

                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-black uppercase tracking-[0.12em] text-slate-500">
                            {sprint.state.exam.subject}
                          </p>
                          <p className="mt-1 truncate text-base font-black text-slate-950">
                            {sprint.subject}
                          </p>
                        </div>
                        <button
                          className="shrink-0 rounded-lg border border-rose-100 bg-rose-50 px-2.5 py-1 text-xs font-bold text-rose-600 opacity-0 transition hover:bg-rose-100 group-hover:opacity-100"
                          onClick={() => handleDelete(sprint.id)}
                          type="button"
                          aria-label={`Delete ${sprint.subject} sprint`}
                        >
                          Delete
                        </button>
                      </div>

                      <div className="mt-3 grid grid-cols-3 gap-2">
                        <div className="rounded-xl border border-slate-100 bg-slate-50 px-3 py-2">
                          <p className="text-[10px] font-black uppercase tracking-[0.1em] text-slate-400">Progress</p>
                          <p className="mt-0.5 text-sm font-black text-slate-800">{progress}%</p>
                        </div>
                        <div className="rounded-xl border border-slate-100 bg-slate-50 px-3 py-2">
                          <p className="text-[10px] font-black uppercase tracking-[0.1em] text-slate-400">XP</p>
                          <p className="mt-0.5 text-sm font-black text-slate-800">{xp}</p>
                        </div>
                        <div className="rounded-xl border border-slate-100 bg-slate-50 px-3 py-2">
                          <p className="text-[10px] font-black uppercase tracking-[0.1em] text-slate-400">Bosses</p>
                          <p className="mt-0.5 text-sm font-black text-slate-800">{bossCount}</p>
                        </div>
                      </div>

                      <p className="mt-3 text-[11px] font-medium text-slate-400">
                        Last updated {formatDate(sprint.updatedAt)}
                      </p>

                      <button
                        className="mt-3 w-full rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-slate-700"
                        onClick={() => onLoad(sprint.id, sprint.state)}
                        type="button"
                      >
                        Continue Sprint
                      </button>
                    </article>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </aside>
    </>
  );
}
