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
    <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white/90 p-5 shadow-sm">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-500">
            Battle path
          </p>
          <h2 className="mt-1 text-xl font-black text-slate-950">Learning becomes the next strike.</h2>
        </div>
        <p className="max-w-xl text-sm leading-6 text-slate-600">
          The path shows how a solved mission turns into reward, damage, and progress.
        </p>
      </div>

      <div className="mt-5 grid gap-3 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-950 p-4 text-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(34,211,238,0.18),transparent_20%),radial-gradient(circle_at_80%_30%,rgba(129,140,248,0.16),transparent_18%),linear-gradient(135deg,rgba(15,23,42,1),rgba(15,23,42,0.92))]" />
          <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:32px_32px]" />

          <div className="relative flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-2xl border border-cyan-300/20 bg-white/5 text-cyan-100">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M12 4 16.8 7v5c0 3.8-2.4 7.1-4.8 8.9C9.6 19.1 7.2 15.8 7.2 12V7L12 4Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                  <path d="M9.2 12.3 11.1 14l3.8-4.1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.14em] text-cyan-100/60">Mission strike path</p>
                <p className="mt-1 text-sm font-semibold text-slate-100">One answer moves the arena forward.</p>
              </div>
            </div>
            <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-black uppercase tracking-[0.12em] text-cyan-100/80">
              Ready
            </div>
          </div>

          <div className="relative mt-5 grid gap-3 sm:grid-cols-3 lg:grid-cols-6 lg:gap-2">
            {gameLoopSteps.map((step, index) => (
              <div className="relative" key={step}>
                {index < gameLoopSteps.length - 1 ? (
                  <div className="absolute left-[calc(100%+0.25rem)] top-6 hidden h-px w-3 bg-gradient-to-r from-cyan-300/70 to-indigo-300/70 lg:block anim-path" style={{ animationDelay: `${index * 0.2}s` }} />
                ) : null}
                <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="grid h-7 w-7 place-items-center rounded-full bg-white/10 text-[11px] font-black text-cyan-100">
                      0{index + 1}
                    </div>
                    <svg className="h-5 w-5 text-cyan-100/80" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                      {index === 0 ? (
                        <path d="M10 3 15 6v5c0 3.5-2.2 6.4-5 7.9-2.8-1.5-5-4.4-5-7.9V6l5-3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                      ) : index === 1 ? (
                        <path d="M6 13.5c1.1 1.6 2.8 2.5 4.8 2.5 3.2 0 5.8-2.6 5.8-5.8 0-1.8-.8-3.4-2-4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      ) : index === 2 ? (
                        <path d="M5 10.5h10M9 6l-4 4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      ) : index === 3 ? (
                        <path d="M4 11.5c1.4-3.3 4.1-5 8-5 1 0 2 .1 3 .4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      ) : index === 4 ? (
                        <path d="M4 14c2-1 4-1.5 6-1.5S14 13 16 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      ) : (
                        <path d="M10 4.5 12.2 8.8 17 9.5l-3.5 3.4.8 4.8L10 15.5 5.7 17.7l.8-4.8L3 9.5l4.8-.7L10 4.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                      )}
                    </svg>
                  </div>
                  <p className="mt-4 text-sm font-semibold text-slate-100">{step}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-2xl border border-cyan-200 bg-cyan-50 text-cyan-700">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M12 4 5.5 7.3v4.8c0 3.8 2.2 7.1 6.5 8.9 4.3-1.8 6.5-5.1 6.5-8.9V7.3L12 4Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                  <path d="M8.6 11.7 11 14l4.2-4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.14em] text-slate-500">AI coach</p>
                <p className="mt-1 text-sm font-semibold text-slate-800">Guides the next move.</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-2xl border border-emerald-200 bg-emerald-50 text-emerald-700">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M12 3 14.5 8.2 20 9l-4 3.9.9 5.5L12 15.7 7.1 18.4 8 12.9 4 9l5.5-.8L12 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.14em] text-slate-500">XP / reward</p>
                <p className="mt-1 text-sm font-semibold text-slate-800">Progress becomes visible.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
