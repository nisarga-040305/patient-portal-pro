import { Link, useLocation } from "@tanstack/react-router";
import {
  LayoutDashboard,
  CalendarPlus,
  Stethoscope,
  ShieldCheck,
  Receipt,
  FlaskConical,
  UserPlus,
  LogIn,
  Activity,
} from "lucide-react";
import type { ReactNode } from "react";

const nav = [
  { to: "/", label: "Overview", icon: LayoutDashboard },
  { to: "/appointments", label: "Book appointment", icon: CalendarPlus },
  { to: "/doctor", label: "Doctor dashboard", icon: Stethoscope },
  { to: "/admin", label: "Admin dashboard", icon: ShieldCheck },
  { to: "/billing", label: "Billing", icon: Receipt },
  { to: "/lab-reports", label: "Lab reports", icon: FlaskConical },
] as const;

const authNav = [
  { to: "/login", label: "Login", icon: LogIn },
  { to: "/register", label: "Register", icon: UserPlus },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="hidden w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar lg:flex">
        <div className="flex items-center gap-2 px-6 py-5">
          <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-foreground">
            <Activity className="h-5 w-5" />
          </div>
          <div>
            <p className="font-display text-base font-semibold leading-none text-sidebar-foreground">
              Meridian Health
            </p>
            <p className="mt-1 text-xs text-muted-foreground">Hospital management</p>
          </div>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-2">
          <p className="px-3 pb-2 pt-3 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            Workspace
          </p>
          {nav.map((item) => {
            const active = pathname === item.to;
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
                  active
                    ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                    : "text-sidebar-foreground/80 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}

          <p className="px-3 pb-2 pt-5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            Account
          </p>
          {authNav.map((item) => {
            const active = pathname === item.to;
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
                  active
                    ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                    : "text-sidebar-foreground/80 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="m-3 rounded-lg border border-sidebar-border bg-card p-3">
          <p className="text-xs font-medium text-foreground">On-call today</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Dr. Aarav Mehta · Cardiology
          </p>
          <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-success/15 px-2 py-0.5 text-[11px] font-medium text-success">
            <span className="h-1.5 w-1.5 rounded-full bg-success" />
            Available
          </div>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-14 items-center justify-between border-b border-border bg-card/60 px-4 backdrop-blur lg:px-8">
          <div className="lg:hidden flex items-center gap-2">
            <div className="grid h-8 w-8 place-items-center rounded-md bg-primary text-primary-foreground">
              <Activity className="h-4 w-4" />
            </div>
            <span className="font-display font-semibold">Meridian Health</span>
          </div>
          <div className="ml-auto flex items-center gap-3 text-sm">
            <span className="hidden sm:inline text-muted-foreground">Wed, May 13</span>
            <div className="flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5">
              <div className="grid h-6 w-6 place-items-center rounded-full bg-primary/15 text-xs font-medium text-primary">
                AM
              </div>
              <span className="font-medium">Admin</span>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}

export function PageHeader({
  title,
  description,
  actions,
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3 border-b border-border bg-card/40 px-4 py-6 lg:flex-row lg:items-end lg:justify-between lg:px-8">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">{title}</h1>
        {description && (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </div>
  );
}

export function StatCard({
  label,
  value,
  hint,
  icon: Icon,
  tone = "primary",
}: {
  label: string;
  value: string;
  hint?: string;
  icon: React.ComponentType<{ className?: string }>;
  tone?: "primary" | "accent" | "success" | "warning";
}) {
  const toneMap = {
    primary: "bg-primary/10 text-primary",
    accent: "bg-accent/20 text-accent-foreground",
    success: "bg-success/15 text-success",
    warning: "bg-warning/20 text-warning-foreground",
  } as const;

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {label}
          </p>
          <p className="mt-2 font-display text-2xl font-semibold text-foreground">
            {value}
          </p>
          {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
        </div>
        <div className={`grid h-9 w-9 place-items-center rounded-lg ${toneMap[tone]}`}>
          <Icon className="h-4 w-4" />
        </div>
      </div>
    </div>
  );
}

export function StatusPill({
  status,
}: {
  status: string;
}) {
  const map: Record<string, string> = {
    Confirmed: "bg-success/15 text-success",
    Completed: "bg-primary/10 text-primary",
    Pending: "bg-warning/20 text-warning-foreground",
    Cancelled: "bg-destructive/15 text-destructive",
    Paid: "bg-success/15 text-success",
    Unpaid: "bg-warning/20 text-warning-foreground",
    Overdue: "bg-destructive/15 text-destructive",
    Ready: "bg-success/15 text-success",
    Processing: "bg-primary/10 text-primary",
    Normal: "bg-success/15 text-success",
    High: "bg-destructive/15 text-destructive",
    Low: "bg-warning/20 text-warning-foreground",
  };
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${
        map[status] ?? "bg-muted text-muted-foreground"
      }`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
      {status}
    </span>
  );
}
