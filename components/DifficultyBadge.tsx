import type { BossDifficulty } from "@/lib/types";

interface DifficultyBadgeProps {
  difficulty: BossDifficulty;
}

const difficultyClasses = {
  easy: "border-emerald-200 bg-emerald-50 text-emerald-800",
  medium: "border-indigo-200 bg-indigo-50 text-indigo-800",
  hard: "border-violet-200 bg-violet-50 text-violet-800"
};

export function DifficultyBadge({ difficulty }: DifficultyBadgeProps) {
  return (
    <span
      className={`inline-flex w-fit items-center rounded-md border px-2.5 py-1 text-xs font-black uppercase tracking-[0.08em] ${difficultyClasses[difficulty]}`}
    >
      {difficulty} difficulty
    </span>
  );
}
