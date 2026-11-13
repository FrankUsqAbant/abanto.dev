/**
 * Escribe public/_headers (y dist/_headers si existe) con hashes CSP
 * calculados sobre el HTML que realmente se publica (Vite emite LF).
 * Uso: node scripts/write-headers.mjs
 */
import { readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { createHash } from "node:crypto";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const sha = (s) => createHash("sha256").update(s, "utf8").digest("base64");
const crlf = (s) => s.replace(/\r?\n/g, "\r\n");

const htmlPath = existsSync(join(ROOT, "dist/index.html"))
  ? join(ROOT, "dist/index.html")
  : join(ROOT, "index.html");

const html = (await readFile(htmlPath, "utf8")).replace(/\r\n/g, "\n");
const lds = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => m[1]);
if (lds.length !== 1) {
  throw new Error(`Unexpected JSON-LD blocks: ${lds.length} in ${htmlPath}`);
}

const ldHash = `'sha256-${sha(lds[0])}'`;

const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  `script-src 'self' ${ldHash} https://app.cal.com https://cal.com`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://opengraph.githubassets.com https://app.cal.com https://cal.com",
  "font-src 'self'",
  "connect-src 'self' https://api.github.com https://formspree.io https://app.cal.com https://cal.com",
  "frame-src https://app.cal.com https://cal.com",
  "worker-src 'self' blob:",
  "form-action 'self' https://formspree.io",
  "manifest-src 'self'",
  "upgrade-insecure-requests",
].join("; ");

const headers = `/*
  Strict-Transport-Security: max-age=31536000; includeSubDomains
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=(), display-capture=(), accelerometer=(), gyroscope=(), magnetometer=(), midi=(), bluetooth=()
  Cross-Origin-Opener-Policy: same-origin
  Content-Security-Policy: ${csp}
  Cache-Control: public, max-age=0, must-revalidate

/assets/*
  Cache-Control: public, max-age=31536000, immutable

/fonts/*
  Cache-Control: public, max-age=31536000, immutable

/images/*
  Cache-Control: public, max-age=604800

/favicon.svg
  Cache-Control: public, max-age=604800

/favicon.ico
  Cache-Control: public, max-age=604800

/icon-192.png
  Cache-Control: public, max-age=604800

/icon-512.png
  Cache-Control: public, max-age=604800

/apple-touch-icon.png
  Cache-Control: public, max-age=604800

/og-image.jpg
  Cache-Control: public, max-age=604800

/site.webmanifest
  Cache-Control: public, max-age=86400
`;

const body = crlf(headers);
await writeFile(join(ROOT, "public/_headers"), body);
if (existsSync(join(ROOT, "dist"))) {
  await writeFile(join(ROOT, "dist/_headers"), body);
}
console.log(`[headers] CSP hashes from ${htmlPath.replace(ROOT, ".")}`);
console.log(`  jsonld ${ldHash}`);
