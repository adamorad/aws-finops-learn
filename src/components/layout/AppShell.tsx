import { BookOpen } from "lucide-react";
import { Link, Outlet } from "react-router-dom";
import { BottomNav } from "./BottomNav";
import { SideNav } from "./SideNav";

export function AppShell() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
        <div className="flex h-14 items-center px-4 max-w-5xl mx-auto w-full">
          <Link
            to="/"
            className="flex items-center gap-2 font-semibold text-foreground"
          >
            <BookOpen className="h-5 w-5 text-primary" />
            <span>AWS FinOps</span>
          </Link>
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
