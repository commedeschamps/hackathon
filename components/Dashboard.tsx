import { BadgeCard } from "./BadgeCard";
import { BossCard } from "./BossCard";
import { DemoBanner } from "./DemoBanner";
import { ProgressBar } from "./ProgressBar";
import type { ExamBossState } from "@/lib/types";

interface DashboardProps {
  state: ExamBossState;
  onLoadDemo: () => void;
  onNewSprint: () => void;
  onReset: () => void;
  onStartMission: (topicId: string) => void;
}

export function Dashboard({
  state,
  onLoadDemo,
  onNewSprint,
  onReset,
  onStartMission
}: DashboardProps) {
  const currentBoss = state.topicBosses.find((boss) => boss.id === state.currentMission.topicId);
  const completedCurrentMission = state.completedMissions.includes(state.currentMission.id);

  return (
    <section className="mx-auto min-h-screen w-full max-w-6xl px-6 py-8">
      <DemoBanner onLoadDemo={onLoadDemo} onNewSprint={onNewSprint} onReset={onReset} />

      <header className="mt-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-bold uppercase text-slate-500">{state.exam.subject}</p>
          <h1 className="mt-2 text-4xl font-black text-slate-950">Sprint Dashboard</h1>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-center shadow-sm">
            <p className="text-xs font-bold uppercase text-slate-500">Days Left</p>
            <p className="mt-1 text-2xl font-black text-slate-950">{state.exam.daysLeft}</p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-center shadow-sm">
            <p className="text-xs font-bold uppercase text-slate-500">XP</p>
            <p className="mt-1 text-2xl font-black text-slate-950">{state.game.xp}</p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-center shadow-sm">
            <p className="text-xs font-bold uppercase text-slate-500">Streak</p>
            <p className="mt-1 text-2xl font-black text-slate-950">{state.game.streak}</p>
          </div>
        </div>
      </header>

      <div className="mt-8 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <ProgressBar label="Overall Progress" tone="progress" value={state.game.progress} />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_360px]">
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-black text-slate-950">Topic Bosses</h2>
            <p className="text-sm font-semibold text-slate-500">{state.topicBosses.length} topics</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {state.topicBosses.map((boss) => (
              <BossCard boss={boss} key={boss.id} onStartMission={onStartMission} />
            ))}
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-bold uppercase text-slate-500">Recommended Mission</p>
            <h2 className="mt-3 text-2xl font-black text-slate-950">{state.currentMission.title}</h2>
            <p className="mt-2 text-sm font-semibold text-slate-600">
              Topic: {currentBoss?.name ?? state.currentMission.topicId}
            </p>
            <p className="mt-4 text-base leading-7 text-slate-700">{state.currentMission.shortExplanation}</p>
            {completedCurrentMission ? (
              <p className="mt-5 rounded-md bg-emerald-50 px-3 py-2 text-sm font-bold text-emerald-800">
                Mission completed
              </p>
            ) : (
              <button
                className="mt-5 w-full rounded-md bg-slate-950 px-4 py-3 text-base font-bold text-white transition hover:bg-slate-700"
                onClick={() => onStartMission(state.currentMission.topicId)}
                type="button"
              >
                Start Mission
              </button>
            )}
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-black text-slate-950">Badges</h2>
              <span className="text-sm font-semibold text-slate-500">{state.game.badges.length}</span>
            </div>
            {state.game.badges.length > 0 ? (
              <div className="grid gap-3">
                {state.game.badges.map((badge) => (
                  <BadgeCard badge={badge} key={badge} />
                ))}
              </div>
            ) : (
              <p className="rounded-lg bg-slate-50 p-4 text-sm leading-6 text-slate-600">
                Complete a mission to unlock the first badge.
              </p>
            )}
          </div>
        </aside>
      </div>
    </section>
  );
}
