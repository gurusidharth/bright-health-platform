import { createFileRoute } from "@tanstack/react-router";
import { Filter, Plus, Search } from "lucide-react";

export const Route = createFileRoute("/dashboard/patients")({
  component: PatientsPage,
});

const patients = [
  { name: "Margaret O'Neill", age: 82, mrn: "MRN-10241", condition: "Type 2 Diabetes, Hypertension", risk: "Moderate", ward: "3B", last: "2h ago" },
  { name: "James Whitaker", age: 74, mrn: "MRN-10289", condition: "COPD, CHF", risk: "High", ward: "ICU-2", last: "12m ago" },
  { name: "Priya Sharma", age: 39, mrn: "MRN-10312", condition: "Post-op recovery", risk: "Low", ward: "Day", last: "1d ago" },
  { name: "Ethan Walsh", age: 56, mrn: "MRN-10355", condition: "Type 2 Diabetes", risk: "Low", ward: "OP", last: "3h ago" },
  { name: "Sofia Reyes", age: 68, mrn: "MRN-10367", condition: "Dementia, Osteoarthritis", risk: "Moderate", ward: "Res-1", last: "45m ago" },
  { name: "George Adeyemi", age: 71, mrn: "MRN-10402", condition: "Atrial Fibrillation", risk: "Moderate", ward: "3A", last: "5h ago" },
  { name: "Aisha Rahman", age: 34, mrn: "MRN-10418", condition: "Antenatal care", risk: "Low", ward: "MAT", last: "New" },
  { name: "Henry Okafor", age: 89, mrn: "MRN-10433", condition: "Frailty, Recent fall", risk: "High", ward: "Res-2", last: "20m ago" },
];

const riskColor: Record<string, string> = {
  High: "bg-destructive/10 text-destructive border-destructive/30",
  Moderate: "bg-amber-500/10 text-amber-600 border-amber-500/30",
  Low: "bg-primary/10 text-primary border-primary/30",
};

function PatientsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Patients</h1>
          <p className="mt-1 text-sm text-muted-foreground">1,284 active records across all care settings.</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-xl bg-gradient-primary px-4 py-2 text-sm font-medium text-white shadow-glow hover:opacity-95">
          <Plus className="h-4 w-4" /> New Patient
        </button>
      </div>

      <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input placeholder="Search by name, MRN, condition…" className="w-full rounded-xl border border-border bg-background py-2 pl-9 pr-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
          </div>
          <button className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-3 py-2 text-sm text-muted-foreground hover:text-foreground">
            <Filter className="h-4 w-4" /> Filters
          </button>
        </div>

        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[720px] text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
                <th className="py-3 pr-4">Patient</th>
                <th className="py-3 pr-4">MRN</th>
                <th className="py-3 pr-4">Condition</th>
                <th className="py-3 pr-4">Ward</th>
                <th className="py-3 pr-4">Risk</th>
                <th className="py-3 pr-4">Last Update</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((p) => (
                <tr key={p.mrn} className="border-b border-border/60 last:border-0 transition-colors hover:bg-muted/40">
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-3">
                      <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-primary text-xs font-semibold text-white">
                        {p.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                      </div>
                      <div>
                        <div className="font-medium text-foreground">{p.name}</div>
                        <div className="text-xs text-muted-foreground">{p.age} yrs</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 pr-4 font-mono text-xs text-muted-foreground">{p.mrn}</td>
                  <td className="py-3 pr-4 text-muted-foreground">{p.condition}</td>
                  <td className="py-3 pr-4">{p.ward}</td>
                  <td className="py-3 pr-4">
                    <span className={`inline-flex rounded-full border px-2 py-0.5 text-xs font-medium ${riskColor[p.risk]}`}>
                      {p.risk}
                    </span>
                  </td>
                  <td className="py-3 pr-4 text-xs text-muted-foreground">{p.last}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}