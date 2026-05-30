import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { useState } from "react";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";

export default function Contacts() {
  const [sent, setSent] = useState(false);

  return (
    <SiteLayout>
      <Helmet>
        <title>Contact — Grace Solar Energy</title>
        <meta name="description" content="Reach Grace Solar Energy — phone, email, and shop address at Alaba International Market, Lagos." />
      </Helmet>
      <section className="mx-auto max-w-[1400px] px-6 pt-20">
        <div className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Contact / Get in touch</div>
        <h1 className="mt-6 font-display text-[clamp(3rem,10vw,9rem)] font-black leading-[0.9] tracking-tighter">
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
              <motion.div key={c.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="flex items-start gap-4 border-b border-border pb-8">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">{c.label}</div>
                  <div className="mt-1 font-display text-2xl font-bold">{c.value}</div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.form initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="rounded-3xl border border-border bg-card p-8 md:p-12">
          <h2 className="font-display text-3xl font-bold tracking-tight">Request a quote</h2>
          <p className="mt-2 text-sm text-muted-foreground">Tell us about your project. We'll respond within 24 hours.</p>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <Field label="Name" name="name" />
            <Field label="Phone" name="phone" />
            <Field label="Email" name="email" type="email" />
            <Field label="System size (kVA)" name="size" />
          </div>
          <label className="mt-5 block">
            <span className="text-xs uppercase tracking-widest text-muted-foreground">Project details</span>
            <textarea required rows={5} className="mt-2 w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary" />
          </label>
          <button type="submit" disabled={sent} className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-7 py-4 text-sm font-semibold text-background transition-transform hover:scale-105 disabled:opacity-60">
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
      <input required type={type} name={name} className="mt-2 w-full rounded-full border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary" />
    </label>
  );
}
