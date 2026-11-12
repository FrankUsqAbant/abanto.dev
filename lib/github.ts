/**
 * Proyectos del inicio: lista curada (data/projects.json, con capturas reales)
 * enriquecida con GitHub (usuario FrankUsqAbant), sin backend: API pública en
 * el navegador + caché de 1 h en localStorage + copia del build
 * (data/github-projects.json) por si la API falla. GitHub solo aporta la fecha
 * del último push («Activo») y los repos NUEVOS con el topic «portfolio».
 */
import snapshot from "../data/github-projects.json";
import curated from "../data/projects.json";

export const GITHUB_USER = "FrankUsqAbant";
export const GITHUB_REPOS_URL = `https://github.com/${GITHUB_USER}?tab=repositories`;

const API = `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=pushed`;
const CACHE_KEY = "gh-projects-cache";
const TTL = 60 * 60 * 1000;
const SHOW_TOPIC = "portfolio";
const FEATURED_TOPIC = "featured";
const HIDDEN_TOPICS = new Set([SHOW_TOPIC, FEATURED_TOPIC]);

export interface RawRepo {
  name: string;
  full_name: string;
  description: string | null;
  topics: string[] | null;
  homepage: string | null;
  language: string | null;
  pushed_at: string | null;
  fork: boolean | null;
  archived: boolean | null;
  html_url: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  chips: string[];
  status: "Activo" | "Publicado";
  codeUrl: string;
  demoUrl: string | null;
  image: string;
  /** true = captura real del sitio; false = tarjeta automática de GitHub. */
  realShot: boolean;
  language: string | null;
  topics: string[];
}

const LABELS: Record<string, string> = {
  react: "React", vite: "Vite", supabase: "Supabase", tailwindcss: "Tailwind CSS", typescript: "TypeScript",
  javascript: "JavaScript", nextjs: "Next.js", astro: "Astro", n8n: "n8n", "cloudflare-pages": "Cloudflare Pages",
  telegram: "Telegram", docker: "Docker", ia: "IA", ai: "IA", nodejs: "Node.js", python: "Python",
};

const label = (t: string) => LABELS[t] ?? t.replace(/-/g, " ").replace(/^\w/, (c) => c.toUpperCase());

const SMALL = new Set(["de", "del", "la", "el", "y", "en", "con", "para"]);
export const humanize = (name: string) =>
  name
    .replace(/[-_.]+/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .trim()
    .split(/\s+/)
    .map((w, i) => {
      if (w === w.toUpperCase() && w.length > 1) return w; // siglas: NEXUS, ASCII
      const lw = w.toLowerCase();
      return i > 0 && SMALL.has(lw) ? lw : lw.charAt(0).toUpperCase() + lw.slice(1);
    })
    .join(" ");

const normUrl = (u: string | null) => {
  const s = (u ?? "").trim();
  if (!s) return null;
  return /^https?:\/\//i.test(s) ? s : `https://${s}`;
};

const DAY = 24 * 60 * 60 * 1000;

const toProject = (r: RawRepo): Project => {
  const topics = r.topics ?? [];
  const chips = [r.language, ...topics.filter((t) => !HIDDEN_TOPICS.has(t)).map(label)]
    .filter((c): c is string => Boolean(c))
    .filter((c, i, a) => a.indexOf(c) === i)
    .slice(0, 3);
  return {
    id: r.name,
    title: humanize(r.name),
    description: r.description?.trim() || "Proyecto en desarrollo",
    chips,
    status: statusOf(r.pushed_at),
    codeUrl: r.html_url,
    demoUrl: normUrl(r.homepage),
    image: `https://opengraph.githubassets.com/1/${r.full_name}`,
    realShot: false,
    language: r.language,
    topics,
  };
};

interface CuratedProject {
  repo: string;
  title: string;
  description: string;
  chips: string[];
  demoUrl: string | null;
  repoUrl: string;
  image: string;
}

const CURATED: CuratedProject[] = curated.projects;

const statusOf = (pushedAt: string | null | undefined): Project["status"] =>
  pushedAt && Date.now() - Date.parse(pushedAt) < 30 * DAY ? "Activo" : "Publicado";

const eligible = (r: RawRepo) =>
  !r.fork && !r.archived && r.name.toLowerCase() !== GITHUB_USER.toLowerCase();

/** Curados en su orden (fecha de GitHub si está) + repos nuevos con «portfolio»
 *  que aún no están en la lista: con «featured» van primero, si no, al final. */
export const selectProjects = (repos: RawRepo[]): Project[] => {
  const byName = new Map(repos.map((r) => [r.name.toLowerCase(), r]));
  const curatedNames = new Set(CURATED.map((c) => c.repo.toLowerCase()));

  const list: Project[] = CURATED.filter((c) => {
    const r = byName.get(c.repo.toLowerCase());
    return !r || eligible(r); // si lo archiva o lo hace fork, desaparece
  }).map((c) => {
    const r = byName.get(c.repo.toLowerCase());
    return {
      id: c.repo,
      title: c.title,
      description: c.description,
      chips: c.chips.slice(0, 3),
      status: statusOf(r?.pushed_at),
      codeUrl: c.repoUrl,
      demoUrl: c.demoUrl,
      image: c.image,
      realShot: true,
      language: r?.language ?? null,
      topics: r?.topics ?? [],
    };
  });

  const extra = repos
    .filter((r) => eligible(r) && r.topics?.includes(SHOW_TOPIC) && !curatedNames.has(r.name.toLowerCase()))
    .sort((a, b) => Date.parse(b.pushed_at ?? "0") - Date.parse(a.pushed_at ?? "0"))
    .map(toProject);
  const feat = extra.filter((p) => p.topics.includes(FEATURED_TOPIC));
  const rest = extra.filter((p) => !p.topics.includes(FEATURED_TOPIC));
  return [...feat, ...list, ...rest];
};

const isRepoList = (v: unknown): v is RawRepo[] =>
  Array.isArray(v) && v.every((r) => typeof r === "object" && r !== null && typeof (r as RawRepo).name === "string");

const SNAPSHOT: RawRepo[] = isRepoList(snapshot.repos) ? snapshot.repos : [];

const readCache = (): RawRepo[] | null => {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const c: unknown = JSON.parse(raw);
    if (typeof c !== "object" || c === null) return null;
    const { t, repos } = c as { t?: unknown; repos?: unknown };
    if (typeof t !== "number" || Date.now() - t > TTL || !isRepoList(repos)) return null;
    return repos;
  } catch {
    return null;
  }
};

/** Lo que se puede mostrar al instante (caché válida o copia del build). */
export const initialProjects = (): Project[] => selectProjects(readCache() ?? SNAPSHOT);

/** Pide a la API solo si la caché venció; devuelve null si no hay nada nuevo. */
export const refreshProjects = async (signal?: AbortSignal): Promise<Project[] | null> => {
  if (readCache()) return null;
  try {
    const res = await fetch(API, { headers: { Accept: "application/vnd.github+json" }, signal });
    if (!res.ok) return null; // 403/429 por límite: se queda la copia del build
    const data: unknown = await res.json();
    if (!isRepoList(data)) return null;
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify({ t: Date.now(), repos: data }));
    } catch {
      /* almacenamiento lleno o bloqueado: no pasa nada */
    }
    return selectProjects(data);
  } catch {
    return null;
  }
};
