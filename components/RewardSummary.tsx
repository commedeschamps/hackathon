interface RewardSummaryProps {
  badgeUnlocked?: string | null;
  bossDamage: number;
  xpEarned: number;
}

export function RewardSummary({ badgeUnlocked, bossDamage, xpEarned }: RewardSummaryProps) {
  const rewards = [
    {
      label: "XP gained",
      value: `+${xpEarned}`,
      className: "border-emerald-200 bg-emerald-50 text-emerald-950"
    },
    {
      label: "Boss HP reduced",
      value: `-${bossDamage}`,
      className: "border-rose-200 bg-rose-50 text-rose-950"
    },
    {
      label: "Badge unlocked",
      value: badgeUnlocked ?? "None",
      className: "border-amber-200 bg-amber-50 text-amber-950"
    }
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {rewards.map((reward) => (
        <div
          className={`rounded-lg border p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-soft ${reward.className}`}
          key={reward.label}
        >
          <p className="text-xs font-black uppercase tracking-[0.08em] text-slate-500">
            {reward.label}
          </p>
          <p className="mt-2 text-3xl font-black leading-tight">{reward.value}</p>
        </div>
      ))}
    </div>
  );
}
