import { AITrustLabel } from "./AITrustLabel";
import { BadgeCard } from "./BadgeCard";
import { BossAvatar } from "./BossAvatar";
import { BossCard } from "./BossCard";
import { DemoBanner } from "./DemoBanner";
import { DifficultyBadge } from "./DifficultyBadge";
import { GameLoopPanel } from "./GameLoopPanel";
import { HPBar } from "./HPBar";
import { ProgressBar } from "./ProgressBar";
import { StatCard } from "./StatCard";
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
  const activeBoss = state.topicBosses.find((boss) => boss.status === "active");
  const spotlightBoss = currentBoss ?? activeBoss ?? state.topicBosses[0];
  const completedCurrentMission = state.completedMissions.includes(state.currentMission.id);
  const spotlightHpPercent = spotlightBoss
    ? Math.round((spotlightBoss.hp / spotlightBoss.maxHp) * 100)
    : 0;
  const spotlightVisualState =
    spotlightBoss?.status === "active" && spotlightHpPercent < 50 ? "weakened" : spotlightBoss?.status;

  return (
    <section className="mx-auto min-h-screen w-full max-w-6xl px-6 py-8">
      <DemoBanner onLoadDemo={onLoadDemo} onNewSprint={onNewSprint} onReset={onReset} />

      <header className="mt-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-bold uppercase text-slate-500">{state.exam.subject}</p>
          <h1 className="mt-2 text-4xl font-black text-slate-950">Exam Arena</h1>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <StatCard detail="until exam" label="Days Left" value={state.exam.daysLeft} />
          <StatCard label="XP" tone="progress" value={state.game.xp} />
          <StatCard detail="missions" label="Streak" tone="reward" value={state.game.streak} />
        </div>
      </header>

      <div className="mt-8 rounded-xl border border-emerald-100 bg-white/90 p-5 shadow-sm">
        <ProgressBar label="Exam readiness" size="lg" tone="progress" value={state.game.progress} />
      </div>

      {spotlightBoss ? (
        <section className="mt-6 overflow-hidden rounded-xl border border-indigo-100 bg-slate-950 text-white shadow-soft">
          <div className="grid gap-6 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.24),transparent_38%),radial-gradient(circle_at_bottom_left,rgba(244,63,94,0.16),transparent_36%)] p-6 lg:grid-cols-[auto_1fr_300px] lg:items-center">
            <BossAvatar
              difficulty={spotlightBoss.difficulty}
              size="lg"
              status={spotlightVisualState ?? spotlightBoss.status}
            />
            <div>
              <AITrustLabel tone="evaluation">Active boss spotlight</AITrustLabel>
              <h2 className="mt-3 text-3xl font-black leading-tight">{spotlightBoss.name}</h2>
              <div className="mt-3">
                <DifficultyBadge difficulty={spotlightBoss.difficulty} />
              </div>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-200">
                Complete the recommended attack, get Gemini feedback, and convert the score into
                XP, HP damage, progress, and badges.
              </p>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/10 p-4">
              <HPBar
                current={spotlightBoss.hp}
                label="Current HP"
                max={spotlightBoss.maxHp}
                size="lg"
                tone="dark"
              />
              {completedCurrentMission ? (
                <p className="mt-4 rounded-md bg-emerald-400/15 px-3 py-2 text-sm font-black text-emerald-100">
                  Attack completed
                </p>
              ) : (
                <button
                  className="mt-4 w-full rounded-md bg-white px-4 py-3 text-sm font-black text-slate-950 transition hover:-translate-y-0.5 hover:bg-cyan-50"
                  onClick={() => onStartMission(state.currentMission.topicId)}
                  type="button"
                >
                  Start Attack
                </button>
              )}
            </div>
          </div>
        </section>
      ) : null}

      <div className="mt-6">
        <GameLoopPanel />
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
          <div className="rounded-xl border border-cyan-100 bg-white/90 p-5 shadow-sm">
            <AITrustLabel>AI-generated next attack</AITrustLabel>
            <h2 className="mt-3 text-2xl font-black text-slate-950">{state.currentMission.title}</h2>
            <p className="mt-2 text-sm font-semibold text-slate-600">
              Topic: {currentBoss?.name ?? state.currentMission.topicId}
            </p>
            <p className="mt-4 text-base leading-7 text-slate-700">{state.currentMission.shortExplanation}</p>
            {completedCurrentMission ? (
              <p className="mt-5 rounded-md bg-emerald-50 px-3 py-2 text-sm font-bold text-emerald-800">
                Attack completed
              </p>
            ) : (
              <button
                className="mt-5 w-full rounded-md bg-slate-950 px-4 py-3 text-base font-bold text-white transition hover:-translate-y-0.5 hover:bg-slate-700"
                onClick={() => onStartMission(state.currentMission.topicId)}
                type="button"
              >
                Start Attack
              </button>
            )}
          </div>

          <div className="rounded-xl border border-amber-100 bg-white/90 p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-black text-slate-950">Badge Shelf</h2>
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
                Complete an attack to unlock the first badge.
              </p>
            )}
          </div>
        </aside>
      </div>
    </section>
  );
}
