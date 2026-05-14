import { modules } from "../content";
import { ModuleCard } from "../components/roadmap/ModuleCard";
import {
  getModuleProgressPct,
  isModuleUnlocked,
  useProgress,
} from "../hooks/useProgress";

export function RoadmapPage() {
  const { state } = useProgress();

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">AWS FinOps Learning Path</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Complete each module in order to unlock the next.
        </p>
      </div>

      <div className="relative">
        <div className="absolute left-6 top-8 bottom-8 w-px bg-border hidden sm:block" />
        <div className="space-y-3">
          {modules.map((mod) => (
            <div key={mod.id} className="relative sm:pl-14">
              <div
                className="hidden sm:flex absolute left-0 top-4 h-8 w-8 items-center justify-center rounded-full border-2 bg-background text-xs font-bold z-10
                border-primary text-primary"
              >
                {mod.id}
              </div>
              <ModuleCard
                moduleId={mod.id}
                title={mod.title}
                subtitle={mod.subtitle}
                icon={mod.icon}
                unlocked={isModuleUnlocked(state, mod.id)}
                progress={getModuleProgressPct(
                  state,
                  mod.id,
                  mod.sections.length,
                )}
                quizCompleted={state.modules[mod.id]?.quizCompleted ?? false}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
