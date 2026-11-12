import React from "react";
import GenericPeriodicTable from "./GenericPeriodicTable";
import { htmlElements } from "../../../data/htmlElements";
import { categoryColors, categoryNames } from "../../../data/htmlCategories";

/**
 * Tabla Periódica de Elementos HTML
 * Implementación específica usando el componente genérico reutilizable
 */

// Transform categoryColors into CategoryConfig format
const htmlCategories = Object.fromEntries(
  Object.entries(categoryColors).map(([key, color]) => [
    key,
    { name: categoryNames[key as keyof typeof categoryNames] || key, color },
  ])
);

export const PeriodicTable: React.FC = () => (
  <GenericPeriodicTable
    title="Tabla Periódica de Elementos HTML"
    subtitle={`${htmlElements.length} elementos organizados por categoría`}
    elements={htmlElements}
    categories={htmlCategories}
    getCategoryColor={(category: string) => categoryColors[category]}
    elementType="html"
  />
);

export default PeriodicTable;
