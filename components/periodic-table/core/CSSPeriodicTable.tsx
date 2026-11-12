import React from "react";
import GenericPeriodicTable from "./GenericPeriodicTable";
import { cssElements } from "../../../data/cssElements";
import { cssCategories, getCategoryColor } from "../../../data/cssCategories";

/**
 * Tabla Periódica de Propiedades CSS
 * Implementación específica usando el componente genérico reutilizable
 */
export const CSSPeriodicTable: React.FC = () => (
  <GenericPeriodicTable
    title="Tabla Periódica de Propiedades CSS"
    subtitle={`${cssElements.length} propiedades organizadas por categoría`}
    elements={cssElements}
    categories={cssCategories}
    getCategoryColor={getCategoryColor}
    elementType="css"
  />
);

export default CSSPeriodicTable;
