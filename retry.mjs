import { createClient } from "@supabase/supabase-js";
import { readFileSync, writeFileSync } from "node:fs";

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
const LOVABLE_KEY = process.env.LOVABLE_API_KEY;
const products = JSON.parse(readFileSync("/tmp/products.json", "utf8"));

const LINES = {
  deye: "deep navy blue and orange hybrid solar product, premium industrial design",
  "lv-topson": "dark grey lithium storage unit, modern wall-mount design",
  sunmate: "compact white SMS solar inverter with blue LCD display",
  itel: "sleek black inverter with green accents, smart home aesthetic",
  felicity: "professional silver and red inverter unit, commercial grade",
};
const slug = (p) => p.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function genOne(p) {
  const subject = p.kind === "battery"
    ? `${p.spec} solar deep-cycle battery unit, single product shot, ${LINES[p.line]}`
    : `${p.spec} solar power inverter wall unit, single product shot, ${LINES[p.line]}`;
  const prompt = `Professional product photograph of a ${subject}, isolated on clean white studio background, soft shadow, high detail, e-commerce catalog style, no people, no text overlay`;
  const res = await fetch("https://ai.gateway.lovable.dev/v1/images/generations", {
    method: "POST",
    headers: { Authorization: `Bearer ${LOVABLE_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ model: "openai/gpt-image-2", prompt, size: "1024x1024", quality: "low", n: 1 }),
  });
  if (!res.ok) throw new Error(`${res.status} ${(await res.text()).slice(0, 120)}`);
  const json = await res.json();
  const b64 = json.data?.[0]?.b64_json;
  if (!b64) throw new Error("no b64");
  const path = `${p.line}/${slug(p)}.png`;
  const { error } = await supabase.storage.from("product-images").upload(path, Buffer.from(b64, "base64"), { contentType: "image/png", upsert: true });
  if (error) throw new Error("upload: " + error.message);
  return supabase.storage.from("product-images").getPublicUrl(path).data.publicUrl;
}

const failed = products.filter((p) => !p.image_url);
console.log("Retrying", failed.length);

for (const p of failed) {
  for (let attempt = 1; attempt <= 8; attempt++) {
    try {
      const url = await genOne(p);
      const idx = products.findIndex((x) => x.name === p.name);
      products[idx].image_url = url;
      console.log(`OK ${p.name}`);
      writeFileSync("/tmp/products.json", JSON.stringify(products, null, 2));
      await sleep(3500);
      break;
    } catch (e) {
      console.log(`  retry ${attempt} ${p.name}: ${e.message}`);
      await sleep(10000 + attempt * 5000);
    }
  }
}

console.log("Done. Have images:", products.filter((p) => p.image_url).length, "/", products.length);
