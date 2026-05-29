import { AnimatePresence, motion } from "framer-motion";
import { X, Trash2, Plus, Minus, MessageCircle } from "lucide-react";
import { useCart, WHATSAPP_NUMBER } from "@/lib/cart";
import { findItem, formatNaira } from "@/lib/products";
import { useState } from "react";

export function CartDrawer() {
  const { open, setOpen, lines, setQty, remove, total, clear } = useCart();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");

  const checkout = () => {
    if (lines.length === 0) return;
    const itemsText = lines
      .map((l) => {
        const f = findItem(l.id);
        if (!f) return "";
        return `• ${f.item.name} (${f.item.spec}) x${l.qty} — ${formatNaira(f.item.price * l.qty)}`;
      })
      .filter(Boolean)
      .join("\n");
    const msg = [
      "*New Order — Grace Solar*",
      "",
      "*Items:*",
      itemsText,
      "",
      `*Total: ${formatNaira(total)}*`,
      "",
      "*Customer details:*",
      `Name: ${name || "-"}`,
      `Phone: ${phone || "-"}`,
      `Delivery address: ${address || "-"}`,
      note ? `Note: ${note}` : "",
    ]
      .filter(Boolean)
      .join("\n");
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-ink/60" onClick={() => setOpen(false)} />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 36 }}
            className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-background shadow-elevated"
          >
            <header className="flex items-center justify-between border-b border-border px-6 py-5">
              <h2 className="font-display text-2xl font-bold">Your cart</h2>
              <button onClick={() => setOpen(false)} className="rounded-full p-2 hover:bg-muted" aria-label="Close cart">
                <X className="h-5 w-5" />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto px-6 py-4">
              {lines.length === 0 ? (
                <p className="py-12 text-center text-sm text-muted-foreground">Your cart is empty.</p>
              ) : (
                <ul className="space-y-4">
                  {lines.map((l) => {
                    const f = findItem(l.id);
                    if (!f) return null;
                    return (
                      <li key={l.id} className="rounded-2xl border border-border p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="font-display font-semibold">{f.item.name}</div>
                            <div className="text-xs text-muted-foreground">{f.item.spec} · {f.line.name}</div>
                            <div className="mt-1 font-mono text-sm text-primary">{formatNaira(f.item.price)}</div>
                          </div>
                          <button onClick={() => remove(l.id)} className="text-muted-foreground hover:text-destructive" aria-label="Remove">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="mt-3 flex items-center gap-2">
                          <button onClick={() => setQty(l.id, l.qty - 1)} className="grid h-8 w-8 place-items-center rounded-full border border-border hover:bg-muted">
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-8 text-center font-mono text-sm">{l.qty}</span>
                          <button onClick={() => setQty(l.id, l.qty + 1)} className="grid h-8 w-8 place-items-center rounded-full border border-border hover:bg-muted">
                            <Plus className="h-3 w-3" />
                          </button>
                          <div className="ml-auto font-mono text-sm font-semibold">{formatNaira(f.item.price * l.qty)}</div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            {lines.length > 0 && (
              <div className="border-t border-border px-6 py-5 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" className="rounded-full border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary" />
                  <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" className="rounded-full border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary" />
                </div>
                <input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Delivery address" className="w-full rounded-full border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary" />
                <textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="Note (optional)" rows={2} className="w-full rounded-2xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary" />
                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs uppercase tracking-widest text-muted-foreground">Total</span>
                  <span className="font-display text-2xl font-bold">{formatNaira(total)}</span>
                </div>
                <button
                  onClick={checkout}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02]"
                >
                  <MessageCircle className="h-4 w-4" /> Checkout via WhatsApp
                </button>
                <button onClick={clear} className="w-full text-xs text-muted-foreground hover:text-foreground">Clear cart</button>
              </div>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}