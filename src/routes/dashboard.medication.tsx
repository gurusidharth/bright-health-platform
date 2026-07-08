import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AlertCircle, CheckCircle2, Pill, RefreshCw, Search, XCircle } from "lucide-react";
import { PageHeader, StatCard, SectionCard } from "@/components/dashboard";
import { medications, medicationStats } from "@/lib/data/medications";
import { patients } from "@/lib/data/patients";

export const Route = createFileRoute("/dashboard/medication")({
  component: MedicationPage,
});

const statusIcon = { Taken: CheckCircle2, Missed: XCircle, PRN: AlertCircle };
const statusColor = { Taken: "text-emerald-600", Missed: "text-destructive", PRN: "text-amber-600" };

function MedicationPage() {
  const [query, setQuery] = useState("");

  const enriched = useMemo(
    () => medications.map((m) => ({ ...m, patientName: patients.find((p) => p.id === m.patientId)?.name ?? "Unknown" })),
    [],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return enriched;
    return enriched.filter((m) => m.name.toLowerCase().includes(q) || m.patientName.toLowerCase().includes(q));
  }, [enriched, query]);

  const upcomingRefills = [...enriched].sort((a, b) => a.remainingDoses - b.remainingDoses).slice(0, 5);

  return (
    <div className="space-y-6">
      <PageHeader title="Medication" subtitle="Digital MAR chart across all active patients." />

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard icon={Pill} label="Active Medications" value={String(medications.length)} />
        <StatCard icon={CheckCircle2} label="Compliance Rate" value={`${medicationStats.complianceRate}%`} tone="secondary" />
        <StatCard icon={RefreshCw} label="Refills Due Soon" value={String(medicationStats.upcomingRefills)} tone="destructive" />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <SectionCard className="lg:col-span-2">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by medication or patient…"
              className="w-full rounded-xl border border-border bg-background py-2 pl-9 pr-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {filtered.map((m) => (
              <div key={m.id} className="rounded-xl border border-border bg-muted/30 p-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-amber-100 text-amber-600">
                      <Pill className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold">{m.name}</div>
                      <div className="text-xs text-muted-foreground">{m.dosage} · {m.frequency}</div>
                    </div>
                  </div>
                  {m.history[0] && (() => {
                    const Icon = statusIcon[m.history[0].status];
                    return <Icon className={`h-4 w-4 shrink-0 ${statusColor[m.history[0].status]}`} />;
                  })()}
                </div>
                <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                  <span>{m.patientName}</span>
                  <span>{m.route}</span>
                </div>
                <div className="mt-2 flex items-center justify-between border-t border-border/60 pt-2 text-xs">
                  <span className="text-muted-foreground">Refill: {m.refillDate}</span>
                  <span className={m.remainingDoses <= 7 ? "font-medium text-destructive" : "text-muted-foreground"}>{m.remainingDoses} doses left</span>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Upcoming Refills" subtitle="Sorted by doses remaining">
          <ul className="space-y-3">
            {upcomingRefills.map((m) => (
              <li key={m.id} className="flex items-center gap-3">
                <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-destructive/10 text-destructive">
                  <RefreshCw className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium">{m.name}</div>
                  <div className="truncate text-xs text-muted-foreground">{m.patientName} · {m.refillDate}</div>
                </div>
                <span className="shrink-0 text-xs font-semibold text-destructive">{m.remainingDoses} left</span>
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>
    </div>
  );
}
