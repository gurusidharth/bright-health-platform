import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  Check, CheckCheck, Image as ImageIcon, Mic, Paperclip, Phone, Search, Send, Video,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setActiveConversation, sendMessage } from "@/lib/slices/chatSlice";

export const Route = createFileRoute("/dashboard/chat")({
  component: ChatPage,
});

function ChatPage() {
  const dispatch = useAppDispatch();
  const conversations = useAppSelector((s) => s.chat.conversations);
  const activeId = useAppSelector((s) => s.chat.activeConversationId);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const active = conversations.find((c) => c.id === activeId) ?? conversations[0];

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [active?.messages.length, typing]);

  function handleSend() {
    const text = input.trim();
    if (!text || !active) return;
    dispatch(sendMessage({
      conversationId: active.id,
      message: { id: `m${active.messages.length}-${active.id}`, senderId: "me", text, timestamp: "Now", status: "sent" },
    }));
    setInput("");
    if (active.online) {
      setTyping(true);
      setTimeout(() => setTyping(false), 1200);
    }
  }

  if (!active) return null;

  return (
    <div className="flex h-[calc(100vh-8rem)] gap-4">
      <aside className="flex w-full max-w-xs shrink-0 flex-col rounded-2xl border border-border bg-card shadow-card">
        <div className="border-b border-border p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input placeholder="Search chats…" className="w-full rounded-xl border border-border bg-background py-2 pl-9 pr-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
          </div>
        </div>
        <ul className="flex-1 overflow-y-auto">
          {conversations.map((c) => (
            <li key={c.id}>
              <button
                onClick={() => dispatch(setActiveConversation(c.id))}
                className={`flex w-full items-center gap-3 border-b border-border/60 px-4 py-3 text-left transition-colors ${
                  c.id === active.id ? "bg-accent" : "hover:bg-accent/60"
                }`}
              >
                <div className="relative shrink-0">
                  <div className="grid h-11 w-11 place-items-center rounded-full bg-gradient-primary text-sm font-semibold text-white">
                    {c.avatarInitials}
                  </div>
                  {c.online && <span className="absolute -right-0.5 -bottom-0.5 h-3 w-3 rounded-full border-2 border-card bg-emerald-500" />}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate text-sm font-semibold">{c.name}</span>
                    <span className="shrink-0 text-[10px] text-muted-foreground">{c.lastMessageAt}</span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate text-xs text-muted-foreground">{c.lastMessage}</span>
                    {c.unreadCount > 0 && (
                      <span className="grid h-4 min-w-4 shrink-0 place-items-center rounded-full bg-primary px-1 text-[10px] font-semibold text-white">{c.unreadCount}</span>
                    )}
                  </div>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </aside>

      <div className="flex flex-1 flex-col rounded-2xl border border-border bg-card shadow-card">
        <div className="flex items-center justify-between border-b border-border px-5 py-3.5">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-primary text-sm font-semibold text-white">
                {active.avatarInitials}
              </div>
              {active.online && <span className="absolute -right-0.5 -bottom-0.5 h-2.5 w-2.5 rounded-full border-2 border-card bg-emerald-500" />}
            </div>
            <div>
              <div className="text-sm font-semibold">{active.name}</div>
              <div className="text-xs text-muted-foreground">{active.online ? "Online" : "Offline"}</div>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <button className="rounded-lg p-2 text-muted-foreground hover:bg-accent hover:text-foreground" aria-label="voice call"><Phone className="h-4 w-4" /></button>
            <button className="rounded-lg p-2 text-muted-foreground hover:bg-accent hover:text-foreground" aria-label="video call"><Video className="h-4 w-4" /></button>
          </div>
        </div>

        <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto bg-[repeating-linear-gradient(135deg,transparent,transparent_40px,var(--muted)_40px,var(--muted)_41px)] px-5 py-4">
          {active.messages.map((m) => (
            <div key={m.id} className={`flex ${m.senderId === "me" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[70%] rounded-2xl px-4 py-2 text-sm shadow-sm ${
                m.senderId === "me" ? "rounded-tr-sm bg-gradient-primary text-white" : "rounded-tl-sm bg-card text-foreground"
              }`}>
                <div>{m.text}</div>
                <div className={`mt-1 flex items-center justify-end gap-1 text-[10px] ${m.senderId === "me" ? "text-white/70" : "text-muted-foreground"}`}>
                  {m.timestamp}
                  {m.senderId === "me" && (m.status === "read" ? <CheckCheck className="h-3 w-3" /> : <Check className="h-3 w-3" />)}
                </div>
              </div>
            </div>
          ))}
          {typing && (
            <div className="flex justify-start">
              <div className="rounded-2xl rounded-tl-sm bg-card px-4 py-2.5 text-sm text-muted-foreground shadow-sm">{active.name.split(" ")[0]} is typing…</div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 border-t border-border p-3">
          <button className="grid h-9 w-9 shrink-0 place-items-center rounded-lg text-muted-foreground hover:bg-accent hover:text-foreground" aria-label="attach image"><ImageIcon className="h-4 w-4" /></button>
          <button className="grid h-9 w-9 shrink-0 place-items-center rounded-lg text-muted-foreground hover:bg-accent hover:text-foreground" aria-label="attach file"><Paperclip className="h-4 w-4" /></button>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type a message…"
            className="flex-1 rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
          {input.trim() ? (
            <button onClick={handleSend} className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-gradient-primary text-white shadow-glow hover:opacity-95" aria-label="send"><Send className="h-4 w-4" /></button>
          ) : (
            <button className="grid h-9 w-9 shrink-0 place-items-center rounded-lg text-muted-foreground hover:bg-accent hover:text-foreground" aria-label="voice message"><Mic className="h-4 w-4" /></button>
          )}
        </div>
      </div>
    </div>
  );
}
