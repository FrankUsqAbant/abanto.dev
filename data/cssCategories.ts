import { CSSPropertyCategory } from "../types";

// CSS Property Categories with colors
export const cssCategories: Record<
  CSSPropertyCategory,
  { name: string; color: string }
> = {
  layout: {
    name: "Layout",
    color: "#4caf50", // Verde
  },
  typography: {
    name: "Typography",
    color: "#2196f3", // Azul
  },
  visual: {
    name: "Visual",
    color: "#ff9800", // Naranja
  },
  flexbox: {
    name: "Flexbox",
    color: "#9c27b0", // Morado
  },
  grid: {
    name: "Grid",
    color: "#00bcd4", // Cian
  },
  transform: {
    name: "Transform",
    color: "#e91e63", // Rosa
  },
  positioning: {
    name: "Positioning",
    color: "#ffeb3b", // Amarillo
  },
  effects: {
    name: "Effects",
    color: "#f44336", // Rojo
  },
  table: {
    name: "Table",
    color: "#795548", // Marrón
  },
  lists: {
    name: "Lists",
    color: "#8bc34a", // Verde claro
  },
  content: {
    name: "Content",
    color: "#9e9e9e", // Gris
  },
  misc: {
    name: "Misc",
    color: "#607d8b", // Azul oscuro
  },
};

// Helper function to get category color
export const getCategoryColor = (category: CSSPropertyCategory): string => {
  return cssCategories[category]?.color || "#9e9e9e";
};

// Helper function to get category name
export const getCategoryName = (category: CSSPropertyCategory): string => {
  return cssCategories[category]?.name || "Unknown";
};
