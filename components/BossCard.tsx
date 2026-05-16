import { BossAvatar } from "./BossAvatar";
import { DifficultyBadge } from "./DifficultyBadge";
import { HPBar } from "./HPBar";
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
  const cardClasses = isDefeated
    ? "border-emerald-200 bg-emerald-50/80"
    : isLocked
      ? "border-slate-200 bg-white/70"
      : isWeakened
        ? "border-rose-200 bg-white shadow-[0_18px_48px_rgba(244,63,94,0.10)]"
        : "border-indigo-200 bg-white shadow-[0_18px_48px_rgba(79,70,229,0.10)]";

  return (
    <article className={`rounded-lg border p-5 shadow-sm transition hover:-translate-y-0.5 ${cardClasses}`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 gap-4">
          <BossAvatar difficulty={boss.difficulty} status={visualState} />
          <div className="min-w-0">
            <h3 className="text-lg font-black leading-tight text-slate-950">{boss.name}</h3>
            <div className="mt-2">
              <DifficultyBadge difficulty={boss.difficulty} />
            </div>
          </div>
        </div>
        <span className="rounded-md border border-slate-200 bg-white/80 px-2.5 py-1 text-xs font-black uppercase tracking-[0.08em] text-slate-700">
          {statusLabel}
        </span>
      </div>

      <div className="mt-5">
        <HPBar current={boss.hp} max={boss.maxHp} />
      </div>

      <button
        className="mt-5 w-full rounded-md bg-slate-950 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-600"
        disabled={isLocked || isDefeated}
        onClick={() => onStartMission(boss.id)}
        type="button"
      >
        {isDefeated ? "Defeated" : isLocked ? "Locked" : "Start Attack"}
      </button>
    </article>
  );
}
