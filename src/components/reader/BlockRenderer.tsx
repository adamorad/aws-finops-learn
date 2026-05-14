import type { Block } from "../../types/content";
import { cn } from "../../lib/utils";

function inlineMarkdown(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={i}
          className="bg-muted px-1 py-0.5 rounded text-sm font-mono"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
}

const calloutStyles = {
  info: "border-blue-300 bg-blue-50 text-blue-900",
  tip: "border-green-300 bg-green-50 text-green-900",
  warning: "border-yellow-300 bg-yellow-50 text-yellow-900",
  important: "border-red-300 bg-red-50 text-red-900",
};

export function BlockRenderer({ blocks }: { blocks: Block[] }) {
  return (
    <div className="space-y-4">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "heading":
            return block.level === 2 ? (
              <h2
                key={i}
                className="text-xl font-semibold mt-6 mb-2 text-foreground"
              >
                {block.text}
              </h2>
            ) : (
              <h3
                key={i}
                className="text-base font-semibold mt-4 mb-1 text-foreground"
              >
                {block.text}
              </h3>
            );

          case "paragraph":
            return (
              <p key={i} className="text-sm leading-relaxed text-foreground/90">
                {inlineMarkdown(block.text)}
              </p>
            );

          case "callout":
            return (
              <div
                key={i}
                className={cn(
                  "border-l-4 rounded-r-lg p-4",
                  calloutStyles[block.variant],
                )}
              >
                {block.title && (
                  <p className="font-semibold text-sm mb-1">{block.title}</p>
                )}
                <p className="text-sm">{block.text}</p>
              </div>
            );

          case "bullet-list":
            return (
              <ul key={i} className="list-disc list-inside space-y-1">
                {block.items.map((item, j) => (
                  <li key={j} className="text-sm text-foreground/90">
                    {inlineMarkdown(item)}
                  </li>
                ))}
              </ul>
            );

          case "numbered-list":
            return (
              <ol key={i} className="list-decimal list-inside space-y-1">
                {block.items.map((item, j) => (
                  <li key={j} className="text-sm text-foreground/90">
                    {inlineMarkdown(item)}
                  </li>
                ))}
              </ol>
            );

          case "code":
            return (
              <pre
                key={i}
                className="bg-muted rounded-lg p-4 overflow-x-auto text-sm font-mono"
              >
                <code>{block.code}</code>
              </pre>
            );

          case "table":
            return (
              <div key={i} className="overflow-x-auto rounded-lg border">
                <table className="w-full text-sm">
                  <thead className="bg-muted">
                    <tr>
                      {block.headers.map((h, j) => (
                        <th
                          key={j}
                          className="px-3 py-2 text-left font-medium text-foreground"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, j) => (
                      <tr key={j} className={j % 2 === 1 ? "bg-muted/40" : ""}>
                        {row.map((cell, k) => (
                          <td key={k} className="px-3 py-2 text-foreground/90">
                            {inlineMarkdown(cell)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
        }
      })}
    </div>
  );
}
