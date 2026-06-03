import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Zap, Battery, Check, ChevronLeft, ChevronRight } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { useProductLine, useProductLines, formatNaira, type DbProduct } from "@/lib/products";
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

      <RelatedProducts currentSlug={product.slug} />
    </SiteLayout>
  );
}

function RelatedProducts({ currentSlug }: { currentSlug: string }) {
  const { data: lines = [] } = useProductLines();
  const { add, setOpen } = useCart();
  const scrollerRef = useRef<HTMLDivElement>(null);

  // Flatten all products from other brands
  const related: Array<DbProduct & { line_name: string; line_slug: string }> = [];
  for (const line of lines) {
    if (line.slug === currentSlug) continue;
    for (const p of [...line.inverters, ...line.batteries]) {
      related.push({ ...p, line_name: line.name, line_slug: line.slug });
    }
  }

  // Auto-scroll the carousel
  useEffect(() => {
    if (related.length === 0) return;
    const el = scrollerRef.current;
    if (!el) return;
    let paused = false;
    const onEnter = () => { paused = true; };
    const onLeave = () => { paused = false; };
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    const id = setInterval(() => {
      if (paused || !el) return;
      const max = el.scrollWidth - el.clientWidth;
      if (el.scrollLeft >= max - 4) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollBy({ left: 280, behavior: "smooth" });
      }
    }, 3200);
    return () => {
      clearInterval(id);
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [related.length]);

  const scroll = (dir: 1 | -1) => {
    scrollerRef.current?.scrollBy({ left: dir * 320, behavior: "smooth" });
  };

  if (related.length === 0) return null;

  return (
    <section className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-[1400px] px-6 py-16">
        <div className="flex items-end justify-between gap-4">
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.3em] text-primary">Discover more</div>
            <h2 className="mt-2 font-display text-4xl font-black tracking-tighter md:text-5xl">Related products</h2>
          </div>
          <div className="hidden gap-2 md:flex">
            <button onClick={() => scroll(-1)} aria-label="Scroll left" className="grid h-11 w-11 place-items-center rounded-full border border-border bg-background hover:bg-muted">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button onClick={() => scroll(1)} aria-label="Scroll right" className="grid h-11 w-11 place-items-center rounded-full border border-border bg-background hover:bg-muted">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div
          ref={scrollerRef}
          className="mt-8 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {related.map((item, i) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: (i % 6) * 0.04 }}
              className="group flex w-[260px] flex-shrink-0 snap-start flex-col overflow-hidden rounded-3xl border border-border bg-card transition-all hover:border-ink hover:shadow-elevated md:w-[280px]"
            >
              <Link to={`/shop/${item.line_slug}`} className="block aspect-square overflow-hidden bg-muted">
                {item.image_url ? (
                  <img src={item.image_url} alt={item.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                ) : (
                  <div className="grid h-full w-full place-items-center text-xs text-muted-foreground">No image</div>
                )}
              </Link>
              <div className="flex flex-1 flex-col p-5">
                <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{item.line_name}</div>
                <h3 className="mt-1 font-display text-base font-bold leading-tight">{item.name}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{item.spec}{item.power ? ` · ${item.power}` : ""}</p>
                <div className="mt-2 font-display text-lg font-black text-primary">{formatNaira(item.price)}</div>
                <button
                  onClick={() => {
                    add({ id: item.id, name: item.name, spec: item.spec, price: item.price, line_name: item.line_name, image_url: item.image_url });
                    setOpen(true);
                  }}
                  className="mt-auto inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-primary px-4 py-2.5 pt-2.5 text-xs font-bold text-primary-foreground transition-transform hover:scale-[1.03]"
                >
                  Add to cart
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
