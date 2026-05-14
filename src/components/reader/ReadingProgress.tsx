import { CheckCircle2, Circle } from "lucide-react";
import type { Section } from "../../types/content";

interface Props {
  sections: Section[];
  sectionsRead: string[];
}

export function ReadingProgress({ sections, sectionsRead }: Props) {
  const readSet = new Set(sectionsRead);
  const count = sections.filter((s) => readSet.has(s.id)).length;

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-muted-foreground font-medium">
          Sections
        </span>
        <span className="text-xs text-muted-foreground">
          {count} / {sections.length} read
        </span>
      </div>
      <div className="flex gap-1.5 flex-wrap">
        {sections.map((s) => (
          <div
            key={s.id}
            title={s.title}
            className="flex items-center gap-1 text-xs"
          >
            {readSet.has(s.id) ? (
              <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
            ) : (
              <Circle className="h-3.5 w-3.5 text-muted-foreground" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
