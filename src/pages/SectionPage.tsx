import { useEffect, useRef } from "react";
import { Navigate, useParams } from "react-router-dom";
import { getModule } from "../content";
import { BlockRenderer } from "../components/reader/BlockRenderer";
import { SectionNav } from "../components/reader/SectionNav";
import { isModuleUnlocked, useProgress } from "../hooks/useProgress";

export function SectionPage() {
  const { moduleId, sectionId } = useParams<{
    moduleId: string;
    sectionId: string;
  }>();
  const { state, dispatch } = useProgress();
  const sentinelRef = useRef<HTMLDivElement>(null);
  const markedRef = useRef(false);

  const mod = getModule(moduleId ?? "");
  const section = mod?.sections.find((s) => s.id === sectionId);

  useEffect(() => {
    markedRef.current = false;
  }, [sectionId]);

  useEffect(() => {
    if (!mod || !section) return;

    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !markedRef.current) {
          markedRef.current = true;
          dispatch({
            type: "MARK_SECTION_READ",
            moduleId: mod.id,
            sectionId: section.id,
          });
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [mod, section, dispatch]);

  if (!mod || !section || !isModuleUnlocked(state, mod.id)) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <SectionNav
        moduleId={mod.id}
        currentSectionId={section.id}
        sections={mod.sections}
      />

      <div className="mb-4">
        <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">
          Module {mod.id} · {mod.title}
        </p>
        <h1 className="text-xl font-bold mt-1">{section.title}</h1>
      </div>

      <BlockRenderer blocks={section.blocks} />

      <div ref={sentinelRef} className="h-4 mt-8" />

      <div className="mt-6 pt-4 border-t">
        <SectionNav
          moduleId={mod.id}
          currentSectionId={section.id}
          sections={mod.sections}
        />
      </div>
    </div>
  );
}
