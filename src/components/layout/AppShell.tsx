import { BookOpen, Moon, Sun } from "lucide-react";
import { Link, Outlet } from "react-router-dom";
import { useDarkMode } from "../../hooks/useDarkMode";
import { Button } from "../ui/button";
import { BottomNav } from "./BottomNav";
import { SideNav } from "./SideNav";

export function AppShell() {
  const { dark, toggle } = useDarkMode();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
        <div className="flex h-14 items-center justify-between px-4 max-w-5xl mx-auto w-full">
          <Link
            to="/"
            className="flex items-center gap-2 font-semibold text-foreground"
          >
            <BookOpen className="h-5 w-5 text-primary" />
            <span>AWS FinOps</span>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggle}
            aria-label="Toggle dark mode"
          >
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
        </div>
      </header>

      <div className="flex flex-1 max-w-5xl mx-auto w-full">
        <SideNav />
        <main className="flex-1 px-4 py-6 pb-24 md:pb-6 min-w-0">
          <Outlet />
        </main>
      </div>

      <BottomNav />
    </div>
  );
}
