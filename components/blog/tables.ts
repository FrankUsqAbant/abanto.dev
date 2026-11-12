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
    id: "html", label: "HTML5", icon: "</>", titleEm: "del HTML", noun: "elementos", file: "index.html", lang: "html",
    source: "Descripciones basadas en MDN Web Docs · Compatibilidad: MDN browser-compat-data",
    keyText: "El color indica la categoría. Los elementos se agrupan como en la tabla de Mendeléyev: estructura a la izquierda, texto al centro, multimedia, tablas y formularios a la derecha.",
  },
  {
    id: "css", label: "CSS3", icon: "#", titleEm: "del CSS", noun: "propiedades", file: "styles.css", lang: "css",
    source: "Descripciones basadas en MDN Web Docs · Compatibilidad: MDN browser-compat-data",
    keyText: "Cada celda es una propiedad. El color indica la familia: layout, tipografía, flexbox, grid, efectos…",
  },
  {
    id: "javascript", label: "JavaScript", icon: "JS", titleEm: "de JavaScript", noun: "conceptos", file: "app.js", lang: "js",
    source: "Descripciones basadas en MDN Web Docs · Compatibilidad: MDN browser-compat-data",
    keyText: "Palabras clave, objetos y APIs del lenguaje, agrupados por para qué sirven.",
  },
  {
    id: "python", label: "Python", icon: "Py", titleEm: "de Python", noun: "conceptos", file: "main.py", lang: "python",
    source: "Descripciones basadas en la documentación oficial de Python (docs.python.org)",
    keyText: "Tipos, palabras clave, funciones integradas y módulos esenciales de Python 3.",
  },
  {
    id: "databases", label: "Bases de datos", icon: "svg:db", titleEm: "de las bases de datos", noun: "conceptos", file: "consulta.sql", lang: "sql",
    source: "Descripciones basadas en la documentación de PostgreSQL y MongoDB",
    keyText: "SQL a la izquierda, NoSQL a la derecha. El color agrupa sentencias, tipos y conceptos.",
  },
  {
    id: "git", label: "Git", icon: "svg:git", titleEm: "de Git", noun: "comandos", file: "terminal", lang: "shell",
    source: "Descripciones basadas en la documentación oficial (git-scm.com)",
    keyText: "Los comandos que más usas, de crear un repositorio a reescribir historial.",
  },
  {
    id: "bash", label: "Bash", icon: ">_", titleEm: "de Bash", noun: "comandos", file: "terminal", lang: "shell",
    source: "Descripciones basadas en el manual de GNU Bash y las páginas man",
    keyText: "Comandos de terminal agrupados por tarea: archivos, texto, procesos, red y scripting.",
  },
  {
    id: "cybersecurity", label: "Ciberseguridad", icon: "svg:shield", titleEm: "de la ciberseguridad", noun: "conceptos", file: "notas.txt", lang: "text",
    source: "Descripciones basadas en OWASP, NIST, CISA y documentación oficial de cada herramienta",
    keyText: "Ataques, defensas, criptografía y normativas: el mapa básico de la seguridad informática.",
  },
  {
    id: "ml", label: "Machine Learning", icon: "svg:ml", titleEm: "del machine learning", noun: "conceptos", file: "modelo.py", lang: "python",
    source: "Descripciones basadas en la documentación de scikit-learn, TensorFlow y PyTorch",
    keyText: "Algoritmos, métricas y herramientas del aprendizaje automático.",
  },
  {
    id: "neuralnet", label: "Redes neuronales", icon: "svg:nn", titleEm: "de las redes neuronales", noun: "conceptos", file: "red.py", lang: "python",
    source: "Descripciones basadas en la documentación de Keras/TensorFlow y los artículos originales",
    keyText: "Capas, activaciones, arquitecturas y técnicas de entrenamiento de redes neuronales.",
  },
];

export const DEFAULT_TABLE = "html";
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
