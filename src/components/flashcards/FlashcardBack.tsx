import type { Flashcard } from "../../types/content";
import { Badge } from "../ui/badge";

interface Props {
  card: Flashcard;
}

export function FlashcardBack({ card }: Props) {
  return (
    <div className="w-full min-h-52 border-2 border-primary rounded-2xl p-6 flex flex-col gap-4">
      <p className="text-sm text-muted-foreground">{card.front}</p>
      <div className="flex-1 flex items-center justify-center">
        <p className="text-base leading-relaxed text-center">{card.back}</p>
      </div>
      <div className="flex flex-wrap gap-1 justify-center">
        {card.tags.map((tag) => (
          <Badge key={tag} variant="secondary" className="text-xs">
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  );
}
