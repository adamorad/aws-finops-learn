import { CreditCard, Map } from "lucide-react";
import { Link, useMatch } from "react-router-dom";
import { cn } from "../../lib/utils";

const links = [
  { to: "/", label: "Roadmap", icon: Map, exact: true },
  { to: "/flashcards", label: "Flashcards", icon: CreditCard, exact: false },
];

export function SideNav() {
  return (
    <aside className="hidden md:flex flex-col w-48 shrink-0 border-r pr-4 py-2 gap-1 mr-6">
      {links.map(({ to, label, icon: Icon, exact }) => (
        <NavItem key={to} to={to} label={label} Icon={Icon} exact={exact} />
      ))}
    </aside>
  );
}

function NavItem({
  to,
  label,
  Icon,
  exact,
}: {
  to: string;
  label: string;
  Icon: React.ElementType;
  exact: boolean;
}) {
  const match = useMatch(exact ? to : `${to}/*`);
  const active = !!match;

  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
        active
          ? "bg-accent text-accent-foreground font-medium"
          : "text-muted-foreground hover:text-foreground hover:bg-accent/50",
      )}
    >
      <Icon className="h-4 w-4 shrink-0" />
      {label}
    </Link>
  );
}
