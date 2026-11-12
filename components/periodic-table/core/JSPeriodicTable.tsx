import React from "react";
import GenericPeriodicTable from "./GenericPeriodicTable";
import jsElements from "../../../data/json/jsElements.json";
import jsCategories from "../../../data/json/jsCategories.json";
import { getCategoryColor } from "../../../data/utils/jsCategoryHelpers";

/**
 * Tabla Periódica de JavaScript
 * Implementación específica usando el componente genérico reutilizable
 */
export const JSPeriodicTable: React.FC = () => (
  <GenericPeriodicTable
    title="Tabla Periódica de JavaScript"
    subtitle={`${jsElements.length} features organizadas por categoría`}
    elements={jsElements}
    categories={jsCategories}
    getCategoryColor={getCategoryColor}
    elementType="js"
  />
);

export default JSPeriodicTable;
