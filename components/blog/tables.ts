import type { PDetails, PTableData } from "./types";

/** Metadatos de cada tabla (el contenido se carga bajo demanda). */
export interface TableMeta {
  id: string;
  /** Texto de la píldora */
  label: string;
  /** Icono corto (texto) o "svg:<nombre>" */
  icon: string;
  /** Final del título en cursiva: "La tabla periódica <em>del HTML</em>" */
  titleEm: string;
  /** Sustantivo plural para el subtítulo */
  noun: string;
  /** Nombre del archivo del ejemplo de código */
  file: string;
  /** Lenguaje para el resaltado */
  lang: "html" | "css" | "js" | "python" | "sql" | "shell" | "text";
  /** Texto de la fuente al pie */
  source: string;
  /** Texto de la clave "Cómo leer la tabla" */
  keyText: string;
}

export const TABLES: TableMeta[] = [
  {
    id: "fundamentos-web", label: "Fundamentos web", icon: "</>", titleEm: "de la web", noun: "elementos", file: "index.html", lang: "html",
    source: "Descripciones basadas en MDN Web Docs · Compatibilidad: MDN browser-compat-data",
    keyText: "HTML para la estructura, CSS para el estilo y el layout, JavaScript para la interacción: lo esencial para empezar.",
  },
  {
    id: "frameworks", label: "Frameworks", icon: "svg:layers", titleEm: "de los frameworks", noun: "conceptos", file: "App.tsx", lang: "js",
    source: "Descripciones basadas en react.dev, nextjs.org, typescriptlang.org y la documentación de cada herramienta",
    keyText: "React, sus hooks, Next.js, TypeScript y las herramientas con las que hoy se construyen las apps web.",
  },
  {
    id: "backend", label: "Backend", icon: "svg:server", titleEm: "del backend", noun: "conceptos", file: "main.py", lang: "python",
    source: "Descripciones basadas en docs.python.org, nodejs.org, MDN, FastAPI, Express y OWASP",
    keyText: "Python y Node.js, cómo se diseña una API, la autenticación y lo que hace falta para producción.",
  },
  {
    id: "datos", label: "Datos", icon: "svg:db", titleEm: "de los datos", noun: "conceptos", file: "consulta.sql", lang: "sql",
    source: "Descripciones basadas en la documentación de PostgreSQL, Supabase, Prisma, Drizzle, Redis y pgvector",
    keyText: "SQL, modelado y Postgres a la izquierda; ORMs, caché y vectores para IA a la derecha.",
  },
  {
    id: "ia-aplicada", label: "IA aplicada", icon: "svg:spark", titleEm: "de la IA aplicada", noun: "conceptos", file: "ia.py", lang: "python",
    source: "Descripciones basadas en la documentación de OpenAI, Anthropic, Hugging Face, Ollama y los artículos originales",
    keyText: "De los fundamentos del machine learning a los LLM, el prompting, RAG y lo necesario para llevar IA a producción.",
  },
  {
    id: "agentes-automatizacion", label: "Agentes y automatización", icon: "svg:bot", titleEm: "de los agentes", noun: "conceptos", file: "agente.py", lang: "python",
    source: "Descripciones basadas en modelcontextprotocol.io, Anthropic, OpenAI, LangGraph, n8n, Make, Zapier y Meta",
    keyText: "Agentes, protocolos, automatizaciones y canales. Cada ficha incluye un uso concreto para tu negocio.",
  },
  {
    id: "herramientas", label: "Herramientas", icon: "svg:tool", titleEm: "de las herramientas", noun: "herramientas", file: "terminal", lang: "shell",
    source: "Descripciones basadas en git-scm.com, el manual de GNU Bash, Docker, GitHub, Vercel, Cloudflare y OWASP",
    keyText: "Git, la terminal, contenedores y despliegue, y la seguridad básica que todo proyecto necesita.",
  },
];

/** Tablas antiguas → tabla nueva más cercana (las fichas que existan se conservan). */
export const LEGACY_TABLES: Record<string, string> = {
  html: "fundamentos-web",
  css: "fundamentos-web",
  javascript: "fundamentos-web",
  python: "backend",
  databases: "datos",
  git: "herramientas",
  bash: "herramientas",
  cybersecurity: "herramientas",
  ml: "ia-aplicada",
  neuralnet: "ia-aplicada",
};

export const DEFAULT_TABLE = "fundamentos-web";
export const getTable = (id: string | undefined) => TABLES.find((t) => t.id === id);

// Carga diferida: cada JSON es su propio chunk (no entra en el bundle inicial).
const dataModules = import.meta.glob<PTableData>("../../data/periodic/*.json", { import: "default" });

const load = <T,>(file: string): Promise<T> => {
  const loader = dataModules[`../../data/periodic/${file}.json`] as (() => Promise<T>) | undefined;
  if (!loader) return Promise.reject(new Error(`Tabla no encontrada: ${file}`));
  return loader();
};

const tableCache = new Map<string, Promise<PTableData>>();
const detailCache = new Map<string, Promise<PDetails>>();

export const loadTable = (id: string): Promise<PTableData> => {
  let p = tableCache.get(id);
  if (!p) {
    p = load<PTableData>(id);
    tableCache.set(id, p);
  }
  return p;
};

export const loadDetails = (id: string): Promise<PDetails> => {
  let p = detailCache.get(id);
  if (!p) {
    p = load<PDetails>(`${id}.details`);
    detailCache.set(id, p);
  }
  return p;
};
