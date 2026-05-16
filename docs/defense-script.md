# Exam Boss 2-Minute Defense Script

## 0:00-0:20 - Problem and Target User

First- and second-year students often lose motivation when preparing for exams because large topics are hard to divide into small daily tasks. They also do not receive quick feedback, so they find weak areas too late. Our target user is a student preparing for quizzes, midterms, endterms, or final exams with limited daily study time.

## 0:20-0:45 - Solution and Principle of Work

Exam Boss turns exam preparation into a short interactive sprint. The student enters subject, exam date, topics, level, and available time. The system converts topics into bosses with HP and creates one recommended mission. The student answers a mini-question, receives feedback, and sees what to do next.

## 0:45-1:10 - Game Mechanics

The game mechanics are connected to learning progress. Completing a mission triggers AI feedback. The score becomes XP. XP and score determine boss damage. Boss HP reduction updates overall progress. The first completed mission unlocks the First Strike badge. This creates a clear loop: mission, feedback, XP, HP damage, progress, badge, next mission.

## 1:10-1:35 - AI and Prompt Engineering

The prototype uses Gemini API through server-side routes. AI generates the sprint plan, checks answers, and recommends the next step. We have three prompts: Generate Sprint Plan, Check Student Answer, and Adapt Next Mission. Each prompt includes role, context, user input, task, restrictions, and JSON output format.

## 1:35-1:50 - Demonstration

In the demo we load prefilled Probability and Statistics inputs, then Gemini generates the sprint. We start the mission, submit a custom answer, and get live AI feedback. The system converts the score into XP, boss damage, progress, and the First Strike badge.

## 1:50-2:00 - Value and Uniqueness

Exam Boss is useful because it combines a study planner, instant feedback, and game progress in one simple flow. It does not just decorate learning with points. The game mechanics directly show exam readiness and motivate the next study action.
