import React from "react";
import GenericPeriodicTable from "./GenericPeriodicTable";
import { databaseElements } from "../../../data/databaseElements";
import {
  databaseCategories,
  getCategoryColor,
} from "../../../data/databaseCategories";

/**
 * Tabla Periódica de Bases de Datos (SQL + NoSQL)
 * Implementación específica usando el componente genérico reutilizable
 */
export const DatabasePeriodicTable: React.FC = () => (
  <GenericPeriodicTable
    title="Tabla Periódica de Bases de Datos"
    subtitle={`${databaseElements.length} comandos SQL y NoSQL organizados por categoría`}
    elements={databaseElements}
    categories={databaseCategories}
    getCategoryColor={getCategoryColor}
  />
);

export default DatabasePeriodicTable;
