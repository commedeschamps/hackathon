import { ProgressBar } from "./ProgressBar";

interface HPBarProps {
  current: number;
  max: number;
  label?: string;
  size?: "sm" | "md" | "lg";
  tone?: "light" | "dark";
}

export function HPBar({ current, max, label = "Boss HP", size = "md", tone = "light" }: HPBarProps) {
  const safeMax = Math.max(1, max);
  const safeCurrent = Math.min(safeMax, Math.max(0, current));
  const percent = Math.round((safeCurrent / safeMax) * 100);
  const labelClass = tone === "dark" ? "text-slate-100" : "text-slate-700";
  const shellClass = tone === "dark"
    ? "border-white/10 bg-white/5"
    : "border-slate-200 bg-white/85";
  const trackClass = tone === "dark"
    ? "bg-white/10 ring-1 ring-white/10"
    : "bg-slate-200 ring-1 ring-slate-900/5";
  const barGlowClass = tone === "dark"
    ? "shadow-[0_0_18px_rgba(56,189,248,0.22)]"
    : "shadow-[0_0_18px_rgba(248,113,113,0.18)]";

  return (
    <div className={`rounded-2xl border p-4 ${shellClass}`}>
      <div className={`flex items-center justify-between gap-3 text-sm font-black uppercase tracking-[0.12em] ${labelClass}`}>
        <span>{label}</span>
        <span className="text-xs font-semibold normal-case tracking-normal opacity-80">
          {safeCurrent} / {safeMax} HP
        </span>
      </div>
      <div className={`mt-3 overflow-hidden rounded-full ${trackClass}`}>
        <ProgressBar
          ariaLabel={label}
          className={`m-0 ${barGlowClass}`}
          showValue={false}
          size={size}
          tone="hp"
          value={percent}
        />
      </div>
      <div className={`mt-3 flex items-center justify-between gap-3 text-xs font-semibold uppercase tracking-[0.08em] ${tone === "dark" ? "text-slate-300" : "text-slate-500"}`}>
        <span>{percent}% remaining</span>
        <span>{percent >= 80 ? "Stable" : percent >= 40 ? "Under pressure" : "Critical"}</span>
      </div>
    </div>
  );
}
