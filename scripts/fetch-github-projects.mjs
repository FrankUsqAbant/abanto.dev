// Prebuild: guarda una copia de los repos públicos de GitHub en
// data/github-projects.json. Si la API falla, se conserva la copia anterior.
import { writeFile } from "node:fs/promises";

const USER = "FrankUsqAbant";
const OUT = new URL("../data/github-projects.json", import.meta.url);
const FIELDS = ["name", "full_name", "description", "topics", "homepage", "language", "pushed_at", "fork", "archived", "html_url"];

try {
  const headers = { Accept: "application/vnd.github+json", "User-Agent": "portfolio-prebuild" };
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  const res = await fetch(`https://api.github.com/users/${USER}/repos?per_page=100&sort=pushed`, { headers, signal: AbortSignal.timeout(10000) });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const repos = await res.json();
  const slim = repos.map((r) => Object.fromEntries(FIELDS.map((k) => [k, r[k] ?? null])));
  await writeFile(OUT, JSON.stringify({ fetchedAt: new Date().toISOString(), repos: slim }, null, 2) + "\n");
  console.log(`[github] ${slim.length} repos guardados en data/github-projects.json`);
} catch (err) {
  console.warn(`[github] No se pudo actualizar la copia (${err.message}); se usa la existente.`);
}
