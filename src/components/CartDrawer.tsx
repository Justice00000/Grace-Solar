import { AnimatePresence, motion } from "framer-motion";
import { X, Trash2, Plus, Minus, MessageCircle, Upload, Copy, Check } from "lucide-react";
import { useCart, WHATSAPP_NUMBER } from "@/lib/cart";
import { formatNaira } from "@/lib/products";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const BANK = {
  account: "1229123507",
  name: "Grace Solar Energy",
  bank: "Zenith Bank",
};

export function CartDrawer() {
  const { open, setOpen, lines, setQty, remove, total, clear } = useCart();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const copyAccount = async () => {
    await navigator.clipboard.writeText(BANK.account);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const checkout = async () => {
    if (lines.length === 0) return;
    setError(null);
    if (!name.trim() || !phone.trim() || !email.trim() || !address.trim()) {
      setError("Please fill in your name, phone, email and delivery address.");
      return;
    }
    if (!proofFile) {
      setError("Please upload your proof of payment (screenshot or receipt).");
      return;
    }

    setBusy(true);
    try {
      // 1. Upload proof to storage
      const ext = proofFile.name.split(".").pop() || "jpg";
      const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
      const { error: upErr } = await supabase.storage
        .from("payment-proofs")
        .upload(path, proofFile, { upsert: false, contentType: proofFile.type });
      if (upErr) throw upErr;
      const { data: pub } = supabase.storage.from("payment-proofs").getPublicUrl(path);
      const proofUrl = pub.publicUrl;

      // 2. Save order to database
      const items = lines.map((l) => ({
        id: l.id,
        name: l.name,
        spec: l.spec,
        line_name: l.line_name,
        price: l.price,
        qty: l.qty,
        subtotal: l.price * l.qty,
      }));
      const { error: insErr } = await supabase.from("orders").insert({
        full_name: name,
        email,
        phone,
        address,
        note: note || null,
        items,
        total,
        proof_url: proofUrl,
      });
      if (insErr) throw insErr;

      // 3. Open WhatsApp with the full order
      const itemsText = lines
        .map((l) => `• ${l.name} (${l.spec}) x${l.qty} — ${formatNaira(l.price * l.qty)}`)
        .join("\n");
      const msg = [
        "*New Order — Grace Solar*",
        "",
        "*Items:*",
        itemsText,
        "",
        `*Total: ${formatNaira(total)}*`,
        "",
        "*Payment to:*",
        `${BANK.bank} — ${BANK.account} (${BANK.name})`,
        "",
        "*Customer:*",
        `Name: ${name}`,
        `Phone: ${phone}`,
        `Email: ${email}`,
        `Address: ${address}`,
        note ? `Note: ${note}` : "",
        "",
        "*Proof of payment:*",
        proofUrl,
      ]
        .filter(Boolean)
        .join("\n");
      const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
      window.open(url, "_blank", "noopener,noreferrer");

      // 4. Reset
      clear();
      setName(""); setPhone(""); setEmail(""); setAddress(""); setNote(""); setProofFile(null);
      setOpen(false);
    } catch (e: any) {
      setError(e?.message || "Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[60]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-ink/60" onClick={() => !busy && setOpen(false)} />
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
                <>
                  <ul className="space-y-4">
                    {lines.map((l) => (
                      <li key={l.id} className="rounded-2xl border border-border p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-start gap-3">
                            {l.image_url && (
                              <img src={l.image_url} alt={l.name} className="h-14 w-14 rounded-lg object-cover" />
                            )}
                            <div>
                              <div className="font-display font-semibold">{l.name}</div>
                              <div className="text-xs text-muted-foreground">{l.spec} · {l.line_name}</div>
                              <div className="mt-1 font-mono text-sm text-primary">{formatNaira(l.price)}</div>
                            </div>
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
                          <div className="ml-auto font-mono text-sm font-semibold">{formatNaira(l.price * l.qty)}</div>
                        </div>
                      </li>
                    ))}
                  </ul>

                  {/* Bank details */}
                  <div className="mt-6 rounded-2xl border-2 border-primary/30 bg-primary/5 p-4">
                    <div className="text-xs font-bold uppercase tracking-widest text-primary">Pay into this account</div>
                    <div className="mt-3 space-y-1.5">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs text-muted-foreground">Bank</span>
                        <span className="font-display font-bold">{BANK.bank}</span>
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs text-muted-foreground">Account name</span>
                        <span className="font-display font-bold">{BANK.name}</span>
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs text-muted-foreground">Account number</span>
                        <button onClick={copyAccount} className="inline-flex items-center gap-1.5 rounded-full bg-background px-3 py-1 font-mono text-base font-bold tracking-wider hover:bg-muted">
                          {BANK.account}
                          {copied ? <Check className="h-3.5 w-3.5 text-primary" /> : <Copy className="h-3.5 w-3.5 text-muted-foreground" />}
                        </button>
                      </div>
                      <div className="flex items-center justify-between gap-2 pt-1">
                        <span className="text-xs text-muted-foreground">Amount</span>
                        <span className="font-display text-lg font-black text-primary">{formatNaira(total)}</span>
                      </div>
                    </div>
                    <p className="mt-3 text-[11px] leading-relaxed text-muted-foreground">
                      Transfer the total above, then upload your payment screenshot below and submit the order.
                    </p>
                  </div>
                </>
              )}
            </div>

            {lines.length > 0 && (
              <div className="border-t border-border px-6 py-5 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" className="rounded-full border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary" />
                  <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" className="rounded-full border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary" />
                </div>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address" className="w-full rounded-full border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary" />
                <input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Delivery address" className="w-full rounded-full border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary" />
                <textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="Note (optional)" rows={2} className="w-full rounded-2xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary" />

                <label className="flex cursor-pointer items-center justify-between gap-3 rounded-2xl border-2 border-dashed border-border bg-background px-4 py-3 text-sm hover:border-primary">
                  <div className="flex items-center gap-2">
                    <Upload className="h-4 w-4 text-primary" />
                    <span className="font-semibold">
                      {proofFile ? proofFile.name : "Upload proof of payment"}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">{proofFile ? "Change" : "Required"}</span>
                  <input
                    type="file"
                    accept="image/*,application/pdf"
                    className="hidden"
                    onChange={(e) => setProofFile(e.target.files?.[0] || null)}
                  />
                </label>

                {error && (
                  <div className="rounded-2xl bg-destructive/10 px-4 py-2.5 text-xs font-medium text-destructive">{error}</div>
                )}

                <button
                  onClick={checkout}
                  disabled={busy}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02] disabled:opacity-60 disabled:hover:scale-100"
                >
                  <MessageCircle className="h-4 w-4" /> {busy ? "Submitting…" : "Submit order"}
                </button>
                <button onClick={clear} disabled={busy} className="w-full text-xs text-muted-foreground hover:text-foreground disabled:opacity-60">Clear cart</button>
              </div>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
