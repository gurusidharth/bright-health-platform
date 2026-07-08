import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Bell, Building2, Check, Copy, Globe, KeyRound, Palette, Plus, Settings as SettingsIcon,
  Shield, Trash2,
} from "lucide-react";
import { useAuth } from "@/lib/auth";
import { PageHeader, SectionCard } from "@/components/dashboard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { toggleTheme } from "@/lib/slices/uiSlice";
import { careWorkers } from "@/lib/data/care-workers";

export const Route = createFileRoute("/dashboard/settings")({
  component: SettingsPage,
});

const roles = ["Admin", "Clinician", "Care Worker", "Viewer"] as const;
const permissions = [
  { label: "View Patients", access: [true, true, true, true] },
  { label: "Edit Patients", access: [true, true, true, false] },
  { label: "Generate AI Care Plans", access: [true, true, false, false] },
  { label: "Manage Billing", access: [true, false, false, false] },
  { label: "Manage Users & Permissions", access: [true, false, false, false] },
];

const apiKeys = [
  { name: "Production API Key", key: "sk_live_••••••••••••4f2a", created: "2026-03-12" },
  { name: "Staging API Key", key: "sk_test_••••••••••••9b7c", created: "2026-05-20" },
];

function SettingsPage() {
  const { user } = useAuth();
  const dispatch = useAppDispatch();
  const theme = useAppSelector((s) => s.ui.theme);
  const [notifPrefs, setNotifPrefs] = useState([
    { label: "Critical patient alerts", on: true },
    { label: "AI care plan suggestions", on: true },
    { label: "Weekly performance digest", on: true },
    { label: "Marketing updates", on: false },
  ]);

  return (
    <div className="space-y-6">
      <PageHeader title="Settings" subtitle="Manage your organisation, security, and platform preferences." />

      <Tabs defaultValue="general">
        <TabsList className="h-auto flex-wrap justify-start gap-1 bg-transparent p-0">
          {[
            { value: "general", label: "General" },
            { value: "notifications", label: "Notifications" },
            { value: "theme", label: "Theme" },
            { value: "language", label: "Language" },
            { value: "permissions", label: "Permissions" },
            { value: "users", label: "Users" },
            { value: "organization", label: "Organization" },
            { value: "api", label: "API Keys" },
            { value: "security", label: "Security" },
          ].map((t) => (
            <TabsTrigger key={t.value} value={t.value} className="rounded-lg border border-border bg-card data-[state=active]:border-transparent data-[state=active]:bg-gradient-primary data-[state=active]:text-white data-[state=active]:shadow-glow">
              {t.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="general" className="mt-5">
          <SectionCard title="General Settings" action={<SettingsIcon className="h-4 w-4 text-primary" />}>
            <dl className="grid grid-cols-[160px_1fr] gap-y-4 text-sm">
              <dt className="text-muted-foreground">Organisation name</dt><dd className="font-medium">{user?.organization}</dd>
              <dt className="text-muted-foreground">Timezone</dt><dd className="font-medium">Europe/London (GMT+1)</dd>
              <dt className="text-muted-foreground">Date format</dt><dd className="font-medium">DD/MM/YYYY</dd>
              <dt className="text-muted-foreground">Default landing page</dt><dd className="font-medium">Dashboard</dd>
            </dl>
          </SectionCard>
        </TabsContent>

        <TabsContent value="notifications" className="mt-5">
          <SectionCard title="Notification Preferences" action={<Bell className="h-4 w-4 text-primary" />}>
            <ul className="space-y-4">
              {notifPrefs.map((p, i) => (
                <li key={p.label} className="flex items-center justify-between text-sm">
                  <span>{p.label}</span>
                  <Switch checked={p.on} onCheckedChange={(v) => setNotifPrefs((prev) => prev.map((item, idx) => idx === i ? { ...item, on: v } : item))} />
                </li>
              ))}
            </ul>
          </SectionCard>
        </TabsContent>

        <TabsContent value="theme" className="mt-5">
          <SectionCard title="Appearance" action={<Palette className="h-4 w-4 text-primary" />}>
            <div className="flex items-center justify-between rounded-xl border border-border bg-muted/30 p-4">
              <div>
                <div className="text-sm font-medium">Dark mode</div>
                <p className="text-xs text-muted-foreground">Switch between light and dark interface themes.</p>
              </div>
              <Switch checked={theme === "dark"} onCheckedChange={() => dispatch(toggleTheme())} />
            </div>
            <div className="mt-4">
              <div className="text-sm font-medium">Accent colour</div>
              <div className="mt-2 flex gap-2">
                {["bg-gradient-primary", "bg-secondary", "bg-emerald-500", "bg-amber-500", "bg-rose-500"].map((c, i) => (
                  <button key={i} className={`h-8 w-8 rounded-full ${c} ${i === 0 ? "ring-2 ring-offset-2 ring-primary" : ""}`} aria-label={`accent ${i}`} />
                ))}
              </div>
            </div>
          </SectionCard>
        </TabsContent>

        <TabsContent value="language" className="mt-5">
          <SectionCard title="Language & Region" action={<Globe className="h-4 w-4 text-primary" />}>
            <div className="max-w-xs">
              <label className="text-xs font-medium text-muted-foreground">Display language</label>
              <Select defaultValue="en-GB">
                <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="en-GB">English (UK)</SelectItem>
                  <SelectItem value="en-US">English (US)</SelectItem>
                  <SelectItem value="fr-FR">Français</SelectItem>
                  <SelectItem value="de-DE">Deutsch</SelectItem>
                  <SelectItem value="es-ES">Español</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">MedixCare AI responses adapt automatically across 30+ languages regardless of interface language.</p>
          </SectionCard>
        </TabsContent>

        <TabsContent value="permissions" className="mt-5">
          <SectionCard title="Role Permissions" action={<Shield className="h-4 w-4 text-primary" />}>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[560px] text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
                    <th className="py-2 pr-4">Permission</th>
                    {roles.map((r) => <th key={r} className="py-2 pr-4 text-center">{r}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {permissions.map((p) => (
                    <tr key={p.label} className="border-b border-border/60 last:border-0">
                      <td className="py-3 pr-4 font-medium">{p.label}</td>
                      {p.access.map((granted, i) => (
                        <td key={i} className="py-3 pr-4 text-center">
                          {granted ? <Check className="mx-auto h-4 w-4 text-primary" /> : <span className="text-muted-foreground">—</span>}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </SectionCard>
        </TabsContent>

        <TabsContent value="users" className="mt-5">
          <SectionCard
            title="Team Members"
            subtitle={`${careWorkers.length + 1} people with access`}
            action={
              <button className="inline-flex items-center gap-2 rounded-xl bg-gradient-primary px-3 py-1.5 text-xs font-medium text-white shadow-glow">
                <Plus className="h-3.5 w-3.5" /> Invite
              </button>
            }
          >
            <ul className="divide-y divide-border">
              <li className="flex items-center gap-3 py-3">
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-primary text-xs font-semibold text-white">
                  {user?.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium">{user?.name}</div>
                  <div className="text-xs text-muted-foreground">{user?.email}</div>
                </div>
                <span className="rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">Admin</span>
              </li>
              {careWorkers.map((w) => (
                <li key={w.id} className="flex items-center gap-3 py-3">
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-primary text-xs font-semibold text-white">
                    {w.avatarInitials}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-medium">{w.name}</div>
                    <div className="truncate text-xs text-muted-foreground">{w.email}</div>
                  </div>
                  <span className="rounded-full border border-border bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">{w.role}</span>
                </li>
              ))}
            </ul>
          </SectionCard>
        </TabsContent>

        <TabsContent value="organization" className="mt-5">
          <SectionCard title="Organization" action={<Building2 className="h-4 w-4 text-primary" />}>
            <ul className="space-y-3 text-sm">
              <li className="flex justify-between"><span className="text-muted-foreground">Care sites</span><span className="font-medium">7</span></li>
              <li className="flex justify-between"><span className="text-muted-foreground">Active staff</span><span className="font-medium">{careWorkers.length + 1}</span></li>
              <li className="flex justify-between"><span className="text-muted-foreground">Data region</span><span className="font-medium">EU-West</span></li>
              <li className="flex justify-between"><span className="text-muted-foreground">Plan</span><span className="font-medium">Professional</span></li>
            </ul>
          </SectionCard>
        </TabsContent>

        <TabsContent value="api" className="mt-5">
          <SectionCard
            title="API Keys"
            action={
              <button className="inline-flex items-center gap-2 rounded-xl bg-gradient-primary px-3 py-1.5 text-xs font-medium text-white shadow-glow">
                <Plus className="h-3.5 w-3.5" /> Generate Key
              </button>
            }
          >
            <ul className="space-y-3">
              {apiKeys.map((k) => (
                <li key={k.name} className="flex items-center gap-3 rounded-xl border border-border bg-muted/30 p-3">
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                    <KeyRound className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-medium">{k.name}</div>
                    <div className="font-mono text-xs text-muted-foreground">{k.key} · created {k.created}</div>
                  </div>
                  <button className="rounded-lg p-1.5 text-muted-foreground hover:text-foreground" aria-label="copy"><Copy className="h-3.5 w-3.5" /></button>
                  <button className="rounded-lg p-1.5 text-muted-foreground hover:text-destructive" aria-label="revoke"><Trash2 className="h-3.5 w-3.5" /></button>
                </li>
              ))}
            </ul>
          </SectionCard>
        </TabsContent>

        <TabsContent value="security" className="mt-5">
          <SectionCard title="Security" action={<Shield className="h-4 w-4 text-primary" />}>
            <ul className="space-y-3 text-sm">
              <li className="flex justify-between"><span className="text-muted-foreground">Two-factor auth</span><span className="font-medium text-primary">Enabled</span></li>
              <li className="flex justify-between"><span className="text-muted-foreground">Last sign-in</span><span className="font-medium">Today, 08:02</span></li>
              <li className="flex justify-between"><span className="text-muted-foreground">Session timeout</span><span className="font-medium">30 min</span></li>
              <li className="flex justify-between"><span className="text-muted-foreground">Compliance</span><span className="font-medium">HIPAA · GDPR</span></li>
            </ul>
          </SectionCard>
        </TabsContent>
      </Tabs>
    </div>
  );
}
