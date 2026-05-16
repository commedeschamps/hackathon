interface StatCardProps {
  label: string;
  value: string | number;
  detail?: string;
  tone?: "slate" | "ai" | "progress" | "reward";
}

const toneClasses = {
  slate: "border-slate-200 bg-white text-slate-950",
  ai: "border-cyan-200 bg-cyan-50 text-cyan-950",
  progress: "border-emerald-200 bg-emerald-50 text-emerald-950",
  reward: "border-amber-200 bg-amber-50 text-amber-950"
};

const accentClasses = {
  slate: "bg-slate-400",
  ai: "bg-cyan-500",
  progress: "bg-emerald-500",
  reward: "bg-amber-500"
};

export function StatCard({ label, value, detail, tone = "slate" }: StatCardProps) {
  return (
    <div className={`relative overflow-hidden rounded-lg border px-4 py-3 shadow-sm ${toneClasses[tone]}`}>
      <div className={`absolute inset-x-0 top-0 h-1 ${accentClasses[tone]}`} aria-hidden="true" />
      <p className="text-xs font-black uppercase tracking-[0.08em] text-slate-500">{label}</p>
      <p className="mt-1 text-2xl font-black leading-none">{value}</p>
      {detail ? <p className="mt-1 text-xs font-semibold text-slate-600">{detail}</p> : null}
    </div>
  );
}
