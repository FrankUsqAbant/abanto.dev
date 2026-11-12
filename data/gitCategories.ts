import { GitCommandCategory } from "../types";

// Git Command Categories with colors
export const gitCategories: Record<
  GitCommandCategory,
  { name: string; color: string }
> = {
  basic: {
    name: "Basic Commands",
    color: "#2e7d32", // Verde oscuro
  },
  branching: {
    name: "Branching",
    color: "#1976d2", // Azul
  },
  remote: {
    name: "Remote Operations",
    color: "#7b1fa2", // Morado
  },
  history: {
    name: "History & Inspection",
    color: "#f57c00", // Naranja
  },
  stashing: {
    name: "Stashing",
    color: "#d32f2f", // Rojo
  },
  undoing: {
    name: "Undoing Changes",
    color: "#0097a7", // Cian
  },
  tagging: {
    name: "Tagging",
    color: "#fbc02d", // Amarillo
  },
  config: {
    name: "Configuration",
    color: "#388e3c", // Verde claro
  },
  advanced: {
    name: "Advanced",
    color: "#c2185b", // Rosa
  },
  collaboration: {
    name: "Collaboration",
    color: "#616161", // Gris
  },
};

// Helper function to get category color
export const getCategoryColor = (category: GitCommandCategory): string => {
  return gitCategories[category]?.color || "#616161";
};

// Helper function to get category name
export const getCategoryName = (category: GitCommandCategory): string => {
  return gitCategories[category]?.name || "Unknown";
};
