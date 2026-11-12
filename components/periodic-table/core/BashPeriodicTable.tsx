import React from "react";
import GenericPeriodicTable from "./GenericPeriodicTable";
import { bashElements } from "../../../data/bashElements";
import { bashCategories, getCategoryColor } from "../../../data/bashCategories";

/**
 * Tabla Periódica de Bash/Shell
 * Implementación específica usando el componente genérico reutilizable
 */
export const BashPeriodicTable: React.FC = () => (
  <GenericPeriodicTable
    title="Tabla Periódica de Bash/Shell"
    subtitle={`${bashElements.length} comandos Unix/Linux organizados por categoría`}
    elements={bashElements}
    categories={bashCategories}
    getCategoryColor={getCategoryColor}
  />
);

export default BashPeriodicTable;
