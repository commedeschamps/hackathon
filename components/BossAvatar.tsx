import type { BossDifficulty, BossStatus } from "@/lib/types";

type BossVisualState = BossStatus | "weakened";

interface BossAvatarProps {
  difficulty: BossDifficulty;
  status: BossVisualState;
  size?: "sm" | "md" | "lg";
}

const difficultyClasses = {
  easy: "from-emerald-100 to-cyan-100 text-emerald-700 ring-emerald-200",
  medium: "from-cyan-100 to-indigo-100 text-indigo-700 ring-indigo-200",
  hard: "from-violet-100 to-rose-100 text-violet-800 ring-violet-200"
};

const stateClasses = {
  active: "opacity-100 shadow-[0_16px_40px_rgba(79,70,229,0.16)]",
  weakened: "opacity-100 shadow-[0_16px_40px_rgba(244,63,94,0.18)]",
  locked: "opacity-45 grayscale",
  defeated: "opacity-85 shadow-[0_16px_40px_rgba(16,185,129,0.16)]"
};

const sizeClasses = {
  sm: "h-12 w-12",
  md: "h-16 w-16",
  lg: "h-24 w-24"
};

export function BossAvatar({ difficulty, status, size = "md" }: BossAvatarProps) {
  return (
    <div
      className={`grid shrink-0 place-items-center rounded-lg bg-gradient-to-br ring-1 ${sizeClasses[size]} ${difficultyClasses[difficulty]} ${stateClasses[status]}`}
      aria-hidden="true"
    >
      <svg className="h-2/3 w-2/3" viewBox="0 0 64 64" fill="none">
        <path
          d="M32 6L52 15V31C52 43.5 43.8 54.5 32 59C20.2 54.5 12 43.5 12 31V15L32 6Z"
          fill="currentColor"
          opacity="0.16"
        />
        <path
          d="M32 9L49 16.5V31C49 41.8 42.2 51.2 32 55.2C21.8 51.2 15 41.8 15 31V16.5L32 9Z"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        <path
          d="M32 18L41 31L32 46L23 31L32 18Z"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        <path
          d="M23 31H41M32 18V46"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
