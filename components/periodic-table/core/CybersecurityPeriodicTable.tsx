import React from "react";
import GenericPeriodicTable from "./GenericPeriodicTable";
import { cybersecurityElements } from "../../../data/cybersecurityElements";
import {
  cybersecurityCategories,
  getCategoryColor,
} from "../../../data/cybersecurityCategories";

/**
 * Tabla Periódica de Ciberseguridad
 * Implementación específica usando el componente genérico reutilizable
 */
export const CybersecurityPeriodicTable: React.FC = () => (
  <GenericPeriodicTable
    title="Tabla Periódica de Ciberseguridad"
    subtitle={`${cybersecurityElements.length} conceptos de seguridad organizados por categoría`}
    elements={cybersecurityElements}
    categories={cybersecurityCategories}
    getCategoryColor={getCategoryColor}
  />
);

export default CybersecurityPeriodicTable;
