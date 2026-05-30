import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const VISITOR_KEY = "grace-visitor-id";
const CONV_KEY = "grace-conv-id";

function ensureVisitorId() {
  if (typeof window === "undefined") return "";
  let v = localStorage.getItem(VISITOR_KEY);
  if (!v) {
    v = "v_" + Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
    localStorage.setItem(VISITOR_KEY, v);
  }
  return v;
}

type Msg = { id: string; sender: "visitor" | "admin"; body: string; created_at: string };

export function LiveChat() {
  const [open, setOpen] = useState(false);
  const [convId, setConvId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [text, setText] = useState("");
  const [messages, setMessages] = useState<Msg[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem(CONV_KEY);
    if (saved) setConvId(saved);
  }, []);

  useEffect(() => {
    if (!convId) return;
    supabase
      .from("chat_messages")
      .select("*")
      .eq("conversation_id", convId)
      .order("created_at")
      .then(({ data }) => setMessages((data ?? []) as Msg[]));

    const ch = supabase
      .channel("conv-" + convId)
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "chat_messages", filter: `conversation_id=eq.${convId}` }, (payload) => {
        setMessages((m) => [...m, payload.new as Msg]);
      })
      .subscribe();
    return () => { supabase.removeChannel(ch); };
  }, [convId]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 9e9, behavior: "smooth" });
  }, [messages.length, open]);

  const send = async () => {
    const body = text.trim();
    if (!body) return;
    let cid = convId;
    if (!cid) {
      const vid = ensureVisitorId();
      const { data, error } = await supabase
        .from("chat_conversations")
        .insert({ visitor_id: vid, visitor_name: name || null, visitor_phone: phone || null })
        .select("id")
        .single();
      if (error || !data) return;
      cid = data.id;
      setConvId(cid);
      localStorage.setItem(CONV_KEY, cid);
    }
    setText("");
    await supabase.from("chat_messages").insert({ conversation_id: cid, sender: "visitor", body });
    await supabase.from("chat_conversations").update({ last_message_at: new Date().toISOString() }).eq("id", cid);
  };

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Live chat"
        className="fixed bottom-6 right-6 z-50 grid h-14 w-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-glow transition-transform hover:scale-110"
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 flex w-[min(92vw,360px)] flex-col overflow-hidden rounded-3xl border border-border bg-background shadow-elevated"
          >
            <div className="bg-primary px-5 py-4 text-primary-foreground">
              <div className="font-display font-bold">Grace Solar Support</div>
              <div className="text-xs opacity-80">Live chat · we'll get back as soon as we can</div>
            </div>
            <div ref={scrollRef} className="max-h-[50vh] min-h-[200px] space-y-2 overflow-y-auto px-4 py-4">
              {messages.length === 0 && (
                <div className="rounded-2xl rounded-tl-sm bg-muted px-4 py-3 text-sm">
                  Hi 👋 Send us a message and we'll reply right here.
                </div>
              )}
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
                    m.sender === "visitor"
                      ? "ml-auto rounded-tr-sm bg-ink text-background"
                      : "mr-auto rounded-tl-sm bg-muted text-foreground"
                  }`}
                >
                  {m.body}
                </div>
              ))}
            </div>
            {!convId && (
              <div className="grid grid-cols-2 gap-2 border-t border-border px-3 pt-3">
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name (optional)" className="rounded-full border border-border bg-background px-3 py-2 text-xs outline-none focus:border-primary" />
                <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone (optional)" className="rounded-full border border-border bg-background px-3 py-2 text-xs outline-none focus:border-primary" />
              </div>
            )}
            <div className="flex items-end gap-2 border-t border-border px-3 py-3">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
                placeholder="Type a message…"
                rows={1}
                className="min-h-[40px] flex-1 resize-none rounded-2xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
              />
              <button onClick={send} className="grid h-10 w-10 place-items-center rounded-full bg-primary text-primary-foreground hover:scale-105 transition-transform" aria-label="Send">
                <Send className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
