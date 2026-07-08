import { createFileRoute } from "@tanstack/react-router";
import { Award, Clock, Mail, Phone, Search, Star, Stethoscope, UserPlus, Users } from "lucide-react";
import { useMemo, useState } from "react";
import { PageHeader, StatCard, SectionCard } from "@/components/dashboard";
import { careWorkers, type CareWorker } from "@/lib/data/care-workers";

export const Route = createFileRoute("/dashboard/care-workers")({
  component: CareWorkersPage,
});

const availabilityColor: Record<CareWorker["availability"], string> = {
  Available: "bg-primary/10 text-primary border-primary/30",
  "On Shift": "bg-emerald-500/10 text-emerald-600 border-emerald-500/30",
  "Off Duty": "bg-muted text-muted-foreground border-border",
};

function CareWorkersPage() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return careWorkers;
    return careWorkers.filter((w) => w.name.toLowerCase().includes(q) || w.role.toLowerCase().includes(q) || w.skills.some((s) => s.toLowerCase().includes(q)));
  }, [query]);

  const onShift = careWorkers.filter((w) => w.availability === "On Shift").length;
  const available = careWorkers.filter((w) => w.availability !== "Off Duty").length;
  const avgRating = (careWorkers.reduce((s, w) => s + w.rating, 0) / careWorkers.length).toFixed(1);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Care Workers"
        subtitle={`${careWorkers.length} staff across your organisation.`}
        action={
          <button className="inline-flex items-center gap-2 rounded-xl bg-gradient-primary px-4 py-2 text-sm font-medium text-white shadow-glow hover:opacity-95">
            <UserPlus className="h-4 w-4" /> Add Care Worker
          </button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Users} label="Total Staff" value={String(careWorkers.length)} />
        <StatCard icon={Clock} label="On Shift Now" value={String(onShift)} tone="secondary" />
        <StatCard icon={Stethoscope} label="Available" value={String(available)} />
        <StatCard icon={Star} label="Avg. Rating" value={avgRating} tone="secondary" />
      </div>

      <SectionCard>
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, role or skill…"
            className="w-full rounded-xl border border-border bg-background py-2 pl-9 pr-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </SectionCard>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((w) => (
          <div key={w.id} className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-elevated">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gradient-primary text-sm font-semibold text-white">
                  {w.avatarInitials}
                </div>
                <div>
                  <div className="text-sm font-semibold">{w.name}</div>
                  <div className="text-xs text-muted-foreground">{w.role}</div>
                </div>
              </div>
              <span className={`inline-flex shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-medium ${availabilityColor[w.availability]}`}>
                {w.availability}
              </span>
            </div>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {w.skills.map((s) => (
                <span key={s} className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-medium text-accent-foreground">{s}</span>
              ))}
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2 border-t border-border pt-4 text-center text-xs">
              <div><div className="font-semibold text-foreground">{w.experienceYears}y</div><div className="text-muted-foreground">Experience</div></div>
              <div><div className="font-semibold text-foreground">{w.patientsAssigned.length}</div><div className="text-muted-foreground">Patients</div></div>
              <div><div className="flex items-center justify-center gap-0.5 font-semibold text-foreground"><Star className="h-3 w-3 fill-amber-400 text-amber-400" /> {w.rating}</div><div className="text-muted-foreground">Rating</div></div>
            </div>

            <div className="mt-4 flex-1 space-y-1.5 text-xs text-muted-foreground">
              <div className="flex items-center gap-2"><Clock className="h-3.5 w-3.5" /> {w.shift} shift · {w.ward}</div>
              <div className="flex items-center gap-2"><Award className="h-3.5 w-3.5" /> Performance {w.performance}%</div>
              <div className="flex items-center gap-2"><Phone className="h-3.5 w-3.5" /> {w.phone}</div>
              <div className="flex items-center gap-2 truncate"><Mail className="h-3.5 w-3.5 shrink-0" /> <span className="truncate">{w.email}</span></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
