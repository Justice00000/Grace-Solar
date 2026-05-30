import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowUpRight, Zap, Battery, Cpu, ShieldCheck, Leaf, ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { useProductLines } from "@/lib/products";
import heroImg from "@/assets/hero-system.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Grace Solar — Power, Reimagined" },
      { name: "description", content: "Premium solar inverters, batteries and hybrid systems engineered for clean, reliable power — for homes, businesses and the grid." },
      { property: "og:title", content: "Grace Solar — Power, Reimagined" },
      { property: "og:description", content: "Premium solar inverters, batteries and hybrid systems engineered for clean, reliable power." },
      { property: "og:url", content: "https://grace-solar-roar.lovable.app/" },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "canonical", href: "https://grace-solar-roar.lovable.app/" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Grace Solar",
          url: "https://grace-solar-roar.lovable.app/",
          email: "hello@gracesolar.com",
          telephone: "+1-415-555-0123",
          address: {
            "@type": "PostalAddress",
            streetAddress: "120 Solar Ave",
            addressLocality: "Reno",
            addressRegion: "NV",
            postalCode: "89501",
            addressCountry: "US",
          },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Grace Solar",
          url: "https://grace-solar-roar.lovable.app/",
        }),
      },
    ],
  }),
  component: Index,
});

const STATS = [
  { v: "120MW+", l: "Deployed" },
  { v: "48", l: "Countries" },
  { v: "99.2%", l: "Uptime" },
  { v: "10yr", l: "Warranty" },
];

const FEATURES = [
  { icon: Zap, t: "Hybrid Inverters", d: "MPPT-optimized inverters that intelligently balance solar, grid and storage." },
  { icon: Battery, t: "LiFePO4 Storage", d: "Modular battery stacks built for 6,000+ cycles and decades of reliable life." },
  { icon: Cpu, t: "Smart EMS", d: "Predictive energy management with real-time monitoring from anywhere." },
  { icon: ShieldCheck, t: "Built to Last", d: "IP65 enclosures, hot-swap modules and field-serviceable architecture." },
  { icon: Leaf, t: "Net-Zero Ready", d: "Engineered to take your home or operation completely off fossil fuels." },
  { icon: ArrowUpRight, t: "Scales With You", d: "From 1kWh portable units to 250kWh containers — one ecosystem." },
];

function Index() {
  const { data: lines = [] } = useProductLines();
  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative overflow-hidden bg-ink text-background">
        <div className="absolute inset-0">
          <img src={heroImg} alt="Grace Solar inverter and battery system" className="h-full w-full object-cover opacity-60" width={1920} height={1080} />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/30 to-ink" />
        </div>
        <div className="relative mx-auto flex min-h-[92vh] max-w-[1400px] flex-col justify-end px-6 pb-20 pt-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-[12ch] text-xs font-medium uppercase tracking-[0.3em] text-primary-glow"
          >
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary-glow mr-2 align-middle animate-pulse" />
            Grace Solar / 2026
          </motion.div>

          <h1 className="mt-6 font-display text-[clamp(3rem,10vw,9rem)] font-bold leading-[0.9] tracking-tighter text-balance">
            {"Power,".split("").map((c, i) => (
              <motion.span
                key={"a" + i}
                initial={{ y: 120, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.1 + i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                className="inline-block"
              >{c === " " ? "\u00A0" : c}</motion.span>
            ))}
            <br />
            <span className="text-primary-glow italic">
              {"reimagined.".split("").map((c, i) => (
                <motion.span
                  key={"b" + i}
                  initial={{ y: 120, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.9, delay: 0.5 + i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                  className="inline-block"
                >{c === " " ? "\u00A0" : c}</motion.span>
              ))}
            </span>
          </h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-10 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end"
          >
            <p className="max-w-md text-base text-background/85">
              Grace Solar engineers next-generation solar inverters and battery storage —
              built for the homes, businesses and grids of a renewable century.
            </p>
            <div className="flex items-center gap-3">
              <Link
                to="/shop"
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-4 text-sm font-medium text-primary-foreground shadow-glow transition-transform hover:scale-105"
              >
                Explore systems
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 rounded-full border border-background/20 px-6 py-4 text-sm font-medium hover:bg-background/10"
              >
                Our story
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Marquee */}
        <div className="relative overflow-hidden border-y border-background/10 bg-ink py-5">
          <div className="marquee-track flex w-max gap-12 whitespace-nowrap text-2xl font-medium text-background/70">
            {Array.from({ length: 2 }).map((_, k) => (
              <div key={k} className="flex items-center gap-12">
                {["Solar Inverters", "Hybrid Systems", "LiFePO4 Storage", "Off-grid", "Smart EMS", "Industrial"].map((w, i) => (
                  <span key={i} className="flex items-center gap-12">
                    {w}
                    <span className="text-primary-glow">✦</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-b border-border">
        <div className="mx-auto grid max-w-[1400px] grid-cols-2 divide-x divide-border md:grid-cols-4">
          {STATS.map((s, i) => (
            <motion.div
              key={s.l}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="px-8 py-12"
            >
              <div className="font-display text-5xl font-bold tracking-tighter">{s.v}</div>
              <div className="mt-2 text-sm text-muted-foreground">{s.l}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="mx-auto max-w-[1400px] px-6 py-32">
        <div className="grid items-end gap-12 md:grid-cols-2">
          <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[0.95] tracking-tighter text-balance">
            An ecosystem engineered <span className="italic text-primary">end&#8209;to&#8209;end.</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            From the cell chemistry to the cloud dashboard — every layer of Grace Solar
            is built in-house, so the system you install today keeps getting smarter for years.
          </p>
        </div>

        <div className="mt-20 grid gap-px overflow-hidden rounded-3xl bg-border md:grid-cols-3">
          {FEATURES.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.t}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
                className="group relative bg-background p-10 transition-colors hover:bg-ink hover:text-background"
              >
                <div className="mb-12 grid h-14 w-14 place-items-center rounded-full bg-muted text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-display text-2xl font-semibold tracking-tight">{f.t}</h3>
                <p className="mt-3 text-sm text-muted-foreground transition-colors group-hover:text-background/70">{f.d}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* PRODUCT TEASER */}
      <section className="bg-ink text-background">
        <div className="mx-auto max-w-[1400px] px-6 py-32">
          <div className="flex items-end justify-between gap-8">
            <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[0.95] tracking-tighter">
              Product lines.
            </h2>
            <Link to="/shop" className="hidden items-center gap-2 text-sm text-background/60 hover:text-primary-glow md:inline-flex">
              Full catalog <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-16 divide-y divide-background/10 border-y border-background/10">
            {lines.map((p, i) => (
              <Link
                key={p.slug}
                to="/shop/$productName"
                params={{ productName: p.slug }}
                className="group flex items-center justify-between py-8 transition-colors hover:text-primary-glow"
              >
                <div className="flex items-baseline gap-8">
                  <span className="font-mono text-sm text-background/70">0{i + 1}</span>
                  <span className="font-display text-3xl font-semibold tracking-tight md:text-5xl">
                    {p.name}
                  </span>
                </div>
                <div className="flex items-center gap-6">
                  <span className="hidden text-sm text-background/80 md:block">{p.tagline}</span>
                  <ArrowUpRight className="h-6 w-6 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-[1400px] px-6 py-32">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-primary p-12 text-ink md:p-20">
          <h3 className="font-display text-[clamp(2rem,5vw,4rem)] font-bold leading-[0.95] tracking-tighter">
            Ready to power your future?
          </h3>
          <p className="mt-4 max-w-xl text-ink/80">
            Talk to a Grace Solar engineer about sizing a system for your home, business
            or project. Free consultation, custom proposal in 48 hours.
          </p>
          <Link
            to="/contacts"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-ink px-7 py-4 text-sm font-medium text-background hover:scale-105 transition-transform"
          >
            Get a quote <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
