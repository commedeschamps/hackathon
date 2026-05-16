interface DemoBannerProps {
  onLoadDemo: () => void;
  onNewSprint: () => void;
  onReset: () => void;
  onOpenSprints: () => void;
}

export function DemoBanner({ onLoadDemo, onNewSprint, onReset, onOpenSprints }: DemoBannerProps) {
  return (
    <div className="flex flex-col gap-3 rounded-lg border border-cyan-100 bg-white/90 px-4 py-3 shadow-sm md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-sm font-black text-slate-900">AI arena demo</p>
        <p className="text-sm text-slate-600">Sample inputs only; Gemini still generates live results.</p>
      </div>
      <div className="flex flex-wrap gap-2">
        <button
          className="rounded-md border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
          onClick={onLoadDemo}
          type="button"
        >
          Use Sample Inputs
        </button>
        <button
          className="rounded-md border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
          onClick={onNewSprint}
          type="button"
        >
          New Sprint
        </button>
        <button
          className="rounded-md border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
          onClick={onOpenSprints}
          type="button"
        >
          My Sprints
        </button>
        <button
          className="rounded-md bg-slate-900 px-3 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
          onClick={onReset}
          type="button"
        >
          Home
        </button>
      </div>
    </div>
  );
}
