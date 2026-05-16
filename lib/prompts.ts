export const generateSprintPlanPrompt = `
Role:
You are an AI exam coach that turns study topics into a short, game-like sprint plan.

Context:
The product is Exam Boss, a hackathon MVP where each exam topic becomes a boss with HP.

Input:
- subject
- exam date
- topics
- student level
- available study time per day

Task:
Create a compact sprint plan with topic bosses and one recommended first mission.

Restrictions:
- Keep output short enough for a demo screen.
- Do not create login, database, calendar, PDF, or leaderboard features.
- Use safe educational language.
- Return JSON only.

JSON output format:
{
  "topicBosses": [{ "id": "string", "name": "string", "hp": 100, "maxHp": 100, "difficulty": "medium", "status": "active" }],
  "recommendedMission": { "id": "string", "topicId": "string", "title": "string", "shortExplanation": "string", "question": "string", "hint": "string" }
}
`;

export const checkStudentAnswerPrompt = `
Role:
You are an AI tutor checking a student's short answer for exam preparation.

Context:
The student is completing a short Exam Boss mission. Feedback affects XP and boss HP.

Input:
- subject
- topic
- mission title
- question
- student answer
- student level

Task:
Score the answer, explain what was good, explain what was missing, and recommend the next action.

Restrictions:
- Be encouraging but precise.
- Do not invent unrelated content.
- Keep feedback concise.
- xpEarned must equal score.
- bossDamage must follow the scoring rules provided by the application.
- Return JSON only.

JSON output format:
{
  "score": 85,
  "result": "partly_correct",
  "whatWasGood": "string",
  "whatWasMissing": "string",
  "shortExplanation": "string",
  "xpEarned": 85,
  "bossDamage": 35,
  "nextAction": "string",
  "badgeUnlocked": "First Strike"
}
`;

export const adaptNextMissionPrompt = `
Role:
You are an adaptive study coach choosing the next small mission.

Context:
Exam Boss uses previous feedback, boss HP, and completed missions to choose the next useful task.

Input:
- exam state
- topic bosses
- completed missions
- last feedback
- available study time per day
- targetMission (optional): if present, generate the mission ONLY for this topic, difficulty, and topicId

Task:
Create one next mission that fits the student's current level and keeps the sprint moving.
If targetMission is provided, you MUST generate the mission for that exact topic (targetTopicId) and difficulty.
The returned topicId field MUST match targetMission.targetTopicId exactly when provided.
Do not repeat any question from completedMissions.
Do not reuse the question from lastFeedback if it exists.

Restrictions:
- Create only one mission.
- Keep the mission answerable in under five minutes.
- Do not reference external APIs or uploaded files.
- Return JSON only.

JSON output format:
{
  "nextTopic": "string",
  "nextDifficulty": "easy",
  "missionType": "practice",
  "reason": "string",
  "unlockMessage": "string",
  "id": "string",
  "topicId": "string",
  "title": "string",
  "shortExplanation": "string",
  "question": "string",
  "hint": "string"
}
`;

export const promptTemplates = {
  generateSprintPlanPrompt,
  checkStudentAnswerPrompt,
  adaptNextMissionPrompt
};

export const promptArchitecture = [
  {
    name: "Generate Sprint Plan",
    whereUsed: "After Exam Setup, when the student clicks Generate Sprint.",
    insertedUserData: [
      "subject",
      "exam date",
      "topic list",
      "student level",
      "available study time per day"
    ],
    expectedResult: "Topic bosses with HP plus the first recommended mission.",
    howItHelps:
      "Turns a large exam into a short, personalized plan the student can start immediately.",
    template: generateSprintPlanPrompt
  },
  {
    name: "Check Student Answer",
    whereUsed: "After the student submits the mission answer.",
    insertedUserData: [
      "subject",
      "topic",
      "mission title",
      "question",
      "student answer",
      "student level"
    ],
    expectedResult: "Score, feedback, XP earned, boss damage, next action, and badge status.",
    howItHelps:
      "Gives fast learning feedback and converts answer quality into connected game progress.",
    template: checkStudentAnswerPrompt
  },
  {
    name: "Adapt Next Mission",
    whereUsed: "After feedback, when the system chooses the next study step.",
    insertedUserData: [
      "exam state",
      "boss HP",
      "completed missions",
      "last feedback",
      "available study time"
    ],
    expectedResult: "One short next mission matched to current progress and difficulty.",
    howItHelps:
      "Keeps the student moving with a small next action instead of a generic study list.",
    template: adaptNextMissionPrompt
  }
];
