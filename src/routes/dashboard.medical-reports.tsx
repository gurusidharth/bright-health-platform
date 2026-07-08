import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { FileText, Image, Search, Sparkles, Stethoscope, TriangleAlert } from "lucide-react";
import { PageHeader, StatCard, SectionCard } from "@/components/dashboard";
import { reports, type MedicalReport } from "@/lib/data/reports";
import { patients } from "@/lib/data/patients";

export const Route = createFileRoute("/dashboard/medical-reports")({
  component: MedicalReportsPage,
});

const typeIcon: Record<MedicalReport["type"], typeof FileText> = {
  "Discharge Summary": FileText,
  "Lab Result": FileText,
  Imaging: Image,
  "Specialist Letter": Stethoscope,
};

function MedicalReportsPage() {
  const [query, setQuery] = useState("");
  const [activeId, setActiveId] = useState(reports[0].id);

  const enriched = useMemo(
    () => reports.map((r) => ({ ...r, patientName: patients.find((p) => p.id === r.patientId)?.name ?? "Unknown" })),
    [],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return enriched;
    return enriched.filter((r) => r.title.toLowerCase().includes(q) || r.patientName.toLowerCase().includes(q));
  }, [enriched, query]);

  const active = enriched.find((r) => r.id === activeId) ?? enriched[0];
  const ActiveIcon = typeIcon[active.type];

  return (
    <div className="space-y-6">
      <PageHeader title="Medical Reports" subtitle="AI-summarised clinical documents across your caseload." />

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard icon={FileText} label="Total Reports" value={String(reports.length)} />
        <StatCard icon={Sparkles} label="AI Summarised" value={String(reports.length)} tone="secondary" />
        <StatCard icon={TriangleAlert} label="Urgent Findings" value={String(reports.filter((r) => r.recommendations.some((rec) => rec.toLowerCase().includes("urgent"))).length)} tone="destructive" />
      </div>

      <div className="grid gap-4 lg:grid-cols-[360px_1fr]">
        <SectionCard>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search reports…"
              className="w-full rounded-xl border border-border bg-background py-2 pl-9 pr-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <ul className="mt-4 max-h-[560px] space-y-1.5 overflow-y-auto">
            {filtered.map((r) => {
              const Icon = typeIcon[r.type];
              return (
                <li key={r.id}>
                  <button
                    onClick={() => setActiveId(r.id)}
                    className={`flex w-full items-start gap-3 rounded-xl border p-3 text-left transition-colors ${
                      r.id === active.id ? "border-primary/40 bg-primary/5" : "border-border hover:bg-accent"
                    }`}
                  >
                    <Icon className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <div className="min-w-0">
                      <div className="truncate text-sm font-semibold">{r.title}</div>
                      <div className="truncate text-xs text-muted-foreground">{r.patientName} · {r.uploadDate}</div>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </SectionCard>

        <SectionCard>
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                <ActiveIcon className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-base font-semibold">{active.title}</h2>
                <p className="text-xs text-muted-foreground">{active.patientName} · Uploaded by {active.uploadedBy} · {active.uploadDate}</p>
              </div>
            </div>
            <span className="shrink-0 rounded-full border border-border bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">{active.type}</span>
          </div>

          <div className="mt-5 rounded-xl border border-primary/20 bg-primary/5 p-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-primary"><Sparkles className="h-4 w-4" /> AI Summary</div>
            <p className="mt-2 text-sm text-foreground">{active.aiSummary}</p>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border/60 p-4">
              <h3 className="text-sm font-semibold">Important Findings</h3>
              <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
                {active.importantFindings.map((f) => (
                  <li key={f} className="flex gap-2"><span className="text-destructive">•</span> {f}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-border/60 p-4">
              <h3 className="text-sm font-semibold">Recommendations</h3>
              <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
                {active.recommendations.map((r) => (
                  <li key={r} className="flex gap-2"><span className="text-primary">•</span> {r}</li>
                ))}
              </ul>
            </div>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
