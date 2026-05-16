import type { ExamBossState } from "@/lib/types";

interface FeedbackScreenProps {
  errorMessage: string | null;
  state: ExamBossState;
  onContinue: () => void;
}

export function FeedbackScreen({ errorMessage, state, onContinue }: FeedbackScreenProps) {
  const feedback = state.lastFeedback;

  if (!feedback) {
    return null;
  }

  return (
    <section className="mx-auto min-h-screen w-full max-w-4xl px-6 py-10">
      <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-soft md:p-8">
        <div className="flex flex-col gap-4 border-b border-slate-200 pb-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-bold uppercase text-slate-500">AI feedback</p>
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
          <p className="text-sm font-bold uppercase text-slate-300">Live prompt-based evaluation</p>
          <p className="mt-2 text-base leading-7">{feedback.nextAction}</p>
        </div>

        {state.nextRecommendation ? (
          <div className="mt-4 rounded-lg border border-sky-100 bg-sky-50 p-5">
            <p className="text-sm font-bold uppercase text-sky-700">Structured JSON response</p>
            <h2 className="mt-2 text-xl font-black text-slate-950">
              Next: {state.nextRecommendation.nextTopic}
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-700">{state.nextRecommendation.reason}</p>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              <div className="rounded-md bg-white px-3 py-2 text-sm font-bold capitalize text-slate-800">
                {state.nextRecommendation.nextDifficulty}
              </div>
              <div className="rounded-md bg-white px-3 py-2 text-sm font-bold capitalize text-slate-800">
                {state.nextRecommendation.missionType.replace("_", " ")}
              </div>
              <div className="rounded-md bg-white px-3 py-2 text-sm font-bold text-slate-800">
                {state.nextRecommendation.unlockMessage}
              </div>
            </div>
          </div>
        ) : null}

        {errorMessage ? (
          <p className="mt-4 rounded-md border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-800">
            {errorMessage}
          </p>
        ) : null}

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
