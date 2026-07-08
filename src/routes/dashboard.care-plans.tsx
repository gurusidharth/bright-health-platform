import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { CheckCircle2, ClipboardList, Circle, Dumbbell, Salad, Search, Sparkles } from "lucide-react";
import { PageHeader, StatCard, SectionCard } from "@/components/dashboard";
import { carePlans } from "@/lib/data/care-plans";
import { patients } from "@/lib/data/patients";

export const Route = createFileRoute("/dashboard/care-plans")({
  component: CarePlansPage,
});

function CarePlansPage() {
  const [query, setQuery] = useState("");
  const [activeId, setActiveId] = useState(carePlans[0].id);

  const enriched = useMemo(
    () => carePlans.map((c) => ({ ...c, patientName: patients.find((p) => p.id === c.patientId)?.name ?? "Unknown" })),
    [],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return enriched;
    return enriched.filter((c) => c.patientName.toLowerCase().includes(q) || c.title.toLowerCase().includes(q));
  }, [enriched, query]);

  const active = enriched.find((c) => c.id === activeId) ?? enriched[0];
  const avgCompletion = Math.round(carePlans.reduce((s, c) => s + c.completionPercentage, 0) / carePlans.length);

  return (
    <div className="space-y-6">
      <PageHeader title="Care Plans" subtitle={`${carePlans.length} active care plans across your caseload.`} />

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard icon={ClipboardList} label="Active Plans" value={String(carePlans.length)} />
        <StatCard icon={CheckCircle2} label="Avg. Completion" value={`${avgCompletion}%`} tone="secondary" />
        <StatCard icon={Sparkles} label="AI Recommendations" value={String(carePlans.reduce((s, c) => s + c.aiRecommendations.length, 0))} />
      </div>

      <div className="grid gap-4 lg:grid-cols-[360px_1fr]">
        <SectionCard>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by patient or plan…"
              className="w-full rounded-xl border border-border bg-background py-2 pl-9 pr-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <ul className="mt-4 max-h-[560px] space-y-1.5 overflow-y-auto">
            {filtered.map((c) => (
              <li key={c.id}>
                <button
                  onClick={() => setActiveId(c.id)}
                  className={`w-full rounded-xl border p-3 text-left transition-colors ${
                    c.id === active.id ? "border-primary/40 bg-primary/5" : "border-border hover:bg-accent"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate text-sm font-semibold">{c.patientName}</span>
                    <span className="shrink-0 text-xs font-medium text-primary">{c.completionPercentage}%</span>
                  </div>
                  <div className="mt-0.5 truncate text-xs text-muted-foreground">{c.title}</div>
                  <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full bg-gradient-primary" style={{ width: `${c.completionPercentage}%` }} />
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard title={active.patientName} subtitle={active.title}>
          <div className="flex items-center gap-3 rounded-xl border border-border bg-muted/30 p-4">
            <div className="text-3xl font-bold text-gradient">{active.completionPercentage}%</div>
            <div className="flex-1">
              <div className="text-sm font-medium">Overall completion</div>
              <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-muted">
                <div className="h-full rounded-full bg-gradient-primary" style={{ width: `${active.completionPercentage}%` }} />
              </div>
            </div>
          </div>

          <div className="mt-5">
            <h3 className="text-sm font-semibold">Daily Tasks</h3>
            <ul className="mt-2 space-y-2">
              {active.dailyTasks.map((t) => (
                <li key={t.task} className="flex items-center gap-3 rounded-lg border border-border/60 px-3 py-2 text-sm">
                  {t.done ? <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" /> : <Circle className="h-4 w-4 shrink-0 text-muted-foreground" />}
                  <span className={t.done ? "text-foreground" : "text-muted-foreground"}>{t.task}</span>
                  <span className="ml-auto font-mono text-xs text-muted-foreground">{t.time}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border/60 p-3">
              <div className="flex items-center gap-2 text-sm font-semibold"><Dumbbell className="h-4 w-4 text-primary" /> Exercise</div>
              <p className="mt-1 text-xs text-muted-foreground">{active.exercise}</p>
            </div>
            <div className="rounded-xl border border-border/60 p-3">
              <div className="flex items-center gap-2 text-sm font-semibold"><Salad className="h-4 w-4 text-secondary" /> Diet</div>
              <p className="mt-1 text-xs text-muted-foreground">{active.diet}</p>
            </div>
          </div>

          <div className="mt-5 rounded-xl border border-primary/20 bg-primary/5 p-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-primary"><Sparkles className="h-4 w-4" /> AI Generated Recommendations</div>
            <ul className="mt-2 space-y-1.5 text-sm text-foreground">
              {active.aiRecommendations.map((r) => (
                <li key={r} className="flex gap-2"><span className="text-primary">•</span> {r}</li>
              ))}
            </ul>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
