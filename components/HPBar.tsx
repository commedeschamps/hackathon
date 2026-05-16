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

  return (
    <div className="space-y-2">
      <div className={`flex items-center justify-between gap-3 text-sm font-bold ${labelClass}`}>
        <span>{label}</span>
        <span>
          {safeCurrent} / {safeMax} HP
        </span>
      </div>
      <ProgressBar
        ariaLabel={label}
        showValue={false}
        size={size}
        tone="hp"
        value={percent}
      />
    </div>
  );
}
