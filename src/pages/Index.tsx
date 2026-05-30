import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { ArrowUpRight, Zap, Battery, Cpu, ShieldCheck, Leaf, ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { useProductLines } from "@/lib/products";
import heroImg from "@/assets/hero-system.jpg";

const STATS = [
  { v: "5", l: "Brands" },
  { v: "40+", l: "Products" },
  { v: "100%", l: "Genuine" },
  { v: "2yr+", l: "Warranty" },
];

const FEATURES = [
  { icon: Zap, t: "Hybrid Inverters", d: "Deye, Felicity, LV Topson and more — all power ranges in stock." },
  { icon: Battery, t: "LiFePO4 Storage", d: "Lithium and tubular batteries from trusted brands, BMS protected." },
  { icon: Cpu, t: "Solar Systems", d: "Full solar packages — panels, inverter, batteries and installation." },
  { icon: ShieldCheck, t: "Genuine Stock", d: "Authentic products with full manufacturer warranty." },
  { icon: Leaf, t: "Power Tanks", d: "All-in-one Itel power tanks — plug-and-play backup units." },
  { icon: ArrowUpRight, t: "Lagos Delivery", d: "Fast delivery anywhere in Lagos and across Nigeria." },
];

export default function Index() {
  const { data: lines = [] } = useProductLines();
  return (
    <SiteLayout>
      <Helmet>
        <title>Grace Solar Energy — Inverters, Batteries & Solar Systems in Lagos</title>
        <meta name="description" content="Grace Solar Energy stocks Deye, Felicity, Itel, LV Topson and SunMate solar inverters and batteries in Alaba International Market, Lagos." />
      </Helmet>

      <section className="relative overflow-hidden bg-ink text-background">
        <div className="absolute inset-0">
          <img src={heroImg} alt="Grace Solar inverter and battery system" className="h-full w-full object-cover opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/30 to-ink" />
        </div>
        <div className="relative mx-auto flex min-h-[92vh] max-w-[1400px] flex-col justify-end px-6 pb-20 pt-32">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-xs font-semibold uppercase tracking-[0.3em] text-primary-glow">
            <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-primary-glow align-middle animate-pulse" />
            Grace Solar Energy / Lagos
          </motion.div>

          <h1 className="mt-6 font-display text-[clamp(3rem,10vw,9rem)] font-black leading-[0.9] tracking-tighter text-balance">
            Power, <span className="italic text-primary-glow">on tap.</span>
          </h1>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.8 }} className="mt-10 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
            <p className="max-w-md text-base text-background/85">
              Genuine solar inverters, batteries and power systems from Deye, Felicity,
              LV Topson, SunMate and Itel — sold at Alaba International Market, Lagos.
            </p>
            <div className="flex items-center gap-3">
              <Link to="/shop" className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-4 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-105">
                Shop products <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link to="/contacts" className="inline-flex items-center gap-2 rounded-full border border-background/20 px-6 py-4 text-sm font-semibold hover:bg-background/10">
                Get a quote
              </Link>
            </div>
          </motion.div>
        </div>
        <div className="relative overflow-hidden border-y border-background/10 bg-ink py-5">
          <div className="marquee-track flex w-max gap-12 whitespace-nowrap text-2xl font-semibold text-background/70">
            {Array.from({ length: 2 }).map((_, k) => (
              <div key={k} className="flex items-center gap-12">
                {["Deye", "Felicity", "LV Topson", "SunMate", "Itel", "Solar Panels"].map((w, i) => (
                  <span key={i} className="flex items-center gap-12">{w}<span className="text-primary-glow">✦</span></span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto grid max-w-[1400px] grid-cols-2 divide-x divide-border md:grid-cols-4">
          {STATS.map((s, i) => (
            <motion.div key={s.l} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="px-8 py-12">
              <div className="font-display text-5xl font-black tracking-tighter">{s.v}</div>
              <div className="mt-2 text-sm text-muted-foreground">{s.l}</div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 py-32">
        <div className="grid items-end gap-12 md:grid-cols-2">
          <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] font-black leading-[0.95] tracking-tighter text-balance">
            Everything you need <span className="italic text-primary">to stay powered.</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Walk into our shop at Alaba International Market or shop online — we've got the right inverter and battery for your home, shop or office.
          </p>
        </div>
        <div className="mt-20 grid gap-px overflow-hidden rounded-3xl bg-border md:grid-cols-3">
          {FEATURES.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div key={f.t} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ delay: i * 0.08, duration: 0.6 }} className="group relative bg-background p-10 transition-colors hover:bg-ink hover:text-background">
                <div className="mb-12 grid h-14 w-14 place-items-center rounded-full bg-muted text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-display text-2xl font-bold tracking-tight">{f.t}</h3>
                <p className="mt-3 text-sm text-muted-foreground transition-colors group-hover:text-background/70">{f.d}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className="bg-ink text-background">
        <div className="mx-auto max-w-[1400px] px-6 py-32">
          <div className="flex items-end justify-between gap-8">
            <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] font-black leading-[0.95] tracking-tighter">Our brands.</h2>
            <Link to="/shop" className="hidden items-center gap-2 text-sm text-background/60 hover:text-primary-glow md:inline-flex">
              Full catalog <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-16 divide-y divide-background/10 border-y border-background/10">
            {lines.map((p, i) => (
              <Link key={p.slug} to={`/shop/${p.slug}`} className="group flex items-center justify-between py-8 transition-colors hover:text-primary-glow">
                <div className="flex items-baseline gap-8">
                  <span className="font-mono text-sm text-background/70">0{i + 1}</span>
                  <span className="font-display text-3xl font-bold tracking-tight md:text-5xl">{p.name}</span>
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

      <section className="mx-auto max-w-[1400px] px-6 py-32">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-primary p-12 text-ink md:p-20">
          <h3 className="font-display text-[clamp(2rem,5vw,4rem)] font-black leading-[0.95] tracking-tighter">Need help choosing?</h3>
          <p className="mt-4 max-w-xl text-ink/80">Chat with us live on the site or send a WhatsApp message — we'll size the right system for you.</p>
          <Link to="/contacts" className="mt-10 inline-flex items-center gap-2 rounded-full bg-ink px-7 py-4 text-sm font-semibold text-background hover:scale-105 transition-transform">
            Talk to us <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
