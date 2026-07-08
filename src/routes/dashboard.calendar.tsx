import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Calendar as CalendarIcon, Clock, MapPin, Video, Home as HomeIcon, User } from "lucide-react";
import { PageHeader, SectionCard } from "@/components/dashboard";
import { Calendar } from "@/components/ui/calendar";
import { appointments } from "@/lib/data/appointments";
import { patients } from "@/lib/data/patients";
import { careWorkers } from "@/lib/data/care-workers";

export const Route = createFileRoute("/dashboard/calendar")({
  component: CalendarPage,
});

const modeIcon = { "In-person": MapPin, Video: Video, "Home Visit": HomeIcon };

function toDateKey(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function CalendarPage() {
  const [selected, setSelected] = useState<Date>(new Date(2026, 6, 8));

  const busyDates = useMemo(() => {
    const set = new Set<string>();
    appointments.forEach((a) => set.add(a.date));
    return set;
  }, []);

  const busyModifier = (day: Date) => busyDates.has(toDateKey(day));

  const dayAppointments = useMemo(() => {
    const key = toDateKey(selected);
    return appointments
      .filter((a) => a.date === key)
      .sort((a, b) => a.time.localeCompare(b.time))
      .map((a) => ({
        ...a,
        patientLabel: patients.find((p) => p.id === a.patientId)?.name ?? "Unknown",
        careWorkerLabel: careWorkers.find((w) => w.id === a.careWorkerId)?.name ?? "Unassigned",
      }));
  }, [selected]);

  return (
    <div className="space-y-6">
      <PageHeader title="Calendar" subtitle="Organisation-wide schedule across all wards and clinics." />

      <div className="grid gap-4 lg:grid-cols-[auto_1fr]">
        <SectionCard className="w-fit">
          <Calendar
            mode="single"
            selected={selected}
            onSelect={(d) => d && setSelected(d)}
            defaultMonth={selected}
            modifiers={{ busy: busyModifier }}
            modifiersClassNames={{ busy: "font-semibold after:absolute after:bottom-1 after:left-1/2 after:h-1 after:w-1 after:-translate-x-1/2 after:rounded-full after:bg-primary" }}
          />
          <div className="mt-2 flex items-center gap-2 px-3 pb-2 text-xs text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" /> Days with scheduled appointments
          </div>
        </SectionCard>

        <SectionCard
          title={selected.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
          subtitle={`${dayAppointments.length} appointment${dayAppointments.length === 1 ? "" : "s"} scheduled`}
        >
          {dayAppointments.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border py-16 text-center text-sm text-muted-foreground">
              <CalendarIcon className="mb-3 h-8 w-8 text-muted-foreground/50" />
              No appointments scheduled for this day.
            </div>
          ) : (
            <ul className="space-y-3">
              {dayAppointments.map((a) => {
                const ModeIcon = modeIcon[a.mode];
                return (
                  <li key={a.id} className="flex items-start gap-4 rounded-xl border border-border bg-muted/30 p-4">
                    <div className="flex w-16 shrink-0 flex-col items-center text-center">
                      <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="mt-1 font-mono text-sm font-semibold">{a.time}</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm font-semibold">{a.patientLabel}</span>
                        <span className="text-xs text-muted-foreground">· {a.type}</span>
                      </div>
                      <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><User className="h-3 w-3" /> {a.careWorkerLabel}</span>
                        <span className="flex items-center gap-1"><ModeIcon className="h-3 w-3" /> {a.room}</span>
                      </div>
                    </div>
                    <span className={`shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-medium ${
                      a.status === "Completed" ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-600"
                        : a.status === "Cancelled" ? "border-border bg-muted text-muted-foreground"
                        : "border-primary/30 bg-primary/10 text-primary"
                    }`}>
                      {a.status}
                    </span>
                  </li>
                );
              })}
            </ul>
          )}
        </SectionCard>
      </div>
    </div>
  );
}
