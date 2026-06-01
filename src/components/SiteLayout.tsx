import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Menu, X, ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/cart";
import { CartDrawer } from "@/components/CartDrawer";
import { LiveChat } from "@/components/LiveChat";
import graceLogo from "@/assets/grace-logo.png";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/shop", label: "Shop" },
  { to: "/contacts", label: "Contacts" },
] as const;

export function SiteLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const { count, setOpen: setCartOpen } = useCart();

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <header className="fixed top-0 z-50 w-full">
        <div className="mx-auto mt-4 flex max-w-[1400px] items-center justify-between rounded-full border border-border/60 bg-background/80 px-5 py-3 backdrop-blur-xl shadow-sm">
          <Link to="/" className="flex items-center gap-2" aria-label="Grace Solar Energy">
            <img
              src={graceLogo}
              alt="Grace Solar Energy"
              width={440}
              height={144}
              className="h-24 w-auto object-contain md:h-32"
            />
          </Link>
          <nav className="hidden items-center gap-1 md:flex">
            {NAV.map((item) => {
              const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className="group relative rounded-full px-4 py-2 text-sm font-semibold text-foreground/70 transition-colors hover:text-foreground"
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
          <div className="hidden items-center gap-2 md:flex">
            <button
              onClick={() => setCartOpen(true)}
              className="relative grid h-10 w-10 place-items-center rounded-full border border-border bg-background hover:bg-muted"
              aria-label="Open cart"
            >
              <ShoppingCart className="h-4 w-4" />
              {count > 0 && (
                <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
                  {count}
                </span>
              )}
            </button>
            <Link
              to="/contacts"
              className="rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-background transition-transform hover:scale-105"
            >
              Get a quote
            </Link>
          </div>
          <button
            onClick={() => setCartOpen(true)}
            className="relative grid h-10 w-10 place-items-center rounded-full border border-border bg-background md:hidden"
            aria-label="Open cart"
          >
            <ShoppingCart className="h-4 w-4" />
            {count > 0 && (
              <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
                {count}
              </span>
            )}
          </button>
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
                  className="block rounded-2xl px-4 py-3 text-base font-semibold hover:bg-muted"
                >
                  {item.label}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="pt-40 md:pt-52">{children}</main>

      <footer className="mt-32 border-t border-border bg-ink text-background">
        <div className="mx-auto grid max-w-[1400px] gap-12 px-6 py-20 md:grid-cols-4">
          <div className="md:col-span-2">
            <img
              src={graceLogo}
              alt="Grace Solar Energy"
              width={220}
              height={72}
              className="h-16 w-auto rounded-lg bg-background p-2 object-contain"
            />
            <p className="mt-4 max-w-md text-sm italic text-background/80">
              "Customer satisfaction, our utmost priority."
            </p>
            <p className="mt-3 max-w-md text-sm text-background/70">
              Solar inverters, batteries and power systems for homes and businesses in Lagos and across Nigeria.
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
              <li>Gracesolar26@gmail.com</li>
              <li>0703 048 9665</li>
              <li>0703 085 1497</li>
              <li>C27 Century Mall, St Patrick bus stop,<br />Alaba International Market, Ojo, Lagos</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-background/10 px-6 py-6 text-center text-xs text-background/70">
          © {new Date().getFullYear()} Grace Solar Energy. Built with sunlight.
        </div>
      </footer>

      <CartDrawer />
      <LiveChat />
    </div>
  );
}
