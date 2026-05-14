import { useCallback, useMemo, useRef, useState } from "react";
import { getDueCardIds } from "./useProgress";
import type { Flashcard } from "../types/content";
import type { ProgressAction, ProgressState } from "../types/progress";

type Dispatch = (action: ProgressAction) => void;

export function useFlashcardSession(
  allCards: Flashcard[],
  state: ProgressState,
  dispatch: Dispatch,
) {
  const allCardIds = useMemo(() => allCards.map((c) => c.id), [allCards]);
  const dueIds = useMemo(
    () => getDueCardIds(state, allCardIds),
    [state, allCardIds],
  );

  const [queue, setQueue] = useState<string[]>(() => [...dueIds]);
  const [index, setIndex] = useState(0);
  const retriedRef = useRef<Set<string>>(new Set());

  const totalDue = dueIds.length;
  const currentId = queue[index] ?? null;
  const currentCard = currentId
    ? (allCards.find((c) => c.id === currentId) ?? null)
    : null;
  const sessionComplete = index >= queue.length;

  const rate = useCallback(
    (rating: "again" | "good" | "easy") => {
      if (!currentId) return;
      dispatch({ type: "RATE_CARD", cardId: currentId, rating });
      if (rating === "again" && !retriedRef.current.has(currentId)) {
        retriedRef.current.add(currentId);
        setQueue((q) => [...q, currentId]);
      }
      setIndex((i) => i + 1);
    },
    [currentId, dispatch],
  );

  const skip = useCallback(() => {
    setIndex((i) => i + 1);
  }, []);

  return {
    currentCard,
    remaining: queue.length - index,
    totalDue,
    sessionComplete,
    rate,
    skip,
  };
}
