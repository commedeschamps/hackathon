import type { ExamBossState } from "@/lib/types";

interface FeedbackScreenProps {
  state: ExamBossState;
  onContinue: () => void;
}

export function FeedbackScreen({ state, onContinue }: FeedbackScreenProps) {
  const feedback = state.lastFeedback;

  if (!feedback) {
    return null;
  }

  return (
    <section className="mx-auto min-h-screen w-full max-w-4xl px-6 py-10">
      <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-soft md:p-8">
        <div className="flex flex-col gap-4 border-b border-slate-200 pb-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-bold uppercase text-slate-500">Mock AI Feedback</p>
            <h1 className="mt-2 text-3xl font-black text-slate-950">Score {feedback.score}</h1>
          </div>
          <div className="rounded-lg bg-emerald-50 px-4 py-3 text-sm font-black capitalize text-emerald-800">
            {feedback.result.replace("_", " ")}
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-lg bg-slate-50 p-5">
            <p className="text-sm font-bold uppercase text-slate-500">What was good</p>
            <p className="mt-2 text-base leading-7 text-slate-700">{feedback.whatWasGood}</p>
          </div>
          <div className="rounded-lg bg-slate-50 p-5">
            <p className="text-sm font-bold uppercase text-slate-500">What was missing</p>
            <p className="mt-2 text-base leading-7 text-slate-700">{feedback.whatWasMissing}</p>
          </div>
        </div>

        <div className="mt-4 rounded-lg border border-slate-200 p-5">
          <p className="text-sm font-bold uppercase text-slate-500">Short Explanation</p>
          <p className="mt-2 text-base leading-7 text-slate-700">{feedback.shortExplanation}</p>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border border-slate-200 p-5">
            <p className="text-sm font-bold uppercase text-slate-500">XP Earned</p>
            <p className="mt-2 text-3xl font-black text-slate-950">{feedback.xpEarned}</p>
          </div>
          <div className="rounded-lg border border-slate-200 p-5">
            <p className="text-sm font-bold uppercase text-slate-500">Boss Damage</p>
            <p className="mt-2 text-3xl font-black text-slate-950">{feedback.bossDamage}</p>
          </div>
          <div className="rounded-lg border border-slate-200 p-5">
            <p className="text-sm font-bold uppercase text-slate-500">Badge Unlocked</p>
            <p className="mt-2 text-xl font-black text-slate-950">{feedback.badgeUnlocked ?? "None"}</p>
          </div>
        </div>

        <div className="mt-4 rounded-lg bg-slate-950 p-5 text-white">
          <p className="text-sm font-bold uppercase text-slate-300">Next Action</p>
          <p className="mt-2 text-base leading-7">{feedback.nextAction}</p>
        </div>

        <button
          className="mt-6 w-full rounded-md bg-slate-950 px-5 py-3 text-base font-bold text-white shadow-soft transition hover:bg-slate-700"
          onClick={onContinue}
          type="button"
        >
          Continue
        </button>
      </div>
    </section>
  );
}
