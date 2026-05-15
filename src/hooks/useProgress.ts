import { useEffect, useReducer } from "react";
import { QUIZ_PASS_THRESHOLD, SRS_INITIAL_EASE } from "../lib/constants";
import {
  initialModuleProgress,
  readStorage,
  writeStorage,
} from "../lib/storage";
import { rateCard } from "../lib/srs";
import type { ProgressAction, ProgressState } from "../types/progress";

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

function progressReducer(
  state: ProgressState,
  action: ProgressAction,
): ProgressState {
  switch (action.type) {
    case "HYDRATE":
      return action.state;

    case "MARK_SECTION_READ": {
      const prev = state.modules[action.moduleId] ?? initialModuleProgress();
      const already = prev.sectionsRead.includes(action.sectionId);
      if (already) return state;
      return {
        ...state,
        modules: {
          ...state.modules,
          [action.moduleId]: {
            ...prev,
            sectionsRead: [...prev.sectionsRead, action.sectionId],
          },
        },
      };
    }

    case "SUBMIT_QUIZ": {
      const prev = state.modules[action.moduleId] ?? initialModuleProgress();
      const best = Math.max(prev.bestScore ?? 0, action.score);
      return {
        ...state,
        modules: {
          ...state.modules,
          [action.moduleId]: {
            ...prev,
            quizScore: action.score,
            bestScore: best,
            quizCompleted: best >= QUIZ_PASS_THRESHOLD,
            attempts: prev.attempts + 1,
          },
        },
      };
    }

    case "RATE_CARD": {
      const existing = state.flashcards[action.cardId] ?? {
        ease: SRS_INITIAL_EASE,
        interval: 1,
        dueDate: today(),
        repetitions: 0,
      };
      return {
        ...state,
        flashcards: {
          ...state.flashcards,
          [action.cardId]: rateCard(existing, action.rating, today()),
        },
      };
    }

    default:
      return state;
  }
}

export function isModuleUnlocked(
  state: ProgressState,
  moduleId: string,
): boolean {
  if (moduleId === "1") return true;
  const prevId = String(Number(moduleId) - 1);
  return state.modules[prevId]?.quizCompleted === true;
}

export function getModuleProgressPct(
  state: ProgressState,
  moduleId: string,
  totalSections: number,
): number {
  if (totalSections === 0) return 0;
  const read = state.modules[moduleId]?.sectionsRead.length ?? 0;
  const quizDone = state.modules[moduleId]?.quizCompleted ? 1 : 0;
  return Math.round(((read + quizDone) / (totalSections + 1)) * 100);
}

export function getDueCardIds(
  state: ProgressState,
  allCardIds: string[],
): string[] {
  const t = today();
  return allCardIds.filter((id) => {
    const c = state.flashcards[id];
    if (!c) return true; // never reviewed = due
    return c.dueDate <= t;
  });
}

export function useProgress() {
  const [state, dispatch] = useReducer(progressReducer, undefined, () =>
    readStorage(),
  );

  useEffect(() => {
    writeStorage(state);
  }, [state]);

  useEffect(() => {
    const handler = (e: StorageEvent) => {
      if (e.key !== "aws-finops-progress" || !e.newValue) return;
      try {
        const parsed = JSON.parse(e.newValue) as ProgressState;
        dispatch({ type: "HYDRATE", state: parsed });
      } catch {
        // ignore
      }
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  return { state, dispatch };
}
