import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";
import { WHATSAPP_NUMBER } from "@/lib/cart";

export function WhatsAppChat() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");

  const send = () => {
    const msg = text.trim() || "Hello Grace Solar, I'd like to enquire about your products.";
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Chat on WhatsApp"
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
            className="fixed bottom-24 right-6 z-50 w-[min(92vw,360px)] overflow-hidden rounded-3xl border border-border bg-background shadow-elevated"
          >
            <div className="bg-primary px-5 py-4 text-primary-foreground">
              <div className="font-display font-bold">Grace Solar Support</div>
              <div className="text-xs opacity-80">Typically replies in minutes · via WhatsApp</div>
            </div>
            <div className="space-y-3 px-5 py-4">
              <div className="rounded-2xl rounded-tl-sm bg-muted px-4 py-3 text-sm">
                Hi 👋 How can we help you today? Send a message and we'll continue on WhatsApp.
              </div>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type your message…"
                rows={3}
                className="w-full resize-none rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
              />
              <button
                onClick={send}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:scale-[1.02] transition-transform"
              >
                <Send className="h-4 w-4" /> Send on WhatsApp
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}