import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AlertTriangle, Bell, CheckCircle2, MapPin, Siren, User } from "lucide-react";
import { PageHeader, StatCard, SectionCard, EmptyState } from "@/components/dashboard";
import { alerts, alertPriorityColor, alertStats, type EmergencyAlert } from "@/lib/data/alerts";
import { patients } from "@/lib/data/patients";
import { careWorkers } from "@/lib/data/care-workers";

export const Route = createFileRoute("/dashboard/emergency-alerts")({
  component: EmergencyAlertsPage,
});

type Filter = "All" | EmergencyAlert["status"];
const filters: Filter[] = ["All", "Active", "Acknowledged", "Resolved"];

function EmergencyAlertsPage() {
  const [filter, setFilter] = useState<Filter>("All");

  const enriched = useMemo(
    () => alerts.map((a) => ({
      ...a,
      patientName: patients.find((p) => p.id === a.patientId)?.name ?? "Unknown",
      assignedName: careWorkers.find((w) => w.id === a.assignedTo)?.name ?? "Unassigned",
    })),
    [],
  );

  const filtered = filter === "All" ? enriched : enriched.filter((a) => a.status === filter);
  const sorted = [...filtered].sort((a, b) => {
    const order = { Critical: 0, High: 1, Medium: 2 };
    return order[a.priority] - order[b.priority];
  });

  return (
    <div className="space-y-6">
      <PageHeader title="Emergency Alerts" subtitle="Live escalations across all wards, sorted by priority." />

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard icon={Siren} label="Active Alerts" value={String(alertStats.active)} tone="destructive" />
        <StatCard icon={AlertTriangle} label="Critical Priority" value={String(alertStats.critical)} tone="destructive" />
        <StatCard icon={CheckCircle2} label="Resolved Today" value={String(alertStats.resolvedToday)} tone="secondary" />
      </div>

      <SectionCard>
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                filter === f ? "border-transparent bg-gradient-primary text-white shadow-glow" : "border-border text-muted-foreground hover:bg-accent"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </SectionCard>

      {sorted.length === 0 ? (
        <EmptyState icon={Bell} title="No alerts in this category" description="You're all caught up." />
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {sorted.map((a) => (
            <div key={a.id} className="rounded-2xl border border-border bg-card p-5 shadow-card">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${alertPriorityColor[a.priority]}`}>
                    {a.priority}
                  </span>
                  <span className="text-xs text-muted-foreground">{a.timestamp}</span>
                </div>
                <span className={`rounded-full border px-2 py-0.5 text-[10px] font-medium ${
                  a.status === "Active" ? "border-destructive/30 bg-destructive/10 text-destructive"
                    : a.status === "Acknowledged" ? "border-amber-500/30 bg-amber-500/10 text-amber-600"
                    : "border-emerald-500/30 bg-emerald-500/10 text-emerald-600"
                }`}>
                  {a.status}
                </span>
              </div>

              <h3 className="mt-3 text-base font-semibold">{a.type} — {a.patientName}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{a.description}</p>

              <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {a.ward}</span>
                <span className="flex items-center gap-1"><User className="h-3.5 w-3.5" /> {a.assignedName}</span>
              </div>

              <div className="mt-4 border-t border-border/60 pt-3">
                <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Timeline</div>
                <ul className="mt-2 space-y-1.5">
                  {a.timeline.map((t, i) => (
                    <li key={i} className="flex gap-3 text-xs">
                      <span className="w-12 shrink-0 font-mono text-muted-foreground">{t.time}</span>
                      <span className="text-foreground">{t.event}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
