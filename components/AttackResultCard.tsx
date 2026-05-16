import { AITrustLabel } from "./AITrustLabel";
import type { FeedbackResult } from "@/lib/types";

interface AttackResultCardProps {
  nextAction: string;
  result: FeedbackResult;
  score: number;
}

function getAttackLabel(score: number): string {
  if (score >= 80) {
    return "Strong attack";
  }

  if (score >= 50) {
    return "Solid hit";
  }

  return "Glancing hit";
}

function getResultText(result: FeedbackResult): string {
  return result.replace("_", " ");
}

export function AttackResultCard({ nextAction, result, score }: AttackResultCardProps) {
  const attackLabel = getAttackLabel(score);

  return (
    <section className="overflow-hidden rounded-lg border border-slate-800 bg-slate-950 text-white shadow-soft">
      <div className="bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.28),transparent_42%),radial-gradient(circle_at_bottom_left,rgba(244,63,94,0.18),transparent_38%)] p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <AITrustLabel tone="evaluation">AI evaluation</AITrustLabel>
            <h1 className="mt-4 text-4xl font-black leading-tight">{attackLabel}</h1>
            <p className="mt-2 text-sm font-bold capitalize text-slate-300">
              Result: {getResultText(result)}
            </p>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/10 px-5 py-4 text-center">
            <p className="text-xs font-black uppercase tracking-[0.08em] text-slate-300">AI score</p>
            <p className="mt-1 text-5xl font-black leading-none">{score}</p>
          </div>
        </div>
        <p className="mt-5 max-w-2xl text-base leading-7 text-slate-100">{nextAction}</p>
      </div>
    </section>
  );
}
