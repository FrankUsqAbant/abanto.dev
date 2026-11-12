import React from "react";
import GenericPeriodicTable from "./GenericPeriodicTable";
import pythonElements from "../../../data/json/pythonElements.json";
import pythonCategories from "../../../data/json/pythonCategories.json";
import { getCategoryColor } from "../../../data/utils/pythonCategoryHelpers";

/**
 * Tabla Periódica de Python
 * Implementación específica usando el componente genérico reutilizable
 */
export const PythonPeriodicTable: React.FC = () => (
  <GenericPeriodicTable
    title="Tabla Periódica de Python"
    subtitle={`${pythonElements.length} features organizadas por categoría`}
    elements={pythonElements}
    categories={pythonCategories}
    getCategoryColor={getCategoryColor}
    elementType="python"
  />
);

export default PythonPeriodicTable;
