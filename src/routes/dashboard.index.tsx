import { createFileRoute } from "@tanstack/react-router";
import {
  Activity, AlertTriangle, ArrowUpRight, Brain, Calendar, HeartPulse,
  Pill, TrendingUp, Users,
} from "lucide-react";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/dashboard/")({
  component: Overview,
});

const kpis = [
  { label: "Active Patients", value: "1,284", change: "+4.2%", icon: Users, tone: "text-primary" },
  { label: "Today's Appointments", value: "42", change: "+6", icon: Calendar, tone: "text-secondary" },
  { label: "Care Plans Generated", value: "318", change: "+12.7%", icon: Brain, tone: "text-primary" },
  { label: "Critical Alerts", value: "3", change: "-2", icon: AlertTriangle, tone: "text-destructive" },
];

const activity = [
  { time: "09:12", who: "Dr. R. Patel", what: "Approved AI care plan for Margaret O'Neill (Fall risk: moderate)" },
  { time: "09:04", who: "Nurse J. Kim", what: "Logged morning medication round — Ward 3B (24/24 complete)" },
  { time: "08:47", who: "System", what: "Predictive alert: Deterioration risk elevated for James Whitaker (BR 24, SpO₂ 92%)" },
  { time: "08:31", who: "Dr. A. Hart", what: "Discharge summary auto-generated for Priya Sharma" },
  { time: "08:15", who: "Care Team", what: "Handover completed — 3 new admissions, 1 transfer" },
];

const upcoming = [
  { time: "10:30", patient: "Ethan Walsh", type: "Follow-up · Diabetes", clinician: "Dr. Hart" },
  { time: "11:00", patient: "Sofia Reyes", type: "Care review", clinician: "Dr. Patel" },
  { time: "11:45", patient: "George Adeyemi", type: "Medication review", clinician: "Nurse Kim" },
  { time: "13:15", patient: "Aisha Rahman", type: "New patient intake", clinician: "Dr. Hart" },
];

export default function Overview() {
  const { user } = useAuth();
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Good morning, {user?.name.split(" ")[1] ?? "there"}.
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Here's what's happening across your organization today.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 text-xs text-muted-foreground">
          <HeartPulse className="h-4 w-4 text-primary" />
          All systems operational · Sync 2s ago
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((k) => (
          <div key={k.label} className="rounded-2xl border border-border bg-card p-5 shadow-card">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{k.label}</span>
              <k.icon className={`h-4 w-4 ${k.tone}`} />
            </div>
            <div className="mt-3 flex items-baseline justify-between">
              <div className="text-3xl font-bold tracking-tight">{k.value}</div>
              <span className="text-xs font-medium text-primary">{k.change}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-5 shadow-card">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold">Patient Admissions</h2>
              <p className="text-xs text-muted-foreground">Last 7 days</p>
            </div>
            <button className="text-xs text-primary hover:underline">Export</button>
          </div>
          <div className="mt-6 flex h-52 items-end gap-3">
            {[42, 51, 38, 62, 47, 58, 69].map((v, i) => (
              <div key={i} className="group flex flex-1 flex-col items-center gap-2">
                <div
                  className="w-full rounded-t-lg bg-gradient-primary transition-all group-hover:opacity-80"
                  style={{ height: `${v * 2.4}px` }}
                />
                <span className="text-[10px] text-muted-foreground">{["Mon","Tue","Wed","Thu","Fri","Sat","Sun"][i]}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3 border-t border-border pt-4 text-center text-xs">
            <div><div className="font-semibold text-foreground">367</div><div className="text-muted-foreground">Total admissions</div></div>
            <div><div className="font-semibold text-foreground">4.2 days</div><div className="text-muted-foreground">Avg. stay</div></div>
            <div><div className="font-semibold text-primary">-11%</div><div className="text-muted-foreground">Readmission rate</div></div>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold">AI Care Insights</h2>
            <Brain className="h-4 w-4 text-primary" />
          </div>
          <ul className="mt-4 space-y-4 text-sm">
            <li className="flex gap-3">
              <TrendingUp className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <div>
                <div className="font-medium">Deterioration risk trending down</div>
                <div className="text-xs text-muted-foreground">Ward 3B improved 18% week-on-week.</div>
              </div>
            </li>
            <li className="flex gap-3">
              <Pill className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
              <div>
                <div className="font-medium">Medication adherence 96.4%</div>
                <div className="text-xs text-muted-foreground">3 patients flagged for follow-up.</div>
              </div>
            </li>
            <li className="flex gap-3">
              <Activity className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <div>
                <div className="font-medium">Suggested rota optimization</div>
                <div className="text-xs text-muted-foreground">Reassigning 2 staff could cut overtime by 14%.</div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-5 shadow-card">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold">Recent Activity</h2>
            <button className="text-xs text-primary hover:underline inline-flex items-center gap-1">
              View all <ArrowUpRight className="h-3 w-3" />
            </button>
          </div>
          <ul className="mt-4 divide-y divide-border">
            {activity.map((a, i) => (
              <li key={i} className="flex gap-4 py-3 text-sm">
                <span className="w-12 shrink-0 font-mono text-xs text-muted-foreground">{a.time}</span>
                <div className="min-w-0">
                  <div className="text-foreground"><span className="font-medium">{a.who}</span> · {a.what}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
          <h2 className="text-base font-semibold">Upcoming Today</h2>
          <ul className="mt-4 space-y-3">
            {upcoming.map((u, i) => (
              <li key={i} className="rounded-xl border border-border bg-muted/30 p-3">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="font-mono">{u.time}</span>
                  <span>{u.clinician}</span>
                </div>
                <div className="mt-1 text-sm font-semibold">{u.patient}</div>
                <div className="text-xs text-muted-foreground">{u.type}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}