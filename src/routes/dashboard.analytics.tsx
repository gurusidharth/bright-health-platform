import { createFileRoute } from "@tanstack/react-router";
import { BarChart3, HeartPulse, TrendingUp, Users } from "lucide-react";

export const Route = createFileRoute("/dashboard/analytics")({
  component: AnalyticsPage,
});

const outcomes = [
  { label: "Patient satisfaction", value: 94 },
  { label: "Care plan adherence", value: 88 },
  { label: "Medication adherence", value: 96 },
  { label: "Staff utilization", value: 82 },
];

function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Analytics</h1>
        <p className="mt-1 text-sm text-muted-foreground">Organisation-wide performance and predictive insights.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Readmission rate", value: "6.4%", change: "-1.8%", icon: HeartPulse },
          { label: "Avg. length of stay", value: "4.2d", change: "-0.4d", icon: TrendingUp },
          { label: "Predictive alerts / wk", value: "137", change: "+12", icon: BarChart3 },
          { label: "Patients monitored", value: "1,284", change: "+42", icon: Users },
        ].map((k) => (
          <div key={k.label} className="rounded-2xl border border-border bg-card p-5 shadow-card">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{k.label}</span>
              <k.icon className="h-4 w-4 text-primary" />
            </div>
            <div className="mt-2 flex items-baseline justify-between">
              <div className="text-3xl font-bold">{k.value}</div>
              <span className="text-xs font-medium text-primary">{k.change}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
          <h2 className="text-base font-semibold">Quality Outcomes</h2>
          <p className="text-xs text-muted-foreground">Rolling 30-day averages</p>
          <ul className="mt-5 space-y-4">
            {outcomes.map((o) => (
              <li key={o.label}>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{o.label}</span>
                  <span className="font-semibold">{o.value}%</span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
                  <div className="h-full rounded-full bg-gradient-primary" style={{ width: `${o.value}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
          <h2 className="text-base font-semibold">Admissions vs. Discharges</h2>
          <p className="text-xs text-muted-foreground">Last 8 weeks</p>
          <div className="mt-6 flex h-56 items-end gap-2">
            {[[32, 28], [41, 36], [38, 42], [50, 47], [46, 44], [58, 51], [61, 57], [55, 60]].map(([a, d], i) => (
              <div key={i} className="flex flex-1 flex-col items-center gap-1">
                <div className="flex w-full items-end justify-center gap-1">
                  <div className="w-2.5 rounded-t bg-primary" style={{ height: `${a * 2.2}px` }} />
                  <div className="w-2.5 rounded-t bg-secondary" style={{ height: `${d * 2.2}px` }} />
                </div>
                <span className="text-[10px] text-muted-foreground">W{i + 1}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded bg-primary" /> Admissions</span>
            <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded bg-secondary" /> Discharges</span>
          </div>
        </div>
      </div>
    </div>
  );
}