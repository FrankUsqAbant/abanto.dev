import { CybersecurityCategory } from "../types";

// Cybersecurity Categories with colors
export const cybersecurityCategories: Record<
  CybersecurityCategory,
  { name: string; color: string }
> = {
  attacks: {
    name: "Attacks",
    color: "#c62828", // Rojo oscuro
  },
  defenses: {
    name: "Defenses",
    color: "#2e7d32", // Verde oscuro
  },
  cryptography: {
    name: "Cryptography",
    color: "#1976d2", // Azul
  },
  network_security: {
    name: "Network Security",
    color: "#0097a7", // Cian
  },
  authentication: {
    name: "Authentication",
    color: "#7b1fa2", // Morado
  },
  vulnerabilities: {
    name: "Vulnerabilities",
    color: "#f57c00", // Naranja
  },
  tools: {
    name: "Security Tools",
    color: "#fbc02d", // Amarillo
  },
  compliance: {
    name: "Compliance",
    color: "#388e3c", // Verde claro
  },
  incident_response: {
    name: "Incident Response",
    color: "#c2185b", // Rosa
  },
  best_practices: {
    name: "Best Practices",
    color: "#616161", // Gris
  },
};

// Helper function to get category color
export const getCategoryColor = (category: CybersecurityCategory): string => {
  return cybersecurityCategories[category]?.color || "#616161";
};

// Helper function to get category name
export const getCategoryName = (category: CybersecurityCategory): string => {
  return cybersecurityCategories[category]?.name || "Unknown";
};
