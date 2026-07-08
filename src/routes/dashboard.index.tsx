import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, Line, LineChart, XAxis,
} from "recharts";
import {
  AlertTriangle, ArrowRight, ArrowUpRight, Bell, Brain, Calendar,
  CheckCircle2, FileText, HeartPulse, Pill,
  Sparkles, Stethoscope, TrendingDown, TrendingUp, UserPlus, Users,
} from "lucide-react";
import { useAuth } from "@/lib/auth";
import { useAppSelector } from "@/lib/hooks";
import { PageHeader, StatCard, SectionCard, ChartCard } from "@/components/dashboard";
import { patients, patientStats, riskColor } from "@/lib/data/patients";
import { careWorkers } from "@/lib/data/care-workers";
import { appointments, appointmentStats, type Appointment } from "@/lib/data/appointments";
import { medications, medicationStats } from "@/lib/data/medications";
import { reports } from "@/lib/data/reports";
import { alerts, alertPriorityColor } from "@/lib/data/alerts";
import { documents } from "@/lib/data/documents";
import {
  patientGrowth, monthlyVisits, medicationComplianceTrend, recoveryProgress,
  appointmentTrends, emergencyCasesTrend,
} from "@/lib/data/analytics";
import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

export const Route = createFileRoute("/dashboard/")({
  component: Overview,
});

const TODAY = "2026-07-08";
const TOMORROW = "2026-07-09";

function patientName(id: string) {
  return patients.find((p) => p.id === id)?.name ?? "Unknown patient";
}
function careWorkerName(id: string) {
  return careWorkers.find((w) => w.id === id)?.name ?? "Unassigned";
}

function agendaEntry(a: Appointment) {
  return { ...a, patientLabel: patientName(a.patientId), careWorkerLabel: careWorkerName(a.careWorkerId) };
}

const todaysAgenda = appointments.filter((a) => a.date === TODAY).sort((a, b) => a.time.localeCompare(b.time)).map(agendaEntry);
const tomorrowsAgenda = appointments.filter((a) => a.date === TOMORROW).sort((a, b) => a.time.localeCompare(b.time)).map(agendaEntry);

const highRiskPatients = patients.filter((p) => p.risk === "High");
const highRiskPct = Math.round((highRiskPatients.length / patients.length) * 100);
const onShiftWorkers = careWorkers.filter((w) => w.availability === "On Shift");
const availableWorkers = careWorkers.filter((w) => w.availability !== "Off Duty");
const activeCriticalAlerts = alerts.filter((a) => a.priority === "Critical" && a.status !== "Resolved");
const activeAlerts = alerts.filter((a) => a.status !== "Resolved");
const dueMedications = medications.slice(0, 5);
const recentDocuments = [...documents].sort((a, b) => b.uploadedDate.localeCompare(a.uploadedDate)).slice(0, 5);

const activityFeed = [
  { time: "09:12", who: "Dr. Amelia Hart", what: `Approved AI care plan for ${patientName("p1")} (fall risk: moderate)`, icon: CheckCircle2, tone: "text-primary" },
  { time: "09:04", who: "Sarah Taylor", what: "Logged morning medication round — Ward 3B (24/24 complete)", icon: Pill, tone: "text-secondary" },
  { time: "08:47", who: "System", what: `Predictive alert: deterioration risk elevated for ${patientName("p2")}`, icon: AlertTriangle, tone: "text-destructive" },
  { time: "08:31", who: "Dr. Amelia Hart", what: `Discharge summary auto-generated for ${patientName("p3")}`, icon: FileText, tone: "text-primary" },
  { time: "08:15", who: "Care Team", what: "Shift handover completed — 3 new admissions, 1 transfer", icon: Users, tone: "text-muted-foreground" },
];

const aiInsights = [
  { icon: TrendingDown, tone: "text-primary", title: "Emergency cases trending down", desc: "6 cases this month vs. 8 last month — down 25%." },
  { icon: Pill, tone: "text-secondary", title: `Medication adherence ${medicationStats.complianceRate}%`, desc: `${dueMedications.length} doses due for review across active patients.` },
  { icon: AlertTriangle, tone: "text-destructive", title: `${highRiskPatients.length} patients flagged high-risk`, desc: `${highRiskPct}% of caseload — prioritise ${patientName(highRiskPatients[0]?.id ?? "p2")} for review.` },
  { icon: Sparkles, tone: "text-primary", title: "Care plan generation up 12.7%", desc: "AI-assisted drafting is reducing clinician admin time this week." },
];

const quickActions = [
  { label: "Add Patient", icon: UserPlus, to: "/dashboard/patients" as const },
  { label: "Schedule Appointment", icon: Calendar, to: "/dashboard/appointments" as const },
  { label: "View Analytics", icon: TrendingUp, to: "/dashboard/analytics" as const },
  { label: "Settings", icon: Sparkles, to: "/dashboard/settings" as const },
];

const patientGrowthConfig = { patients: { label: "Patients", color: "var(--primary)" } };
const monthlyVisitsConfig = { visits: { label: "Visits", color: "var(--secondary)" } };
const medicationComplianceConfig = { compliance: { label: "Compliance %", color: "var(--primary)" } };
const recoveryProgressConfig = { recovery: { label: "Recovery %", color: "var(--chart-2)" } };
const appointmentTrendsConfig = { scheduled: { label: "Scheduled", color: "var(--muted-foreground)" }, completed: { label: "Completed", color: "var(--primary)" } };
const emergencyCasesConfig = { cases: { label: "Cases", color: "var(--destructive)" } };

export default function Overview() {
  const { user } = useAuth();
  const notifications = useAppSelector((s) => s.notifications.items);
  const conversations = useAppSelector((s) => s.chat.conversations);

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Good morning, ${user?.name.split(" ")[1] ?? "there"}.`}
        subtitle="Here's what's happening across your organization today."
        action={
          <div className="flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 text-xs text-muted-foreground">
            <HeartPulse className="h-4 w-4 text-primary" />
            All systems operational · Sync 2s ago
          </div>
        }
      />

      <SectionCard>
        <div className="flex flex-wrap items-center gap-3">
          <span className="mr-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Quick actions</span>
          {quickActions.map((a) => (
            <Link
              key={a.label}
              to={a.to}
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-3 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:bg-accent"
            >
              <a.icon className="h-4 w-4 text-primary" /> {a.label}
            </Link>
          ))}
        </div>
      </SectionCard>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={Users} label="Patients" value="1,284" trend="+4.2%" />
        <StatCard icon={Calendar} label="Appointments Today" value={String(appointmentStats.today)} trend={`${appointmentStats.upcoming} upcoming`} tone="secondary" />
        <StatCard icon={TrendingUp} label="Recovery Rate" value={`${recoveryProgress[recoveryProgress.length - 1].recovery}%`} trend="+3pts" />
        <StatCard icon={AlertTriangle} label="Risk Score" value={`${highRiskPct}%`} trend={`${highRiskPatients.length} high-risk`} tone="destructive" />
        <StatCard icon={Pill} label="Medication Compliance" value={`${medicationStats.complianceRate}%`} trend="+2pts" tone="secondary" />
        <StatCard icon={Stethoscope} label="Available Care Workers" value={`${availableWorkers.length}/${careWorkers.length}`} trend={`${onShiftWorkers.length} on shift`} />
        <StatCard icon={FileText} label="Pending Reports" value={String(reports.length)} trend="This week" tone="secondary" />
        <StatCard icon={Bell} label="Critical Alerts" value={String(activeCriticalAlerts.length)} trend={`${activeAlerts.length} active total`} tone="destructive" />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <ChartCard title="Patient Growth" subtitle="Last 6 months" config={patientGrowthConfig} height="h-56">
          <AreaChart data={patientGrowth} margin={{ left: -20, right: 8, top: 8 }}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey="month" tickLine={false} axisLine={false} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Area type="monotone" dataKey="patients" stroke="var(--color-patients)" fill="var(--color-patients)" fillOpacity={0.15} strokeWidth={2} />
          </AreaChart>
        </ChartCard>

        <ChartCard title="Monthly Visits" subtitle="Last 6 months" config={monthlyVisitsConfig} height="h-56">
          <BarChart data={monthlyVisits} margin={{ left: -20, right: 8, top: 8 }}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey="month" tickLine={false} axisLine={false} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="visits" fill="var(--color-visits)" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ChartCard>

        <ChartCard title="Medication Compliance" subtitle="Weekly trend" config={medicationComplianceConfig} height="h-56">
          <LineChart data={medicationComplianceTrend} margin={{ left: -20, right: 8, top: 8 }}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey="week" tickLine={false} axisLine={false} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line type="monotone" dataKey="compliance" stroke="var(--color-compliance)" strokeWidth={2} dot={false} />
          </LineChart>
        </ChartCard>

        <ChartCard title="Recovery Progress" subtitle="Cohort average" config={recoveryProgressConfig} height="h-56">
          <AreaChart data={recoveryProgress} margin={{ left: -20, right: 8, top: 8 }}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey="month" tickLine={false} axisLine={false} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Area type="monotone" dataKey="recovery" stroke="var(--color-recovery)" fill="var(--color-recovery)" fillOpacity={0.15} strokeWidth={2} />
          </AreaChart>
        </ChartCard>

        <ChartCard title="Appointment Trends" subtitle="This week" config={appointmentTrendsConfig} height="h-56">
          <BarChart data={appointmentTrends} margin={{ left: -20, right: 8, top: 8 }}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey="day" tickLine={false} axisLine={false} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="scheduled" fill="var(--color-scheduled)" radius={[6, 6, 0, 0]} />
            <Bar dataKey="completed" fill="var(--color-completed)" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ChartCard>

        <ChartCard title="Emergency Cases" subtitle="Last 6 months" config={emergencyCasesConfig} height="h-56">
          <LineChart data={emergencyCasesTrend} margin={{ left: -20, right: 8, top: 8 }}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey="month" tickLine={false} axisLine={false} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line type="monotone" dataKey="cases" stroke="var(--color-cases)" strokeWidth={2} dot={false} />
          </LineChart>
        </ChartCard>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <SectionCard title="Today & Upcoming" subtitle="Appointments across the next two days" className="lg:col-span-2">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Today</div>
              <ul className="mt-2 space-y-2">
                {todaysAgenda.slice(0, 4).map((a) => (
                  <li key={a.id} className="rounded-xl border border-border bg-muted/30 p-3">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span className="font-mono">{a.time}</span>
                      <span>{a.careWorkerLabel}</span>
                    </div>
                    <div className="mt-1 text-sm font-semibold">{a.patientLabel}</div>
                    <div className="text-xs text-muted-foreground">{a.type}</div>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Tomorrow</div>
              <ul className="mt-2 space-y-2">
                {tomorrowsAgenda.slice(0, 4).map((a) => (
                  <li key={a.id} className="rounded-xl border border-border bg-muted/30 p-3">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span className="font-mono">{a.time}</span>
                      <span>{a.careWorkerLabel}</span>
                    </div>
                    <div className="mt-1 text-sm font-semibold">{a.patientLabel}</div>
                    <div className="text-xs text-muted-foreground">{a.type}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <Link to="/dashboard/appointments" className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline">
            View full schedule <ArrowRight className="h-3 w-3" />
          </Link>
        </SectionCard>

        <SectionCard title="AI Care Insights" action={<Brain className="h-4 w-4 text-primary" />}>
          <ul className="space-y-4 text-sm">
            {aiInsights.map((i) => (
              <li key={i.title} className="flex gap-3">
                <i.icon className={`mt-0.5 h-4 w-4 shrink-0 ${i.tone}`} />
                <div>
                  <div className="font-medium">{i.title}</div>
                  <div className="text-xs text-muted-foreground">{i.desc}</div>
                </div>
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <SectionCard title="Recent Activity" action={<span className="inline-flex items-center gap-1 text-xs text-primary">View all <ArrowUpRight className="h-3 w-3" /></span>}>
          <ul className="divide-y divide-border">
            {activityFeed.map((a, i) => (
              <li key={i} className="flex gap-3 py-3 text-sm first:pt-0 last:pb-0">
                <a.icon className={`mt-0.5 h-4 w-4 shrink-0 ${a.tone}`} />
                <div className="min-w-0">
                  <div className="text-foreground"><span className="font-medium">{a.who}</span> · {a.what}</div>
                  <div className="mt-0.5 font-mono text-[10px] text-muted-foreground">{a.time}</div>
                </div>
              </li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard title="Care Workers Online" subtitle={`${onShiftWorkers.length} on shift now`}>
          <ul className="space-y-3">
            {onShiftWorkers.slice(0, 5).map((w) => (
              <li key={w.id} className="flex items-center gap-3">
                <div className="relative grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-primary text-xs font-semibold text-white">
                  {w.avatarInitials}
                  <span className="absolute -right-0.5 -bottom-0.5 h-2.5 w-2.5 rounded-full border-2 border-card bg-emerald-500" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium">{w.name}</div>
                  <div className="truncate text-xs text-muted-foreground">{w.role} · {w.ward}</div>
                </div>
              </li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard title="Emergency Cases" subtitle={`${activeAlerts.length} active`}>
          <ul className="space-y-3">
            {alerts.filter((a) => a.status !== "Resolved").slice(0, 4).map((a) => (
              <li key={a.id} className="flex items-start gap-3">
                <span className={`mt-0.5 inline-flex shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-semibold ${alertPriorityColor[a.priority]}`}>
                  {a.priority}
                </span>
                <div className="min-w-0">
                  <div className="truncate text-sm font-medium">{patientName(a.patientId)}</div>
                  <div className="truncate text-xs text-muted-foreground">{a.type} · {a.timestamp}</div>
                </div>
              </li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard title="Medication Due" subtitle="Next doses across active patients">
          <ul className="space-y-3">
            {dueMedications.map((m) => (
              <li key={m.id} className="flex items-center gap-3">
                <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-amber-100 text-amber-600">
                  <Pill className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium">{m.name} {m.dosage}</div>
                  <div className="truncate text-xs text-muted-foreground">{patientName(m.patientId)} · {m.frequency}</div>
                </div>
              </li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard title="Recent Messages" subtitle={`${conversations.reduce((s, c) => s + c.unreadCount, 0)} unread`}>
          <ul className="space-y-3">
            {conversations.slice(0, 4).map((c) => (
              <li key={c.id} className="flex items-center gap-3">
                <div className="relative grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-primary text-xs font-semibold text-white">
                  {c.avatarInitials}
                  {c.online && <span className="absolute -right-0.5 -bottom-0.5 h-2.5 w-2.5 rounded-full border-2 border-card bg-emerald-500" />}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate text-sm font-medium">{c.name}</span>
                    <span className="shrink-0 text-[10px] text-muted-foreground">{c.lastMessageAt}</span>
                  </div>
                  <div className="truncate text-xs text-muted-foreground">{c.lastMessage}</div>
                </div>
              </li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard title="Latest Documents" subtitle={`${documents.length} total`}>
          <ul className="space-y-3">
            {recentDocuments.map((d) => (
              <li key={d.id} className="flex items-center gap-3">
                <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                  <FileText className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium">{d.name}</div>
                  <div className="truncate text-xs text-muted-foreground">{d.uploadedBy} · {d.uploadedDate}</div>
                </div>
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>

      <SectionCard title="Recent Notifications" subtitle={`${notifications.filter((n) => !n.read).length} unread`}>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {notifications.slice(0, 4).map((n) => (
            <li key={n.id} className="rounded-xl border border-border bg-muted/30 p-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-semibold text-foreground">{n.title}</span>
                {!n.read && <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />}
              </div>
              <p className="mt-1 text-xs text-muted-foreground">{n.message}</p>
              <span className="mt-1 block text-[10px] text-muted-foreground/70">{n.timestamp}</span>
            </li>
          ))}
        </ul>
      </SectionCard>
    </div>
  );
}
