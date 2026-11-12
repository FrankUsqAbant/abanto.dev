import { useState, useMemo, useCallback } from "react";
import { PeriodicElement } from "../../../types";

/**
 * Hook genérico para manejar el filtrado de elementos por categoría y búsqueda
 */
export const useElementFilter = <T extends PeriodicElement>(elements: T[]) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Elementos filtrados (memoizado para performance)
  const filteredElements = useMemo(() => {
    let result = elements;

    // Filtrar por categoría
    if (selectedCategory) {
      result = result.filter((el) => (el as any).category === selectedCategory);
    }

    // Filtrar por término de búsqueda
    if (searchTerm.trim()) {
      const search = searchTerm.toLowerCase();
      result = result.filter(
        (el) =>
          el.name.toLowerCase().includes(search) ||
          el.symbol.toLowerCase().includes(search) ||
          el.description.toLowerCase().includes(search)
      );
    }

    return result;
  }, [elements, selectedCategory, searchTerm]);

  // Función para seleccionar categoría
  const selectCategory = useCallback((category: string | null) => {
    setSelectedCategory(category);
  }, []);

  // Función para actualizar búsqueda
  const updateSearch = useCallback((term: string) => {
    setSearchTerm(term);
  }, []);

  // Función para resetear filtros
  const resetFilters = useCallback(() => {
    setSelectedCategory(null);
    setSearchTerm("");
  }, []);

  // Verificar si un elemento está filtrado (no coincide con filtros actuales)
  const isFiltered = useCallback(
    (element: T) => {
      if (selectedCategory && (element as any).category !== selectedCategory) {
        return true;
      }

      if (searchTerm.trim()) {
        const search = searchTerm.toLowerCase();
        const matches =
          element.name.toLowerCase().includes(search) ||
          element.symbol.toLowerCase().includes(search) ||
          element.description.toLowerCase().includes(search);
        return !matches;
      }

      return false;
    },
    [selectedCategory, searchTerm]
  );

  return {
    // Estados
    selectedCategory,
    searchTerm,
    filteredElements,

    // Funciones
    selectCategory,
    updateSearch,
    resetFilters,
    isFiltered,

    // Utils
    hasActiveFilters: selectedCategory !== null || searchTerm.trim() !== "",
    filteredCount: filteredElements.length,
    totalCount: elements.length,
  };
};
