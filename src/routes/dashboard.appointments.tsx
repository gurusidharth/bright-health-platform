import { createFileRoute } from "@tanstack/react-router";
import { Calendar, Clock, MapPin, Video } from "lucide-react";

export const Route = createFileRoute("/dashboard/appointments")({
  component: AppointmentsPage,
});

const days = [
  {
    date: "Wednesday, July 8",
    items: [
      { time: "10:30", patient: "Ethan Walsh", type: "Follow-up · Diabetes", mode: "In-person", room: "Consult 4", clinician: "Dr. Hart" },
      { time: "11:00", patient: "Sofia Reyes", type: "Care review", mode: "Video", room: "Telehealth", clinician: "Dr. Patel" },
      { time: "11:45", patient: "George Adeyemi", type: "Medication review", mode: "In-person", room: "Consult 2", clinician: "Nurse Kim" },
      { time: "13:15", patient: "Aisha Rahman", type: "New patient intake", mode: "In-person", room: "Consult 1", clinician: "Dr. Hart" },
      { time: "15:00", patient: "Henry Okafor", type: "Home visit", mode: "Home", room: "Res-2", clinician: "Care Team A" },
    ],
  },
  {
    date: "Thursday, July 9",
    items: [
      { time: "09:00", patient: "Margaret O'Neill", type: "Fall risk assessment", mode: "In-person", room: "Consult 3", clinician: "Dr. Hart" },
      { time: "10:15", patient: "James Whitaker", type: "COPD review", mode: "Video", room: "Telehealth", clinician: "Dr. Patel" },
      { time: "14:30", patient: "Priya Sharma", type: "Post-op follow-up", mode: "In-person", room: "Consult 4", clinician: "Dr. Hart" },
    ],
  },
];

const modeIcon: Record<string, typeof Video> = { Video, "In-person": MapPin, Home: MapPin };

function AppointmentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Appointments</h1>
        <p className="mt-1 text-sm text-muted-foreground">Upcoming schedule across your care team.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Today", value: "8", icon: Calendar },
          { label: "This Week", value: "42", icon: Clock },
          { label: "Telehealth", value: "14", icon: Video },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border border-border bg-card p-5 shadow-card">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{s.label}</span>
              <s.icon className="h-4 w-4 text-primary" />
            </div>
            <div className="mt-2 text-3xl font-bold">{s.value}</div>
          </div>
        ))}
      </div>

      <div className="space-y-6">
        {days.map((d) => (
          <div key={d.date} className="rounded-2xl border border-border bg-card p-5 shadow-card">
            <h2 className="text-base font-semibold">{d.date}</h2>
            <ul className="mt-4 divide-y divide-border">
              {d.items.map((a, i) => {
                const Icon = modeIcon[a.mode] ?? MapPin;
                return (
                  <li key={i} className="flex flex-wrap items-center gap-4 py-3">
                    <div className="w-16 shrink-0 font-mono text-sm text-muted-foreground">{a.time}</div>
                    <div className="min-w-0 flex-1">
                      <div className="font-medium text-foreground">{a.patient}</div>
                      <div className="text-xs text-muted-foreground">{a.type} · {a.clinician}</div>
                    </div>
                    <div className="flex items-center gap-2 rounded-full border border-border bg-muted/40 px-3 py-1 text-xs text-muted-foreground">
                      <Icon className="h-3.5 w-3.5" /> {a.mode} · {a.room}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}