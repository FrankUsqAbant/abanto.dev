import { JSFeatureCategory } from "../types";

// JavaScript Feature Categories with colors
export const jsCategories: Record<
  JSFeatureCategory,
  { name: string; color: string }
> = {
  core: {
    name: "Core",
    color: "#2e7d32", // Verde oscuro
  },
  functions: {
    name: "Functions",
    color: "#1976d2", // Azul
  },
  objects: {
    name: "Objects",
    color: "#7b1fa2", // Morado
  },
  arrays: {
    name: "Arrays",
    color: "#f57c00", // Naranja
  },
  async: {
    name: "Async",
    color: "#d32f2f", // Rojo
  },
  modules: {
    name: "Modules",
    color: "#0097a7", // Cian
  },
  errors: {
    name: "Errors",
    color: "#fbc02d", // Amarillo
  },
  dom: {
    name: "DOM",
    color: "#388e3c", // Verde claro
  },
  modern: {
    name: "Modern",
    color: "#c2185b", // Rosa
  },
  advanced: {
    name: "Advanced",
    color: "#616161", // Gris
  },
};

// Helper function to get category color
export const getCategoryColor = (category: JSFeatureCategory): string => {
  return jsCategories[category]?.color || "#616161";
};

// Helper function to get category name
export const getCategoryName = (category: JSFeatureCategory): string => {
  return jsCategories[category]?.name || "Unknown";
};
