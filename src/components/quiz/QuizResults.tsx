import { CheckCircle2, XCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { QUIZ_PASS_THRESHOLD } from "../../lib/constants";
import { MODULE_IDS } from "../../lib/constants";
import { Button } from "../ui/button";

interface Props {
  score: number;
  moduleId: string;
  onRetake: () => void;
}

export function QuizResults({ score, moduleId, onRetake }: Props) {
  const passed = score >= QUIZ_PASS_THRESHOLD;
  const currentIdx = MODULE_IDS.indexOf(
    moduleId as (typeof MODULE_IDS)[number],
  );
  const nextId = MODULE_IDS[currentIdx + 1];

  return (
    <div className="flex flex-col items-center text-center gap-6 py-8">
      {passed ? (
        <CheckCircle2 className="h-16 w-16 text-green-500" />
      ) : (
        <XCircle className="h-16 w-16 text-red-400" />
      )}

      <div>
        <p className="text-4xl font-bold">{score}%</p>
        <p className="text-muted-foreground mt-1">
          {passed ? "You passed!" : `Need ${QUIZ_PASS_THRESHOLD}% to pass`}
        </p>
      </div>

      {passed && nextId && (
        <p className="text-sm text-muted-foreground">
          Module {nextId} is now unlocked.
        </p>
      )}

      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs">
        {passed && nextId ? (
          <Button asChild className="flex-1">
            <Link to={`/module/${nextId}`}>Next Module</Link>
          </Button>
        ) : passed ? (
          <Button asChild className="flex-1">
            <Link to="/flashcards">Review Flashcards</Link>
          </Button>
        ) : null}
        <Button variant="outline" className="flex-1" onClick={onRetake}>
          Retake Quiz
        </Button>
        <Button variant="ghost" className="flex-1" asChild>
          <Link to={`/module/${moduleId}`}>Back to Module</Link>
        </Button>
      </div>
    </div>
  );
}
