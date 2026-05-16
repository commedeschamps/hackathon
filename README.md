# Exam Boss

Exam Boss is a hackathon prototype that helps students prepare for exams by turning large exam topics into boss fights. A student enters exam data, Gemini generates a short mission, the student submits an answer, Gemini returns feedback, and the app converts that structured response into XP, boss damage, progress, and badges.

The prototype is built to demonstrate gamification plus prompt engineering in practice. It uses the Gemini API through server-side Next.js routes, so API keys are never exposed in client components.

## Team Members

Add team member names before submission.

## Selected Problem

First- and second-year students often lose motivation when preparing for exams because large topics feel too big to start, daily study tasks are unclear, and feedback usually arrives too late.

Causes:

- exam topics are broad and abstract
- students do not know what to study today
- progress is hard to measure
- ordinary study plans do not feel rewarding
- students need quick feedback on understanding

Consequences:

- students delay preparation
- revision becomes chaotic
- weak topics are discovered too late
- motivation drops before the exam

## Target Users

Exam Boss is designed for first- and second-year university students preparing for quizzes, midterms, endterms, and final exams.

The user likely has limited daily time, beginner or intermediate subject confidence, and needs a small next step rather than a long study plan.

## Main Solution Idea

Exam Boss converts exam preparation into a short game loop:

1. The student enters subject, exam date, topics, level, and available time.
2. The system creates topic bosses with HP.
3. The system creates a recommended mission.
4. The student answers a mini-question.
5. Gemini checks the answer and gives structured feedback.
6. The system awards XP and reduces boss HP.
7. Overall progress updates.
8. A badge unlocks.
9. The student sees the next action.

## Working User Scenario

Demo path:

```txt
Home -> Exam Setup -> Dashboard -> Mission -> Feedback -> Updated Dashboard
```

Default demo:

- Subject: Probability and Statistics
- Exam date: 2026-05-20
- Topics: Normal Distribution, Confidence Interval, Hypothesis Testing
- Level: Beginner
- Time per day: 20 minutes

The classic demo mission often focuses on:

- Title: Understand z-score basics
- Question: What does a z-score show?
- Hint: Think about distance from the mean and standard deviation.

The feedback score comes from Gemini. The app then applies deterministic game rules: XP equals score, boss damage depends on score, progress updates from HP reduction, and `First Strike` unlocks after the first completed mission.

## Game Mechanics

The mechanics are connected, not decorative:

```txt
Mission completion -> AI feedback -> XP -> boss HP damage -> progress update -> badge unlock -> next mission
```

Mechanics used:

- Missions: small daily study actions
- XP: rewards answer quality
- Boss HP: makes topic progress visible
- Progress bar: shows total exam readiness
- Streak: tracks repeated study sessions
- Badges: marks achievements such as First Strike
- Locked bosses: provide a simple sense of progression

Why this helps:

- Large topics become smaller and less intimidating.
- Feedback becomes immediate.
- Progress is visible after one answer.
- The student understands the next step instead of guessing what to study.

## AI and Prompt Engineering

The MVP uses Gemini through server-side routes. Prompt architecture is implemented in `lib/prompts.ts` and shown in the app. Gemini returns JSON that drives missions, feedback, XP, boss damage, and next-step recommendations.

AI routes:

- `POST /api/generate-plan`
- `POST /api/check-answer`
- `POST /api/adapt-next-mission`

### Prompt 1: Generate Sprint Plan

Where used:
After Exam Setup, when the student clicks `Generate Sprint`.

User data inserted:

- subject
- exam date
- topics
- student level
- available study time per day

Expected AI result:
Topic bosses with HP and one recommended first mission.

How it helps:
Turns a broad exam into a concrete, personalized sprint.

### Prompt 2: Check Student Answer

Where used:
After the student submits a mission answer.

User data inserted:

- subject
- topic
- mission title
- question
- student answer
- student level

Expected AI result:
Score, result, what was good, what was missing, short explanation, XP earned, boss damage, next action, and badge status.

How it helps:
Connects learning feedback directly to game progress.

### Prompt 3: Adapt Next Mission

Where used:
After feedback, when the system chooses the next study step.

User data inserted:

- exam state
- topic bosses and HP
- completed missions
- last feedback
- available study time per day

Expected AI result:
One next mission matched to the student's current level and progress.

How it helps:
Keeps the student moving with a small, realistic next action.

## Project Structure

```txt
app/
  page.tsx
  layout.tsx
  globals.css
components/
  HomeScreen.tsx
  ExamSetup.tsx
  Dashboard.tsx
  BossCard.tsx
  MissionScreen.tsx
  FeedbackScreen.tsx
  ProgressBar.tsx
  BadgeCard.tsx
  DemoBanner.tsx
  JudgeBrief.tsx
  GameLoopPanel.tsx
lib/
  demoData.ts
  mockAi.ts
  gameLogic.ts
  storage.ts
  prompts.ts
  types.ts
docs/
  defense-script.md
```

## How To Launch

Create `.env.local` in the project root:

```bash
GEMINI_API_KEY=your_key_here
```

`.env.local` is ignored by git through `.gitignore`.

Install dependencies:

```bash
npm install
```

Start the dev server:

```bash
npm run dev
```

Open:

```txt
http://localhost:3000
```

Build check:

```bash
npm run build
```

Lint check:

```bash
npm run lint
```

If `GEMINI_API_KEY` is missing or invalid, AI requests return:

```txt
AI request failed. Check API key or internet connection.
```

## How To Demo

1. Open the app.
2. Show the Home screen problem, target user, game loop, and prompt architecture.
3. Click `Load Demo` to open prefilled demo inputs.
4. Click `Generate Sprint` and wait for Gemini to create bosses and a mission.
5. Show topic bosses, XP, streak, progress, badges, and connected game-loop panel.
6. Click `Start Mission`.
7. Submit a custom answer.
8. Show Gemini feedback and structured JSON next-step recommendation.
9. Point out XP, boss damage, progress, and `First Strike`.
10. Click `Continue`.
11. Show the updated dashboard.

## 2-Minute Defense Structure

Use `docs/defense-script.md` for the timed version.

Timing:

- 0:00-0:20 Problem and target user
- 0:20-0:45 Solution and principle of work
- 0:45-1:10 Game mechanics
- 1:10-1:35 Artificial intelligence and prompt engineering
- 1:35-1:50 Demonstration or key scenario
- 1:50-2:00 Value and uniqueness

## Manual Test Checklist

- Home screen loads.
- Start Sprint opens Exam Setup.
- Load Demo opens prefilled Exam Setup.
- Exam Setup accepts data.
- Generate Sprint creates bosses.
- Dashboard shows HP bars and game-loop panel.
- Start Mission opens Mission screen.
- Answer can be submitted.
- Feedback appears.
- XP increases.
- Boss HP decreases.
- Progress updates.
- First Strike badge unlocks.
- Continue returns to updated Dashboard.
- Prompt architecture is visible on Home screen.
- `GEMINI_API_KEY` is present in `.env.local`.
- Generate Sprint calls Gemini and creates non-scripted bosses.
- Submit Answer calls Gemini and feedback changes based on the answer.
- Missing or invalid API key shows the clear AI error message.
- API key is not visible in frontend code or browser output.

## Current Constraints

- No login, database, authentication, leaderboard, upload, calendar integration, payment logic, or admin panel.
- Mock AI remains only as a development fallback module and is not the main flow.
