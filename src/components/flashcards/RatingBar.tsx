import { useEffect } from "react";
import { Button } from "../ui/button";

interface Props {
  onRate: (r: "again" | "good" | "easy") => void;
}

export function RatingBar({ onRate }: Props) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "1") onRate("again");
      else if (e.key === "2") onRate("good");
      else if (e.key === "3") onRate("easy");
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onRate]);

  return (
    <div className="flex gap-3 mt-4">
      <Button
        variant="outline"
        className="flex-1 border-red-300 text-red-700 hover:bg-red-50"
        onClick={() => onRate("again")}
      >
        Again <span className="ml-1 text-xs opacity-60">1</span>
      </Button>
      <Button
        variant="outline"
        className="flex-1 border-yellow-300 text-yellow-700 hover:bg-yellow-50"
        onClick={() => onRate("good")}
      >
        Good <span className="ml-1 text-xs opacity-60">2</span>
      </Button>
      <Button
        variant="outline"
        className="flex-1 border-green-300 text-green-700 hover:bg-green-50"
        onClick={() => onRate("easy")}
      >
        Easy <span className="ml-1 text-xs opacity-60">3</span>
      </Button>
    </div>
  );
}
