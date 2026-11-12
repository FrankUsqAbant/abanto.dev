import { MLCategory } from "../types";

// Machine Learning Categories with colors
export const mlCategories: Record<MLCategory, { name: string; color: string }> =
  {
    supervised: {
      name: "Supervised Learning",
      color: "#2e7d32", // Verde oscuro
    },
    unsupervised: {
      name: "Unsupervised Learning",
      color: "#1976d2", // Azul
    },
    deep_learning: {
      name: "Deep Learning",
      color: "#7b1fa2", // Morado
    },
    preprocessing: {
      name: "Preprocessing",
      color: "#f57c00", // Naranja
    },
    metrics: {
      name: "Evaluation Metrics",
      color: "#0097a7", // Cian
    },
    optimization: {
      name: "Optimization",
      color: "#d32f2f", // Rojo
    },
    frameworks: {
      name: "Frameworks & Tools",
      color: "#fbc02d", // Amarillo
    },
    model_types: {
      name: "Model Types",
      color: "#388e3c", // Verde claro
    },
    advanced: {
      name: "Advanced Techniques",
      color: "#c2185b", // Rosa
    },
    mlops: {
      name: "MLOps & Deployment",
      color: "#616161", // Gris
    },
  };

// Helper function to get category color
export const getCategoryColor = (category: MLCategory): string => {
  return mlCategories[category]?.color || "#616161";
};

// Helper function to get category name
export const getCategoryName = (category: MLCategory): string => {
  return mlCategories[category]?.name || "Unknown";
};
