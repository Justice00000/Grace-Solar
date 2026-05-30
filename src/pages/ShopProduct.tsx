import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ArrowLeft, Zap, Battery, Check } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { useProductLine, formatNaira, type DbProduct } from "@/lib/products";
import { useCart } from "@/lib/cart";

type Tab = "inverter" | "battery";

export default function ShopProduct() {
  const { productName = "" } = useParams();
  const { data: product, isLoading } = useProductLine(productName);
  const [tab, setTab] = useState<Tab>("inverter");
  const { add, setOpen } = useCart();

  if (isLoading) {
    return (
      <SiteLayout>
        <div className="mx-auto max-w-xl px-6 py-32 text-center text-muted-foreground">Loading…</div>
      </SiteLayout>
    );
  }

  if (!product) {
    return (
      <SiteLayout>
        <div className="mx-auto max-w-xl px-6 py-32 text-center">
          <h1 className="font-display text-5xl font-black tracking-tighter">Not in catalog</h1>
          <p className="mt-4 text-muted-foreground">That brand isn't in our shop.</p>
          <Link to="/shop" className="mt-8 inline-block rounded-full bg-ink px-6 py-3 text-sm text-background">Back to shop</Link>
        </div>
      </SiteLayout>
    );
  }

  const items: DbProduct[] = tab === "inverter" ? product.inverters : product.batteries;

  return (
    <SiteLayout>
      <Helmet>
        <title>{product.name} — Grace Solar Energy</title>
        <meta name="description" content={`Shop ${product.name} inverters and batteries at Grace Solar Energy, Lagos.`} />
      </Helmet>
      <section className="mx-auto max-w-[1400px] px-6 pt-12">
        <Link to="/shop" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> All brands
        </Link>
        <div className="mt-10 grid items-end gap-8 md:grid-cols-2">
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.3em] text-primary">{product.tagline}</div>
            <h1 className="mt-4 font-display text-[clamp(3rem,9vw,8rem)] font-black leading-[0.9] tracking-tighter">{product.name}</h1>
          </div>
          <p className="text-lg text-muted-foreground">{product.description}</p>
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-[1400px] px-6">
        <div className="inline-flex rounded-full border border-border bg-card p-1.5">
          {(["inverter", "battery"] as Tab[]).map((t) => (
            <button key={t} onClick={() => setTab(t)} className="relative rounded-full px-6 py-3 text-sm font-semibold capitalize transition-colors">
              {tab === t && <motion.span layoutId="tab-pill" className="absolute inset-0 rounded-full bg-ink" transition={{ type: "spring", stiffness: 380, damping: 30 }} />}
              <span className={`relative z-10 inline-flex items-center gap-2 ${tab === t ? "text-background" : "text-foreground"}`}>
                {t === "inverter" ? <Zap className="h-4 w-4" /> : <Battery className="h-4 w-4" />}
                {t === "inverter" ? "Inverters" : "Batteries"}
                <span className={`ml-1 rounded-full px-2 py-0.5 text-xs ${tab === t ? "bg-background/20" : "bg-muted"}`}>
                  {t === "inverter" ? product.inverters.length : product.batteries.length}
                </span>
              </span>
            </button>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-12 max-w-[1400px] px-6 pb-32">
        <AnimatePresence mode="wait">
          <motion.div key={tab} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }} className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {items.map((item, i) => (
              <motion.article key={item.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 + i * 0.05 }} className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-card transition-all hover:border-ink hover:shadow-elevated">
                <div className="aspect-square overflow-hidden bg-muted">
                  {item.image_url ? (
                    <img src={item.image_url} alt={item.name} loading="lazy" className="h-full w-full object-cover transition-transform group-hover:scale-105" />
                  ) : (
                    <div className="grid h-full w-full place-items-center text-muted-foreground text-xs">No image</div>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-display text-xl font-bold tracking-tight">{item.name}</h3>
                      <p className="mt-1 text-xs text-muted-foreground">{item.spec} · {item.power}</p>
                    </div>
                    <div className="font-display text-lg font-bold text-primary whitespace-nowrap">{formatNaira(item.price)}</div>
                  </div>
                  {item.description && <p className="mt-3 text-sm text-muted-foreground line-clamp-3">{item.description}</p>}
                  {item.features.length > 0 && (
                    <ul className="mt-4 flex flex-wrap gap-1.5">
                      {item.features.slice(0, 4).map((f) => (
                        <li key={f} className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-[10px] font-semibold text-foreground">
                          <Check className="h-2.5 w-2.5 text-primary" /> {f}
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className="mt-auto flex gap-2 pt-5">
                    <button
                      onClick={() => {
                        add({ id: item.id, name: item.name, spec: item.spec, price: item.price, line_name: product.name, image_url: item.image_url });
                        setOpen(true);
                      }}
                      className="flex-1 rounded-full bg-primary px-4 py-2.5 text-xs font-bold text-primary-foreground transition-transform hover:scale-105"
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </AnimatePresence>
        {items.length === 0 && <div className="py-16 text-center text-muted-foreground">No {tab}s in this brand yet.</div>}
      </section>
    </SiteLayout>
  );
}
