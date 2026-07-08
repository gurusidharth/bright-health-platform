import { createFileRoute } from "@tanstack/react-router";
import { Bell, Building2, Shield, User } from "lucide-react";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/dashboard/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  const { user } = useAuth();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">Manage your profile, organization, and preferences.</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <section className="rounded-2xl border border-border bg-card p-5 shadow-card">
          <div className="flex items-center gap-2 text-base font-semibold"><User className="h-4 w-4 text-primary" /> Profile</div>
          <dl className="mt-4 grid grid-cols-[120px_1fr] gap-y-3 text-sm">
            <dt className="text-muted-foreground">Name</dt><dd className="font-medium">{user?.name}</dd>
            <dt className="text-muted-foreground">Email</dt><dd className="font-medium">{user?.email}</dd>
            <dt className="text-muted-foreground">Role</dt><dd className="font-medium">{user?.role}</dd>
            <dt className="text-muted-foreground">Organization</dt><dd className="font-medium">{user?.organization}</dd>
          </dl>
        </section>

        <section className="rounded-2xl border border-border bg-card p-5 shadow-card">
          <div className="flex items-center gap-2 text-base font-semibold"><Building2 className="h-4 w-4 text-primary" /> Organization</div>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex justify-between"><span className="text-muted-foreground">Care sites</span><span className="font-medium">7</span></li>
            <li className="flex justify-between"><span className="text-muted-foreground">Active staff</span><span className="font-medium">248</span></li>
            <li className="flex justify-between"><span className="text-muted-foreground">Data region</span><span className="font-medium">EU-West</span></li>
            <li className="flex justify-between"><span className="text-muted-foreground">Plan</span><span className="font-medium">Enterprise</span></li>
          </ul>
        </section>

        <section className="rounded-2xl border border-border bg-card p-5 shadow-card">
          <div className="flex items-center gap-2 text-base font-semibold"><Bell className="h-4 w-4 text-primary" /> Notifications</div>
          <ul className="mt-4 space-y-3 text-sm">
            {[
              ["Critical patient alerts", true],
              ["AI care plan suggestions", true],
              ["Weekly performance digest", true],
              ["Marketing updates", false],
            ].map(([label, on]) => (
              <li key={label as string} className="flex items-center justify-between">
                <span>{label as string}</span>
                <span className={`inline-flex h-6 w-11 items-center rounded-full p-0.5 ${on ? "bg-primary" : "bg-muted"}`}>
                  <span className={`h-5 w-5 rounded-full bg-white shadow transition-transform ${on ? "translate-x-5" : ""}`} />
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border border-border bg-card p-5 shadow-card">
          <div className="flex items-center gap-2 text-base font-semibold"><Shield className="h-4 w-4 text-primary" /> Security</div>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex justify-between"><span className="text-muted-foreground">Two-factor auth</span><span className="font-medium text-primary">Enabled</span></li>
            <li className="flex justify-between"><span className="text-muted-foreground">Last sign-in</span><span className="font-medium">Today, 08:02</span></li>
            <li className="flex justify-between"><span className="text-muted-foreground">Session timeout</span><span className="font-medium">30 min</span></li>
            <li className="flex justify-between"><span className="text-muted-foreground">Compliance</span><span className="font-medium">HIPAA · GDPR</span></li>
          </ul>
        </section>
      </div>
    </div>
  );
}