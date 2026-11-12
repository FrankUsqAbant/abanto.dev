import React from "react";
import GenericPeriodicTable from "./GenericPeriodicTable";
import { mlElements } from "../../../data/mlElements";
import { mlCategories, getCategoryColor } from "../../../data/mlCategories";

/**
 * Tabla Periódica de Machine Learning
 * Implementación específica usando el componente genérico reutilizable
 */
export const MLPeriodicTable: React.FC = () => (
  <GenericPeriodicTable
    title="Tabla Periódica de Machine Learning"
    subtitle={`${mlElements.length} conceptos de ML organizados por categoría`}
    elements={mlElements}
    categories={mlCategories}
    getCategoryColor={getCategoryColor}
  />
);

export default MLPeriodicTable;
