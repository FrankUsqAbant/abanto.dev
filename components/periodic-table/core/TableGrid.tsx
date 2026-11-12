import React from "react";
import { PeriodicElement } from "../../../types";
import ElementCell from "./ElementCell";
import { useTableAnimations } from "../hooks/useTableAnimations";

interface TableGridProps {
  elements: PeriodicElement[];
  isFiltered: (element: PeriodicElement) => boolean;
  isSelected: (element: PeriodicElement) => boolean;
  onSelectElement: (element: PeriodicElement) => void;
  getCategoryColor?: (element: PeriodicElement) => string;
}

/**
 * Grid principal de la tabla periódica
 * Maneja el layout de 18 columnas y renderiza todas las celdas
 */
export const TableGrid: React.FC<TableGridProps> = React.memo(
  ({ elements, isFiltered, isSelected, onSelectElement, getCategoryColor }) => {
    const { gridRef } = useTableAnimations();

    return (
      <div className="periodic-table-wrapper">
        <div
          ref={gridRef}
          className="periodic-table-grid"
          role="grid"
          aria-label="Tabla periódica"
        >
          {elements.map((element) => (
            <ElementCell
              key={`${element.row}-${element.col}`}
              element={element}
              isFiltered={isFiltered(element)}
              isSelected={isSelected(element)}
              onClick={() => onSelectElement(element)}
              getCategoryColor={getCategoryColor}
            />
          ))}
        </div>
      </div>
    );
  }
);

TableGrid.displayName = "TableGrid";

export default TableGrid;
