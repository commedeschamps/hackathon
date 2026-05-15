import type { ExamBossState } from "./types";

const STORAGE_KEY = "exam-boss-state-v1";

interface StoredExamBossState {
  version: 1;
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
