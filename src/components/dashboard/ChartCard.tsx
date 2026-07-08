import type { ReactNode } from "react";
import type { ComponentProps } from "react";
import { ChartContainer } from "@/components/ui/chart";
import { SectionCard } from "./SectionCard";

type ChartConfig = ComponentProps<typeof ChartContainer>["config"];

export function ChartCard({
  title,
  subtitle,
  action,
  config,
  className,
  height = "h-72",
  children,
}: {
  title?: string;
  subtitle?: string;
  action?: ReactNode;
  config: ChartConfig;
  className?: string;
  height?: string;
  children: ComponentProps<typeof ChartContainer>["children"];
}) {
  return (
    <SectionCard title={title} subtitle={subtitle} action={action} className={className}>
      <ChartContainer config={config} className={`${height} w-full`}>
        {children}
      </ChartContainer>
    </SectionCard>
  );
}
