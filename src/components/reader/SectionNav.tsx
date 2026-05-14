import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { Section } from "../../types/content";
import { Button } from "../ui/button";

interface Props {
  moduleId: string;
  currentSectionId: string;
  sections: Section[];
}

export function SectionNav({ moduleId, currentSectionId, sections }: Props) {
  const idx = sections.findIndex((s) => s.id === currentSectionId);
  const prev = sections[idx - 1];
  const next = sections[idx + 1];
  const isLast = idx === sections.length - 1;

  return (
    <div className="flex items-center justify-between py-3 border-b mb-6">
      {prev ? (
        <Button variant="ghost" size="sm" asChild>
          <Link to={`/module/${moduleId}/section/${prev.id}`}>
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous
          </Link>
        </Button>
      ) : (
        <Button variant="ghost" size="sm" disabled>
          <ChevronLeft className="h-4 w-4 mr-1" />
          Previous
        </Button>
      )}

      <span className="text-xs text-muted-foreground tabular-nums">
        {idx + 1} / {sections.length}
      </span>

      {isLast ? (
        <Button size="sm" asChild>
          <Link to={`/module/${moduleId}/quiz`}>
            Take Quiz
            <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </Button>
      ) : (
        <Button variant="ghost" size="sm" asChild>
          <Link to={`/module/${moduleId}/section/${next.id}`}>
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </Button>
      )}
    </div>
  );
}
