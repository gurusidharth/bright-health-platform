import { createFileRoute, Link, Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Activity, BarChart3, Bell, Bot, CalendarCheck, CalendarDays,
  ClipboardList, CreditCard, FileText, FolderOpen, HeartPulse, HelpCircle,
  LayoutDashboard, LogOut, Menu, MessageSquare, Moon, Pill, Search, Settings, Siren,
  Stethoscope, Sun, User, Users, X,
} from "lucide-react";
import { useAuth } from "@/lib/auth";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setMobileSidebarOpen, toggleTheme } from "@/lib/slices/uiSlice";
import { markAllRead } from "@/lib/slices/notificationsSlice";
import { patients } from "@/lib/data/patients";
import {
  CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandShortcut,
} from "@/components/ui/command";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export const Route = createFileRoute("/dashboard")({
  ssr: false,
  component: DashboardLayout,
});

type NavItem = {
  to:
    | "/dashboard"
    | "/dashboard/patients"
    | "/dashboard/care-workers"
    | "/dashboard/appointments"
    | "/dashboard/calendar"
    | "/dashboard/care-plans"
    | "/dashboard/medication"
    | "/dashboard/medical-reports"
    | "/dashboard/emergency-alerts"
    | "/dashboard/ai-assistant"
    | "/dashboard/chat"
    | "/dashboard/analytics"
    | "/dashboard/documents"
    | "/dashboard/billing"
    | "/dashboard/settings";
  label: string;
  icon: typeof LayoutDashboard;
  exact?: boolean;
};

type NavGroup = { label: string; items: NavItem[] };

const navGroups: NavGroup[] = [
  { label: "Overview", items: [{ to: "/dashboard", label: "Dashboard", icon: LayoutDashboard, exact: true }] },
  { label: "Clinical", items: [
    { to: "/dashboard/patients", label: "Patients", icon: Users },
    { to: "/dashboard/care-workers", label: "Care Workers", icon: Stethoscope },
    { to: "/dashboard/appointments", label: "Appointments", icon: CalendarCheck },
    { to: "/dashboard/calendar", label: "Calendar", icon: CalendarDays },
    { to: "/dashboard/care-plans", label: "Care Plans", icon: ClipboardList },
    { to: "/dashboard/medication", label: "Medication", icon: Pill },
    { to: "/dashboard/medical-reports", label: "Medical Reports", icon: FileText },
    { to: "/dashboard/emergency-alerts", label: "Emergency Alerts", icon: Siren },
  ] },
  { label: "AI & Communication", items: [
    { to: "/dashboard/ai-assistant", label: "AI Assistant", icon: Bot },
    { to: "/dashboard/chat", label: "Chat", icon: MessageSquare },
  ] },
  { label: "Insights", items: [
    { to: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
    { to: "/dashboard/documents", label: "Documents", icon: FolderOpen },
  ] },
  { label: "Admin", items: [
    { to: "/dashboard/billing", label: "Billing", icon: CreditCard },
    { to: "/dashboard/settings", label: "Settings", icon: Settings },
  ] },
];

function DashboardLayout() {
  const { user, ready, logout } = useAuth();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const dispatch = useAppDispatch();
  const mobileOpen = useAppSelector((s) => s.ui.mobileSidebarOpen);
  const theme = useAppSelector((s) => s.ui.theme);
  const notifications = useAppSelector((s) => s.notifications.items);
  const conversations = useAppSelector((s) => s.chat.conversations);
  const [searchOpen, setSearchOpen] = useState(false);

  const unreadNotifications = notifications.filter((n) => !n.read).length;
  const unreadMessages = conversations.reduce((sum, c) => sum + c.unreadCount, 0);

  useEffect(() => {
    if (ready && !user) navigate({ to: "/login" });
  }, [ready, user, navigate]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((open) => !open);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

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

  function goToPatients() {
    setSearchOpen(false);
    navigate({ to: "/dashboard/patients" });
  }

  const initials = user.name.split(" ").map((n) => n[0]).slice(0, 2).join("");

  return (
    <div className="min-h-screen bg-muted/40">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col overflow-hidden border-r border-border bg-card p-4 transition-transform duration-200 lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between">
          <Link to="/" className="flex min-w-0 items-center gap-2">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-primary shadow-glow">
              <HeartPulse className="h-4 w-4 text-white" />
            </span>
            <span className="truncate text-base font-bold tracking-tight">MedixCare</span>
          </Link>
          <button className="lg:hidden" onClick={() => dispatch(setMobileSidebarOpen(false))} aria-label="close">
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="mt-6 flex-1 space-y-5 overflow-y-auto">
          {navGroups.map((group) => (
            <div key={group.label}>
              <div className="px-3 pb-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/70">
                {group.label}
              </div>
              <div className="space-y-1">
                {group.items.map((item) => {
                  const active = item.exact ? pathname === item.to : pathname.startsWith(item.to);
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => dispatch(setMobileSidebarOpen(false))}
                      className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                        active
                          ? "bg-gradient-primary text-white shadow-glow"
                          : "text-muted-foreground hover:bg-accent hover:text-foreground"
                      }`}
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="mt-4">
          <div className="rounded-xl border border-border bg-muted/50 p-3">
            <div className="flex items-center gap-3">
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-primary text-sm font-semibold text-white">
                {initials}
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

      {mobileOpen && (
        <div className="fixed inset-0 z-30 bg-black/40 lg:hidden" onClick={() => dispatch(setMobileSidebarOpen(false))} />
      )}

      {/* Main */}
      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-border bg-background/80 px-4 py-3 backdrop-blur lg:px-8">
          <button className="lg:hidden" onClick={() => dispatch(setMobileSidebarOpen(true))} aria-label="open menu">
            <Menu className="h-5 w-5" />
          </button>

          <button
            onClick={() => setSearchOpen(true)}
            className="relative flex max-w-md flex-1 items-center gap-2 rounded-xl border border-border bg-card py-2 pl-3 pr-3 text-sm text-muted-foreground outline-none transition hover:border-primary/40"
          >
            <Search className="h-4 w-4" />
            <span className="flex-1 text-left">Search patients, notes, appointments…</span>
            <kbd className="hidden rounded border border-border bg-muted px-1.5 py-0.5 text-[10px] font-medium sm:inline">⌘K</kbd>
          </button>

          <div className="ml-auto flex items-center gap-1.5">
            <button
              onClick={() => dispatch(toggleTheme())}
              className="rounded-lg border border-border bg-card p-2 text-muted-foreground hover:text-foreground"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            <DropdownMenu onOpenChange={(open) => !open && dispatch(markAllRead())}>
              <DropdownMenuTrigger asChild>
                <button className="relative rounded-lg border border-border bg-card p-2 text-muted-foreground hover:text-foreground" aria-label="notifications">
                  <Bell className="h-4 w-4" />
                  {unreadNotifications > 0 && (
                    <span className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-destructive px-1 text-[10px] font-semibold text-white">
                      {unreadNotifications}
                    </span>
                  )}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {notifications.slice(0, 5).map((n) => (
                  <DropdownMenuItem key={n.id} className="flex flex-col items-start gap-0.5 whitespace-normal py-2">
                    <div className="flex w-full items-center justify-between gap-2">
                      <span className="text-xs font-semibold text-foreground">{n.title}</span>
                      {!n.read && <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />}
                    </div>
                    <span className="text-xs text-muted-foreground">{n.message}</span>
                    <span className="text-[10px] text-muted-foreground/70">{n.timestamp}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="relative rounded-lg border border-border bg-card p-2 text-muted-foreground hover:text-foreground" aria-label="messages">
                  <MessageSquare className="h-4 w-4" />
                  {unreadMessages > 0 && (
                    <span className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-primary px-1 text-[10px] font-semibold text-white">
                      {unreadMessages}
                    </span>
                  )}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel>Messages</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {conversations.slice(0, 5).map((c) => (
                  <DropdownMenuItem key={c.id} className="flex items-start gap-2.5 py-2">
                    <div className="relative grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gradient-primary text-xs font-semibold text-white">
                      {c.avatarInitials}
                      {c.online && <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full border border-card bg-emerald-500" />}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="truncate text-xs font-semibold text-foreground">{c.name}</span>
                        <span className="shrink-0 text-[10px] text-muted-foreground">{c.lastMessageAt}</span>
                      </div>
                      <span className="line-clamp-1 text-xs text-muted-foreground">{c.lastMessage}</span>
                    </div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Popover>
              <PopoverTrigger asChild>
                <button className="hidden rounded-lg border border-border bg-card p-2 text-muted-foreground hover:text-foreground sm:block" aria-label="help">
                  <HelpCircle className="h-4 w-4" />
                </button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-72 text-sm">
                <div className="font-semibold text-foreground">Need a hand?</div>
                <p className="mt-1 text-xs text-muted-foreground">Quick shortcuts and support links for MedixCare.</p>
                <div className="mt-3 flex items-center justify-between rounded-lg border border-border px-3 py-2 text-xs">
                  <span className="text-muted-foreground">Global search</span>
                  <CommandShortcut className="ml-0">⌘K</CommandShortcut>
                </div>
                <a href="mailto:support@medixcare.ai" className="mt-3 block rounded-lg border border-border px-3 py-2 text-center text-xs font-medium text-primary hover:bg-accent">
                  Contact support
                </a>
              </PopoverContent>
            </Popover>

            <div className="hidden items-center gap-2 rounded-lg border border-border bg-card px-3 py-1.5 text-xs xl:flex">
              <Activity className="h-3.5 w-3.5 text-primary" />
              <span className="text-muted-foreground">{user.organization}</span>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="grid h-9 w-9 place-items-center rounded-full bg-gradient-primary text-xs font-semibold text-white shadow-glow" aria-label="profile menu">
                  {initials}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="text-sm font-semibold text-foreground">{user.name}</div>
                  <div className="text-xs font-normal text-muted-foreground">{user.role}</div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/dashboard/profile" className="flex items-center gap-2">
                    <User className="h-4 w-4" /> Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/dashboard/settings" className="flex items-center gap-2">
                    <Settings className="h-4 w-4" /> Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="flex items-center gap-2 text-destructive focus:text-destructive">
                  <LogOut className="h-4 w-4" /> Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <main className="p-4 lg:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>

        <footer className="border-t border-border bg-background px-4 py-4 text-xs text-muted-foreground lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span>© 2026 MedixCare — Demo workspace</span>
            <span className="flex items-center gap-1"><Stethoscope className="h-3 w-3" /> Clinical Preview Build</span>
          </div>
        </footer>
      </div>

      <CommandDialog open={searchOpen} onOpenChange={setSearchOpen}>
        <CommandInput placeholder="Search patients, appointments, pages…" />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Pages">
            {navGroups.flatMap((g) => g.items).map((item) => (
              <CommandItem key={item.to} onSelect={() => { setSearchOpen(false); navigate({ to: item.to }); }}>
                <item.icon className="h-4 w-4" /> {item.label}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading="Patients">
            {patients.map((p) => (
              <CommandItem key={p.id} value={p.name} onSelect={goToPatients}>
                <Users className="h-4 w-4" /> {p.name}
                <CommandShortcut>{p.mrn}</CommandShortcut>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  );
}
