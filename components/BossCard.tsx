import { ProgressBar } from "./ProgressBar";
import type { TopicBoss } from "@/lib/types";

interface BossCardProps {
  boss: TopicBoss;
  onStartMission: (topicId: string) => void;
}

export function BossCard({ boss, onStartMission }: BossCardProps) {
  const hpPercent = Math.round((boss.hp / boss.maxHp) * 100);
  const isLocked = boss.status === "locked";
  const isDefeated = boss.status === "defeated";

  return (
    <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-slate-950">{boss.name}</h3>
          <p className="mt-1 text-sm capitalize text-slate-600">{boss.difficulty} difficulty</p>
        </div>
        <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-semibold capitalize text-slate-700">
          {boss.status}
        </span>
      </div>

      <div className="mt-5">
        <ProgressBar label="HP" showValue={false} tone="hp" value={hpPercent} />
        <p className="mt-2 text-sm font-semibold text-slate-700">
          {boss.hp} / {boss.maxHp} HP
        </p>
      </div>

      <button
        className="mt-5 w-full rounded-md bg-slate-900 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-600"
        disabled={isLocked || isDefeated}
        onClick={() => onStartMission(boss.id)}
        type="button"
      >
        {isDefeated ? "Defeated" : isLocked ? "Locked" : "Start Mission"}
      </button>
    </article>
  );
}
