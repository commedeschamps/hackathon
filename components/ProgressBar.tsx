interface ProgressBarProps {
  value: number;
  label?: string;
  tone?: "progress" | "hp" | "xp";
  showValue?: boolean;
}

const toneClasses = {
  progress: "bg-emerald-500",
  hp: "bg-rose-500",
  xp: "bg-sky-500"
};

export function ProgressBar({
  value,
  label,
  tone = "progress",
  showValue = true
}: ProgressBarProps) {
  const safeValue = Math.min(100, Math.max(0, Math.round(value)));

  return (
    <div className="space-y-2">
      {(label || showValue) && (
        <div className="flex items-center justify-between gap-3 text-sm font-medium text-slate-700">
          {label ? <span>{label}</span> : <span />}
          {showValue ? <span>{safeValue}%</span> : null}
        </div>
      )}
      <div
        className="h-3 overflow-hidden rounded-full bg-slate-200"
        aria-label={label}
        aria-valuemax={100}
        aria-valuemin={0}
        aria-valuenow={safeValue}
        role="progressbar"
      >
        <div
          className={`h-full rounded-full ${toneClasses[tone]} transition-[width] duration-500`}
          style={{ width: `${safeValue}%` }}
        />
      </div>
    </div>
  );
}
