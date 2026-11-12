import { BashCommandCategory } from "../types";

// Bash/Shell Command Categories with colors
export const bashCategories: Record<
  BashCommandCategory,
  { name: string; color: string }
> = {
  file_ops: {
    name: "File Operations",
    color: "#2e7d32", // Verde oscuro
  },
  text_processing: {
    name: "Text Processing",
    color: "#1976d2", // Azul
  },
  system_info: {
    name: "System Info",
    color: "#7b1fa2", // Morado
  },
  permissions: {
    name: "Permissions",
    color: "#f57c00", // Naranja
  },
  process_mgmt: {
    name: "Process Management",
    color: "#d32f2f", // Rojo
  },
  network: {
    name: "Network",
    color: "#0097a7", // Cian
  },
  archives: {
    name: "Archives",
    color: "#fbc02d", // Amarillo
  },
  search: {
    name: "Search & Find",
    color: "#388e3c", // Verde claro
  },
  scripting: {
    name: "Scripting",
    color: "#c2185b", // Rosa
  },
  advanced: {
    name: "Advanced",
    color: "#616161", // Gris
  },
};

// Helper function to get category color
export const getCategoryColor = (category: BashCommandCategory): string => {
  return bashCategories[category]?.color || "#616161";
};

// Helper function to get category name
export const getCategoryName = (category: BashCommandCategory): string => {
  return bashCategories[category]?.name || "Unknown";
};
