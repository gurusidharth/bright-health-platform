import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  Brain, Download, FileText, Mic, Plus, Send, Sparkles, TrendingUp, Upload,
} from "lucide-react";
import { medicationStats } from "@/lib/data/medications";
import { patients } from "@/lib/data/patients";

export const Route = createFileRoute("/dashboard/ai-assistant")({
  component: AIAssistantPage,
});

type Message = { id: string; role: "user" | "assistant"; text: string; timestamp: string };

const history = [
  { id: "h1", title: "Care plan for Margaret O'Neill", date: "Today" },
  { id: "h2", title: "Discharge summary review", date: "Yesterday" },
  { id: "h3", title: "Ward 3B rota optimisation", date: "2 days ago" },
  { id: "h4", title: "Readmission risk — cardiology", date: "1 week ago" },
];

const suggestions = [
  "Generate today's care plan",
  "Summarize this medical report",
  "Predict patient risk",
  "When is the next medication due?",
];

const quickActions = [
  { label: "Generate Care Plan", icon: Sparkles },
  { label: "Summarize PDF", icon: FileText },
  { label: "Risk Prediction", icon: TrendingUp },
];

const highRisk = patients.filter((p) => p.risk === "High");

function canonicalReply(prompt: string): string {
  const p = prompt.toLowerCase();
  if (p.includes("care plan")) {
    return `Draft care plan generated for ${patients[0].name}: continue current medication schedule, daily mobility exercises, and a nurse review in 48 hours. A qualified clinician should review before this goes live.`;
  }
  if (p.includes("summar")) {
    return "Here's a summary: the uploaded report shows stable vitals with one new medication change flagged for renal function monitoring in two weeks.";
  }
  if (p.includes("risk")) {
    return `Based on current vitals and history, ${highRisk.length} patients are flagged high-risk this week: ${highRisk.map((p) => p.name).join(", ")}. Recommend prioritising review for ${highRisk[0]?.name}.`;
  }
  if (p.includes("medication")) {
    return `Medication compliance across your caseload is currently ${medicationStats.complianceRate}%. The next dose due is Metformin 500mg for Margaret O'Neill.`;
  }
  return "I've reviewed the relevant records — everything looks within normal parameters. Let me know if you'd like a deeper breakdown on a specific patient or ward.";
}

function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    { id: "seed", role: "assistant", text: "Good morning, Dr. Hart. You have 3 critical alerts and 8 appointments today. Would you like a summary?", timestamp: "8:00 AM" },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;
    const userMsg: Message = { id: `u${messages.length}`, role: "user", text: trimmed, timestamp: "Now" };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setMessages((m) => [...m, { id: `a${m.length}`, role: "assistant", text: canonicalReply(trimmed), timestamp: "Now" }]);
      setTyping(false);
    }, 900);
  }

  return (
    <div className="flex h-[calc(100vh-8rem)] gap-4">
      <aside className="hidden w-64 shrink-0 flex-col rounded-2xl border border-border bg-card p-4 shadow-card lg:flex">
        <button
          onClick={() => setMessages([{ id: "seed", role: "assistant", text: "New conversation started. How can I help?", timestamp: "Now" }])}
          className="flex items-center justify-center gap-2 rounded-xl bg-gradient-primary px-3 py-2 text-sm font-medium text-white shadow-glow hover:opacity-95"
        >
          <Plus className="h-4 w-4" /> New Chat
        </button>
        <div className="mt-5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Conversation History</div>
        <ul className="mt-2 flex-1 space-y-1 overflow-y-auto">
          {history.map((h) => (
            <li key={h.id}>
              <button className="w-full rounded-lg px-3 py-2 text-left text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
                <div className="truncate font-medium text-foreground">{h.title}</div>
                <div className="text-xs">{h.date}</div>
              </button>
            </li>
          ))}
        </ul>
        <button className="mt-3 flex items-center justify-center gap-2 rounded-lg border border-border py-2 text-xs font-medium text-muted-foreground hover:text-foreground">
          <Download className="h-3.5 w-3.5" /> Export Chat
        </button>
      </aside>

      <div className="flex flex-1 flex-col rounded-2xl border border-border bg-card shadow-card">
        <div className="flex items-center gap-3 border-b border-border px-5 py-4">
          <div className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-primary text-white shadow-glow">
            <Brain className="h-4 w-4" />
          </div>
          <div>
            <div className="text-sm font-semibold">MedixCare AI Assistant</div>
            <div className="text-xs text-emerald-600">● Online — grounded in your organisation's data</div>
          </div>
        </div>

        <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-5 py-4">
          {messages.map((m) => (
            <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm ${
                m.role === "user" ? "rounded-tr-sm bg-gradient-primary text-white shadow-glow" : "rounded-tl-sm bg-accent text-accent-foreground"
              }`}>
                {m.text}
              </div>
            </div>
          ))}
          {typing && (
            <div className="flex justify-start">
              <div className="rounded-2xl rounded-tl-sm bg-accent px-4 py-2.5 text-sm text-muted-foreground">MedixCare AI is typing…</div>
            </div>
          )}
        </div>

        {messages.length <= 1 && (
          <div className="flex flex-wrap gap-2 px-5 pb-2">
            {suggestions.map((s) => (
              <button key={s} onClick={() => send(s)} className="rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground">
                {s}
              </button>
            ))}
          </div>
        )}

        <div className="flex flex-wrap gap-2 border-t border-border px-5 py-3">
          {quickActions.map((a) => (
            <button key={a.label} onClick={() => send(a.label)} className="inline-flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 text-xs font-medium text-muted-foreground hover:border-primary/40 hover:text-foreground">
              <a.icon className="h-3.5 w-3.5 text-primary" /> {a.label}
            </button>
          ))}
          <button className="inline-flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 text-xs font-medium text-muted-foreground hover:border-primary/40 hover:text-foreground">
            <Upload className="h-3.5 w-3.5 text-primary" /> Upload Report
          </button>
        </div>

        <div className="flex items-center gap-2 border-t border-border p-4">
          <button className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-border text-muted-foreground hover:text-foreground" aria-label="voice input">
            <Mic className="h-4 w-4" />
          </button>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send(input)}
            placeholder="Ask MedixCare AI…"
            className="flex-1 rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
          <button
            onClick={() => send(input)}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-gradient-primary text-white shadow-glow hover:opacity-95"
            aria-label="send"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
