import { useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import { SiteLayout } from "@/components/SiteLayout";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { formatNaira, type DbProduct } from "@/lib/products";
import { Trash2, Plus, Save, Upload, ExternalLink, MessageSquare, Package } from "lucide-react";
import { WHATSAPP_NUMBER } from "@/lib/cart";

export default function Admin() {
  const { user, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState<"products" | "messages">("products");

  useEffect(() => {
    if (!loading && !user) navigate("/auth");
  }, [loading, user, navigate]);

  if (loading || !user) {
    return <SiteLayout><div className="mx-auto max-w-xl px-6 py-32 text-center text-muted-foreground">Checking access…</div></SiteLayout>;
  }

  if (!isAdmin) {
    return (
      <SiteLayout>
        <div className="mx-auto max-w-xl px-6 py-32 text-center">
          <h1 className="font-display text-4xl font-black tracking-tighter">Not authorised</h1>
          <p className="mt-3 text-muted-foreground">This account ({user.email}) is not an admin.</p>
          <button onClick={signOut} className="mt-6 rounded-full bg-ink px-5 py-2.5 text-sm text-background">Sign out</button>
        </div>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <Helmet><title>Admin — Grace Solar Energy</title><meta name="robots" content="noindex" /></Helmet>
      <section className="mx-auto max-w-[1400px] px-6 pt-12">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-primary">Admin</div>
            <h1 className="mt-2 font-display text-5xl font-black tracking-tighter">Dashboard</h1>
          </div>
          <div className="flex gap-2">
            <Link to="/shop" className="rounded-full border border-border px-4 py-2 text-sm hover:bg-muted">View shop</Link>
            <button onClick={signOut} className="rounded-full border border-border px-4 py-2 text-sm hover:bg-muted">Sign out</button>
          </div>
        </div>
        <div className="mt-8 inline-flex rounded-full border border-border bg-card p-1.5">
          {(["products", "messages"] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)} className={`inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold ${tab === t ? "bg-ink text-background" : "text-foreground"}`}>
              {t === "products" ? <Package className="h-4 w-4" /> : <MessageSquare className="h-4 w-4" />}
              {t === "products" ? "Products" : "Messages"}
            </button>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 py-12">
        {tab === "products" ? <ProductsAdmin /> : <MessagesAdmin />}
      </section>
    </SiteLayout>
  );
}

const empty = (): Partial<DbProduct> => ({ line_slug: "", line_name: "", kind: "inverter", name: "", spec: "", power: "", price: 0, description: "", features: [], image_url: null, sort_order: 0 });

function ProductsAdmin() {
  const qc = useQueryClient();
  const { data = [] } = useQuery({
    queryKey: ["admin-products"],
    queryFn: async () => {
      const { data } = await supabase.from("products").select("*").order("line_slug").order("kind").order("sort_order");
      return (data ?? []) as DbProduct[];
    },
  });
  const [editing, setEditing] = useState<Partial<DbProduct> | null>(null);
  const refresh = () => { qc.invalidateQueries({ queryKey: ["admin-products"] }); qc.invalidateQueries({ queryKey: ["products"] }); };
  const remove = async (id: string) => { if (!confirm("Delete this product?")) return; await supabase.from("products").delete().eq("id", id); refresh(); };

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_420px]">
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-2xl font-bold">{data.length} products</h2>
          <button onClick={() => setEditing(empty())} className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-bold text-primary-foreground">
            <Plus className="h-4 w-4" /> Add product
          </button>
        </div>
        <div className="space-y-2">
          {data.map((p) => (
            <button key={p.id} onClick={() => setEditing(p)} className="flex w-full items-center gap-3 rounded-2xl border border-border p-3 text-left hover:border-ink">
              {p.image_url ? <img src={p.image_url} alt="" className="h-12 w-12 rounded-lg object-cover" /> : <div className="h-12 w-12 rounded-lg bg-muted" />}
              <div className="flex-1">
                <div className="font-semibold">{p.name}</div>
                <div className="text-xs text-muted-foreground">{p.line_name} · {p.kind} · {p.spec}</div>
              </div>
              <div className="font-mono text-sm text-primary">{formatNaira(p.price)}</div>
              <button onClick={(e) => { e.stopPropagation(); remove(p.id); }} className="rounded-full p-2 text-muted-foreground hover:text-destructive">
                <Trash2 className="h-4 w-4" />
              </button>
            </button>
          ))}
          {data.length === 0 && <div className="py-8 text-center text-sm text-muted-foreground">No products yet. Click "Add product".</div>}
        </div>
      </div>
      <div>{editing && <ProductEditor key={editing.id ?? "new"} initial={editing} onSaved={() => { setEditing(null); refresh(); }} onClose={() => setEditing(null)} />}</div>
    </div>
  );
}

function ProductEditor({ initial, onSaved, onClose }: { initial: Partial<DbProduct>; onSaved: () => void; onClose: () => void }) {
  const [p, setP] = useState<Partial<DbProduct>>(initial);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const set = <K extends keyof DbProduct>(k: K, v: DbProduct[K]) => setP((prev) => ({ ...prev, [k]: v }));

  const upload = async (file: File) => {
    setBusy(true); setError(null);
    const path = `${(p.line_slug || "misc")}/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
    const { error } = await supabase.storage.from("product-images").upload(path, file, { upsert: true });
    if (error) { setError(error.message); setBusy(false); return; }
    const { data } = supabase.storage.from("product-images").getPublicUrl(path);
    set("image_url", data.publicUrl);
    setBusy(false);
  };

  const save = async () => {
    setBusy(true); setError(null);
    const payload = {
      line_slug: p.line_slug || "", line_name: p.line_name || "", kind: p.kind || "inverter",
      name: p.name || "", spec: p.spec || "", power: p.power || "", price: Number(p.price) || 0,
      description: p.description || "", features: p.features || [], image_url: p.image_url || null,
      sort_order: Number(p.sort_order) || 0,
    };
    const res = p.id ? await supabase.from("products").update(payload).eq("id", p.id) : await supabase.from("products").insert(payload);
    setBusy(false);
    if (res.error) setError(res.error.message); else onSaved();
  };

  return (
    <div className="sticky top-28 rounded-3xl border border-border bg-card p-6">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-xl font-bold">{p.id ? "Edit product" : "New product"}</h3>
        <button onClick={onClose} className="text-sm text-muted-foreground hover:text-foreground">Close</button>
      </div>
      <div className="mt-4 space-y-3 text-sm">
        <div className="grid grid-cols-2 gap-3">
          <Input label="Brand slug" value={p.line_slug ?? ""} onChange={(v) => set("line_slug", v)} placeholder="deye" />
          <Input label="Brand name" value={p.line_name ?? ""} onChange={(v) => set("line_name", v)} placeholder="Deye" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <label className="block">
            <div className="text-xs text-muted-foreground">Kind</div>
            <select value={p.kind} onChange={(e) => set("kind", e.target.value as DbProduct["kind"])} className="mt-1 w-full rounded-full border border-border bg-background px-4 py-2.5">
              <option value="inverter">Inverter</option>
              <option value="battery">Battery</option>
            </select>
          </label>
          <Input label="Sort order" type="number" value={String(p.sort_order ?? 0)} onChange={(v) => set("sort_order", Number(v))} />
        </div>
        <Input label="Product name" value={p.name ?? ""} onChange={(v) => set("name", v)} placeholder="Deye 5 KVA" />
        <div className="grid grid-cols-2 gap-3">
          <Input label="Spec" value={p.spec ?? ""} onChange={(v) => set("spec", v)} placeholder="48 Volts" />
          <Input label="Power" value={p.power ?? ""} onChange={(v) => set("power", v)} placeholder="5,000 VA" />
        </div>
        <Input label="Price (₦)" type="number" value={String(p.price ?? 0)} onChange={(v) => set("price", Number(v))} />
        <label className="block">
          <div className="text-xs text-muted-foreground">Description</div>
          <textarea value={p.description ?? ""} onChange={(e) => set("description", e.target.value)} rows={3} className="mt-1 w-full rounded-2xl border border-border bg-background px-4 py-2.5" />
        </label>
        <Input label="Features (comma separated)" value={(p.features ?? []).join(", ")} onChange={(v) => set("features", v.split(",").map((s) => s.trim()).filter(Boolean))} />
        <label className="block">
          <div className="text-xs text-muted-foreground">Image</div>
          {p.image_url && <img src={p.image_url} alt="" className="mt-2 h-32 w-full rounded-2xl object-cover" />}
          <label className="mt-2 inline-flex cursor-pointer items-center gap-2 rounded-full border border-border px-4 py-2 hover:bg-muted">
            <Upload className="h-4 w-4" /> Upload image
            <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])} />
          </label>
        </label>
        {error && <div className="rounded-2xl bg-destructive/10 px-4 py-3 text-xs text-destructive">{error}</div>}
        <button disabled={busy} onClick={save} className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground disabled:opacity-60">
          <Save className="h-4 w-4" /> {busy ? "Saving…" : "Save"}
        </button>
      </div>
    </div>
  );
}

function Input({ label, value, onChange, type = "text", placeholder }: { label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string }) {
  return (
    <label className="block">
      <div className="text-xs text-muted-foreground">{label}</div>
      <input type={type} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} className="mt-1 w-full rounded-full border border-border bg-background px-4 py-2.5" />
    </label>
  );
}

type Conv = { id: string; visitor_id: string; visitor_name: string | null; visitor_phone: string | null; last_message_at: string };
type Msg = { id: string; sender: "visitor" | "admin"; body: string; created_at: string };

function MessagesAdmin() {
  const qc = useQueryClient();
  const { data: convs = [] } = useQuery({
    queryKey: ["admin-conversations"],
    queryFn: async () => {
      const { data } = await supabase.from("chat_conversations").select("*").order("last_message_at", { ascending: false });
      return (data ?? []) as Conv[];
    },
    refetchInterval: 5000,
  });
  const [activeId, setActiveId] = useState<string | null>(null);
  useEffect(() => { if (!activeId && convs[0]) setActiveId(convs[0].id); }, [convs, activeId]);
  const active = convs.find((c) => c.id === activeId);

  return (
    <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
      <aside className="rounded-3xl border border-border bg-card p-3">
        <div className="px-2 py-2 text-xs uppercase tracking-widest text-muted-foreground">Conversations ({convs.length})</div>
        <div className="max-h-[70vh] space-y-1 overflow-y-auto">
          {convs.map((c) => (
            <button key={c.id} onClick={() => setActiveId(c.id)} className={`block w-full rounded-2xl px-3 py-2 text-left ${activeId === c.id ? "bg-ink text-background" : "hover:bg-muted"}`}>
              <div className="text-sm font-semibold">{c.visitor_name || "Visitor"}</div>
              <div className={`text-xs ${activeId === c.id ? "opacity-80" : "text-muted-foreground"}`}>{c.visitor_phone || c.visitor_id.slice(0, 12)}</div>
              <div className={`text-[10px] ${activeId === c.id ? "opacity-70" : "text-muted-foreground"}`}>{new Date(c.last_message_at).toLocaleString()}</div>
            </button>
          ))}
          {convs.length === 0 && <div className="px-3 py-4 text-sm text-muted-foreground">No messages yet.</div>}
        </div>
      </aside>
      <div>
        {active ? <ConversationView key={active.id} conv={active} onChange={() => qc.invalidateQueries({ queryKey: ["admin-conversations"] })} /> : <div className="rounded-3xl border border-border p-8 text-center text-muted-foreground">Select a conversation.</div>}
      </div>
    </div>
  );
}

function ConversationView({ conv, onChange }: { conv: Conv; onChange: () => void }) {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [text, setText] = useState("");

  useEffect(() => {
    supabase.from("chat_messages").select("*").eq("conversation_id", conv.id).order("created_at").then(({ data }) => setMessages((data ?? []) as Msg[]));
    const ch = supabase.channel("admin-conv-" + conv.id)
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "chat_messages", filter: `conversation_id=eq.${conv.id}` }, (payload) => {
        setMessages((m) => [...m, payload.new as Msg]);
      })
      .subscribe();
    return () => { supabase.removeChannel(ch); };
  }, [conv.id]);

  const send = async () => {
    const body = text.trim();
    if (!body) return;
    setText("");
    await supabase.from("chat_messages").insert({ conversation_id: conv.id, sender: "admin", body });
    await supabase.from("chat_conversations").update({ last_message_at: new Date().toISOString() }).eq("id", conv.id);
    onChange();
  };

  const waText = encodeURIComponent(`Hello ${conv.visitor_name || ""}, this is Grace Solar following up on your enquiry.`);
  const waPhone = (conv.visitor_phone || "").replace(/\D/g, "");
  const waLink = waPhone ? `https://wa.me/${waPhone.startsWith("0") ? "234" + waPhone.slice(1) : waPhone}?text=${waText}` : `https://wa.me/${WHATSAPP_NUMBER}?text=${waText}`;

  return (
    <div className="rounded-3xl border border-border bg-card">
      <header className="flex items-center justify-between border-b border-border px-5 py-4">
        <div>
          <div className="font-display text-lg font-bold">{conv.visitor_name || "Visitor"}</div>
          <div className="text-xs text-muted-foreground">{conv.visitor_phone || conv.visitor_id}</div>
        </div>
        <a href={waLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-bold text-primary-foreground">
          <ExternalLink className="h-3 w-3" /> Open in WhatsApp
        </a>
      </header>
      <div className="max-h-[55vh] space-y-2 overflow-y-auto p-5">
        {messages.map((m) => (
          <div key={m.id} className={`max-w-[75%] rounded-2xl px-4 py-2 text-sm ${m.sender === "admin" ? "ml-auto rounded-tr-sm bg-ink text-background" : "mr-auto rounded-tl-sm bg-muted"}`}>{m.body}</div>
        ))}
        {messages.length === 0 && <div className="py-8 text-center text-sm text-muted-foreground">No messages yet.</div>}
      </div>
      <div className="flex items-end gap-2 border-t border-border p-3">
        <textarea value={text} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }} rows={1} placeholder="Type a reply…" className="min-h-[40px] flex-1 resize-none rounded-2xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary" />
        <button onClick={send} className="rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground">Send</button>
      </div>
    </div>
  );
}
