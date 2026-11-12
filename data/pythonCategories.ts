import { PythonFeatureCategory } from "../types";

// Python Feature Categories with colors
export const pythonCategories: Record<
  PythonFeatureCategory,
  { name: string; color: string }
> = {
  basics: {
    name: "Basics",
    color: "#2e7d32", // Verde oscuro
  },
  control: {
    name: "Control Flow",
    color: "#1976d2", // Azul
  },
  functions: {
    name: "Functions",
    color: "#7b1fa2", // Morado
  },
  oop: {
    name: "OOP",
    color: "#f57c00", // Naranja
  },
  data: {
    name: "Data Structures",
    color: "#d32f2f", // Rojo
  },
  modules: {
    name: "Modules",
    color: "#0097a7", // Cian
  },
  exceptions: {
    name: "Exceptions",
    color: "#fbc02d", // Amarillo
  },
  fileio: {
    name: "File I/O",
    color: "#388e3c", // Verde claro
  },
  advanced: {
    name: "Advanced",
    color: "#c2185b", // Rosa
  },
  stdlib: {
    name: "Std Library",
    color: "#616161", // Gris
  },
};

// Helper function to get category color
export const getCategoryColor = (category: PythonFeatureCategory): string => {
  return pythonCategories[category]?.color || "#616161";
};

// Helper function to get category name
export const getCategoryName = (category: PythonFeatureCategory): string => {
  return pythonCategories[category]?.name || "Unknown";
};
