import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { PRODUCTS } from "@/lib/products";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop — Grace Solar Product Lines" },
      { name: "description", content: "Explore Grace Solar product lines: hybrid inverters, LiFePO4 storage, off-grid and industrial systems." },
    ],
  }),
  component: Shop,
});

function Shop() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-[1400px] px-6 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs font-medium uppercase tracking-[0.3em] text-primary"
        >
          Shop / Product lines
        </motion.div>
        <h1 className="mt-6 font-display text-[clamp(3rem,10vw,9rem)] font-bold leading-[0.9] tracking-tighter">
          The catalog.
        </h1>
        <p className="mt-8 max-w-xl text-lg text-muted-foreground">
          Five product lines, one ecosystem. Pick a family to explore its inverters and batteries.
        </p>
      </section>

      <section className="mx-auto mt-20 max-w-[1400px] px-6 pb-32">
        <div className="grid gap-6 md:grid-cols-2">
          {PRODUCTS.map((p, i) => (
            <motion.div
              key={p.slug}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                to="/shop/$productName"
                params={{ productName: p.slug }}
                className="group relative block overflow-hidden rounded-3xl border border-border bg-card p-8 transition-all hover:border-ink hover:-translate-y-1 hover:shadow-elevated md:p-12"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-mono text-xs text-muted-foreground">0{i + 1} / 0{PRODUCTS.length}</div>
                    <h2 className="mt-4 font-display text-4xl font-bold tracking-tighter md:text-6xl">
                      {p.name}
                    </h2>
                    <p className="mt-3 text-sm text-primary">{p.tagline}</p>
                  </div>
                  <div className="grid h-12 w-12 place-items-center rounded-full bg-muted text-foreground transition-all group-hover:bg-primary group-hover:text-primary-foreground group-hover:rotate-45">
                    <ArrowUpRight className="h-5 w-5" />
                  </div>
                </div>
                <p className="mt-12 max-w-md text-sm text-muted-foreground">{p.description}</p>
                <div className="mt-8 flex gap-6 border-t border-border pt-6 text-sm">
                  <span className="text-muted-foreground">
                    <span className="font-mono text-2xl font-semibold text-foreground">{p.inverters.length}</span>
                    <span className="ml-2">Inverters</span>
                  </span>
                  <span className="text-muted-foreground">
                    <span className="font-mono text-2xl font-semibold text-foreground">{p.batteries.length}</span>
                    <span className="ml-2">Batteries</span>
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}