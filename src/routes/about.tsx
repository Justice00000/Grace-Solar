import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { SiteLayout } from "@/components/SiteLayout";
import farm from "@/assets/about-farm.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Grace Solar" },
      { name: "description", content: "Grace Solar is an energy systems company building intelligent solar inverters and storage for a renewable century." },
    ],
  }),
  component: About,
});

const TIMELINE = [
  { y: "2014", t: "Founded", d: "Grace Solar opens its first lab in Reno, NV with a team of four engineers." },
  { y: "2017", t: "First inverter", d: "We ship the Grace Edge — a 3kW off-grid inverter built for telecom sites." },
  { y: "2020", t: "Hybrid platform", d: "Launch of the Grace Hybrid all-in-one residential platform across 12 countries." },
  { y: "2023", t: "Industrial scale", d: "Grace Titan containers go live powering EV charging hubs across Europe." },
  { y: "2026", t: "Today", d: "120MW+ deployed, 48 countries, and a global engineering team of 300+." },
];

function About() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-[1400px] px-6 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-xs font-medium uppercase tracking-[0.3em] text-primary"
        >
          About / The company
        </motion.div>
        <h1 className="mt-6 font-display text-[clamp(3rem,10vw,9rem)] font-bold leading-[0.9] tracking-tighter text-balance">
          We engineer <span className="italic text-primary">honest</span> energy.
        </h1>
        <p className="mt-10 max-w-2xl text-lg text-muted-foreground">
          Grace Solar exists because the energy transition deserves hardware that's as
          ambitious as the mission. We design our inverters, batteries and control
          software in-house — so every system we ship is built to outlive its warranty.
        </p>
      </section>

      <section className="mx-auto mt-20 max-w-[1400px] px-6">
        <div className="overflow-hidden rounded-[2rem]">
          <motion.img
            src={farm}
            alt="Aerial view of a Grace Solar deployment"
            width={1600}
            height={1000}
            loading="lazy"
            initial={{ scale: 1.1 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            className="h-[60vh] w-full object-cover"
          />
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 py-32">
        <div className="grid gap-16 md:grid-cols-[1fr_2fr]">
          <h2 className="font-display text-4xl font-bold tracking-tighter md:sticky md:top-32 md:self-start md:text-6xl">
            Our<br />trajectory.
          </h2>
          <ol className="relative border-l border-border pl-8">
            {TIMELINE.map((e, i) => (
              <motion.li
                key={e.y}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative pb-16 last:pb-0"
              >
                <span className="absolute -left-[37px] top-2 grid h-4 w-4 place-items-center rounded-full bg-primary shadow-glow">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary-foreground" />
                </span>
                <div className="font-mono text-sm text-primary">{e.y}</div>
                <h3 className="mt-2 font-display text-2xl font-semibold">{e.t}</h3>
                <p className="mt-2 text-muted-foreground">{e.d}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-ink text-background">
        <div className="mx-auto max-w-[1400px] px-6 py-32">
          <div className="grid gap-12 md:grid-cols-3">
            {[
              { t: "Engineered in-house", d: "From cell to cloud — every component built and tested by the Grace team." },
              { t: "Built for the field", d: "IP65 enclosures, hot-swap modules, and decade-long warranties." },
              { t: "Open by design", d: "Modbus, CAN, MQTT and a public API. Your system, your data." },
            ].map((c) => (
              <div key={c.t} className="border-t border-background/20 pt-8">
                <h3 className="font-display text-3xl font-semibold tracking-tight">{c.t}</h3>
                <p className="mt-4 text-background/60">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}