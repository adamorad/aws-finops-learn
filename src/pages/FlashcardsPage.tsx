import { allFlashcards } from "../content";
import { FlashcardDeck } from "../components/flashcards/FlashcardDeck";
import { getDueCardIds, useProgress } from "../hooks/useProgress";

export function FlashcardsPage() {
  const { state, dispatch } = useProgress();
  const today = new Date().toISOString().slice(0, 10);
  const dueCount = getDueCardIds(
    state,
    allFlashcards.map((c) => c.id),
  ).length;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Flashcards</h1>
        <p className="text-sm text-muted-foreground mt-1">
          {dueCount > 0
            ? `${dueCount} card${dueCount !== 1 ? "s" : ""} due today`
            : "No cards due"}{" "}
          · {allFlashcards.length} total · {today}
        </p>
      </div>

      <FlashcardDeck
        allCards={allFlashcards}
        state={state}
        dispatch={dispatch}
      />
    </div>
  );
}
