import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { SiteLayout } from "@/components/SiteLayout";

export default function About() {
  return (
    <SiteLayout>
      <Helmet>
        <title>About — Grace Solar Energy</title>
        <meta name="description" content="Grace Solar Energy supplies genuine solar inverters and batteries at Alaba International Market, Lagos." />
      </Helmet>
      <section className="mx-auto max-w-[1400px] px-6 pt-20">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">About / Who we are</motion.div>
        <h1 className="mt-6 font-display text-[clamp(3rem,10vw,9rem)] font-black leading-[0.9] tracking-tighter text-balance">
          Customer satisfaction, <span className="italic text-primary">our priority.</span>
        </h1>
        <p className="mt-10 max-w-2xl text-lg text-muted-foreground">
          Grace Solar Energy is a trusted dealer of solar inverters, batteries and power systems based in Alaba International Market, Lagos. We supply genuine products from Deye, Felicity, LV Topson, SunMate and Itel — backed by full manufacturer warranties.
        </p>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 py-32">
        <div className="grid gap-12 md:grid-cols-3">
          {[
            { t: "Genuine products", d: "Every inverter and battery is sourced direct — full manufacturer warranty included." },
            { t: "Expert advice", d: "We'll size the right system for your home, shop or office — free consultation." },
            { t: "Lagos delivery", d: "Same-day pickup in Alaba, fast delivery anywhere across Nigeria." },
          ].map((c) => (
            <div key={c.t} className="rounded-3xl border border-border p-8">
              <h3 className="font-display text-2xl font-bold">{c.t}</h3>
              <p className="mt-3 text-muted-foreground">{c.d}</p>
            </div>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
