import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ArrowLeft, Zap, Battery, Check } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { getProduct, type Item } from "@/lib/products";
import inverterImg from "@/assets/inverter.jpg";
import batteryImg from "@/assets/battery.jpg";

export const Route = createFileRoute("/shop/$productName")({
  loader: ({ params }) => {
    const product = getProduct(params.productName);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.name} — Grace Solar` },
          { name: "description", content: loaderData.product.description },
          { property: "og:title", content: `${loaderData.product.name} — Grace Solar` },
          { property: "og:description", content: loaderData.product.description },
          { property: "og:url", content: `https://grace-solar-roar.lovable.app/shop/${loaderData.product.slug}` },
          { property: "og:type", content: "product" },
        ]
      : [],
    links: loaderData
      ? [{ rel: "canonical", href: `https://grace-solar-roar.lovable.app/shop/${loaderData.product.slug}` }]
      : [],
    scripts: loaderData
      ? [
          {
            type: "application/ld+json",
            children: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              name: loaderData.product.name,
              description: loaderData.product.description,
              brand: { "@type": "Brand", name: "Grace Solar" },
              url: `https://grace-solar-roar.lovable.app/shop/${loaderData.product.slug}`,
            }),
          },
        ]
      : [],
  }),
  component: ProductLine,
  notFoundComponent: () => (
    <SiteLayout>
      <div className="mx-auto max-w-xl px-6 py-32 text-center">
        <h1 className="font-display text-5xl font-bold tracking-tighter">Not in catalog</h1>
        <p className="mt-4 text-muted-foreground">That product line doesn't exist.</p>
        <Link to="/shop" className="mt-8 inline-block rounded-full bg-ink px-6 py-3 text-sm text-background">
          Back to shop
        </Link>
      </div>
    </SiteLayout>
  ),
});

type Tab = "inverter" | "battery";

function ProductLine() {
  const { product } = Route.useLoaderData();
  const [tab, setTab] = useState<Tab>("inverter");
  const items: Item[] = tab === "inverter" ? product.inverters : product.batteries;
  const heroImg = tab === "inverter" ? inverterImg : batteryImg;

  return (
    <SiteLayout>
      <section className="mx-auto max-w-[1400px] px-6 pt-12">
        <Link to="/shop" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> All product lines
        </Link>
        <div className="mt-10 grid items-end gap-8 md:grid-cols-2">
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.3em] text-primary">{product.tagline}</div>
            <h1 className="mt-4 font-display text-[clamp(3rem,9vw,8rem)] font-bold leading-[0.9] tracking-tighter">
              {product.name}
            </h1>
          </div>
          <p className="text-lg text-muted-foreground">{product.description}</p>
        </div>
      </section>

      {/* Tabs */}
      <section className="mx-auto mt-16 max-w-[1400px] px-6">
        <h2 className="sr-only">Select product type</h2>
        <div className="inline-flex rounded-full border border-border bg-card p-1.5">
          {(["inverter", "battery"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="relative rounded-full px-6 py-3 text-sm font-medium capitalize transition-colors"
            >
              {tab === t && (
                <motion.span
                  layoutId="tab-pill"
                  className="absolute inset-0 rounded-full bg-ink"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
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

      {/* Items grid with feature image */}
      <section className="mx-auto mt-12 max-w-[1400px] px-6 pb-32">
        <h2 className="sr-only">{tab === "inverter" ? "Inverters" : "Batteries"} in {product.name}</h2>
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="grid gap-6 lg:grid-cols-[1.1fr_2fr]"
          >
            <div className="overflow-hidden rounded-3xl bg-ink">
              <img
                src={heroImg}
                alt={`${product.name} ${tab}`}
                width={1200}
                height={1200}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="grid gap-4">
              {items.map((item, i) => (
                <motion.article
                  key={item.id}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.08 }}
                  className="group rounded-2xl border border-border bg-card p-8 transition-all hover:border-ink hover:shadow-elevated"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-4">
                    <div>
                      <h2 className="font-display text-3xl font-bold tracking-tight">{item.name}</h2>
                      <p className="mt-1 text-sm text-muted-foreground">{item.spec}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Rated</div>
                      <div className="font-display text-2xl font-semibold text-primary">{item.power}</div>
                    </div>
                  </div>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {item.features.map((f) => (
                      <li key={f} className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5 text-xs text-foreground">
                        <Check className="h-3 w-3 text-primary" /> {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/contacts"
                    className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-foreground group-hover:text-primary"
                  >
                    Request quote →
                  </Link>
                </motion.article>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </section>
    </SiteLayout>
  );
}