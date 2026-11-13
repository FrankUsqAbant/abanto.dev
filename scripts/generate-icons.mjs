/**
 * Genera el monograma FA (crema + tinta + oliva) y los íconos del sitio.
 * Uso: node scripts/generate-icons.mjs
 */
import sharp from "sharp";
import { writeFile, mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const PUBLIC = join(ROOT, "public");
const CREAM = "#F4F2EE";
const INK = "#141414";
const OLIVE = "#5B7B5A";

/** Marca FA en un lienzo 128², sin fondo (el caller pone el crema). */
const mark = `
  <g>
    <!-- F con remates serif suaves -->
    <path fill="${INK}" d="M16 22h62.2v8.8H31.6v19.2h35.2v7.8H31.6V97.6H16.0V22zm-2.4 0h2.4v8.8h-6.2V22h6.2zM16 97.6h15.6V106H9.8v-8.4H16z"/>
    <!-- A oliva, casi a la misma altura de mayúsculas -->
    <path fill="${OLIVE}" fill-rule="evenodd" d="M86.2 24.2 114.4 106h-11.6l-5.3-13.6H76.2l-5.3 13.6H59.4l26.6-81.8h.2zm-10 50.2h20.6L86.4 48.6z"/>
  </g>
`.trim();

const svgFor = ({ size, pad, radius }) => {
  const inner = size - pad * 2;
  const r = radius == null ? 0 : radius;
  const bg =
    r > 0
      ? `<rect width="${size}" height="${size}" rx="${r}" fill="${CREAM}"/>`
      : `<rect width="${size}" height="${size}" fill="${CREAM}"/>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}">
  ${bg}
  <svg x="${pad}" y="${pad}" width="${inner}" height="${inner}" viewBox="0 0 128 128">${mark}</svg>
</svg>`;
};

const icoFromPngs = (pngs) => {
  const header = 6 + 16 * pngs.length;
  let offset = header;
  const entries = [];
  for (const { size, buffer } of pngs) {
    entries.push({ size, buffer, offset, bytes: buffer.length });
    offset += buffer.length;
  }
  const out = Buffer.alloc(offset);
  out.writeUInt16LE(0, 0);
  out.writeUInt16LE(1, 2);
  out.writeUInt16LE(pngs.length, 4);
  let e = 6;
  for (const ent of entries) {
    out.writeUInt8(ent.size >= 256 ? 0 : ent.size, e);
    out.writeUInt8(ent.size >= 256 ? 0 : ent.size, e + 1);
    out.writeUInt8(0, e + 2);
    out.writeUInt8(0, e + 3);
    out.writeUInt16LE(1, e + 4);
    out.writeUInt16LE(32, e + 6);
    out.writeUInt32LE(ent.bytes, e + 8);
    out.writeUInt32LE(ent.offset, e + 12);
    e += 16;
  }
  for (const ent of entries) {
    ent.buffer.copy(out, ent.offset);
  }
  return out;
};

const raster = (svg, size) =>
  sharp(Buffer.from(svg)).resize(size, size).png({ compressionLevel: 9 }).toBuffer();

const DIR = process.argv[2] ? join(process.argv[2]) : PUBLIC;
await mkdir(DIR, { recursive: true });

const faviconSvg = svgFor({ size: 32, pad: 1.5, radius: 8 });
await writeFile(join(DIR, "favicon.svg"), faviconSvg, "utf8");

const tile16 = await raster(svgFor({ size: 32, pad: 1.5, radius: 8 }), 16);
const tile32 = await raster(svgFor({ size: 32, pad: 1.5, radius: 8 }), 32);
await writeFile(join(DIR, "favicon.ico"), icoFromPngs([
  { size: 16, buffer: tile16 },
  { size: 32, buffer: tile32 },
]));

const appSvg = svgFor({ size: 512, pad: 76, radius: 0 });
await writeFile(join(DIR, "apple-touch-icon.png"), await raster(appSvg, 180));
await writeFile(join(DIR, "icon-192.png"), await raster(appSvg, 192));
await writeFile(join(DIR, "icon-512.png"), await raster(appSvg, 512));

console.log("icons written to", DIR);
