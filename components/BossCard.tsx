import type { TopicBoss } from "@/lib/types";

interface BossCardProps {
  boss: TopicBoss;
  onStartMission: (topicId: string) => void;
}

export function BossCard({ boss, onStartMission }: BossCardProps) {
  const hpPercent = Math.round((boss.hp / boss.maxHp) * 100);
  const isLocked = boss.status === "locked";
  const isDefeated = boss.status === "defeated";
  const isWeakened = boss.status === "active" && hpPercent < 50;
  const visualState = isWeakened ? "weakened" : boss.status;
  const statusLabel = isWeakened ? "Weakened" : boss.status;

  const difficultyStyles = {
    easy: {
      badge: "border-emerald-200/80 bg-emerald-50 text-emerald-800",
      bar: "bg-gradient-to-r from-emerald-400 via-cyan-400 to-sky-500",
      crest: "border-emerald-200 bg-emerald-50 text-emerald-700"
    },
    medium: {
      badge: "border-cyan-200/80 bg-cyan-50 text-cyan-800",
      bar: "bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500",
      crest: "border-cyan-200 bg-cyan-50 text-cyan-700"
    },
    hard: {
      badge: "border-violet-200/80 bg-violet-50 text-violet-800",
      bar: "bg-gradient-to-r from-violet-400 via-fuchsia-500 to-rose-500",
      crest: "border-violet-200 bg-violet-50 text-violet-700"
    }
  }[boss.difficulty];

  const stateStyles = {
    active: {
      shell:
        "border-cyan-200/70 bg-slate-950 text-white shadow-[0_28px_70px_rgba(15,23,42,0.20)]",
      glow: "bg-cyan-400/20",
      crestRing: "border-cyan-300/30 bg-white/5 text-cyan-100",
      status: "border-cyan-300/20 bg-cyan-400/10 text-cyan-100",
      note: "text-slate-300",
      panel: "border-white/10 bg-white/5",
      label: "text-cyan-100",
      title: "text-white",
      hpTrack: "bg-white/10 ring-white/10",
      hpText: "text-slate-300",
      button:
        "bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 text-white shadow-[0_16px_40px_rgba(56,189,248,0.22)] hover:-translate-y-0.5 hover:shadow-[0_18px_44px_rgba(56,189,248,0.30)]"
    },
    weakened: {
      shell:
        "border-rose-200/70 bg-slate-950 text-white shadow-[0_28px_70px_rgba(15,23,42,0.20)]",
      glow: "bg-rose-500/20",
      crestRing: "border-rose-300/30 bg-white/5 text-rose-100",
      status: "border-rose-300/20 bg-rose-400/10 text-rose-100",
      note: "text-slate-300",
      panel: "border-white/10 bg-white/5",
      label: "text-rose-100",
      title: "text-white",
      hpTrack: "bg-white/10 ring-white/10",
      hpText: "text-slate-300",
      button:
        "bg-gradient-to-r from-rose-500 via-orange-500 to-amber-500 text-white shadow-[0_16px_40px_rgba(244,63,94,0.22)] hover:-translate-y-0.5 hover:shadow-[0_18px_44px_rgba(244,63,94,0.30)]"
    },
    locked: {
      shell:
        "border-slate-200 bg-white/90 text-slate-950 shadow-[0_20px_56px_rgba(15,23,42,0.08)]",
      glow: "bg-slate-400/10",
      crestRing: "border-slate-200 bg-slate-50 text-slate-700",
      status: "border-slate-200 bg-slate-100 text-slate-700",
      note: "text-slate-600",
      panel: "border-slate-200 bg-slate-50/80",
      label: "text-slate-500",
      title: "text-slate-950",
      hpTrack: "bg-slate-200",
      hpText: "text-slate-600",
      button:
        "bg-slate-100 text-slate-400 shadow-none hover:cursor-not-allowed"
    },
    defeated: {
      shell:
        "border-emerald-200 bg-emerald-50/90 text-slate-950 shadow-[0_20px_56px_rgba(16,185,129,0.10)]",
      glow: "bg-emerald-400/10",
      crestRing: "border-emerald-200 bg-white/70 text-emerald-700",
      status: "border-emerald-200 bg-emerald-100 text-emerald-800",
      note: "text-emerald-900/70",
      panel: "border-emerald-200 bg-white/70",
      label: "text-emerald-700",
      title: "text-slate-950",
      hpTrack: "bg-emerald-200/70",
      hpText: "text-emerald-900/70",
      button:
        "bg-emerald-100 text-emerald-700 shadow-none hover:cursor-not-allowed"
    }
  }[visualState];

  const buttonLabel = isDefeated ? "Defeated" : isLocked ? "Locked" : "Start Attack";
  const stateHint = isDefeated
    ? "Cleared topic. Review for mastery or move to the next boss."
    : isLocked
      ? "Locked until earlier study challenges are cleared."
      : isWeakened
        ? "Weak point exposed. Finish the attack before HP recovers."
        : "Active threat. Start the next study attack now.";

  return (
    <article
      className={`group relative overflow-hidden rounded-3xl border p-5 transition duration-300 hover:-translate-y-0.5 ${stateStyles.shell}`}
    >
      <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${difficultyStyles.bar}`} />
      <div
        className={`absolute -right-10 -top-10 h-28 w-28 rounded-full blur-3xl ${stateStyles.glow}`}
        aria-hidden="true"
      />
      <div
        className={`absolute -bottom-14 left-8 h-28 w-28 rounded-full blur-3xl ${stateStyles.glow}`}
        aria-hidden="true"
      />
      <div className="absolute inset-x-6 top-12 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative flex flex-col gap-5">
        <div className="flex items-start gap-4">
          <div
            className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl border shadow-[0_12px_32px_rgba(15,23,42,0.12)] ${difficultyStyles.crest} ${stateStyles.crestRing}`}
            aria-hidden="true"
          >
            <svg className={`h-8 w-8 ${isWeakened || boss.status === "active" ? "anim-shimmer" : ""}`} viewBox="0 0 64 64" fill="none">
              <path
                d="M32 6 C 24 10, 14 18, 12 32 C 18 26, 26 22, 32 20 C 38 22, 46 26, 52 32 C 50 18, 40 10, 32 6 Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
                fill="currentColor"
                fillOpacity="0.1"
              />
              <path
                d="M32 16 L 42 30 L 32 52 L 22 30 Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
                fill="currentColor"
                fillOpacity="0.4"
              />
              <path d="M32 24 L 35 32 L 32 40 L 29 32 Z" fill="white" opacity="0.8" />
              <path d="M32 54 L 36 60 L 32 58 L 28 60 Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            </svg>
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className={`text-lg font-black leading-tight ${stateStyles.title}`}>{boss.name}</h3>
              <span
                className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-black uppercase tracking-[0.12em] ${stateStyles.status}`}
              >
                {statusLabel}
              </span>
            </div>

            <div className="mt-2 flex flex-wrap items-center gap-2">
              <span
                className={`inline-flex w-fit items-center rounded-full border px-2.5 py-1 text-xs font-black uppercase tracking-[0.08em] ${difficultyStyles.badge}`}
              >
                {boss.difficulty} challenge
              </span>
              <p className={`text-sm font-medium ${stateStyles.note}`}>{stateHint}</p>
            </div>
          </div>
        </div>

        <div className={`rounded-2xl border p-4 ${stateStyles.panel}`}>
          <div className="flex items-center justify-between gap-3">
            <p className={`text-xs font-black uppercase tracking-[0.14em] ${stateStyles.label}`}>
              HP integrity
            </p>
            <p className={`text-sm font-semibold ${stateStyles.hpText}`}>
              {boss.hp} / {boss.maxHp} HP
            </p>
          </div>

          <div className={`mt-3 h-3 overflow-hidden rounded-full ring-1 ${stateStyles.hpTrack}`}>
            <div
              className={`h-full rounded-full ${difficultyStyles.bar} transition-[width] duration-500`}
              style={{ width: `${hpPercent}%` }}
            />
          </div>

          <div className="mt-3 flex items-center justify-between gap-3 text-xs font-semibold uppercase tracking-[0.08em]">
            <span className={stateStyles.hpText}>{hpPercent}% remaining</span>
            <span className={stateStyles.hpText}>
              {isDefeated
                ? "Boss cleared"
                : isLocked
                  ? "Awaiting unlock"
                  : isWeakened
                    ? "Weak point exposed"
                    : "Active threat"}
            </span>
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-[1fr_auto] md:items-center">
          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
            <svg className={`h-5 w-5 ${stateStyles.label}`} viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M10 2.5 15.8 5.2V10c0 3.7-2.4 6.9-5.8 8.4-3.4-1.5-5.8-4.7-5.8-8.4V5.2L10 2.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
              <path d="M10 6.4 13 8.1V10c0 2.1-1.3 3.9-3 4.8-1.7-.9-3-2.7-3-4.8V8.1L10 6.4Z" fill="currentColor" opacity="0.18" />
            </svg>
            <p className="text-sm font-semibold text-slate-700/90 dark:text-slate-200">
              {isLocked
                ? "Locked until earlier topics are cleared."
                : isDefeated
                  ? "Boss cleared. Keep moving through the arena."
                  : "Attack ready. Strike when you're prepared."}
            </p>
          </div>

          <button
            className={`inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-black transition md:w-auto md:min-w-36 ${stateStyles.button}`}
            disabled={isLocked || isDefeated}
            onClick={() => onStartMission(boss.id)}
            type="button"
          >
            <span>{buttonLabel}</span>
            <svg className="h-4 w-4" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path
                d="M5 10h9m0 0-4-4m4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </article>
  );
}
