import React from "react";
import GenericPeriodicTable from "./GenericPeriodicTable";
import { gitElements } from "../../../data/gitElements";
import { gitCategories, getCategoryColor } from "../../../data/gitCategories";

/**
 * Tabla Periódica de Git
 * Implementación específica usando el componente genérico reutilizable
 */
export const GitPeriodicTable: React.FC = () => (
  <GenericPeriodicTable
    title="Tabla Periódica de Git"
    subtitle={`${gitElements.length} comandos Git organizados por categoría`}
    elements={gitElements}
    categories={gitCategories}
    getCategoryColor={getCategoryColor}
  />
);

export default GitPeriodicTable;
