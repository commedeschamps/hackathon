import { AITrustLabel } from "./AITrustLabel";
import { AttackResultCard } from "./AttackResultCard";
import { BadgeCard } from "./BadgeCard";
import { BossAvatar } from "./BossAvatar";
import { HPBar } from "./HPBar";
import { RewardSummary } from "./RewardSummary";
import type { ExamBossState } from "@/lib/types";

interface FeedbackScreenProps {
  errorMessage: string | null;
  state: ExamBossState;
  onContinue: () => void;
}

export function FeedbackScreen({ errorMessage, state, onContinue }: FeedbackScreenProps) {
  const feedback = state.lastFeedback;
  const currentBoss = state.topicBosses.find((boss) => boss.id === state.currentMission.topicId);
  const hpPercent = currentBoss ? Math.round((currentBoss.hp / currentBoss.maxHp) * 100) : 0;
  const visualState =
    currentBoss?.status === "active" && hpPercent < 50 ? "weakened" : currentBoss?.status;

  if (!feedback) {
    return null;
  }

  return (
    <section className="mx-auto min-h-screen w-full max-w-5xl px-6 py-10">
      <div className="grid gap-5">
        <AttackResultCard
          nextAction={feedback.nextAction}
          result={feedback.result}
          score={feedback.score}
        />

        <RewardSummary
          badgeUnlocked={feedback.badgeUnlocked}
          bossDamage={feedback.bossDamage}
          xpEarned={feedback.xpEarned}
        />

        <div className="rounded-xl border border-slate-200 bg-white/90 p-6 shadow-soft md:p-8">
          <div className="grid gap-5 md:grid-cols-[1fr_280px]">
            <div>
              <AITrustLabel tone="evaluation">AI feedback</AITrustLabel>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <div className="rounded-lg bg-slate-50 p-5">
                  <p className="text-sm font-black uppercase tracking-[0.08em] text-slate-500">
                    What was good
                  </p>
                  <p className="mt-2 text-base leading-7 text-slate-700">{feedback.whatWasGood}</p>
                </div>
                <div className="rounded-lg bg-slate-50 p-5">
                  <p className="text-sm font-black uppercase tracking-[0.08em] text-slate-500">
                    What was missing
                  </p>
                  <p className="mt-2 text-base leading-7 text-slate-700">
                    {feedback.whatWasMissing}
                  </p>
                </div>
              </div>

              <div className="mt-4 rounded-lg border border-slate-200 p-5">
                <p className="text-sm font-black uppercase tracking-[0.08em] text-slate-500">
                  Short explanation
                </p>
                <p className="mt-2 text-base leading-7 text-slate-700">
                  {feedback.shortExplanation}
                </p>
              </div>
            </div>

            <aside className="rounded-lg border border-rose-100 bg-rose-50/70 p-5">
              {currentBoss ? (
                <>
                  <div className="flex items-center gap-4">
                    <BossAvatar
                      difficulty={currentBoss.difficulty}
                      status={visualState ?? currentBoss.status}
                    />
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.08em] text-rose-700">
                        Boss state
                      </p>
                      <h2 className="mt-1 text-lg font-black text-slate-950">{currentBoss.name}</h2>
                    </div>
                  </div>
                  <div className="mt-5">
                    <HPBar current={currentBoss.hp} max={currentBoss.maxHp} />
                  </div>
                </>
              ) : null}

              <div className="mt-5">
                {feedback.badgeUnlocked ? (
                  <BadgeCard badge={feedback.badgeUnlocked} />
                ) : (
                  <p className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-600">
                    No new badge this round.
                  </p>
                )}
              </div>
            </aside>
          </div>
        </div>

        {state.nextRecommendation ? (
          <div className="rounded-xl border border-sky-100 bg-sky-50/90 p-5 shadow-sm">
            <AITrustLabel>AI next-step recommendation</AITrustLabel>
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
          <p className="rounded-md border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-800">
            {errorMessage}
          </p>
        ) : null}

        <button
          className="w-full rounded-md bg-slate-950 px-5 py-3 text-base font-bold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-slate-700"
          onClick={onContinue}
          type="button"
        >
          Return to Arena
        </button>
      </div>
    </section>
  );
}
