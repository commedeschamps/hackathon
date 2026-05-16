interface ProgressBarProps {
  value: number;
  label?: string;
  ariaLabel?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
  tone?: "progress" | "hp" | "xp";
  showValue?: boolean;
}

const toneClasses = {
  progress: "bg-gradient-to-r from-emerald-400 to-cyan-400",
  hp: "bg-gradient-to-r from-rose-500 to-orange-400",
  xp: "bg-gradient-to-r from-cyan-400 to-blue-500"
};

const sizeClasses = {
  sm: "h-2",
  md: "h-3",
  lg: "h-4"
};

export function ProgressBar({
  ariaLabel,
  className,
  value,
  label,
  size = "md",
  tone = "progress",
  showValue = true
}: ProgressBarProps) {
  const safeValue = Math.min(100, Math.max(0, Math.round(value)));

  return (
    <div className={`space-y-2 ${className ?? ""}`}>
      {(label || showValue) && (
        <div className="flex items-center justify-between gap-3 text-sm font-medium text-slate-700">
          {label ? <span>{label}</span> : <span />}
          {showValue ? <span>{safeValue}%</span> : null}
        </div>
      )}
      <div
        className={`overflow-hidden rounded-full bg-slate-200 shadow-inner ${sizeClasses[size]}`}
        aria-label={ariaLabel ?? label}
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
