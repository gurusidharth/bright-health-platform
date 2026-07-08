import { useEffect, useState } from "react";
import {
  Activity, Brain, Calendar, Pill, Bell, MessageSquare, FileText, TrendingUp,
  Shield, Radio, BarChart3, Users, Heart, Stethoscope, Building2, HomeIcon,
  Hospital, Check, ArrowRight, Sparkles, Menu, X, Star, ChevronDown,
  Twitter, Linkedin, Github, Mail, ShieldCheck, Zap, Clock, HeartPulse, Quote,
} from "lucide-react";
import dashboardHero from "@/assets/dashboard-hero.jpg";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Link } from "@tanstack/react-router";

const nav = [
  { label: "Home", href: "#home" },
  { label: "Features", href: "#features" },
  { label: "Solutions", href: "#solutions" },
  { label: "AI Assistant", href: "#ai" },
  { label: "Pricing", href: "#pricing" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const features = [
  { icon: Brain, title: "AI Care Planning", desc: "Generate personalised, evidence-based care plans in seconds — tailored to each patient's history and risk profile." },
  { icon: Users, title: "Patient Management", desc: "A single source of truth for demographics, conditions, medications, allergies and consent records." },
  { icon: Stethoscope, title: "Care Worker Management", desc: "Rota planning, credentials, mandatory training and shift-level task assignment in one place." },
  { icon: Calendar, title: "Appointment Scheduling", desc: "Smart scheduling that balances clinician availability, travel time and patient preference." },
  { icon: Pill, title: "Medication Tracking", desc: "Digital MAR charts, dose reminders and PRN logging with full audit trail." },
  { icon: Bell, title: "Emergency Alerts", desc: "Real-time escalations for falls, missed medications and vital-sign deterioration." },
  { icon: MessageSquare, title: "AI Chat Assistant", desc: "Natural-language answers to clinical, operational and policy questions across your organisation." },
  { icon: FileText, title: "Report Summarization", desc: "Convert lengthy discharge letters and assessments into structured summaries for the care team." },
  { icon: TrendingUp, title: "Predictive Analytics", desc: "Forecast readmissions, deterioration risk and staffing pressure before they happen." },
  { icon: Shield, title: "Secure Documents", desc: "HIPAA and GDPR-aligned document storage with granular role-based access." },
  { icon: Radio, title: "Real-time Notifications", desc: "Instant push, SMS and in-app alerts routed to the right person on the right shift." },
  { icon: BarChart3, title: "Advanced Reporting", desc: "CQC, KLOE and board-ready dashboards with drill-down on every metric." },
];

const steps = [
  { n: "01", title: "Register Organization", desc: "Set up your care home, clinic or hospital in under 10 minutes." },
  { n: "02", title: "Add Patients", desc: "Import records via CSV, FHIR or manually with guided intake." },
  { n: "03", title: "Assign Care Workers", desc: "Match staff to patients based on skills, location and availability." },
  { n: "04", title: "Generate AI Care Plans", desc: "One click produces a draft plan the clinician reviews and approves." },
  { n: "05", title: "Monitor Progress", desc: "Track outcomes in real time and iterate the plan continuously." },
];

const benefits = [
  { icon: Clock, title: "Reduce Admin Work", metric: "62%", desc: "Less time on paperwork, more on care." },
  { icon: HeartPulse, title: "Improve Outcomes", metric: "38%", desc: "Fewer avoidable admissions." },
  { icon: Sparkles, title: "Automate Care Planning", metric: "10x", desc: "Faster plan generation." },
  { icon: Zap, title: "Staff Productivity", metric: "+41%", desc: "More patients seen per shift." },
  { icon: TrendingUp, title: "Predict Health Risks", metric: "93%", desc: "Model accuracy on deterioration." },
  { icon: Radio, title: "Real-time Collaboration", metric: "24/7", desc: "Everyone on the same page." },
];

const testimonials = [
  { name: "Amelia Hart", role: "Director of Nursing, St. Andrew's Hospital", quote: "MedixCare cut our care-plan drafting time from 40 minutes to under 4. Our clinicians finally have time to think.", rating: 5, initials: "AH" },
  { name: "Marcus Owens", role: "Senior Care Worker, Brookfield Care Home", quote: "The mobile app is genuinely built for the ward. I log medications and notes without ever leaving the patient's side.", rating: 5, initials: "MO" },
  { name: "Dr. Priya Ramanathan", role: "Consultant Cardiologist", quote: "The predictive analytics flagged three deterioration cases last month before we would have caught them clinically.", rating: 5, initials: "PR" },
  { name: "Sarah Whitcombe", role: "Family Member", quote: "I can finally see my father's daily notes, medications and next appointment in one place. The peace of mind is priceless.", rating: 5, initials: "SW" },
];

const pricing = [
  {
    name: "Starter", price: "£149", period: "/mo", desc: "Small clinics and home-care teams getting started with AI.",
    features: ["Up to 25 patients", "5 care worker seats", "AI care plans (100/mo)", "Standard analytics", "Email support"],
    popular: false,
  },
  {
    name: "Professional", price: "£499", period: "/mo", desc: "Growing care organisations that need automation at scale.",
    features: ["Up to 250 patients", "25 care worker seats", "Unlimited AI care plans", "Predictive analytics", "Priority support", "FHIR & HL7 integrations"],
    popular: true,
  },
  {
    name: "Enterprise", price: "Custom", period: "", desc: "Hospitals, ICBs and multi-site providers with complex needs.",
    features: ["Unlimited patients & staff", "Dedicated infrastructure", "SSO, SCIM & audit exports", "Custom AI model tuning", "24/7 dedicated CSM", "On-premise option"],
    popular: false,
  },
];

const faqs = [
  { q: "Is MedixCare compliant with HIPAA and GDPR?", a: "Yes. MedixCare is built HIPAA-, GDPR- and DSPT-aligned. Data is encrypted in transit and at rest, with granular role-based access and full audit logs." },
  { q: "How does the AI generate care plans?", a: "Our clinical language model is trained on de-identified care records and validated against NICE and NHS guidance. Every plan is a draft — a qualified clinician always reviews and approves before it goes live." },
  { q: "Can we integrate MedixCare with our EHR?", a: "Yes. We support FHIR R4, HL7 v2, and have pre-built connectors for Epic, Cerner, EMIS and SystmOne. Custom integrations are available on Enterprise." },
  { q: "How long does onboarding take?", a: "Most organisations are live within 2–4 weeks. Enterprise deployments with SSO and custom integrations typically take 6–10 weeks with a dedicated implementation lead." },
  { q: "Where is patient data stored?", a: "Data is stored in ISO 27001-certified, region-specific data centres. UK and EU customers stay in-region by default; US customers on US-East infrastructure." },
  { q: "Do you offer training for care staff?", a: "Yes. Every plan includes onboarding sessions, a library of role-based video training, and monthly clinical office hours with our medical advisory board." },
];

const providers = [
  { icon: Hospital, label: "Hospitals" },
  { icon: HomeIcon, label: "Care Homes" },
  { icon: Stethoscope, label: "Clinics" },
  { icon: Heart, label: "Home Care" },
  { icon: Building2, label: "ICBs & Trusts" },
  { icon: Activity, label: "Rehab Centres" },
];

function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div className="relative grid h-9 w-9 place-items-center rounded-xl bg-gradient-primary shadow-glow">
        <HeartPulse className="h-5 w-5 text-white" strokeWidth={2.5} />
      </div>
      <span className="text-lg font-bold tracking-tight text-foreground">MedixCare</span>
    </div>
  );
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 12);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? "py-2" : "py-4"}`}>
      <div className="mx-auto max-w-7xl px-4">
        <div className={`flex items-center justify-between rounded-2xl px-4 py-2.5 transition-all ${scrolled ? "glass shadow-card" : ""}`}>
          <Logo />
          <nav className="hidden items-center gap-1 lg:flex">
            {nav.map((n) => (
              <a key={n.label} href={n.href} className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
                {n.label}
              </a>
            ))}
          </nav>
          <div className="hidden items-center gap-2 lg:flex">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/login">Login</Link>
            </Button>
            <Button size="sm" asChild className="bg-gradient-primary text-white shadow-glow hover:opacity-95">
              <Link to="/login">
                Get Started <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <button className="lg:hidden" onClick={() => setOpen(!open)} aria-label="menu">
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        {open && (
          <div className="glass mt-2 rounded-2xl p-4 shadow-card lg:hidden">
            <div className="flex flex-col gap-1">
              {nav.map((n) => (
                <a key={n.label} href={n.href} onClick={() => setOpen(false)} className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground">
                  {n.label}
                </a>
              ))}
              <div className="mt-2 flex gap-2 border-t border-border pt-3">
                <Button variant="ghost" size="sm" className="flex-1" asChild>
                  <Link to="/login">Login</Link>
                </Button>
                <Button size="sm" className="flex-1 bg-gradient-primary text-white" asChild>
                  <Link to="/login">Get Started</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

function FloatingCard({ className = "", style, children }: { className?: string; style?: React.CSSProperties; children: React.ReactNode }) {
  return (
    <div className={`glass shadow-elevated rounded-2xl p-3.5 ${className}`} style={style}>
      {children}
    </div>
  );
}

function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-gradient-hero pb-20 pt-32 lg:pb-32 lg:pt-40">
      {/* mesh backdrop */}
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-gradient-mesh blur-3xl animate-float-slow" />
        <div className="absolute -right-40 top-40 h-[28rem] w-[28rem] rounded-full bg-gradient-mesh blur-3xl animate-float" />
      </div>
      {/* floating icons */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <HeartPulse className="absolute left-[8%] top-[30%] h-6 w-6 text-primary/30 animate-float" />
        <Pill className="absolute left-[12%] top-[70%] h-5 w-5 text-secondary/30 animate-float-slow" />
        <Stethoscope className="absolute right-[10%] top-[22%] h-6 w-6 text-primary/30 animate-float-slow" />
        <Activity className="absolute right-[6%] bottom-[18%] h-5 w-5 text-secondary/30 animate-float" />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-14 px-4 lg:grid-cols-[1.05fr_1fr] lg:items-center">
        <div className="animate-fade-up">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-white/60 px-3 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-primary/60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            New — GPT-powered clinical summarisation is live
          </div>
          <h1 className="mt-5 text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-5xl xl:text-6xl">
            Transforming Health & Social Care with<br /> 
            {" "}
            <span className="text-gradient">Artificial Intelligence</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Empower healthcare providers, care workers, and organisations with AI-driven care planning, patient management, predictive analytics, and real-time collaboration.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="lg" asChild className="bg-gradient-primary text-white shadow-glow hover:opacity-95">
              <Link to="/login">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-border bg-white/60 backdrop-blur">
              Book a Demo
            </Button>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-primary" /> HIPAA & GDPR aligned</div>
            <div className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> 14-day free trial</div>
            <div className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> No credit card required</div>
          </div>
        </div>

        <div className="relative animate-fade-up" style={{ animationDelay: "150ms" }}>
          <div className="relative rounded-3xl bg-gradient-primary p-1.5 shadow-elevated">
            <div className="overflow-hidden rounded-[1.35rem] bg-white">
              <img src={dashboardHero} alt="MedixCare healthcare dashboard" width={1408} height={1008} className="h-auto w-full" />
            </div>
          </div>

          {/* floating cards */}
          <FloatingCard className="absolute -left-4 top-8 w-52 animate-float" style={{ animationDelay: "0.2s" }}>
            <div className="flex items-center gap-3">
              <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary/15 text-primary"><Brain className="h-4 w-4" /></div>
              <div>
                <div className="text-xs text-muted-foreground">AI Care Plan</div>
                <div className="text-sm font-semibold">Generated in 4.2s</div>
              </div>
            </div>
          </FloatingCard>

          <FloatingCard className="absolute -right-4 top-32 w-56 animate-float-slow">
            <div className="text-xs text-muted-foreground">Patient Recovery</div>
            <div className="mt-1 flex items-baseline gap-1">
              <div className="text-2xl font-bold">92%</div>
              <div className="text-xs font-medium text-emerald-600">↑ 8.4%</div>
            </div>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
              <div className="h-full w-[92%] rounded-full bg-gradient-primary" />
            </div>
          </FloatingCard>

          <FloatingCard className="absolute -left-6 bottom-16 w-56 animate-float" style={{ animationDelay: "0.6s" }}>
            <div className="flex items-center gap-3">
              <div className="grid h-9 w-9 place-items-center rounded-lg bg-amber-100 text-amber-600"><Pill className="h-4 w-4" /></div>
              <div className="min-w-0">
                <div className="truncate text-sm font-semibold">Metformin 500mg</div>
                <div className="text-xs text-muted-foreground">Due in 12 min</div>
              </div>
            </div>
          </FloatingCard>

          <FloatingCard className="absolute -right-6 bottom-8 w-52 animate-float-slow" style={{ animationDelay: "0.9s" }}>
            <div className="flex items-center gap-3">
              <div className="grid h-9 w-9 place-items-center rounded-lg bg-rose-100 text-rose-600">
                <Bell className="h-4 w-4" />
              </div>
              <div>
                <div className="text-xs font-medium text-rose-600">Emergency Alert</div>
                <div className="text-sm font-semibold">Room 214 · Fall</div>
              </div>
            </div>
          </FloatingCard>
        </div>
      </div>
    </section>
  );
}

function TrustedBy() {
  return (
    <section className="border-y border-border bg-white/60 py-14 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4">
        <p className="text-center text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Trusted by leading healthcare & social care providers
        </p>
        <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
          {providers.map((p) => (
            <div key={p.label} className="flex items-center justify-center gap-2 text-muted-foreground transition-colors hover:text-foreground">
              <p.icon className="h-5 w-5" strokeWidth={1.5} />
              <span className="text-sm font-semibold tracking-tight">{p.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionHeader({ eyebrow, title, desc }: { eyebrow: string; title: string; desc?: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <div className="inline-flex rounded-full border border-border bg-accent px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent-foreground">
        {eyebrow}
      </div>
      <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">{title}</h2>
      {desc && <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">{desc}</p>}
    </div>
  );
}

function Features() {
  return (
    <section id="features" className="relative py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader
          eyebrow="Features"
          title="A complete AI operating system for care"
          desc="Twelve integrated modules replacing spreadsheets, WhatsApp groups and paper charts — with an AI co-pilot at the centre of every workflow."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-elevated"
              style={{ animationDelay: `${i * 40}ms` }}
            >
              <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-primary opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-20" />
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-primary text-white shadow-glow transition-transform duration-300 group-hover:scale-110">
                <f.icon className="h-5 w-5" strokeWidth={2} />
              </div>
              <h3 className="mt-5 text-lg font-semibold tracking-tight text-foreground">{f.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section id="solutions" className="relative overflow-hidden bg-gradient-hero py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader
          eyebrow="How it works"
          title="From onboarding to outcomes in 5 steps"
          desc="Most organisations are live within 2–4 weeks. Here is what your first month with MedixCare looks like."
        />
        <div className="relative mt-12 grid gap-4 lg:grid-cols-5">
          <div aria-hidden className="absolute inset-x-0 top-[2.85rem] hidden h-px bg-border lg:block" />
          {steps.map((s, i) => (
            <div key={s.n} className="group relative">
              <div className="glass shadow-card h-full rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-elevated">
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-gradient">{s.n}</span>
                  <div className="relative z-10 grid h-9 w-9 place-items-center rounded-full bg-gradient-primary text-white text-xs font-bold shadow-glow">
                    {i + 1}
                  </div>
                </div>
                <h3 className="mt-4 text-lg font-semibold tracking-tight">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
              </div>
              {i < steps.length - 1 && (
                <ArrowRight className="absolute -right-3 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-primary/40 lg:block" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AIShowcase() {
  const suggestions = [
    "Generate today's care plan",
    "Summarize this medical report",
    "Predict patient risk",
    "When is the next medication?",
  ];
  return (
    <section id="ai" className="relative py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-start">
          <div>
            <div className="inline-flex rounded-full border border-border bg-accent px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent-foreground">
              AI Assistant
            </div>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Your clinical <span className="text-gradient">co-pilot</span>, always on shift
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Ask anything — from care plan drafting to risk prediction to shift handovers. MedixCare AI is trained on clinical guidance and grounded in your organisation's own data.
            </p>
            <div className="mt-6 space-y-3">
              {[
                { icon: Brain, text: "Grounded in NICE, NHS and your local policies" },
                { icon: ShieldCheck, text: "Zero-retention mode — no data used for training" },
                { icon: Zap, text: "Sub-second responses across 30+ languages" },
              ].map((r) => (
                <div key={r.text} className="flex items-start gap-3">
                  <div className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-md bg-primary/10 text-primary">
                    <r.icon className="h-3.5 w-3.5" />
                  </div>
                  <p className="text-sm text-foreground">{r.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 rounded-3xl bg-gradient-mesh opacity-40 blur-3xl" aria-hidden />
            <div className="relative glass shadow-elevated rounded-3xl p-5">
              <div className="flex items-center justify-between border-b border-border/60 pb-3">
                <div className="flex items-center gap-2">
                  <div className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-primary text-white">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">MedixCare AI</div>
                    <div className="text-xs text-emerald-600">● Online</div>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">Ward B · Shift 07:00–19:00</div>
              </div>

              <div className="mt-4 space-y-3">
                <div className="flex justify-end">
                  <div className="max-w-[85%] rounded-2xl rounded-tr-sm bg-gradient-primary px-4 py-2.5 text-sm text-white shadow-glow">
                    Summarize Mrs. Davies' discharge letter and flag any medication changes.
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-accent px-4 py-3 text-sm text-accent-foreground">
                    <div className="font-semibold text-foreground">Discharge Summary — Mrs. E. Davies (age 78)</div>
                    <ul className="mt-2 space-y-1 text-muted-foreground">
                      <li>• Admitted 12 May with CAP; treated with IV co-amoxiclav.</li>
                      <li>• Discharged 18 May, mobilising with frame.</li>
                      <li className="text-rose-600">• <span className="font-medium">New:</span> Apixaban 2.5mg BD — check renal function in 2 weeks.</li>
                      <li>• Follow-up: respiratory OPD in 6 weeks.</li>
                    </ul>
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="max-w-[85%] rounded-2xl rounded-tr-sm bg-gradient-primary px-4 py-2.5 text-sm text-white shadow-glow">
                    Predict her 30-day readmission risk.
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-accent px-4 py-3 text-sm text-accent-foreground">
                    <span className="font-semibold text-foreground">Moderate risk (28%)</span> — driven by age, polypharmacy and recent LOS.
                    Recommend a 72-hour community nurse review.
                  </div>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {suggestions.map((s) => (
                  <button key={s} className="rounded-full border border-border bg-white/70 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground">
                    {s}
                  </button>
                ))}
              </div>

              <div className="mt-4 flex items-center gap-2 rounded-2xl border border-border bg-white/80 px-4 py-3">
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
                <div className="flex-1 text-sm text-muted-foreground">Ask MedixCare AI…</div>
                <div className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-primary text-white shadow-glow">
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DashboardPreview() {
  const stats = [
    { icon: Users, label: "Active Patients", value: "1,284", trend: "+12.4%" },
    { icon: Calendar, label: "Appointments Today", value: "312", trend: "+3.1%" },
    { icon: Sparkles, label: "Care Plans Generated", value: "486", trend: "+28%" },
    { icon: Bell, label: "Open Alerts", value: "7", trend: "-4", negative: true },
  ];
  return (
    <section className="relative overflow-hidden bg-gradient-hero py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader
          eyebrow="Dashboard"
          title="Every metric that matters, in one glance"
          desc="From ward-level KPIs to organisation-wide outcomes — MedixCare surfaces the signal, not the noise."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="glass shadow-card rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-elevated">
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">{s.label}</div>
                <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                  <s.icon className="h-4 w-4" />
                </div>
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <div className="text-3xl font-bold tracking-tight">{s.value}</div>
                <div className={`text-xs font-semibold ${s.negative ? "text-rose-600" : "text-emerald-600"}`}>{s.trend}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 rounded-3xl bg-gradient-primary p-1.5 shadow-elevated">
          <div className="overflow-hidden rounded-[1.35rem] bg-white">
            <img src={dashboardHero} alt="MedixCare full dashboard" loading="lazy" width={1408} height={1008} className="h-auto w-full" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Benefits() {
  return (
    <section id="about" className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader
          eyebrow="Benefits"
          title="Outcomes your board will notice"
          desc="Measured across 40+ deployments in the UK and Europe over the last 18 months."
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b) => (
            <div key={b.title} className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-elevated">
              <div className="flex items-start justify-between">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-accent text-accent-foreground">
                  <b.icon className="h-5 w-5" />
                </div>
                <div className="text-3xl font-bold text-gradient">{b.metric}</div>
              </div>
              <h3 className="mt-5 text-lg font-semibold tracking-tight">{b.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-gradient-hero py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader eyebrow="Testimonials" title="Loved by care teams across the country" />
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t) => (
            <div key={t.name} className="glass shadow-card flex h-full flex-col rounded-2xl p-6">
              <div className="flex gap-0.5">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-foreground">"{t.quote}"</p>
              <div className="mt-5 flex items-center gap-3 border-t border-border/60 pt-4">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-primary text-sm font-bold text-white">
                  {t.initials}
                </div>
                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold">{t.name}</div>
                  <div className="truncate text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section id="pricing" className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader
          eyebrow="Pricing"
          title="Plans that grow with your organisation"
          desc="Transparent, per-organisation pricing. No hidden fees. Cancel anytime."
        />
        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {pricing.map((p) => (
            <div
              key={p.name}
              className={`relative flex flex-col rounded-3xl border p-8 transition-all ${
                p.popular
                  ? "border-transparent bg-gradient-primary text-white shadow-elevated lg:-translate-y-4"
                  : "border-border bg-card shadow-card hover:shadow-elevated"
              }`}
            >
              {p.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-white px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary shadow-card">
                  Most Popular
                </div>
              )}
              <div>
                <h3 className={`text-lg font-semibold ${p.popular ? "text-white" : ""}`}>{p.name}</h3>
                <p className={`mt-2 text-sm ${p.popular ? "text-white/80" : "text-muted-foreground"}`}>{p.desc}</p>
              </div>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-bold tracking-tight">{p.price}</span>
                <span className={p.popular ? "text-white/80" : "text-muted-foreground"}>{p.period}</span>
              </div>
              <ul className="mt-6 flex-1 space-y-3">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check className={`mt-0.5 h-4 w-4 shrink-0 ${p.popular ? "text-white" : "text-primary"}`} />
                    <span className={p.popular ? "text-white/90" : "text-foreground"}>{f}</span>
                  </li>
                ))}
              </ul>
              <Button
                size="lg"
                className={`mt-8 w-full ${
                  p.popular
                    ? "bg-white text-primary hover:bg-white/90"
                    : "bg-gradient-primary text-white shadow-glow hover:opacity-95"
                }`}
              >
                {p.name === "Enterprise" ? "Contact Sales" : "Start Free Trial"}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  return (
    <section className="bg-gradient-hero py-24 lg:py-32">
      <div className="mx-auto max-w-3xl px-4">
        <SectionHeader eyebrow="FAQ" title="Questions, answered" />
        <Accordion type="single" collapsible className="mt-10 space-y-3">
          {faqs.map((f, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="glass shadow-card rounded-2xl border-none px-5"
            >
              <AccordionTrigger className="py-5 text-left text-base font-semibold hover:no-underline">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-sm leading-relaxed text-muted-foreground">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section id="contact" className="py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-4">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-primary p-10 shadow-elevated sm:p-16 lg:p-20">
          <div aria-hidden className="pointer-events-none absolute inset-0 opacity-30">
            <div className="absolute -left-20 top-0 h-64 w-64 rounded-full bg-white/40 blur-3xl animate-float" />
            <div className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-white/30 blur-3xl animate-float-slow" />
          </div>
          <div className="relative text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Ready to Transform Healthcare with AI?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-white/85 sm:text-lg">
              Join hundreds of hospitals, clinics and care homes already delivering better outcomes with MedixCare.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                Start Free <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="border-white/40 bg-white/10 text-white backdrop-blur hover:bg-white/20 hover:text-white">
                Schedule Demo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const cols = [
    { title: "Product", items: ["Features", "Solutions", "Pricing", "AI Assistant", "Integrations"] },
    { title: "Company", items: ["About", "Customers", "Careers", "Blog", "Press"] },
    { title: "Resources", items: ["Documentation", "Help Center", "API Reference", "Security", "Status"] },
    { title: "Legal", items: ["Privacy Policy", "Terms of Service", "DPA", "HIPAA", "Contact"] },
  ];
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_2fr_1.2fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              MedixCare is the AI operating system for modern health and social care organisations.
            </p>
            <div className="mt-6 flex gap-2">
              {[Twitter, Linkedin, Github, Mail].map((Icon, i) => (
                <a key={i} href="#" className="grid h-9 w-9 place-items-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:border-primary hover:text-primary">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {cols.map((c) => (
              <div key={c.title}>
                <div className="text-sm font-semibold text-foreground">{c.title}</div>
                <ul className="mt-3 space-y-2">
                  {c.items.map((i) => (
                    <li key={i}>
                      <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">{i}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div>
            <div className="text-sm font-semibold text-foreground">Newsletter</div>
            <p className="mt-3 text-sm text-muted-foreground">Monthly digest on AI in healthcare. No spam.</p>
            <form className="mt-4 flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="you@hospital.org"
                className="flex-1 rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none focus:border-primary"
              />
              <Button size="sm" className="bg-gradient-primary text-white shadow-glow">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} MedixCare Health Systems Ltd. All rights reserved.</p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><ShieldCheck className="h-3.5 w-3.5" /> HIPAA</span>
            <span className="flex items-center gap-1"><ShieldCheck className="h-3.5 w-3.5" /> GDPR</span>
            <span className="flex items-center gap-1"><ShieldCheck className="h-3.5 w-3.5" /> ISO 27001</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main>
        <Hero />
        <TrustedBy />
        <Features />
        <HowItWorks />
        <AIShowcase />
        {/* <DashboardPreview /> */}
        <Benefits />
        <Testimonials />
        <Pricing />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}