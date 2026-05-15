import { BookOpen, CreditCard, ExternalLink, Map } from "lucide-react";
import { Link, useMatch } from "react-router-dom";
import { cn } from "../../lib/utils";

export function BottomNav() {
  const onRoadmap = useMatch("/");
  const onFlashcards = useMatch("/flashcards");
  const onModule = useMatch("/module/*");
  const onResources = useMatch("/resources");

  const tabs = [
    { to: "/", label: "Roadmap", icon: Map, active: !!onRoadmap },
    { to: "/module/1", label: "Study", icon: BookOpen, active: !!onModule },
    {
      to: "/flashcards",
      label: "Cards",
      icon: CreditCard,
      active: !!onFlashcards,
    },
    {
      to: "/resources",
      label: "Resources",
      icon: ExternalLink,
      active: !!onResources,
    },
  ];

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 border-t bg-background md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="flex h-16 items-center justify-around">
        {tabs.map(({ to, label, icon: Icon, active }) => (
          <Link
            key={to}
            to={to}
            className={cn(
              "flex flex-col items-center gap-1 flex-1 py-2 text-xs transition-colors",
              active ? "text-primary font-medium" : "text-muted-foreground",
            )}
          >
            <Icon className="h-5 w-5" />
            {label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
