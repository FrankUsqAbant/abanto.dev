/** Tipos de las tablas periódicas del blog (datos en data/periodic/*.json). */

export interface PCategory {
  id: string;
  name: string;
  color: string;
  count: number;
}

export interface PItem {
  /** Número atómico (1..N) */
  n: number;
  /** Símbolo único dentro de la tabla */
  s: string;
  /** Slug para la URL */
  k: string;
  /** Nombre para la ficha */
  name: string;
  /** Texto corto de la celda */
  label: string;
  /** Categoría */
  c: string;
  r: number;
  col: number;
  /** Descripción corta */
  d: string;
  /** Documentación oficial */
  doc?: string;
  /** Sintaxis corta */
  syn?: string;
}

export interface PTableData {
  id: string;
  cols: number;
  rows: number;
  /** Línea de la cuadrícula donde termina la clave "Cómo leer la tabla" */
  keyEnd?: number;
  categories: PCategory[];
  items: PItem[];
}

export interface PCompat {
  browsers: [string, string | null][];
  deprecated: boolean;
}

export interface PDetail {
  what?: string;
  /** Lenguaje del ejemplo si difiere del de la tabla */
  lang?: "html" | "css" | "js" | "python" | "sql" | "shell" | "text";
  /** Caso de uso de negocio en una línea */
  biz?: string;
  /** Mostrar vista previa en vivo (solo HTML) */
  preview?: boolean;
  points?: string[];
  code?: string;
  syntax?: string;
  best?: string[];
  mistakes?: string[];
  uses?: string[];
  compat?: PCompat;
}

export type PDetails = Record<string, PDetail>;
