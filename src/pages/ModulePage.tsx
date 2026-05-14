import { CheckCircle2, Circle, Clock } from "lucide-react";
import { Navigate, Link, useParams } from "react-router-dom";
import { getModule } from "../content";
import { ReadingProgress } from "../components/reader/ReadingProgress";
import { Button } from "../components/ui/button";
import { isModuleUnlocked, useProgress } from "../hooks/useProgress";

export function ModulePage() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const { state } = useProgress();
  const mod = getModule(moduleId ?? "");

  if (!mod || !isModuleUnlocked(state, mod.id)) {
    return <Navigate to="/" replace />;
  }

  const modProgress = state.modules[mod.id];
  const sectionsRead = modProgress?.sectionsRead ?? [];
  const readSet = new Set(sectionsRead);
  const allRead = mod.sections.every((s) => readSet.has(s.id));

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium mb-1">
          Module {mod.id}
        </p>
        <h1 className="text-2xl font-bold">{mod.title}</h1>
        <p className="text-sm text-muted-foreground mt-1">{mod.description}</p>
      </div>

      <ReadingProgress sections={mod.sections} sectionsRead={sectionsRead} />

      <div className="space-y-2">
        {mod.sections.map((section) => {
          const done = readSet.has(section.id);
          return (
            <Link
              key={section.id}
              to={`/module/${mod.id}/section/${section.id}`}
              className="flex items-center justify-between p-4 rounded-lg border hover:bg-accent/40 transition-colors group"
            >
              <div className="flex items-center gap-3">
                {done ? (
                  <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />
                ) : (
                  <Circle className="h-4 w-4 text-muted-foreground shrink-0" />
                )}
                <span className="text-sm font-medium group-hover:text-foreground">
                  {section.title}
                </span>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                {section.estimatedMinutes}m
              </div>
            </Link>
          );
        })}
      </div>

      <div className="pt-2">
        {allRead ? (
          <Button asChild className="w-full">
            <Link to={`/module/${mod.id}/quiz`}>Take Quiz</Link>
          </Button>
        ) : (
          <Button disabled className="w-full">
            Complete all sections to unlock quiz
          </Button>
        )}
        {modProgress?.quizCompleted && (
          <p className="text-xs text-center text-green-600 mt-2">
            Quiz passed — best score {modProgress.bestScore}%
          </p>
        )}
      </div>
    </div>
  );
}
