// Prebuild: genera public/sitemap.xml con las páginas, las tablas de Aprende y
// cada uno de sus elementos (src/data/periodic/<tabla>.json).
import { readdir, readFile, writeFile } from "node:fs/promises";

const SITE = "https://abanto.pages.dev";
const ROOT = new URL("..", import.meta.url);
const dir = new URL("src/data/periodic/", ROOT);
const today = new Date().toISOString().slice(0, 10);

const urls = [
  ["/", "1.0", "weekly"],
  ["/about", "0.8", "monthly"],
];
const files = (await readdir(dir)).filter((f) => f.endsWith(".json") && !f.endsWith(".details.json")).sort();
for (const f of files) {
  const t = JSON.parse(await readFile(new URL(f, dir), "utf8"));
  urls.push([`/aprende/${t.id}`, "0.7", "monthly"]);
  for (const it of t.items ?? []) urls.push([`/aprende/${t.id}/${encodeURIComponent(it.k)}`, "0.5", "monthly"]);
}
urls.push(["/privacidad", "0.2", "yearly"], ["/terminos", "0.2", "yearly"], ["/cookies", "0.2", "yearly"]);

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(([p, pr, cf]) => `  <url><loc>${SITE}${p}</loc><lastmod>${today}</lastmod><changefreq>${cf}</changefreq><priority>${pr}</priority></url>`).join("\n")}
</urlset>
`;
await writeFile(new URL("public/sitemap.xml", ROOT), xml);
console.log(`[sitemap] ${urls.length} URLs en public/sitemap.xml`);
