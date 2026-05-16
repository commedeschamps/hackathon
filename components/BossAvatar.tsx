import type { BossDifficulty, BossStatus } from "@/lib/types";

type BossVisualState = BossStatus | "weakened";

interface BossAvatarProps {
  difficulty: BossDifficulty;
  status: BossVisualState;
  size?: "sm" | "md" | "lg";
}

const difficultyClasses = {
  easy: {
    outer: "from-emerald-100 via-cyan-50 to-sky-100 text-emerald-700 ring-emerald-200",
    inner: "from-white to-emerald-50",
    glow: "bg-emerald-300/25"
  },
  medium: {
    outer: "from-cyan-100 via-sky-50 to-indigo-100 text-indigo-700 ring-indigo-200",
    inner: "from-white to-cyan-50",
    glow: "bg-cyan-300/25"
  },
  hard: {
    outer: "from-violet-100 via-fuchsia-50 to-rose-100 text-violet-800 ring-violet-200",
    inner: "from-white to-violet-50",
    glow: "bg-violet-300/25"
  }
};

const stateClasses = {
  active: {
    shell: "opacity-100 shadow-[0_24px_60px_rgba(79,70,229,0.20)]",
    ring: "ring-white/30"
  },
  weakened: {
    shell: "opacity-100 shadow-[0_24px_60px_rgba(244,63,94,0.22)]",
    ring: "ring-white/30"
  },
  locked: {
    shell: "opacity-55 grayscale",
    ring: "ring-white/20"
  },
  defeated: {
    shell: "opacity-90 shadow-[0_24px_60px_rgba(16,185,129,0.18)]",
    ring: "ring-white/30"
  }
};

const sizeClasses = {
  sm: "h-14 w-14",
  md: "h-24 w-24",
  lg: "h-36 w-36"
};

export function BossAvatar({ difficulty, status, size = "md" }: BossAvatarProps) {
  const difficultyStyle = difficultyClasses[difficulty];
  const statusStyle = stateClasses[status];

  return (
    <div
      className={`relative grid shrink-0 place-items-center rounded-[1.75rem] bg-gradient-to-br ring-1 ${sizeClasses[size]} ${difficultyStyle.outer} ${statusStyle.shell} ${statusStyle.ring}`}
      aria-hidden="true"
    >
      <div className={`absolute inset-2 rounded-[1.25rem] bg-gradient-to-br ${difficultyStyle.inner}`} />
      <div className={`absolute inset-0 rounded-[1.75rem] ${difficultyStyle.glow} blur-2xl ${status === "active" || status === "weakened" ? "anim-aura" : ""}`} />
      <div className="absolute inset-4 rounded-full border border-white/50 opacity-70" />
      <div className="absolute inset-[18%] rounded-[1rem] border border-white/50 opacity-40" />
      <svg className={`relative h-[72%] w-[72%] drop-shadow-[0_14px_24px_rgba(15,23,42,0.16)] ${status === "active" || status === "weakened" ? "anim-shimmer" : ""}`} viewBox="0 0 96 96" fill="none">
        <defs>
          <linearGradient id="dragon-core" x1="20" x2="76" y1="16" y2="82" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.95" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        <circle cx="48" cy="48" r="42" stroke="currentColor" strokeWidth="2" strokeOpacity="0.3" strokeDasharray="4 6" className={status === "active" || status === "weakened" ? "anim-ring origin-center" : ""} />
        
        {/* Dragon Core Silhouette */}
        <path d="M48 10 C 35 15, 20 28, 16 48 C 24 40, 36 34, 48 30 C 60 34, 72 40, 80 48 C 76 28, 61 15, 48 10 Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" fill="currentColor" fillOpacity="0.08" />
        
        {/* Inner scales/core */}
        <path d="M48 24 L 62 44 L 48 76 L 34 44 Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" fill="url(#dragon-core)" />
        
        {/* Center energy slit */}
        <path d="M48 36 L 52 48 L 48 60 L 44 48 Z" fill="white" opacity="0.8" />
        
        {/* Bottom tail accent */}
        <path d="M48 78 L 54 88 L 48 84 L 42 88 Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      </svg>
      <div className="absolute inset-x-4 bottom-2 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent opacity-60" />
    </div>
  );
}
