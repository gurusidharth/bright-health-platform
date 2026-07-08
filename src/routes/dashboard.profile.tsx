import { createFileRoute } from "@tanstack/react-router";
import {
  Bell, Building2, Camera, Laptop, Mail, Monitor, Shield, Smartphone, Stethoscope, User,
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/lib/auth";
import { PageHeader, SectionCard } from "@/components/dashboard";
import { Switch } from "@/components/ui/switch";

export const Route = createFileRoute("/dashboard/profile")({
  component: ProfilePage,
});

const devices = [
  { icon: Laptop, name: "Windows PC — Chrome", location: "Riverside, UK", lastActive: "Active now", current: true },
  { icon: Smartphone, name: "iPhone 15 — Safari", location: "Riverside, UK", lastActive: "2 hours ago", current: false },
  { icon: Monitor, name: "iMac — Safari", location: "Riverside, UK", lastActive: "3 days ago", current: false },
];

const notificationPrefs = [
  { label: "Critical patient alerts", on: true },
  { label: "New AI care plan drafts", on: true },
  { label: "Appointment reminders", on: true },
  { label: "Weekly performance digest", on: true },
  { label: "Product news & updates", on: false },
];

function ProfilePage() {
  const { user } = useAuth();
  const [prefs, setPrefs] = useState(notificationPrefs);
  const initials = user?.name.split(" ").map((n) => n[0]).slice(0, 2).join("") ?? "";

  return (
    <div className="space-y-6">
      <PageHeader title="Profile" subtitle="Manage your personal information and account preferences." />

      <SectionCard>
        <div className="flex flex-wrap items-center gap-5">
          <div className="relative">
            <div className="grid h-20 w-20 place-items-center rounded-full bg-gradient-primary text-2xl font-bold text-white shadow-glow">
              {initials}
            </div>
            <button className="absolute -bottom-1 -right-1 grid h-7 w-7 place-items-center rounded-full border-2 border-card bg-background text-muted-foreground shadow-card hover:text-foreground" aria-label="change photo">
              <Camera className="h-3.5 w-3.5" />
            </button>
          </div>
          <div>
            <div className="text-lg font-bold">{user?.name}</div>
            <div className="text-sm text-muted-foreground">{user?.role} · {user?.organization}</div>
          </div>
          <button className="ml-auto rounded-xl border border-border bg-background px-4 py-2 text-sm font-medium hover:bg-accent">Edit Profile</button>
        </div>
      </SectionCard>

      <div className="grid gap-4 lg:grid-cols-2">
        <SectionCard title="Personal Information" action={<User className="h-4 w-4 text-primary" />}>
          <dl className="grid grid-cols-[120px_1fr] gap-y-3 text-sm">
            <dt className="text-muted-foreground">Full name</dt><dd className="font-medium">{user?.name}</dd>
            <dt className="text-muted-foreground">Email</dt><dd className="flex items-center gap-1.5 font-medium"><Mail className="h-3.5 w-3.5 text-muted-foreground" />{user?.email}</dd>
            <dt className="text-muted-foreground">Role</dt><dd className="flex items-center gap-1.5 font-medium"><Stethoscope className="h-3.5 w-3.5 text-muted-foreground" />{user?.role}</dd>
            <dt className="text-muted-foreground">Department</dt><dd className="font-medium">Cardiology &amp; Internal Medicine</dd>
            <dt className="text-muted-foreground">Organisation</dt><dd className="flex items-center gap-1.5 font-medium"><Building2 className="h-3.5 w-3.5 text-muted-foreground" />{user?.organization}</dd>
          </dl>
        </SectionCard>

        <SectionCard title="Security" action={<Shield className="h-4 w-4 text-primary" />}>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center justify-between"><span className="text-muted-foreground">Two-factor authentication</span><span className="font-medium text-primary">Enabled</span></li>
            <li className="flex items-center justify-between"><span className="text-muted-foreground">Last sign-in</span><span className="font-medium">Today, 08:02</span></li>
            <li className="flex items-center justify-between"><span className="text-muted-foreground">Password last changed</span><span className="font-medium">62 days ago</span></li>
          </ul>
          <button className="mt-4 w-full rounded-lg border border-border py-2 text-sm font-medium text-muted-foreground hover:text-foreground">Change Password</button>
        </SectionCard>
      </div>

      <SectionCard title="Notification Settings" action={<Bell className="h-4 w-4 text-primary" />}>
        <ul className="space-y-3">
          {prefs.map((p, i) => (
            <li key={p.label} className="flex items-center justify-between text-sm">
              <span>{p.label}</span>
              <Switch checked={p.on} onCheckedChange={(v) => setPrefs((prev) => prev.map((item, idx) => idx === i ? { ...item, on: v } : item))} />
            </li>
          ))}
        </ul>
      </SectionCard>

      <SectionCard title="Connected Devices">
        <ul className="space-y-3">
          {devices.map((d) => (
            <li key={d.name} className="flex items-center gap-3 rounded-xl border border-border bg-muted/30 p-3">
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                <d.icon className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 text-sm font-medium">
                  {d.name}
                  {d.current && <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-600">This device</span>}
                </div>
                <div className="text-xs text-muted-foreground">{d.location} · {d.lastActive}</div>
              </div>
              {!d.current && <button className="shrink-0 text-xs font-medium text-destructive hover:underline">Sign out</button>}
            </li>
          ))}
        </ul>
      </SectionCard>
    </div>
  );
}
