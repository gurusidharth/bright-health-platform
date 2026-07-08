import { createFileRoute } from "@tanstack/react-router";
import { CreditCard, Download, ShieldCheck, Users } from "lucide-react";
import { PageHeader, StatCard, SectionCard } from "@/components/dashboard";

export const Route = createFileRoute("/dashboard/billing")({
  component: BillingPage,
});

const invoices = [
  { id: "INV-2026-007", date: "2026-07-01", amount: "£499.00", status: "Paid" },
  { id: "INV-2026-006", date: "2026-06-01", amount: "£499.00", status: "Paid" },
  { id: "INV-2026-005", date: "2026-05-01", amount: "£499.00", status: "Paid" },
  { id: "INV-2026-004", date: "2026-04-01", amount: "£499.00", status: "Paid" },
];

function BillingPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Billing" subtitle="Manage your subscription, invoices and payment method." />

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard icon={CreditCard} label="Current Plan" value="Professional" />
        <StatCard icon={Users} label="Seats Used" value="18 / 25" tone="secondary" />
        <StatCard icon={ShieldCheck} label="Next Renewal" value="1 Aug 2026" />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <SectionCard title="Current Plan" className="lg:col-span-2">
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-primary/20 bg-primary/5 p-5">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wide text-primary">Professional</div>
              <div className="mt-1 text-2xl font-bold">£499<span className="text-sm font-normal text-muted-foreground">/mo</span></div>
              <p className="mt-1 text-xs text-muted-foreground">Growing care organisations that need automation at scale.</p>
            </div>
            <button className="rounded-xl border border-border bg-background px-4 py-2 text-sm font-medium hover:bg-accent">Upgrade to Enterprise</button>
          </div>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {["Up to 250 patients", "25 care worker seats", "Unlimited AI care plans", "Predictive analytics", "Priority support", "FHIR & HL7 integrations"].map((f) => (
              <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-primary" /> {f}
              </li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard title="Payment Method">
          <div className="flex items-center gap-3 rounded-xl border border-border bg-muted/30 p-4">
            <div className="grid h-10 w-14 shrink-0 place-items-center rounded-lg bg-gradient-primary text-white">
              <CreditCard className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm font-semibold">Visa •••• 4242</div>
              <div className="text-xs text-muted-foreground">Expires 09/28</div>
            </div>
          </div>
          <button className="mt-3 w-full rounded-lg border border-border py-2 text-sm font-medium text-muted-foreground hover:text-foreground">Update payment method</button>
        </SectionCard>
      </div>

      <SectionCard title="Invoice History">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
              <th className="py-2 pr-4">Invoice</th>
              <th className="py-2 pr-4">Date</th>
              <th className="py-2 pr-4">Amount</th>
              <th className="py-2 pr-4">Status</th>
              <th className="py-2 pr-4" />
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv) => (
              <tr key={inv.id} className="border-b border-border/60 last:border-0">
                <td className="py-3 pr-4 font-mono text-xs">{inv.id}</td>
                <td className="py-3 pr-4 text-muted-foreground">{inv.date}</td>
                <td className="py-3 pr-4 font-medium">{inv.amount}</td>
                <td className="py-3 pr-4">
                  <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-600">{inv.status}</span>
                </td>
                <td className="py-3 pr-4 text-right">
                  <button className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"><Download className="h-3 w-3" /> PDF</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </SectionCard>
    </div>
  );
}
