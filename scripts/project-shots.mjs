// Genera public/images/projects/<repo>.webp para cada proyecto de src/data/projects.json.
// Fuente: la primera captura del README (source.readme) o, si no hay, una captura
// del sitio en vivo con Playwright (source.page, 1440×900 a 2x).
// source.position (opcional, p. ej. "top") ajusta el recorte a 16:10.
// Uso: npm run projects:shots            (todos)
//      npm run projects:shots -- PokeAPI (solo esos repos)
import { readFile, mkdir, writeFile } from "node:fs/promises";
import sharp from "sharp";

const ROOT = new URL("..", import.meta.url);
const OUT = new URL("public/images/projects/", ROOT);
const W = 960, H = 600, MAX = 60 * 1024; // se ve a ≤520px CSS: 960px cubre pantallas 2x

const { projects } = JSON.parse(await readFile(new URL("src/data/projects.json", ROOT), "utf8"));
const only = process.argv.slice(2);
const list = only.length ? projects.filter((p) => only.includes(p.repo)) : projects;
await mkdir(OUT, { recursive: true });

let browser = null;
const pageShot = async (url) => {
  if (!browser) {
    const { chromium } = await import("playwright");
    browser = await chromium.launch();
  }
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
  await page.goto(url, { waitUntil: "networkidle", timeout: 45000 }).catch(() => {});
  await page.waitForTimeout(2500); // animaciones de entrada
  const buf = await page.screenshot();
  await page.close();
  return buf;
};

const toWebp = async (input, position = "left top") => {
  for (const quality of [82, 74, 66, 58, 50]) {
    const out = await sharp(input)
      .resize(W, H, { fit: "cover", position })
      .webp({ quality, effort: 6 })
      .toBuffer();
    if (out.length <= MAX || quality === 50) return out;
  }
};

for (const p of list) {
  try {
    let input;
    if (p.source?.readme) {
      const res = await fetch(p.source.readme);
      if (!res.ok) throw new Error(`README HTTP ${res.status}`);
      input = Buffer.from(await res.arrayBuffer());
    } else if (p.source?.page ?? p.demoUrl) {
      input = await pageShot(p.source?.page ?? p.demoUrl);
    } else throw new Error("sin fuente de imagen");
    const webp = await toWebp(input, p.source?.position);
    await writeFile(new URL(`${p.repo}.webp`, OUT), webp);
    console.log(`✓ ${p.repo}.webp ${(webp.length / 1024).toFixed(0)} KB`);
  } catch (e) {
    console.warn(`✗ ${p.repo}: ${e.message}`);
  }
}
await browser?.close();
