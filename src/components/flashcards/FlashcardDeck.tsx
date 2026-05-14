import { useState } from "react";
import { useFlashcardSession } from "../../hooks/useFlashcardSession";
import type { Flashcard } from "../../types/content";
import type { ProgressAction, ProgressState } from "../../types/progress";
import { FlashcardBack } from "./FlashcardBack";
import { FlashcardFront } from "./FlashcardFront";
import { RatingBar } from "./RatingBar";

interface Props {
  allCards: Flashcard[];
  state: ProgressState;
  dispatch: (action: ProgressAction) => void;
}

export function FlashcardDeck({ allCards, state, dispatch }: Props) {
  const [flipped, setFlipped] = useState(false);
  const { currentCard, remaining, totalDue, sessionComplete, rate } =
    useFlashcardSession(allCards, state, dispatch);

  function handleRate(r: "again" | "good" | "easy") {
    setFlipped(false);
    rate(r);
  }

  if (sessionComplete || !currentCard) {
    return (
      <div className="flex flex-col items-center text-center gap-3 py-12">
        <p className="text-2xl">🎉</p>
        <p className="font-semibold">All caught up!</p>
        <p className="text-sm text-muted-foreground">
          {totalDue === 0
            ? "No cards due today. Come back tomorrow."
            : `You reviewed ${totalDue} card${totalDue !== 1 ? "s" : ""} today.`}
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto w-full space-y-4">
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>{remaining} remaining</span>
        <span>{totalDue} due today</span>
      </div>

      {flipped ? (
        <>
          <FlashcardBack card={currentCard} />
          <RatingBar onRate={handleRate} />
        </>
      ) : (
        <FlashcardFront card={currentCard} onFlip={() => setFlipped(true)} />
      )}
    </div>
  );
}
