import type { ReactNode } from "react";

interface AITrustLabelProps {
  children: ReactNode;
  tone?: "ai" | "evaluation" | "neutral";
}

const toneClasses = {
  ai: "border-cyan-200 bg-cyan-50 text-cyan-800",
  evaluation: "border-indigo-200 bg-indigo-50 text-indigo-800",
  neutral: "border-slate-200 bg-slate-50 text-slate-700"
};

export function AITrustLabel({ children, tone = "ai" }: AITrustLabelProps) {
  return (
    <span
      className={`inline-flex w-fit items-center gap-2 rounded-md border px-2.5 py-1 text-xs font-black uppercase tracking-[0.08em] ${toneClasses[tone]}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
      {children}
    </span>
  );
}
