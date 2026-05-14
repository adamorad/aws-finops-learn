import { STORAGE_KEY, STORAGE_VERSION } from "./constants";
import type { ModuleProgress, ProgressState } from "../types/progress";

export function initialModuleProgress(): ModuleProgress {
  return {
    sectionsRead: [],
    quizScore: null,
    bestScore: null,
    quizCompleted: false,
    attempts: 0,
  };
}

export function initialState(): ProgressState {
  return { version: 1, modules: {}, flashcards: {} };
}

export function readStorage(): ProgressState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return initialState();
    const parsed = JSON.parse(raw) as Partial<ProgressState>;
    if (parsed.version !== STORAGE_VERSION) return initialState();
    return parsed as ProgressState;
  } catch {
    return initialState();
  }
}

export function writeStorage(state: ProgressState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // quota exceeded — silently ignore
  }
}
