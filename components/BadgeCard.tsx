interface BadgeCardProps {
  badge: string;
}

export function BadgeCard({ badge }: BadgeCardProps) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-amber-200 bg-gradient-to-br from-amber-50 to-white px-4 py-3 text-sm font-semibold text-amber-950 shadow-sm">
      <span
        className="grid h-9 w-9 shrink-0 place-items-center rounded-md border border-amber-200 bg-amber-100 text-amber-800"
        aria-hidden="true"
      >
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 3L14.7 8.5L20.8 9.4L16.4 13.7L17.4 19.8L12 16.9L6.6 19.8L7.6 13.7L3.2 9.4L9.3 8.5L12 3Z"
            fill="currentColor"
            opacity="0.2"
          />
          <path
            d="M12 3L14.7 8.5L20.8 9.4L16.4 13.7L17.4 19.8L12 16.9L6.6 19.8L7.6 13.7L3.2 9.4L9.3 8.5L12 3Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span>{badge}</span>
    </div>
  );
}
