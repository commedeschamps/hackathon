interface HomeScreenProps {
  onStart: () => void;
  onLoadDemo: () => void;
}

export function HomeScreen({ onStart, onLoadDemo }: HomeScreenProps) {
  return (
    <section className="mx-auto grid min-h-screen w-full max-w-6xl items-center gap-10 px-6 py-10 md:grid-cols-[1.1fr_0.9fr]">
      <div>
        <h1 className="text-5xl font-black text-slate-950 md:text-7xl">Exam Boss</h1>
        <p className="mt-5 max-w-2xl text-xl leading-8 text-slate-700">
          Turn exam topics into bosses. Defeat them with AI-generated study missions.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button
            className="rounded-md bg-slate-950 px-6 py-3 text-base font-bold text-white shadow-soft transition hover:bg-slate-700"
            onClick={onStart}
            type="button"
          >
            Start Sprint
          </button>
          <button
            className="rounded-md border border-slate-300 bg-white px-6 py-3 text-base font-bold text-slate-800 transition hover:border-slate-400 hover:bg-slate-50"
            onClick={onLoadDemo}
            type="button"
          >
            Load Demo
          </button>
        </div>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div>
            <p className="text-sm font-semibold text-slate-500">Probability and Statistics</p>
            <h2 className="mt-1 text-2xl font-black text-slate-950">Normal Distribution</h2>
          </div>
          <div className="rounded-md bg-emerald-50 px-3 py-2 text-sm font-bold text-emerald-800">
            Active
          </div>
        </div>
        <div className="mt-5 space-y-4">
          <div>
            <div className="mb-2 flex justify-between text-sm font-semibold text-slate-700">
              <span>Boss HP</span>
              <span>100 / 100</span>
            </div>
            <div className="h-3 rounded-full bg-slate-200">
              <div className="h-3 w-full rounded-full bg-rose-500" />
            </div>
          </div>
          <div className="rounded-lg bg-slate-50 p-4">
            <p className="text-sm font-semibold text-slate-500">Mission</p>
            <p className="mt-1 text-lg font-bold text-slate-950">Understand z-score basics</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">What does a z-score show?</p>
          </div>
        </div>
      </div>
    </section>
  );
}
