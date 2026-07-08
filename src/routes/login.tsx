import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, HeartPulse, Lock, Mail, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth, DEMO_CREDENTIALS } from "@/lib/auth";

export const Route = createFileRoute("/login")({
  ssr: false,
  component: LoginPage,
});

function LoginPage() {
  const { user, ready, login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (ready && user) navigate({ to: "/dashboard" });
  }, [ready, user, navigate]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const result = login(email, password);
    if (result.ok) {
      navigate({ to: "/dashboard" });
    } else {
      setError(result.error);
      setLoading(false);
    }
  }

  function fillDemo() {
    setEmail(DEMO_CREDENTIALS.email);
    setPassword(DEMO_CREDENTIALS.password);
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-hero">
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute -left-32 top-10 h-96 w-96 rounded-full bg-gradient-mesh blur-3xl animate-float-slow" />
        <div className="absolute -right-32 bottom-0 h-[28rem] w-[28rem] rounded-full bg-gradient-mesh blur-3xl animate-float" />
      </div>

      <div className="relative mx-auto grid min-h-screen max-w-6xl gap-10 px-4 py-10 lg:grid-cols-2 lg:items-center lg:py-16">
        <div className="hidden animate-fade-up flex-col justify-center lg:flex">
          <Link to="/" className="inline-flex items-center gap-2">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-primary shadow-glow">
              <HeartPulse className="h-5 w-5 text-white" />
            </span>
            <span className="text-xl font-bold tracking-tight">MedixCare</span>
          </Link>
          <h1 className="mt-8 text-4xl font-bold leading-tight tracking-tight lg:text-5xl">
            Welcome back to <span className="text-gradient">smarter care.</span>
          </h1>
          <p className="mt-4 max-w-md text-base text-muted-foreground">
            Sign in to access your AI-powered clinical workspace — care plans, patient records, and predictive insights all in one place.
          </p>
          <ul className="mt-8 space-y-3 text-sm text-muted-foreground">
            <li className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-primary" /> HIPAA & GDPR aligned</li>
            <li className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-primary" /> GPT-powered clinical summaries</li>
            <li className="flex items-center gap-2"><HeartPulse className="h-4 w-4 text-primary" /> Real-time patient monitoring</li>
          </ul>
        </div>

        <div className="animate-fade-up">
          <div className="glass shadow-elevated mx-auto w-full max-w-md rounded-3xl p-8">
            <div className="lg:hidden mb-6 flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-primary shadow-glow">
                <HeartPulse className="h-4 w-4 text-white" />
              </span>
              <span className="text-lg font-bold tracking-tight">MedixCare</span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight">Sign in</h2>
            <p className="mt-1 text-sm text-muted-foreground">Use the demo credentials to explore the dashboard.</p>

            <form onSubmit={onSubmit} className="mt-6 space-y-4">
              <label className="block">
                <span className="text-sm font-medium">Email</span>
                <div className="relative mt-1.5">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-border bg-white/70 py-2.5 pl-9 pr-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                    placeholder="you@clinic.com"
                  />
                </div>
              </label>
              <label className="block">
                <span className="text-sm font-medium">Password</span>
                <div className="relative mt-1.5">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-xl border border-border bg-white/70 py-2.5 pl-9 pr-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                    placeholder="••••••••"
                  />
                </div>
              </label>

              {error && (
                <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-primary text-white shadow-glow hover:opacity-95"
              >
                {loading ? "Signing in…" : (<>Sign in <ArrowRight className="ml-1 h-4 w-4" /></>)}
              </Button>
            </form>

            <div className="mt-6 rounded-xl border border-dashed border-primary/40 bg-primary/5 p-4 text-sm">
              <div className="flex items-center justify-between gap-2">
                <span className="font-semibold text-foreground">Demo credentials</span>
                <button type="button" onClick={fillDemo} className="text-xs font-medium text-primary hover:underline">
                  Autofill
                </button>
              </div>
              <div className="mt-2 grid gap-1 font-mono text-xs text-muted-foreground">
                <div>Email: <span className="text-foreground">{DEMO_CREDENTIALS.email}</span></div>
                <div>Password: <span className="text-foreground">{DEMO_CREDENTIALS.password}</span></div>
              </div>
            </div>

            <p className="mt-6 text-center text-xs text-muted-foreground">
              <Link to="/" className="hover:text-foreground">← Back to home</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}