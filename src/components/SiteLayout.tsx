import { Link, useRouterState } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Menu, X, Sun } from "lucide-react";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/shop", label: "Shop" },
  { to: "/contacts", label: "Contacts" },
] as const;

export function SiteLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <header className="fixed top-0 z-50 w-full">
        <div className="mx-auto mt-4 flex max-w-[1400px] items-center justify-between rounded-full border border-border/60 bg-background/70 px-5 py-3 backdrop-blur-xl">
          <Link to="/" className="flex items-center gap-2 font-display text-lg font-bold tracking-tight">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-primary shadow-glow">
              <Sun className="h-4 w-4 text-primary-foreground" strokeWidth={2.5} />
            </span>
            Grace Solar
          </Link>
          <nav className="hidden items-center gap-1 md:flex">
            {NAV.map((item) => {
              const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className="group relative rounded-full px-4 py-2 text-sm font-medium text-foreground/70 transition-colors hover:text-foreground"
                >
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-ink"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className={`relative z-10 ${active ? "text-background" : ""}`}>
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </nav>
          <Link
            to="/contacts"
            className="hidden rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-background transition-transform hover:scale-105 md:block"
          >
            Get a quote
          </Link>
          <button
            className="grid h-10 w-10 place-items-center rounded-full bg-ink text-background md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mx-auto mt-2 max-w-[1400px] overflow-hidden rounded-3xl border border-border/60 bg-background/95 p-4 backdrop-blur-xl md:hidden"
            >
              {NAV.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="block rounded-2xl px-4 py-3 text-base font-medium hover:bg-muted"
                >
                  {item.label}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="pt-24">{children}</main>

      <footer className="mt-32 border-t border-border bg-ink text-background">
        <div className="mx-auto grid max-w-[1400px] gap-12 px-6 py-20 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 text-xl font-bold">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-primary">
                <Sun className="h-4 w-4" strokeWidth={2.5} />
              </span>
              Grace Solar
            </div>
            <p className="mt-4 max-w-md text-sm text-background/80">
              Powering homes, businesses and tomorrow with intelligent solar systems
              engineered for reliability.
            </p>
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest text-background/70">Explore</div>
            <ul className="mt-4 space-y-2 text-sm">
              {NAV.map((n) => (
                <li key={n.to}>
                  <Link to={n.to} className="text-background/80 hover:text-primary-glow">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest text-background/70">Contact</div>
            <ul className="mt-4 space-y-2 text-sm text-background/80">
              <li>hello@gracesolar.com</li>
              <li>+1 (415) 555-0123</li>
              <li>120 Solar Ave, Reno NV</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-background/10 px-6 py-6 text-center text-xs text-background/70">
          © {new Date().getFullYear()} Grace Solar. Built with sunlight.
        </div>
      </footer>
    </div>
  );
}