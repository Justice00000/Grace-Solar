import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { findItem } from "@/lib/products";

export type CartLine = { id: string; qty: number };

type CartCtx = {
  lines: CartLine[];
  count: number;
  total: number;
  add: (id: string, qty?: number) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  open: boolean;
  setOpen: (v: boolean) => void;
};

const Ctx = createContext<CartCtx | null>(null);
const KEY = "grace-cart-v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [open, setOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setLines(JSON.parse(raw));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem(KEY, JSON.stringify(lines));
  }, [lines, hydrated]);

  const api = useMemo<CartCtx>(() => {
    const add = (id: string, qty = 1) =>
      setLines((p) => {
        const found = p.find((l) => l.id === id);
        if (found) return p.map((l) => (l.id === id ? { ...l, qty: l.qty + qty } : l));
        return [...p, { id, qty }];
      });
    const remove = (id: string) => setLines((p) => p.filter((l) => l.id !== id));
    const setQty = (id: string, qty: number) =>
      setLines((p) => (qty <= 0 ? p.filter((l) => l.id !== id) : p.map((l) => (l.id === id ? { ...l, qty } : l))));
    const clear = () => setLines([]);
    const count = lines.reduce((s, l) => s + l.qty, 0);
    const total = lines.reduce((s, l) => {
      const found = findItem(l.id);
      return s + (found ? found.item.price * l.qty : 0);
    }, 0);
    return { lines, count, total, add, remove, setQty, clear, open, setOpen };
  }, [lines, open]);

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart must be used within CartProvider");
  return c;
}

export const WHATSAPP_NUMBER = "2347030489665"; // 07030489665