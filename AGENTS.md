# Exam Boss

## Project Goal

Exam Boss is a demo-ready hackathon MVP for students preparing for exams. It turns exam topics into bosses with HP, uses Gemini to generate missions and feedback, awards XP, reduces boss HP, unlocks badges, and updates progress.

This prototype is adapted for the official second-round task: demonstrate a working solution that combines gamification and AI prompt engineering. Protect the working demo flow and avoid extra product scope.

## Core MVP Flow

Home -> Exam Setup -> Dashboard -> Mission Screen -> Feedback Screen -> Updated Dashboard

Main demo chain:

1. Student enters subject, exam date, topics, level, and available study time.
2. App generates topic bosses.
3. Student starts a mission.
4. Student submits a short answer.
5. Gemini returns structured feedback through a server-side route.
6. XP increases.
7. Boss HP decreases.
8. Overall progress updates.
9. First Strike badge unlocks.
10. Student returns to the updated dashboard.

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- React client state
- localStorage persistence
- Gemini API through server-side Next.js routes

Use `GEMINI_API_KEY` in `.env.local`. Never expose API keys in frontend code.

## Strict Scope

Build only:

- Home screen
- Exam setup screen
- Dashboard
- Boss cards
- Mission screen
- Feedback screen
- Updated dashboard state
- Gemini AI responses with strict JSON parsing
- Prompt templates for judges
- localStorage persistence
- Demo mode
- Judge-facing problem, audience, game-loop, and prompt-architecture explanations
- README and 2-minute defense notes

## Forbidden Features

Do not add unless the user explicitly asks:

- login
- registration
- database
- authentication
- leaderboard
- PDF upload
- Moodle integration
- Google Calendar integration
- admin panel
- complex analytics
- mobile app
- payment logic
- unnecessary backend

## Data Model

The app uses `ExamBossState` from `lib/types.ts`:

```ts
{
  exam: {
    subject: "Probability and Statistics",
    examDate: "2026-05-20",
    level: "beginner",
    timePerDay: 20,
    daysLeft: 5
  },
  game: {
    xp: 0,
    streak: 0,
    progress: 0,
    badges: []
  },
  topicBosses: [
    {
      id: "normal-distribution",
      name: "Normal Distribution",
      hp: 100,
      maxHp: 100,
      difficulty: "medium",
      status: "active"
    },
    {
      id: "confidence-interval",
      name: "Confidence Interval",
      hp: 120,
      maxHp: 120,
      difficulty: "medium",
      status: "locked"
    },
    {
      id: "hypothesis-testing",
      name: "Hypothesis Testing",
      hp: 150,
      maxHp: 150,
      difficulty: "hard",
      status: "locked"
    }
  ],
  currentMission: {
    id: "mission-1",
    topicId: "normal-distribution",
    title: "Understand z-score basics",
    shortExplanation: "A z-score shows how far a value is from the mean in standard deviations.",
    question: "What does a z-score show?",
    hint: "Think about distance from the mean and standard deviation."
  },
  completedMissions: [],
  lastFeedback: null,
  nextRecommendation: null
}
```

## AI Integration

Gemini integration lives in:

- `app/api/generate-plan/route.ts`
- `app/api/check-answer/route.ts`
- `app/api/adapt-next-mission/route.ts`
- `lib/ai/gemini.ts`
- `lib/ai/json.ts`
- `lib/ai/validators.ts`

Use `GEMINI_API_KEY` in `.env.local`. Never expose API keys in client components.

Mock AI remains in `lib/mockAi.ts` only as a development fallback module. It is not the main demo path.

The expected feedback shape is:

```json
{
  "score": 85,
  "result": "partly_correct",
  "whatWasGood": "You correctly explained that a z-score shows distance from the mean.",
  "whatWasMissing": "You should mention that this distance is measured in standard deviations.",
  "shortExplanation": "A z-score tells how many standard deviations a value is above or below the mean.",
  "xpEarned": 85,
  "bossDamage": 35,
  "nextAction": "Try one more z-score practice question.",
  "badgeUnlocked": "First Strike"
}
```

## Game Logic

Game logic lives in `lib/gameLogic.ts`.

Rules:

- `xpEarned = score`
- If `score >= 80`, boss damage is `35`
- If `score >= 50 && score < 80`, boss damage is `20`
- If `score < 50`, boss damage is `10`
- Boss HP is `Math.max(0, oldHp - bossDamage)`
- Progress is based on total HP reduced across all bosses

Progress formula:

```ts
totalMaxHp = sum(maxHp)
totalCurrentHp = sum(hp)
progress = Math.round(((totalMaxHp - totalCurrentHp) / totalMaxHp) * 100)
```

Badges:

- First Strike: after first completed mission
- Boss Breaker: when any boss reaches 0 HP
- High Scorer: when score is at least 90

For the MVP demo, First Strike is enough.

## Prompt Templates

Prompt templates live in `lib/prompts.ts`.

Included templates:

- Generate Sprint Plan
- Check Student Answer
- Adapt Next Mission

These prompts are used by the server-side Gemini routes and are also shown to judges through prompt architecture metadata.

The app also exports prompt architecture metadata from `lib/prompts.ts` so the Home screen can show:

- where each prompt is used
- what user data is inserted
- what AI result is expected
- how the result helps the student

Official prompts:

- Generate Sprint Plan
- Check Student Answer
- Adapt Next Mission

## Official Task Alignment

The prototype must clearly show:

- a concrete problem and target audience
- a working user scenario
- connected game mechanics
- structured AI prompts
- where prompts affect the scenario
- a realistic and testable implementation
- a 2-minute defense path

Do not turn this into a presentation-only project. The live demo path remains the main evidence.

## localStorage

Persistence lives in `lib/storage.ts`.

The app saves:

- exam
- game
- topicBosses
- completedMissions
- badges
- currentMission
- lastFeedback
- nextRecommendation

Storage key:

```txt
exam-boss-state-v1
```

## Demo Script

1. Open the app.
2. Click `Load Demo`.
3. Confirm the Probability and Statistics setup fields are prefilled.
4. Click `Generate Sprint` and wait for Gemini.
5. Show the dashboard with AI-generated bosses and mission.
6. Point out days left, XP, streak, progress, and topic bosses.
7. Click `Start Mission` on the active boss.
8. Submit a custom answer.
9. Show Gemini feedback and next-step recommendation.
10. Point out XP earned, boss damage, and badge unlock.
11. Click `Continue`.
12. Show updated dashboard: XP increased, HP decreased, progress updated, First Strike badge visible.

## Testing Checklist

Verify before demo:

- app starts without errors
- Home screen loads
- Start Sprint works
- Load Demo works
- Exam Setup accepts data
- Generate Sprint creates bosses
- Dashboard shows HP bars
- Start Mission opens mission screen
- answer can be submitted
- feedback appears
- XP increases
- boss HP decreases
- progress updates
- badge unlocks
- user can return to dashboard
- no broken imports
- no console errors that break the app

## After Official Task Release

If requirements change again, adapt only what the task requires:

- rename product angle if needed
- adjust prompt templates
- change mission generation rules
- adjust server-side Gemini routes if real AI requirements change
- update demo data to match the official topic

Do not add forbidden features unless they are explicitly required by the official task.
