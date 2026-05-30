import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { useProductLines } from "@/lib/products";

export default function Shop() {
  const { data: PRODUCTS = [], isLoading } = useProductLines();
  return (
    <SiteLayout>
      <Helmet>
        <title>Shop — Grace Solar Energy</title>
        <meta name="description" content="Browse Deye, Felicity, LV Topson, SunMate and Itel inverters and batteries." />
      </Helmet>
      <section className="mx-auto max-w-[1400px] px-6 pt-20">
        <div className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Shop / Brands</div>
        <h1 className="mt-6 font-display text-[clamp(3rem,10vw,9rem)] font-black leading-[0.9] tracking-tighter">The catalog.</h1>
        <p className="mt-8 max-w-xl text-lg text-muted-foreground">Pick a brand to see every inverter and battery we stock.</p>
      </section>

      <section className="mx-auto mt-20 max-w-[1400px] px-6 pb-32">
        {isLoading ? (
          <div className="py-20 text-center text-muted-foreground">Loading catalog…</div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {PRODUCTS.map((p, i) => (
              <motion.div key={p.slug} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ delay: i * 0.08, duration: 0.7 }}>
                <Link to={`/shop/${p.slug}`} className="group relative block overflow-hidden rounded-3xl border border-border bg-card p-8 transition-all hover:border-ink hover:-translate-y-1 hover:shadow-elevated md:p-12">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-mono text-xs text-muted-foreground">0{i + 1} / 0{PRODUCTS.length}</div>
                      <h2 className="mt-4 font-display text-4xl font-black tracking-tighter md:text-6xl">{p.name}</h2>
                      <p className="mt-3 text-sm text-primary">{p.tagline}</p>
                    </div>
                    <div className="grid h-12 w-12 place-items-center rounded-full bg-muted text-foreground transition-all group-hover:bg-primary group-hover:text-primary-foreground group-hover:rotate-45">
                      <ArrowUpRight className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="mt-12 flex gap-6 border-t border-border pt-6 text-sm">
                    <span className="text-muted-foreground"><span className="font-mono text-2xl font-bold text-foreground">{p.inverters.length}</span><span className="ml-2">Inverters</span></span>
                    <span className="text-muted-foreground"><span className="font-mono text-2xl font-bold text-foreground">{p.batteries.length}</span><span className="ml-2">Batteries</span></span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </SiteLayout>
  );
}
