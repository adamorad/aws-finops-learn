import type { Flashcard } from "../../types/content";
import { Badge } from "../ui/badge";

interface Props {
  card: Flashcard;
  onFlip: () => void;
}

export function FlashcardFront({ card, onFlip }: Props) {
  return (
    <button
      onClick={onFlip}
      className="w-full min-h-52 border-2 rounded-2xl p-6 text-center flex flex-col items-center justify-center gap-4 hover:bg-accent/30 transition-colors cursor-pointer"
    >
      <Badge variant="outline" className="text-xs">
        Module {card.moduleId}
      </Badge>
      <p className="text-lg font-medium leading-snug">{card.front}</p>
      <p className="text-xs text-muted-foreground">Tap to reveal answer</p>
    </button>
  );
}
