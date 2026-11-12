import React from "react";
import { useElementFilter } from "../hooks/useElementFilter";
import { useElementSelection } from "../hooks/useElementSelection";
import CategoryFilter from "../controls/CategoryFilter";
import TableGrid from "./TableGrid";
import ElementModal from "./ElementModal";

// Importar todos los estilos (reutilizados)
import "../styles/periodic-table.css";
import "../styles/element-cell.css";
import "../styles/animations.css";
import "../styles/responsive.css";

/**
 * Componente genérico y reutilizable de Tabla Periódica
 * Elimina la duplicación de código entre todos los componentes específicos
 *
 * @param title - Título de la tabla periódica
 * @param subtitle - Subtítulo descriptivo
 * @param elements - Array de elementos a mostrar
 * @param categories - Objeto de categorías disponibles
 * @param getCategoryColor - Función para obtener el color de una categoría
 */

// Base element type that all periodic table elements must have
interface BaseElement {
  number?: number;
  symbol: string;
  name: string;
  description: string;
  category: string;
  row: number;
  col: number;
  mdnUrl?: string;
  syntax?: string;
}

// Category configuration interface
interface CategoryConfig {
  name: string;
  color: string;
}

interface GenericPeriodicTableProps<T extends BaseElement = BaseElement> {
  title: string;
  subtitle?: string;
  elements: T[];
  categories: Record<string, CategoryConfig>;
  getCategoryColor: (category: string) => string;
  elementType?: "html" | "css" | "js" | "python";
}

export const GenericPeriodicTable = <T extends BaseElement>({
  title,
  subtitle,
  elements,
  categories,
  getCategoryColor,
  elementType = "html",
}: GenericPeriodicTableProps<T>) => {
  // Hook de filtrado
  const { selectedCategory, selectCategory, isFiltered } =
    useElementFilter(elements);

  // Hook de selección
  const { selectedElement, selectElement, clearSelection, isSelected } =
    useElementSelection();

  // Generar labels de categorías a partir del objeto de categorías
  const categoryLabels = Object.fromEntries(
    Object.entries(categories).map(([key, value]) => [key, value.name])
  );

  // Get category keys with proper typing
  const categoryKeys = Object.keys(categories);

  return (
    <div className="periodic-table-container">
      {/* Header */}
      <div className="periodic-table-header">
        <h1 className="periodic-table-title">{title}</h1>
        {subtitle && <p className="periodic-table-subtitle">{subtitle}</p>}
      </div>

      {/* Filtros de categoría */}
      <CategoryFilter
        selectedCategory={selectedCategory ?? null}
        onSelectCategory={selectCategory}
        categories={categoryKeys}
        categoryLabels={categoryLabels}
      />

      {/* Grid principal */}
      <TableGrid
        elements={elements}
        isFiltered={isFiltered}
        isSelected={isSelected}
        onSelectElement={selectElement}
        getCategoryColor={(element: T) => getCategoryColor(element.category)}
      />

      {/* Modal de detalles */}
      {selectedElement && (
        <ElementModal
          element={selectedElement}
          onClose={clearSelection}
          elementType={elementType}
        />
      )}
    </div>
  );
};

export default GenericPeriodicTable;
