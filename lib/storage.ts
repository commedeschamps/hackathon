import type { ExamBossState } from "./types";

const STORAGE_KEY = "exam-boss-state-v1";
const SPRINTS_KEY = "exam-boss-sprints:v1";
const MAX_SPRINTS = 10;

interface StoredExamBossState {
  version: 1;
  state: ExamBossState;
}

export interface SavedSprint {
  id: string;
  subject: string;
  createdAt: string;
  updatedAt: string;
  state: ExamBossState;
}

function canUseStorage(): boolean {
  return typeof window !== "undefined" && "localStorage" in window;
}

export function loadStoredState(): ExamBossState | null {
  if (!canUseStorage()) {
    return null;
  }

  try {
    const rawValue = window.localStorage.getItem(STORAGE_KEY);

    if (!rawValue) {
      return null;
    }

    const parsed = JSON.parse(rawValue) as StoredExamBossState;

    return parsed.version === 1 ? parsed.state : null;
  } catch {
    return null;
  }
}

export function saveStoredState(state: ExamBossState): void {
  if (!canUseStorage()) {
    return;
  }

  const payload: StoredExamBossState = {
    version: 1,
    state
  };

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}

export function clearStoredState(): void {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.removeItem(STORAGE_KEY);
}

// ─── Sprint list ────────────────────────────────────────────────────────────

function loadRawSprints(): SavedSprint[] {
  if (!canUseStorage()) return [];

  try {
    const raw = window.localStorage.getItem(SPRINTS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item): item is SavedSprint =>
        item !== null &&
        typeof item === "object" &&
        typeof (item as SavedSprint).id === "string" &&
        typeof (item as SavedSprint).subject === "string" &&
        typeof (item as SavedSprint).state === "object"
    );
  } catch {
    return [];
  }
}

function persistSprints(sprints: SavedSprint[]): void {
  if (!canUseStorage()) return;
  window.localStorage.setItem(SPRINTS_KEY, JSON.stringify(sprints));
}

export function loadSprints(): SavedSprint[] {
  return loadRawSprints();
}

export function saveSprint(state: ExamBossState): SavedSprint {
  const sprints = loadRawSprints();
  const now = new Date().toISOString();
  const newSprint: SavedSprint = {
    id: `sprint-${Date.now()}`,
    subject: state.exam.subject,
    createdAt: now,
    updatedAt: now,
    state
  };
  const updated = [newSprint, ...sprints].slice(0, MAX_SPRINTS);
  persistSprints(updated);
  return newSprint;
}

export function updateSprint(id: string, state: ExamBossState): void {
  const sprints = loadRawSprints();
  const idx = sprints.findIndex((s) => s.id === id);
  if (idx === -1) return;
  sprints[idx] = { ...sprints[idx], state, updatedAt: new Date().toISOString() };
  persistSprints(sprints);
}

export function deleteSprint(id: string): void {
  const sprints = loadRawSprints().filter((s) => s.id !== id);
  persistSprints(sprints);
}
