import { AITrustLabel } from "./AITrustLabel";
import { BossAvatar } from "./BossAvatar";
import { HPBar } from "./HPBar";
import { ProgressBar } from "./ProgressBar";

interface HomeScreenProps {
  onStart: () => void;
  onLoadDemo: () => void;
  onOpenSprints: () => void;
}

export function HomeScreen({ onStart, onLoadDemo, onOpenSprints }: HomeScreenProps) {
  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-10 lg:py-12">
      <section className="grid min-h-[92vh] items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="max-w-2xl">
          <AITrustLabel>Gemini-powered study arena</AITrustLabel>
          <h1 className="mt-5 text-5xl font-black leading-none text-slate-950 md:text-7xl">
            Exam Boss
          </h1>
          <p className="mt-5 text-2xl font-black leading-tight text-slate-800 md:text-3xl">
            Turn exam topics into bosses.
          </p>
          <p className="mt-4 max-w-xl text-base leading-7 text-slate-600 md:text-lg">
            Gemini creates bite-sized study missions, checks your answers, and turns progress into
            XP, boss damage, and badges.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {[
              ["AI Missions", "Gemini turns large topics into focused daily tasks."],
              ["Boss Battles", "Each topic becomes a boss with HP, difficulty, and progress."],
              ["Fast Feedback", "Submit an answer, get AI feedback, earn XP, and reduce boss HP."]
            ].map(([label, value]) => (
              <div
                className="rounded-2xl border border-white/80 bg-white/80 p-4 shadow-sm backdrop-blur"
                key={label}
              >
                <p className="text-xs font-black uppercase tracking-[0.12em] text-slate-500">
                  {label}
                </p>
                <p className="mt-2 text-sm font-semibold leading-6 text-slate-800">{value}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              className="rounded-xl bg-slate-950 px-6 py-3 text-base font-bold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-slate-800"
              onClick={onStart}
              type="button"
            >
              Build Exam Sprint
            </button>
            <button
              className="rounded-xl border border-slate-300 bg-white px-6 py-3 text-base font-bold text-slate-800 transition hover:-translate-y-0.5 hover:border-slate-400 hover:bg-slate-50"
              onClick={onLoadDemo}
              type="button"
            >
              Use Sample Inputs
            </button>
            <button
              className="rounded-xl border border-slate-300 bg-white px-6 py-3 text-base font-bold text-slate-800 transition hover:-translate-y-0.5 hover:border-slate-400 hover:bg-slate-50"
              onClick={onOpenSprints}
              type="button"
            >
              My Sprints
            </button>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-cyan-100/70 via-white to-rose-100/70 blur-2xl" />
          <div className="relative overflow-hidden rounded-[1.5rem] border border-white/80 bg-white/90 p-5 shadow-soft">
            <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-4">
              <div>
                <AITrustLabel>AI mission preview</AITrustLabel>
                <p className="mt-3 text-sm font-semibold text-slate-500">Probability and Statistics</p>
                <h2 className="mt-1 text-2xl font-black text-slate-950">Normal Distribution</h2>
              </div>
              <BossAvatar difficulty="medium" status="active" size="lg" />
            </div>

            <div className="mt-5 grid gap-4">
              <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs font-black uppercase tracking-[0.12em] text-slate-500">
                    Boss HP
                  </p>
                  <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-black uppercase tracking-[0.08em] text-indigo-800">
                    medium
                  </span>
                </div>
                <HPBar current={100} max={100} />
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white/80 p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs font-black uppercase tracking-[0.12em] text-slate-500">
                    Next attack
                  </p>
                  <span className="text-xs font-bold text-slate-500">Mission 01</span>
                </div>
                <p className="mt-2 text-lg font-black text-slate-950">Understand z-score basics</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">What does a z-score show?</p>
              </div>

              <div className="rounded-2xl border border-emerald-100 bg-emerald-50/80 p-4">
                <ProgressBar label="Exam readiness" size="sm" tone="progress" value={28} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-3xl border border-slate-200/80 bg-white/80 px-5 py-6 shadow-sm backdrop-blur">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.12em] text-slate-500">
              How the prototype works
            </p>
            <h2 className="mt-2 text-2xl font-black text-slate-950">Four short steps.</h2>
          </div>
          <p className="max-w-2xl text-sm leading-6 text-slate-600">
            Real Gemini API routes power sprint generation, answer checking, and next-step
            recommendations.
          </p>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-4">
          {[
            ["1", "Enter exam topics"],
            ["2", "Gemini creates bosses and missions"],
            ["3", "Complete a mission and get AI feedback"],
            ["4", "Earn XP, damage bosses, and track readiness"]
          ].map(([step, label]) => (
            <div key={step} className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-cyan-700">Step {step}</p>
              <p className="mt-2 text-sm font-semibold leading-6 text-slate-800">{label}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
