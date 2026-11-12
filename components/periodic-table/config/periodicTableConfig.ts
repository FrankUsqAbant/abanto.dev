import React from "react";
import { PeriodicTable } from "../core/PeriodicTable";
import CSSPeriodicTable from "../core/CSSPeriodicTable";
import JSPeriodicTable from "../core/JSPeriodicTable";
import PythonPeriodicTable from "../core/PythonPeriodicTable";
import DatabasePeriodicTable from "../core/DatabasePeriodicTable";
import GitPeriodicTable from "../core/GitPeriodicTable";
import BashPeriodicTable from "../core/BashPeriodicTable";
import CybersecurityPeriodicTable from "../core/CybersecurityPeriodicTable";
import MLPeriodicTable from "../core/MLPeriodicTable";
import NeuralNetPeriodicTable from "../core/NeuralNetPeriodicTable";

/**
 * Configuración centralizada de tablas periódicas por categoría
 * Elimina la necesidad de cadenas if-else para renderizado condicional
 */
interface PeriodicTableConfig {
  component: React.FC;
}

export const PERIODIC_TABLE_CONFIG: Record<string, PeriodicTableConfig> = {
  html: { component: PeriodicTable },
  css: { component: CSSPeriodicTable },
  javascript: { component: JSPeriodicTable },
  python: { component: PythonPeriodicTable },
  databases: { component: DatabasePeriodicTable },
  git: { component: GitPeriodicTable },
  bash: { component: BashPeriodicTable },
  cybersecurity: { component: CybersecurityPeriodicTable },
  ml: { component: MLPeriodicTable },
  neuralnet: { component: NeuralNetPeriodicTable },
};

/**
 * Set de categorías que tienen tabla periódica
 * Optimiza validaciones de O(n) a O(1)
 */
export const PERIODIC_TABLE_CATEGORIES = new Set<string>([
  "html",
  "css",
  "javascript",
  "python",
  "databases",
  "git",
  "bash",
  "cybersecurity",
  "ml",
  "neuralnet",
]);

/**
 * Helper para verificar si una categoría tiene tabla periódica
 */
export const hasPeriodicTable = (categoryId: string): boolean =>
  PERIODIC_TABLE_CATEGORIES.has(categoryId);
