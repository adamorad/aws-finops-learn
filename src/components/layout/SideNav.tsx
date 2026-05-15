import { BookOpen, CreditCard, ExternalLink, Map } from "lucide-react";
import { Link, useMatch } from "react-router-dom";
import { cn } from "../../lib/utils";

const links = [
  { to: "/", label: "Roadmap", icon: Map, exact: true },
  { to: "/module/1", label: "Study", icon: BookOpen, pattern: "/module/*" },
  {
    to: "/flashcards",
    label: "Flashcards",
    icon: CreditCard,
    pattern: "/flashcards",
  },
  {
    to: "/resources",
    label: "Resources",
    icon: ExternalLink,
    pattern: "/resources",
  },
];

export function SideNav() {
  const onModule = useMatch("/module/*");
  const onFlashcards = useMatch("/flashcards");
  const onResources = useMatch("/resources");
  const onRoadmap = useMatch("/");

  const activeMap: Record<string, boolean> = {
    "/": !!onRoadmap,
    "/module/1": !!onModule,
    "/flashcards": !!onFlashcards,
    "/resources": !!onResources,
  };

  return (
    <aside className="hidden md:flex flex-col w-48 shrink-0 border-r pr-4 py-2 gap-1 mr-6">
      {links.map(({ to, label, icon: Icon }) => (
        <Link
          key={to}
          to={to}
          className={cn(
            "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
            activeMap[to]
              ? "bg-accent text-accent-foreground font-medium"
              : "text-muted-foreground hover:text-foreground hover:bg-accent/50",
          )}
        >
          <Icon className="h-4 w-4 shrink-0" />
          {label}
        </Link>
      ))}
    </aside>
  );
}
