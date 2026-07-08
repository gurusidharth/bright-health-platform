import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Line, LineChart, Pie,
  PieChart, XAxis, YAxis,
} from "recharts";
import { BarChart3, Download, HeartPulse, TrendingUp, Users } from "lucide-react";
import { ChartCard, SectionCard, StatCard } from "@/components/dashboard";
import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  admissionsVsDischarges, conditionBreakdown, medicationComplianceTrend,
  patientGrowth, qualityOutcomes, recoveryProgress,
} from "@/lib/data/analytics";
import { appointments } from "@/lib/data/appointments";

export const Route = createFileRoute("/dashboard/analytics")({
  component: AnalyticsPage,
});

const pieColors = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)", "var(--chart-5)", "var(--primary)"];

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const bands = ["Morning", "Afternoon", "Evening"] as const;

function bandFor(time: string) {
  const hour = Number(time.split(":")[0]);
  if (hour < 12) return "Morning";
  if (hour < 17) return "Afternoon";
  return "Evening";
}

function weekdayFor(dateStr: string) {
  const d = new Date(`${dateStr}T00:00:00`);
  return days[(d.getDay() + 6) % 7];
}

const patientGrowthConfig = { patients: { label: "Patients", color: "var(--primary)" } };
const admissionsConfig = { admissions: { label: "Admissions", color: "var(--primary)" }, discharges: { label: "Discharges", color: "var(--secondary)" } };
const conditionConfig = Object.fromEntries(conditionBreakdown.map((c, i) => [c.name, { label: c.name, color: pieColors[i % pieColors.length] }]));
const complianceConfig = { compliance: { label: "Compliance %", color: "var(--primary)" } };
const recoveryConfig = { recovery: { label: "Recovery %", color: "var(--chart-2)" } };

function AnalyticsPage() {
  const [period, setPeriod] = useState<"monthly" | "yearly">("monthly");

  const heatmap = useMemo(() => {
    const grid = new Map<string, number>();
    appointments.forEach((a) => {
      const key = `${weekdayFor(a.date)}-${bandFor(a.time)}`;
      grid.set(key, (grid.get(key) ?? 0) + 1);
    });
    return grid;
  }, []);
  const maxCount = Math.max(1, ...Array.from(heatmap.values()));

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Analytics</h1>
          <p className="mt-1 text-sm text-muted-foreground">Organisation-wide performance and predictive insights.</p>
        </div>
        <div className="flex items-center gap-2">
          <Tabs value={period} onValueChange={(v) => setPeriod(v as "monthly" | "yearly")}>
            <TabsList>
              <TabsTrigger value="monthly">Monthly Report</TabsTrigger>
              <TabsTrigger value="yearly">Yearly Report</TabsTrigger>
            </TabsList>
          </Tabs>
          <button className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground">
            <Download className="h-4 w-4" /> Export
          </button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={HeartPulse} label="Readmission Rate" value="6.4%" trend="-1.8%" />
        <StatCard icon={TrendingUp} label="Avg. Length of Stay" value="4.2d" trend="-0.4d" tone="secondary" />
        <StatCard icon={BarChart3} label={period === "monthly" ? "Predictive Alerts / wk" : "Predictive Alerts / yr"} value={period === "monthly" ? "137" : "6,240"} trend="+12" />
        <StatCard icon={Users} label="Patients Monitored" value="1,284" trend="+42" tone="secondary" />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <ChartCard title="Patient Growth" subtitle="Last 6 months" config={patientGrowthConfig} height="h-64">
          <AreaChart data={patientGrowth} margin={{ left: -20, right: 8, top: 8 }}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey="month" tickLine={false} axisLine={false} />
            <YAxis tickLine={false} axisLine={false} width={40} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Area type="monotone" dataKey="patients" stroke="var(--color-patients)" fill="var(--color-patients)" fillOpacity={0.15} strokeWidth={2} />
          </AreaChart>
        </ChartCard>

        <ChartCard title="Admissions vs Discharges" subtitle="Last 4 weeks" config={admissionsConfig} height="h-64">
          <BarChart data={admissionsVsDischarges} margin={{ left: -20, right: 8, top: 8 }}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey="week" tickLine={false} axisLine={false} />
            <YAxis tickLine={false} axisLine={false} width={30} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="admissions" fill="var(--color-admissions)" radius={[6, 6, 0, 0]} />
            <Bar dataKey="discharges" fill="var(--color-discharges)" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ChartCard>

        <ChartCard title="Condition Breakdown" subtitle="Share of active caseload" config={conditionConfig} height="h-64">
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie data={conditionBreakdown} dataKey="value" nameKey="name" innerRadius={50} outerRadius={90} paddingAngle={2}>
              {conditionBreakdown.map((c, i) => (
                <Cell key={c.name} fill={pieColors[i % pieColors.length]} />
              ))}
            </Pie>
          </PieChart>
        </ChartCard>

        <SectionCard title="Quality Outcomes" subtitle="Rolling 30-day averages">
          <ul className="space-y-4">
            {qualityOutcomes.map((o) => (
              <li key={o.label}>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{o.label}</span>
                  <span className="font-semibold">{o.value}%</span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
                  <div className="h-full rounded-full bg-gradient-primary" style={{ width: `${o.value}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </SectionCard>

        <ChartCard title="Medication Compliance" subtitle="Weekly trend" config={complianceConfig} height="h-64">
          <LineChart data={medicationComplianceTrend} margin={{ left: -20, right: 8, top: 8 }}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey="week" tickLine={false} axisLine={false} />
            <YAxis tickLine={false} axisLine={false} width={30} domain={[80, 100]} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line type="monotone" dataKey="compliance" stroke="var(--color-compliance)" strokeWidth={2} dot={false} />
          </LineChart>
        </ChartCard>

        <ChartCard title="Recovery Progress" subtitle="Cohort average" config={recoveryConfig} height="h-64">
          <AreaChart data={recoveryProgress} margin={{ left: -20, right: 8, top: 8 }}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey="month" tickLine={false} axisLine={false} />
            <YAxis tickLine={false} axisLine={false} width={30} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Area type="monotone" dataKey="recovery" stroke="var(--color-recovery)" fill="var(--color-recovery)" fillOpacity={0.15} strokeWidth={2} />
          </AreaChart>
        </ChartCard>
      </div>

      <SectionCard title="Appointment Density Heat Map" subtitle="Bookings by day and time of day">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[520px] border-separate border-spacing-1 text-center text-xs">
            <thead>
              <tr>
                <th className="w-20" />
                {days.map((d) => <th key={d} className="pb-1 font-medium text-muted-foreground">{d}</th>)}
              </tr>
            </thead>
            <tbody>
              {bands.map((band) => (
                <tr key={band}>
                  <td className="pr-2 text-right font-medium text-muted-foreground">{band}</td>
                  {days.map((d) => {
                    const count = heatmap.get(`${d}-${band}`) ?? 0;
                    const intensity = count / maxCount;
                    return (
                      <td key={d} className="p-0">
                        <div
                          className="grid h-10 w-full place-items-center rounded-lg text-xs font-semibold"
                          style={{
                            backgroundColor: count === 0 ? "var(--muted)" : `oklch(0.62 0.14 200 / ${0.15 + intensity * 0.7})`,
                            color: intensity > 0.5 ? "white" : "var(--muted-foreground)",
                          }}
                        >
                          {count || ""}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </div>
  );
}
