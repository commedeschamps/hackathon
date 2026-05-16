"use client";

import { useState } from "react";
import { loadSprints } from "@/lib/storage";
import type { ExamBossState } from "@/lib/types";

interface LeaderboardPanelProps {
  onClose: () => void;
  onLoad: (id: string, state: ExamBossState) => void;
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  } catch {
    return "—";
  }
}

export function LeaderboardPanel({ onClose, onLoad }: LeaderboardPanelProps) {
  const [sprints] = useState(() => {
    const loaded = loadSprints();
    return loaded.sort((a, b) => {
      if (b.state.game.progress !== a.state.game.progress) {
        return b.state.game.progress - a.state.game.progress;
      }
      if (b.state.game.xp !== a.state.game.xp) {
        return b.state.game.xp - a.state.game.xp;
      }
      if (b.state.game.streak !== a.state.game.streak) {
        return b.state.game.streak - a.state.game.streak;
      }
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });
  });

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
        aria-label="Leaderboard"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-500">
              Ranked study campaigns
            </p>
            <h2 className="mt-1 text-xl font-black text-slate-950"> Leaderboard</h2>
          </div>
          <button
            className="grid h-9 w-9 place-items-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600 transition hover:border-slate-300 hover:bg-slate-100"
            onClick={onClose}
            type="button"
            aria-label="Close Leaderboard"
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
                  <path d="M9 19 3 13l6-6M15 19l6-6-6-6" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                </svg>
              </div>
              <p className="text-sm font-semibold text-slate-500">No campaigns yet.</p>
              <p className="text-sm text-slate-400">Start a sprint to rank up.</p>
            </div>
          ) : (
            <ul className="grid gap-3">
              {sprints.map((sprint, index) => {
                const progress = sprint.state.game.progress;
                const xp = sprint.state.game.xp;
                const streak = sprint.state.game.streak || 0;
                const bossCount = sprint.state.topicBosses.length;
                const rank = index + 1;

                return (
                  <li key={sprint.id}>
                    <article className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-slate-300 hover:shadow-md">
                      {/* Top accent bar for top 3 */}
                      {rank === 1 && (
                        <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500" />
                      )}
                      {rank === 2 && (
                        <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-slate-300 via-slate-400 to-slate-500" />
                      )}
                      {rank === 3 && (
                        <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-orange-300 via-orange-400 to-orange-500" />
                      )}
                      
                      <div className="flex items-start gap-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-lg font-black text-slate-900">
                          #{rank}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-black uppercase tracking-[0.12em] text-slate-500">
                            {sprint.state.exam.subject}
                          </p>
                          <p className="mt-0.5 truncate text-base font-black text-slate-950">
                            {sprint.subject}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 grid grid-cols-4 gap-2">
                        <div className="rounded-xl border border-slate-100 bg-slate-50 px-2 py-2 text-center">
                          <p className="text-[9px] font-black uppercase tracking-[0.1em] text-slate-400">Progress</p>
                          <p className="mt-0.5 text-sm font-black text-slate-800">{progress}%</p>
                        </div>
                        <div className="rounded-xl border border-slate-100 bg-slate-50 px-2 py-2 text-center">
                          <p className="text-[9px] font-black uppercase tracking-[0.1em] text-slate-400">XP</p>
                          <p className="mt-0.5 text-sm font-black text-slate-800">{xp}</p>
                        </div>
                        <div className="rounded-xl border border-slate-100 bg-slate-50 px-2 py-2 text-center">
                          <p className="text-[9px] font-black uppercase tracking-[0.1em] text-slate-400">Streak</p>
                          <p className="mt-0.5 text-sm font-black text-slate-800">{streak}</p>
                        </div>
                        <div className="rounded-xl border border-slate-100 bg-slate-50 px-2 py-2 text-center">
                          <p className="text-[9px] font-black uppercase tracking-[0.1em] text-slate-400">Bosses</p>
                          <p className="mt-0.5 text-sm font-black text-slate-800">{bossCount}</p>
                        </div>
                      </div>

                      <p className="mt-3 text-[11px] font-medium text-slate-400">
                        Updated {formatDate(sprint.updatedAt)}
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
