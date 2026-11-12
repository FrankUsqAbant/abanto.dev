import React from "react";
import GenericPeriodicTable from "./GenericPeriodicTable";
import { neuralNetElements } from "../../../data/neuralNetElements";
import {
  neuralNetCategories,
  getCategoryColor,
} from "../../../data/neuralNetCategories";

/**
 * Tabla Periódica de Redes Neuronales
 * Implementación específica usando el componente genérico reutilizable
 */
export const NeuralNetPeriodicTable: React.FC = () => (
  <GenericPeriodicTable
    title="Tabla Periódica de Redes Neuronales"
    subtitle={`${neuralNetElements.length} conceptos de Deep Learning organizados por categoría`}
    elements={neuralNetElements}
    categories={neuralNetCategories}
    getCategoryColor={getCategoryColor}
  />
);

export default NeuralNetPeriodicTable;
