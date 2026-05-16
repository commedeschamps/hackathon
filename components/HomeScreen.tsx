import { AITrustLabel } from "./AITrustLabel";
import { BossAvatar } from "./BossAvatar";
import { HPBar } from "./HPBar";
import { JudgeBrief } from "./JudgeBrief";
import { ProgressBar } from "./ProgressBar";

interface HomeScreenProps {
  onStart: () => void;
  onLoadDemo: () => void;
}

export function HomeScreen({ onStart, onLoadDemo }: HomeScreenProps) {
  return (
    <>
      <section className="mx-auto grid min-h-[92vh] w-full max-w-6xl items-center gap-10 px-6 py-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <AITrustLabel>Gemini-powered study arena</AITrustLabel>
          <h1 className="mt-5 text-5xl font-black leading-none text-slate-950 md:text-7xl">
            Exam Boss
          </h1>
          <p className="mt-5 max-w-2xl text-xl leading-8 text-slate-700">
            Turn exam topics into bosses. Defeat them with AI-generated study missions.
          </p>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
            Built for first- and second-year students who need small daily tasks, fast feedback,
            and visible exam readiness progress before quizzes, midterms, and exams.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {[
              ["Problem", "Large topics feel too big to start."],
              ["AI role", "Gemini creates missions and checks answers."],
              ["Game loop", "Topics -> bosses -> feedback -> progress."]
            ].map(([label, value]) => (
              <div className="rounded-lg border border-white/70 bg-white/80 p-4 shadow-sm" key={label}>
                <p className="text-xs font-black uppercase tracking-[0.08em] text-slate-500">{label}</p>
                <p className="mt-2 text-sm font-bold leading-6 text-slate-800">{value}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              className="rounded-md bg-slate-950 px-6 py-3 text-base font-bold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-slate-700"
              onClick={onStart}
              type="button"
            >
              Build Exam Sprint
            </button>
            <button
              className="rounded-md border border-slate-300 bg-white px-6 py-3 text-base font-bold text-slate-800 transition hover:-translate-y-0.5 hover:border-slate-400 hover:bg-slate-50"
              onClick={onLoadDemo}
              type="button"
            >
              Use Sample Inputs
            </button>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 rounded-2xl bg-gradient-to-br from-cyan-100/70 via-white to-rose-100/70 blur-2xl" />
          <div className="relative overflow-hidden rounded-xl border border-white/80 bg-white/90 p-5 shadow-soft">
            <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-4">
              <div>
                <AITrustLabel>AI mission preview</AITrustLabel>
                <p className="mt-3 text-sm font-semibold text-slate-500">Probability and Statistics</p>
                <h2 className="mt-1 text-2xl font-black text-slate-950">Normal Distribution</h2>
              </div>
              <BossAvatar difficulty="medium" status="active" size="lg" />
            </div>

            <div className="mt-5 grid gap-4">
              <HPBar current={100} max={100} />

              <div className="rounded-lg border border-slate-200 bg-slate-50/80 p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-black uppercase tracking-[0.08em] text-slate-500">
                    Next attack
                  </p>
                  <span className="rounded-md bg-indigo-50 px-2.5 py-1 text-xs font-black uppercase tracking-[0.08em] text-indigo-800">
                    medium
                  </span>
                </div>
                <p className="mt-2 text-lg font-black text-slate-950">Understand z-score basics</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">What does a z-score show?</p>
              </div>

              <div className="rounded-lg border border-emerald-100 bg-emerald-50/80 p-4">
                <ProgressBar label="Exam readiness" size="sm" tone="progress" value={28} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <JudgeBrief />
    </>
  );
}
