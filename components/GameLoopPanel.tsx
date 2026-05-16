const gameLoopSteps = [
  "Check answer",
  "Gemini scores it",
  "XP increases",
  "Boss HP drops",
  "Progress updates",
  "Badge unlocks"
];

export function GameLoopPanel() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white/90 p-5 shadow-sm">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.08em] text-slate-500">Battle loop</p>
          <h2 className="mt-1 text-xl font-black text-slate-950">Every reward comes from learning.</h2>
        </div>
        <p className="text-sm leading-6 text-slate-600">
          Gemini returns JSON; local game logic turns it into progress.
        </p>
      </div>
      <div className="mt-4 grid gap-2 md:grid-cols-6">
        {gameLoopSteps.map((step, index) => (
          <div
            className="rounded-lg border border-slate-100 bg-slate-50 px-3 py-2 text-sm font-bold text-slate-800"
            key={step}
          >
            <span className="mr-2 text-xs font-black text-cyan-700">0{index + 1}</span>
            {step}
          </div>
        ))}
      </div>
    </div>
  );
}
