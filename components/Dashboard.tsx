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
  onOpenSprints: () => void;
}

export function Dashboard({
  state,
  onLoadDemo,
  onNewSprint,
  onReset,
  onStartMission,
  onOpenSprints
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
      <DemoBanner onLoadDemo={onLoadDemo} onNewSprint={onNewSprint} onReset={onReset} onOpenSprints={onOpenSprints} />

      <header className="mt-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-slate-500">
            {state.exam.subject}
          </p>
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
        <section className="mt-6 overflow-hidden rounded-[1.6rem] border border-slate-900/10 bg-slate-950 text-white shadow-[0_28px_80px_rgba(15,23,42,0.24)]">
          <div className="relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(34,211,238,0.24),transparent_28%),radial-gradient(circle_at_80%_20%,rgba(129,140,248,0.18),transparent_26%),radial-gradient(circle_at_50%_100%,rgba(244,63,94,0.14),transparent_30%)]" />
            <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:48px_48px]" />

            <div className="relative grid gap-6 p-6 lg:grid-cols-[minmax(0,1.25fr)_minmax(320px,0.75fr)] lg:items-center lg:p-8">
              <div className="relative overflow-hidden rounded-[1.6rem] border border-white/10 bg-white/5 p-5">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(34,211,238,0.18),transparent_26%),radial-gradient(circle_at_50%_42%,rgba(129,140,248,0.16),transparent_42%)]" />
                <div className="absolute inset-x-1/2 top-1/2 h-[24rem] w-[24rem] -translate-x-1/2 -translate-y-1/2">
                  <div className="h-full w-full rounded-full border border-cyan-300/20 [box-shadow:0_0_0_28px_rgba(34,211,238,0.05),0_0_0_68px_rgba(129,140,248,0.03)] anim-ring origin-center" />
                </div>
                <div className="absolute inset-x-1/2 top-1/2 h-[16rem] w-[16rem] -translate-x-1/2 -translate-y-1/2">
                  <div className="h-full w-full rounded-full border border-white/10 anim-ring origin-center" style={{ animationDirection: "reverse", animationDuration: "50s" }} />
                </div>

                <div className="relative grid gap-6 lg:grid-cols-[auto_1fr] lg:items-center">
                  <div className="relative mx-auto w-fit">
                    <div className="absolute inset-[-1rem] rounded-full bg-cyan-400/15 blur-3xl" />
                    <BossAvatar
                      difficulty={spotlightBoss.difficulty}
                      size="lg"
                      status={spotlightVisualState ?? spotlightBoss.status}
                    />
                  </div>

                  <div className="space-y-4">
                    <AITrustLabel tone="evaluation">Active boss encounter</AITrustLabel>
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.14em] text-cyan-100/70">
                        Exam arena core
                      </p>
                      <h2 className="mt-2 text-4xl font-black leading-tight text-white">
                        {spotlightBoss.name}
                      </h2>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <DifficultyBadge difficulty={spotlightBoss.difficulty} />
                      <p className="text-sm font-medium text-slate-200">
                        The boss sits at the center of the arena and weakens with every solved attack.
                      </p>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-3">
                      <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                        <p className="text-[11px] font-black uppercase tracking-[0.14em] text-cyan-100/60">
                          AI coach
                        </p>
                        <p className="mt-2 text-sm font-semibold text-slate-100">
                          Guided study strikes
                        </p>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                        <p className="text-[11px] font-black uppercase tracking-[0.14em] text-cyan-100/60">
                          HP core
                        </p>
                        <p className="mt-2 text-sm font-semibold text-slate-100">
                          Boss vitality at {spotlightHpPercent}%
                        </p>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                        <p className="text-[11px] font-black uppercase tracking-[0.14em] text-cyan-100/60">
                          Mission path
                        </p>
                        <p className="mt-2 text-sm font-semibold text-slate-100">
                          Next attack is ready to launch
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={`relative rounded-[1.6rem] border border-white/10 bg-white/5 p-4 transition-all duration-500 ${spotlightVisualState === 'weakened' ? 'anim-hp-glow border-rose-500/30' : ''}`}>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_55%)] rounded-[1.6rem] overflow-hidden" />
                <div className="relative">
                  <HPBar
                    current={spotlightBoss.hp}
                    label="Current HP"
                    max={spotlightBoss.maxHp}
                    size="lg"
                    tone="dark"
                  />
                  {completedCurrentMission ? (
                    <p className="mt-4 rounded-2xl border border-emerald-400/20 bg-emerald-400/15 px-4 py-3 text-sm font-black text-emerald-100">
                      Attack completed
                    </p>
                  ) : (
                    <button
                      className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 px-4 py-3 text-sm font-black text-white shadow-[0_16px_40px_rgba(34,211,238,0.24)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_46px_rgba(34,211,238,0.32)]"
                      onClick={() => onStartMission(state.currentMission.topicId)}
                      type="button"
                    >
                      <span>Start Attack</span>
                      <svg className="h-4 w-4" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                        <path d="M5 10h9m0 0-4-4m4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
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
