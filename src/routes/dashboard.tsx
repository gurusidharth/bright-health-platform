import { createFileRoute, Link, Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Activity, BarChart3, Bell, Calendar, HeartPulse, LayoutDashboard, LogOut,
  Menu, Search, Settings, Stethoscope, Users, X,
} from "lucide-react";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/dashboard")({
  ssr: false,
  component: DashboardLayout,
});

const nav = [
  { to: "/dashboard", label: "Overview", icon: LayoutDashboard, exact: true },
  { to: "/dashboard/patients", label: "Patients", icon: Users },
  { to: "/dashboard/appointments", label: "Appointments", icon: Calendar },
  { to: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/dashboard/settings", label: "Settings", icon: Settings },
] as const;

function DashboardLayout() {
  const { user, ready, logout } = useAuth();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (ready && !user) navigate({ to: "/login" });
  }, [ready, user, navigate]);

  if (!ready || !user) {
    return (
      <div className="grid min-h-screen place-items-center bg-background text-sm text-muted-foreground">
        Loading workspace…
      </div>
    );
  }

  function handleLogout() {
    logout();
    navigate({ to: "/login" });
  }

  return (
    <div className="min-h-screen bg-muted/40">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 transform border-r border-border bg-card p-4 transition-transform lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-primary shadow-glow">
              <HeartPulse className="h-4 w-4 text-white" />
            </span>
            <span className="text-base font-bold tracking-tight">MedixCare</span>
          </Link>
          <button className="lg:hidden" onClick={() => setOpen(false)} aria-label="close">
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="mt-8 space-y-1">
          {nav.map((item) => {
            const active = item.exact ? pathname === item.to : pathname.startsWith(item.to);
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                  active
                    ? "bg-gradient-primary text-white shadow-glow"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="absolute inset-x-4 bottom-4">
          <div className="rounded-xl border border-border bg-muted/50 p-3">
            <div className="flex items-center gap-3">
              <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-primary text-sm font-semibold text-white">
                {user.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-semibold">{user.name}</div>
                <div className="truncate text-xs text-muted-foreground">{user.role}</div>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-background py-2 text-xs font-medium text-muted-foreground transition hover:text-destructive"
            >
              <LogOut className="h-3.5 w-3.5" /> Sign out
            </button>
          </div>
        </div>
      </aside>

      {open && (
        <div className="fixed inset-0 z-30 bg-black/40 lg:hidden" onClick={() => setOpen(false)} />
      )}

      {/* Main */}
      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-border bg-background/80 px-4 py-3 backdrop-blur lg:px-8">
          <button className="lg:hidden" onClick={() => setOpen(true)} aria-label="open menu">
            <Menu className="h-5 w-5" />
          </button>
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              placeholder="Search patients, notes, appointments…"
              className="w-full rounded-xl border border-border bg-card py-2 pl-9 pr-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <button className="relative rounded-lg border border-border bg-card p-2 text-muted-foreground hover:text-foreground" aria-label="notifications">
            <Bell className="h-4 w-4" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-destructive" />
          </button>
          <div className="hidden items-center gap-2 rounded-lg border border-border bg-card px-3 py-1.5 text-xs sm:flex">
            <Activity className="h-3.5 w-3.5 text-primary" />
            <span className="text-muted-foreground">{user.organization}</span>
          </div>
        </header>

        <main className="p-4 lg:p-8">
          <Outlet />
        </main>

        <footer className="border-t border-border bg-background px-4 py-4 text-xs text-muted-foreground lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span>© 2026 MedixCare — Demo workspace</span>
            <span className="flex items-center gap-1"><Stethoscope className="h-3 w-3" /> Clinical Preview Build</span>
          </div>
        </footer>
      </div>
    </div>
  );
}