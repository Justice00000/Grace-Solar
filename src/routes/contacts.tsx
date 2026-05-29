import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/contacts")({
  head: () => ({
    meta: [
      { title: "Contacts — Grace Solar" },
      { name: "description", content: "Get in touch with Grace Solar — quote requests, partnerships and support." },
      { property: "og:title", content: "Contacts — Grace Solar" },
      { property: "og:description", content: "Reach the Grace Solar team for quotes, partnerships, and engineering support." },
      { property: "og:url", content: "https://grace-solar-roar.lovable.app/contacts" },
    ],
    links: [
      { rel: "canonical", href: "https://grace-solar-roar.lovable.app/contacts" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "Grace Solar",
          email: "Gracesolar26@gmail.com",
          telephone: "+234-703-048-9665",
          url: "https://grace-solar-roar.lovable.app/contacts",
          address: {
            "@type": "PostalAddress",
            streetAddress: "C27 Century Mall, St Patrick bus stop, Alaba International Market",
            addressLocality: "Ojo",
            addressRegion: "Lagos",
            addressCountry: "NG",
          },
        }),
      },
    ],
  }),
  component: Contacts,
});

function Contacts() {
  const [sent, setSent] = useState(false);

  return (
    <SiteLayout>
      <section className="mx-auto max-w-[1400px] px-6 pt-20">
        <div className="text-xs font-medium uppercase tracking-[0.3em] text-primary">Contacts / Get in touch</div>
        <h1 className="mt-6 font-display text-[clamp(3rem,10vw,9rem)] font-bold leading-[0.9] tracking-tighter">
          Let's <span className="italic text-primary">talk.</span>
        </h1>
      </section>

      <section className="mx-auto mt-20 grid max-w-[1400px] gap-12 px-6 pb-32 lg:grid-cols-[2fr_3fr]">
        <div className="space-y-8">
          {[
            { icon: Mail, label: "Email", value: "Gracesolar26@gmail.com" },
            { icon: Phone, label: "Phone", value: "0703 048 9665 · 0703 085 1497" },
            { icon: MapPin, label: "Shop", value: "C27 Century Mall, St Patrick bus stop, Alaba International Market, Ojo, Lagos" },
          ].map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.div
                key={c.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex items-start gap-4 border-b border-border pb-8"
              >
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">{c.label}</div>
                  <div className="mt-1 font-display text-2xl font-semibold">{c.value}</div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onSubmit={(e) => { e.preventDefault(); setSent(true); }}
          className="rounded-3xl border border-border bg-card p-8 md:p-12"
        >
          <h2 className="font-display text-3xl font-bold tracking-tight">Request a quote</h2>
          <p className="mt-2 text-sm text-muted-foreground">Tell us about your project. We'll respond within 48 hours.</p>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <Field label="Name" name="name" />
            <Field label="Email" name="email" type="email" />
            <Field label="Company" name="company" />
            <Field label="System size (kW)" name="size" />
          </div>
          <label className="mt-5 block">
            <span className="text-xs uppercase tracking-widest text-muted-foreground">Project details</span>
            <textarea
              required
              rows={5}
              className="mt-2 w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
            />
          </label>
          <button
            type="submit"
            disabled={sent}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-7 py-4 text-sm font-medium text-background transition-transform hover:scale-105 disabled:opacity-60"
          >
            {sent ? "Sent — we'll be in touch" : <>Send message <ArrowRight className="h-4 w-4" /></>}
          </button>
        </motion.form>
      </section>
    </SiteLayout>
  );
}

function Field({ label, name, type = "text" }: { label: string; name: string; type?: string }) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-widest text-muted-foreground">{label}</span>
      <input
        required
        type={type}
        name={name}
        className="mt-2 w-full rounded-full border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
      />
    </label>
  );
}