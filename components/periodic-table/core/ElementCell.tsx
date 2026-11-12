import React from "react";
import { PeriodicElement } from "../../../types";
import { categoryColors } from "../../../data/htmlCategories";
import "../styles/element-cell.css";

interface ElementCellProps {
  element: PeriodicElement;
  isFiltered: boolean;
  isSelected: boolean;
  onClick: () => void;
  getCategoryColor?: (element: PeriodicElement) => string;
}

/**
 * Componente para una celda individual genérica
 * Diseño Dark Mode: fondo oscuro + símbolo con color de categoría
 * Abre página de detalle en nueva pestaña al hacer click
 */
export const ElementCell: React.FC<ElementCellProps> = React.memo(
  ({ element, isFiltered, isSelected, onClick, getCategoryColor }) => {
    // Color de categoría - ahora se aplica al SÍMBOLO, no al fondo
    const symbolColor = getCategoryColor
      ? getCategoryColor(element)
      : (categoryColors as any)[(element as any).category] || "#9e9e9e";

    const cellClasses = [
      "element-cell",
      isFiltered && "element-cell--filtered",
      isSelected && "element-cell--selected",
    ]
      .filter(Boolean)
      .join(" ");

    // ID del elemento para la URL (usar name que es el nombre real de la etiqueta HTML)
    const elementId = element.name.toLowerCase();

    // Handler para click derecho o click normal (mantiene onClick para selección)
    const handleClick = (e: React.MouseEvent) => {
      // Si es click normal (no cmd/ctrl), también ejecutar onClick para selección
      if (!e.ctrlKey && !e.metaKey) {
        onClick();
      }
    };

    return (
      <a
        href={`/element/${elementId}`}
        target="_blank"
        rel="noopener noreferrer"
        className={cellClasses}
        style={{
          gridColumn: element.col,
          gridRow: element.row,
          textDecoration: "none",
        }}
        onClick={handleClick}
        aria-label={`${element.name} - ${element.description}`}
        tabIndex={isFiltered ? -1 : 0}
      >
        {/* Número arriba-izquierda */}
        {element.number && (
          <div className="element-cell__number">{element.number}</div>
        )}

        {/* Símbolo del elemento - COLOR DE CATEGORÍA AQUÍ */}
        <div className="element-cell__symbol" style={{ color: symbolColor }}>
          {element.symbol}
        </div>

        {/* Nombre del elemento */}
        <div className="element-cell__name">{element.name}</div>

        {/* Categoría debajo */}
        <div className="element-cell__category">
          {(element as any).category}
        </div>
      </a>
    );
  }
);

ElementCell.displayName = "ElementCell";

export default ElementCell;
