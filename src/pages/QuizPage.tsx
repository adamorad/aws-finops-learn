import { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { getModule } from "../content";
import { QuestionCard } from "../components/quiz/QuestionCard";
import { QuizResults } from "../components/quiz/QuizResults";
import { Button } from "../components/ui/button";
import { isModuleUnlocked, useProgress } from "../hooks/useProgress";

export function QuizPage() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const { state, dispatch } = useProgress();
  const mod = getModule(moduleId ?? "");

  const [answers, setAnswers] = useState<(number | null)[]>(() =>
    mod ? new Array(mod.quiz.length).fill(null) : [],
  );
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState<number | null>(null);

  if (!mod || !isModuleUnlocked(state, mod.id)) {
    return <Navigate to="/" replace />;
  }

  function handleSubmit() {
    if (!mod) return;
    const correct = mod.quiz.filter(
      (q, i) => answers[i] === q.correctIndex,
    ).length;
    const pct = Math.round((correct / mod.quiz.length) * 100);
    setScore(pct);
    setSubmitted(true);
    dispatch({ type: "SUBMIT_QUIZ", moduleId: mod.id, score: pct });
  }

  function handleRetake() {
    setAnswers(new Array(mod!.quiz.length).fill(null));
    setSubmitted(false);
    setScore(null);
  }

  const allAnswered = answers.every((a) => a !== null);

  if (submitted && score !== null) {
    return (
      <div className="max-w-2xl mx-auto">
        <QuizResults score={score} moduleId={mod.id} onRetake={handleRetake} />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium mb-1">
          Module {mod.id} Quiz
        </p>
        <h1 className="text-xl font-bold">{mod.title}</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Score {80}% or higher to unlock the next module.
        </p>
      </div>

      {mod.quiz.map((q, i) => (
        <div key={q.id} className="border rounded-xl p-5">
          <QuestionCard
            question={q}
            questionNumber={i + 1}
            total={mod.quiz.length}
            selectedIndex={answers[i]}
            submitted={submitted}
            onSelect={(idx) =>
              setAnswers((prev) => {
                const next = [...prev];
                next[i] = idx;
                return next;
              })
            }
          />
        </div>
      ))}

      {!submitted && (
        <Button
          onClick={handleSubmit}
          disabled={!allAnswered}
          className="w-full"
        >
          {allAnswered
            ? "Submit Quiz"
            : `Answer all ${mod.quiz.length} questions to submit`}
        </Button>
      )}
    </div>
  );
}
