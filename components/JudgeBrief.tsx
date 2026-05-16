import { promptArchitecture } from "@/lib/prompts";

const gameLoopSteps = [
  "Attack completed",
  "AI feedback",
  "XP awarded",
  "Boss HP reduced",
  "Progress updated",
  "Badge unlocked",
  "Next mission selected"
];

export function JudgeBrief() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 pb-12">
      <div className="grid gap-4 lg:grid-cols-3">
        <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-bold uppercase text-slate-500">Problem</p>
          <h2 className="mt-2 text-2xl font-black text-slate-950">Large exam topics feel impossible to start.</h2>
          <p className="mt-3 text-sm leading-6 text-slate-700">
            First- and second-year students often lose motivation because they cannot split exam
            topics into small daily actions and do not receive fast feedback on whether they
            understand the material.
          </p>
        </article>

        <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-bold uppercase text-slate-500">Target User</p>
          <h2 className="mt-2 text-2xl font-black text-slate-950">Students preparing for quizzes and exams.</h2>
          <p className="mt-3 text-sm leading-6 text-slate-700">
            The prototype is designed for students who need a short daily study path, quick
            answer feedback, and visible progress without a complex planner.
          </p>
        </article>

        <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-bold uppercase text-slate-500">How It Works</p>
          <h2 className="mt-2 text-2xl font-black text-slate-950">Exam topics become bosses.</h2>
          <p className="mt-3 text-sm leading-6 text-slate-700">
            The student enters exam data, receives a mission, answers a mini-question, gets AI
            feedback, and sees XP, HP, progress, and badges update immediately.
          </p>
        </article>
      </div>

      <div className="mt-4 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-bold uppercase text-slate-500">Connected Game Logic</p>
            <h2 className="mt-2 text-2xl font-black text-slate-950">Every reward is tied to learning progress.</h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-slate-600">
            Points, HP, progress, missions, streak, and badges are connected in one visible loop.
          </p>
        </div>

        <div className="mt-5 grid gap-2 md:grid-cols-7">
          {gameLoopSteps.map((step, index) => (
            <div className="rounded-lg bg-slate-50 p-3 text-sm font-bold text-slate-800" key={step}>
              <span className="mb-2 block text-xs font-black text-slate-400">0{index + 1}</span>
              {step}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-bold uppercase text-slate-500">AI and Prompt Engineering</p>
            <h2 className="mt-2 text-2xl font-black text-slate-950">Three prompts drive the prototype logic.</h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-slate-600">
            The prototype uses structured prompts and server-side AI routes. AI returns JSON
            that drives missions, feedback, XP, boss damage, and next-step recommendations.
          </p>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {promptArchitecture.map((prompt) => (
            <article className="rounded-lg bg-slate-50 p-4" key={prompt.name}>
              <h3 className="text-base font-black text-slate-950">{prompt.name}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">{prompt.whereUsed}</p>
              <p className="mt-3 text-xs font-bold uppercase text-slate-500">Returns</p>
              <p className="mt-1 text-sm leading-6 text-slate-700">{prompt.expectedResult}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
