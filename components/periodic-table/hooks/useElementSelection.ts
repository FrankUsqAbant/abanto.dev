import { useState, useCallback } from "react";
import { HTMLPeriodicElement } from "../../../types";

/**
 * Hook para manejar la selección de elementos
 */
export const useElementSelection = () => {
  const [selectedElement, setSelectedElement] =
    useState<HTMLPeriodicElement | null>(null);

  // Seleccionar un elemento
  const selectElement = useCallback((element: HTMLPeriodicElement) => {
    setSelectedElement(element);
  }, []);

  // Deseleccionar (cerrar modal)
  const clearSelection = useCallback(() => {
    setSelectedElement(null);
  }, []);

  // Toggle: si ya está seleccionado, deselecciona; si no, selecciona
  const toggleElement = useCallback((element: HTMLPeriodicElement) => {
    setSelectedElement((prev) =>
      prev?.symbol === element.symbol ? null : element
    );
  }, []);

  // Verificar si un elemento está seleccionado
  const isSelected = useCallback(
    (element: HTMLPeriodicElement) => {
      return selectedElement?.symbol === element.symbol;
    },
    [selectedElement]
  );

  return {
    // Estado
    selectedElement,

    // Funciones
    selectElement,
    clearSelection,
    toggleElement,
    isSelected,

    // Utils
    hasSelection: selectedElement !== null,
  };
};
