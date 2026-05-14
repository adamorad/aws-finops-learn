import type { QuizQuestion } from "../../types/content";
import { cn } from "../../lib/utils";

interface Props {
  question: QuizQuestion;
  questionNumber: number;
  total: number;
  selectedIndex: number | null;
  submitted: boolean;
  onSelect: (i: number) => void;
}

export function QuestionCard({
  question,
  questionNumber,
  total,
  selectedIndex,
  submitted,
  onSelect,
}: Props) {
  return (
    <div className="space-y-4">
      <p className="text-xs text-muted-foreground font-medium">
        Question {questionNumber} of {total}
      </p>
      <p className="text-base font-medium leading-snug">{question.text}</p>

      <div className="space-y-2">
        {question.options.map((opt, i) => {
          const isSelected = selectedIndex === i;
          const isCorrect = i === question.correctIndex;
          let cls =
            "border rounded-lg px-4 py-3 text-sm cursor-pointer transition-colors text-left w-full";

          if (submitted) {
            if (isCorrect)
              cls += " bg-green-50 border-green-400 text-green-900";
            else if (isSelected && !isCorrect)
              cls += " bg-red-50 border-red-400 text-red-900";
            else cls += " opacity-50 cursor-default";
          } else {
            cls += isSelected
              ? " bg-primary text-primary-foreground border-primary"
              : " hover:bg-accent hover:border-accent-foreground/20";
          }

          return (
            <button
              key={i}
              className={cn(cls)}
              onClick={() => !submitted && onSelect(i)}
              disabled={submitted}
            >
              <span className="font-medium mr-2">
                {String.fromCharCode(65 + i)}.
              </span>
              {opt}
            </button>
          );
        })}
      </div>

      {submitted && (
        <div className="rounded-lg bg-muted p-3 text-sm text-muted-foreground mt-2">
          <span className="font-medium text-foreground">Explanation: </span>
          {question.explanation}
        </div>
      )}
    </div>
  );
}
