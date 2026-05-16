interface StatCardProps {
  label: string;
  value: string | number;
  detail?: string;
  tone?: "slate" | "ai" | "progress" | "reward";
}

const toneClasses = {
  slate: "border-slate-200 bg-white/90 text-slate-950",
  ai: "border-cyan-200 bg-cyan-50/90 text-cyan-950",
  progress: "border-emerald-200 bg-emerald-50/90 text-emerald-950",
  reward: "border-amber-200 bg-amber-50/90 text-amber-950"
};

const accentClasses = {
  slate: "bg-slate-400",
  ai: "bg-cyan-500",
  progress: "bg-emerald-500",
  reward: "bg-amber-500"
};

export function StatCard({ label, value, detail, tone = "slate" }: StatCardProps) {
  return (
    <div className={`relative overflow-hidden rounded-2xl border px-4 py-3 shadow-[0_12px_30px_rgba(15,23,42,0.08)] ${toneClasses[tone]}`}>
      <div className={`absolute inset-x-0 top-0 h-1 ${accentClasses[tone]}`} aria-hidden="true" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.65),transparent_38%)] opacity-70" />
      <p className="relative text-[11px] font-black uppercase tracking-[0.14em] text-slate-500">
        {label}
      </p>
      <p className="relative mt-1 text-2xl font-black leading-none tracking-tight">{value}</p>
      {detail ? <p className="relative mt-1 text-xs font-semibold text-slate-600">{detail}</p> : null}
    </div>
  );
}
