// Generate product images via Lovable AI Gateway and upload to Supabase storage.
// Outputs /tmp/image_urls.json mapping {name -> public_url}.
import fs from "node:fs";
import { createClient } from "@supabase/supabase-js";

const items = JSON.parse(fs.readFileSync("/tmp/products.json", "utf8"));
const apiKey = process.env.LOVABLE_API_KEY;
const supaUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supaService = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!apiKey || !supaUrl || !supaService) {
  console.error("Missing env: LOVABLE_API_KEY/SUPABASE_URL/SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const supa = createClient(supaUrl, supaService);

const existing = fs.existsSync("/tmp/image_urls.json") ? JSON.parse(fs.readFileSync("/tmp/image_urls.json","utf8")) : {};

async function genOne(p) {
  if (existing[p.name]) return existing[p.name];
  const prompt = `${p.img}. Studio product photography on pure white background, soft shadow, high resolution, sharp focus, commercial e-commerce style, no text overlay.`;
  const res = await fetch("https://ai.gateway.lovable.dev/v1/images/generations", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "google/gemini-3.1-flash-image-preview",
      messages: [{ role: "user", content: prompt }],
      modalities: ["image", "text"],
    }),
  });
  if (!res.ok) {
    const t = await res.text();
    throw new Error(`gen failed ${p.name}: ${res.status} ${t.slice(0,200)}`);
  }
  const j = await res.json();
  const b64 = j?.data?.[0]?.b64_json;
  if (!b64) throw new Error(`no image returned for ${p.name}`);
  const buf = Buffer.from(b64, "base64");
  const slug = p.name.replace(/[^a-zA-Z0-9]+/g, "-").toLowerCase();
  const path = `${p.line_slug}/${slug}.png`;
  const { error: upErr } = await supa.storage.from("product-images").upload(path, buf, { upsert: true, contentType: "image/png" });
  if (upErr) throw new Error(`upload ${p.name}: ${upErr.message}`);
  const { data } = supa.storage.from("product-images").getPublicUrl(path);
  return data.publicUrl;
}

const CONCURRENCY = 5;
const out = { ...existing };
let i = 0;
async function worker(id) {
  while (i < items.length) {
    const my = i++;
    const p = items[my];
    try {
      const url = await genOne(p);
      out[p.name] = url;
      console.log(`[${my+1}/${items.length}] ${p.name} -> ok`);
      fs.writeFileSync("/tmp/image_urls.json", JSON.stringify(out, null, 2));
    } catch (e) {
      console.error(`[${my+1}/${items.length}] ${p.name} -> FAILED:`, e.message);
    }
  }
}
await Promise.all(Array.from({length: CONCURRENCY}, (_, k) => worker(k)));
console.log("done", Object.keys(out).length, "images");
