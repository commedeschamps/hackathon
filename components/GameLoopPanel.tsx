const gameLoopSteps = [
  "Submit answer",
  "Mock AI scores it",
  "XP increases",
  "Boss takes damage",
  "Progress updates",
  "Badge unlocks"
];

export function GameLoopPanel() {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-bold uppercase text-slate-500">Demo Logic</p>
          <h2 className="mt-1 text-xl font-black text-slate-950">Connected gamification chain</h2>
        </div>
        <p className="text-sm leading-6 text-slate-600">
          This is the judge-facing cause-and-effect loop.
        </p>
      </div>
      <div className="mt-4 grid gap-2 md:grid-cols-6">
        {gameLoopSteps.map((step) => (
          <div className="rounded-lg bg-slate-50 px-3 py-2 text-sm font-bold text-slate-800" key={step}>
            {step}
          </div>
        ))}
      </div>
    </div>
  );
}
