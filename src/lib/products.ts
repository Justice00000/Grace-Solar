import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type DbProduct = {
  id: string;
  line_slug: string;
  line_name: string;
  kind: "inverter" | "battery";
  name: string;
  spec: string;
  power: string;
  price: number;
  description: string;
  features: string[];
  image_url: string | null;
  sort_order: number;
};

export type ProductLine = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  image_url: string | null;
  inverters: DbProduct[];
  batteries: DbProduct[];
};

const TAGLINES: Record<string, string> = {
  deye: "High-output hybrid inverters & storage",
  "lv-topson": "Inverters and lithium storage",
  sunmate: "SMS inverter and battery range",
  itel: "Solar inverters, batteries & power tanks",
  felicity: "Inverters and batteries",
};

export async function fetchAllProducts(): Promise<DbProduct[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("line_slug")
    .order("kind")
    .order("sort_order");
  if (error) throw error;
  return (data ?? []) as DbProduct[];
}

export function groupIntoLines(items: DbProduct[]): ProductLine[] {
  const map = new Map<string, ProductLine>();
  for (const it of items) {
    if (!map.has(it.line_slug)) {
      map.set(it.line_slug, {
        slug: it.line_slug,
        name: it.line_name,
        tagline: TAGLINES[it.line_slug] ?? "",
        description: "",
        image_url: it.image_url,
        inverters: [],
        batteries: [],
      });
    }
    const line = map.get(it.line_slug)!;
    if (it.kind === "inverter") line.inverters.push(it);
    else line.batteries.push(it);
    if (!line.description && it.description) {
      // Use the trailing sentence (line-level description) from the seed
      const parts = it.description.split(". ");
      if (parts.length > 1) line.description = parts.slice(1).join(". ");
    }
    if (it.image_url) line.image_url = it.image_url;
  }
  return Array.from(map.values());
}

export function useAllProducts() {
  return useQuery({ queryKey: ["products"], queryFn: fetchAllProducts });
}

export function useProductLines() {
  const q = useAllProducts();
  return { ...q, data: q.data ? groupIntoLines(q.data) : undefined };
}

export function useProductLine(slug: string) {
  const q = useProductLines();
  return { ...q, data: q.data?.find((l) => l.slug === slug) };
}

export const formatNaira = (n: number) => "₦" + Number(n).toLocaleString("en-NG");
