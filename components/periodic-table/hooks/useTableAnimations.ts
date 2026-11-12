import { useEffect, useRef, useCallback } from "react";

/**
 * Hook para manejar animaciones de la tabla periódica
 */
export const useTableAnimations = () => {
  const gridRef = useRef<HTMLDivElement>(null);

  // Animar entrada de elementos al cargar
  useEffect(() => {
    if (!gridRef.current) return;

    const cells = gridRef.current.querySelectorAll(".element-cell");

    cells.forEach((cell, index) => {
      const delay = index * 20; // 20ms de delay entre cada celda
      (cell as HTMLElement).style.animationDelay = `${delay}ms`;
    });
  }, []);

  // Función para animar cambio de filtro
  const animateFilterChange = useCallback(() => {
    if (!gridRef.current) return;

    const cells = gridRef.current.querySelectorAll(
      ".element-cell:not(.element-cell--filtered)"
    );

    cells.forEach((cell, index) => {
      const element = cell as HTMLElement;
      element.style.animation = "none";

      // Forzar reflow
      void element.offsetWidth;

      const delay = index * 15;
      element.style.animation = `fadeInUp 0.4s ease-out ${delay}ms backwards`;
    });
  }, []);

  // Función para hacer scroll hasta un elemento
  const scrollToElement = useCallback((row: number, col: number) => {
    if (!gridRef.current) return;

    const cell = gridRef.current.querySelector(
      `[style*="grid-row: ${row}"][style*="grid-column: ${col}"]`
    );

    if (cell) {
      cell.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
    }
  }, []);

  return {
    gridRef,
    animateFilterChange,
    scrollToElement,
  };
};
