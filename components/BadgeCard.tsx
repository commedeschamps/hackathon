interface BadgeCardProps {
  badge: string;
}

export function BadgeCard({ badge }: BadgeCardProps) {
  return (
    <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-900">
      {badge}
    </div>
  );
}
