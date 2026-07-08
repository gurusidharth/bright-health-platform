import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Filter, Grid3x3, List, Plus, Search, Users as UsersIcon } from "lucide-react";
import { PageHeader, StatCard, SectionCard } from "@/components/dashboard";
import { patients, patientStats, riskColor, type RiskLevel, type PatientStatus } from "@/lib/data/patients";
import { careWorkers } from "@/lib/data/care-workers";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/dashboard/patients/")({
  component: PatientsPage,
});

type StatusFilter = "All" | PatientStatus;
type RiskFilter = "All" | RiskLevel;
type AgeFilter = "All" | "Under 40" | "40–64" | "65+";

function matchesAge(age: number, filter: AgeFilter) {
  if (filter === "All") return true;
  if (filter === "Under 40") return age < 40;
  if (filter === "40–64") return age >= 40 && age <= 64;
  return age >= 65;
}

function careWorkerName(id: string) {
  return careWorkers.find((w) => w.id === id)?.name ?? "Unassigned";
}

function PatientsPage() {
  const [view, setView] = useState<"table" | "grid">("table");
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<StatusFilter>("All");
  const [risk, setRisk] = useState<RiskFilter>("All");
  const [age, setAge] = useState<AgeFilter>("All");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return patients.filter((p) => {
      if (q && !p.name.toLowerCase().includes(q) && !p.mrn.toLowerCase().includes(q) && !p.conditions.some((c) => c.toLowerCase().includes(q))) return false;
      if (status !== "All" && p.status !== status) return false;
      if (risk !== "All" && p.risk !== risk) return false;
      if (!matchesAge(p.age, age)) return false;
      return true;
    });
  }, [query, status, risk, age]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Patients"
        subtitle={`${patientStats.total} records — ${patientStats.active} active, ${patientStats.highRisk} high-risk.`}
        action={
          <button className="inline-flex items-center gap-2 rounded-xl bg-gradient-primary px-4 py-2 text-sm font-medium text-white shadow-glow hover:opacity-95">
            <Plus className="h-4 w-4" /> New Patient
          </button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard icon={UsersIcon} label="Total Patients" value={String(patientStats.total)} />
        <StatCard icon={UsersIcon} label="Active" value={String(patientStats.active)} tone="secondary" />
        <StatCard icon={UsersIcon} label="High Risk" value={String(patientStats.highRisk)} tone="destructive" />
      </div>

      <SectionCard>
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative min-w-[220px] flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, MRN, condition…"
              className="w-full rounded-xl border border-border bg-background py-2 pl-9 pr-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <button
            onClick={() => setShowFilters((s) => !s)}
            className={`inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm transition-colors ${
              showFilters ? "border-primary/40 bg-primary/5 text-primary" : "border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            <Filter className="h-4 w-4" /> Filters
          </button>
          <div className="flex items-center gap-1 rounded-xl border border-border p-1">
            <button
              onClick={() => setView("table")}
              className={`grid h-7 w-7 place-items-center rounded-lg transition-colors ${view === "table" ? "bg-gradient-primary text-white" : "text-muted-foreground hover:text-foreground"}`}
              aria-label="Table view"
            >
              <List className="h-4 w-4" />
            </button>
            <button
              onClick={() => setView("grid")}
              className={`grid h-7 w-7 place-items-center rounded-lg transition-colors ${view === "grid" ? "bg-gradient-primary text-white" : "text-muted-foreground hover:text-foreground"}`}
              aria-label="Grid view"
            >
              <Grid3x3 className="h-4 w-4" />
            </button>
          </div>
        </div>

        {showFilters && (
          <div className="mt-4 grid gap-3 border-t border-border pt-4 sm:grid-cols-3">
            <div>
              <label className="text-xs font-medium text-muted-foreground">Status</label>
              <Select value={status} onValueChange={(v) => setStatus(v as StatusFilter)}>
                <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {(["All", "Active", "Monitoring", "Discharged"] as StatusFilter[]).map((s) => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Risk Level</label>
              <Select value={risk} onValueChange={(v) => setRisk(v as RiskFilter)}>
                <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {(["All", "Low", "Moderate", "High"] as RiskFilter[]).map((r) => (
                    <SelectItem key={r} value={r}>{r}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Age</label>
              <Select value={age} onValueChange={(v) => setAge(v as AgeFilter)}>
                <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {(["All", "Under 40", "40–64", "65+"] as AgeFilter[]).map((a) => (
                    <SelectItem key={a} value={a}>{a}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        <div className="mt-5">
          {view === "table" ? (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[820px] text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
                    <th className="py-3 pr-4">Patient</th>
                    <th className="py-3 pr-4">MRN</th>
                    <th className="py-3 pr-4">Condition</th>
                    <th className="py-3 pr-4">Care Worker</th>
                    <th className="py-3 pr-4">Ward</th>
                    <th className="py-3 pr-4">Risk</th>
                    <th className="py-3 pr-4">Last Update</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((p) => (
                    <tr key={p.id} className="border-b border-border/60 last:border-0 transition-colors hover:bg-muted/40">
                      <td className="py-3 pr-4">
                        <Link to="/dashboard/patients/$patientId" params={{ patientId: p.id }} className="flex items-center gap-3">
                          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-primary text-xs font-semibold text-white">
                            {p.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                          </div>
                          <div>
                            <div className="font-medium text-foreground hover:underline">{p.name}</div>
                            <div className="text-xs text-muted-foreground">{p.age} yrs · {p.gender}</div>
                          </div>
                        </Link>
                      </td>
                      <td className="py-3 pr-4 font-mono text-xs text-muted-foreground">{p.mrn}</td>
                      <td className="py-3 pr-4 text-muted-foreground">{p.conditions.join(", ")}</td>
                      <td className="py-3 pr-4 text-muted-foreground">{careWorkerName(p.assignedCareWorkerId)}</td>
                      <td className="py-3 pr-4">{p.ward}</td>
                      <td className="py-3 pr-4">
                        <span className={`inline-flex rounded-full border px-2 py-0.5 text-xs font-medium ${riskColor[p.risk]}`}>{p.risk}</span>
                      </td>
                      <td className="py-3 pr-4 text-xs text-muted-foreground">{p.lastUpdate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filtered.length === 0 && (
                <div className="py-12 text-center text-sm text-muted-foreground">No patients match your filters.</div>
              )}
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((p) => (
                <Link
                  key={p.id}
                  to="/dashboard/patients/$patientId"
                  params={{ patientId: p.id }}
                  className="flex h-full flex-col rounded-2xl border border-border bg-card p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-elevated"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gradient-primary text-sm font-semibold text-white">
                        {p.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                      </div>
                      <div>
                        <div className="text-sm font-semibold">{p.name}</div>
                        <div className="text-xs text-muted-foreground">{p.age} yrs · {p.mrn}</div>
                      </div>
                    </div>
                    <span className={`inline-flex shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-medium ${riskColor[p.risk]}`}>{p.risk}</span>
                  </div>
                  <p className="mt-3 line-clamp-2 flex-1 text-xs text-muted-foreground">{p.conditions.join(", ")}</p>
                  <div className="mt-3 flex items-center justify-between border-t border-border/60 pt-3 text-xs text-muted-foreground">
                    <span>{p.ward}</span>
                    <span>{careWorkerName(p.assignedCareWorkerId)}</span>
                  </div>
                </Link>
              ))}
              {filtered.length === 0 && (
                <div className="col-span-full py-12 text-center text-sm text-muted-foreground">No patients match your filters.</div>
              )}
            </div>
          )}
        </div>
      </SectionCard>
    </div>
  );
}
