import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function StatCard({
  icon: Icon,
  label,
  value,
  trend,
  tone = "primary",
  className,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  trend?: string;
  tone?: "primary" | "secondary" | "destructive" | "emerald";
  className?: string;
}) {
  const toneClass = {
    primary: "text-primary bg-primary/10",
    secondary: "text-secondary bg-secondary/10",
    destructive: "text-destructive bg-destructive/10",
    emerald: "text-emerald-600 bg-emerald-500/10",
  }[tone];

  return (
    <div className={cn("rounded-2xl border border-border bg-card p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-elevated", className)}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</span>
        <div className={cn("grid h-9 w-9 place-items-center rounded-lg", toneClass)}>
          <Icon className="h-4 w-4" />
        </div>
      </div>
      <div className="mt-3 flex items-baseline gap-2">
        <span className="text-3xl font-bold tracking-tight">{value}</span>
        {trend && <span className="text-xs font-medium text-primary">{trend}</span>}
      </div>
    </div>
  );
}
