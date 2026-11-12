import { NeuralNetCategory } from "../types";

// Neural Networks Categories with colors
export const neuralNetCategories: Record<
  NeuralNetCategory,
  { name: string; color: string }
> = {
  basic_architectures: {
    name: "Basic Architectures",
    color: "#2e7d32", // Verde oscuro
  },
  layer_types: {
    name: "Layer Types",
    color: "#1976d2", // Azul
  },
  activation_functions: {
    name: "Activation Functions",
    color: "#7b1fa2", // Morado
  },
  loss_functions: {
    name: "Loss Functions",
    color: "#f57c00", // Naranja
  },
  cnn_architectures: {
    name: "CNN Architectures",
    color: "#0097a7", // Cian
  },
  rnn_architectures: {
    name: "RNN Architectures",
    color: "#d32f2f", // Rojo
  },
  attention_transformers: {
    name: "Attention & Transformers",
    color: "#fbc02d", // Amarillo
  },
  regularization: {
    name: "Regularization",
    color: "#388e3c", // Verde claro
  },
  training_techniques: {
    name: "Training Techniques",
    color: "#c2185b", // Rosa
  },
  applications: {
    name: "Applications",
    color: "#616161", // Gris
  },
};

// Helper function to get category color
export const getCategoryColor = (category: NeuralNetCategory): string => {
  return neuralNetCategories[category]?.color || "#616161";
};

// Helper function to get category name
export const getCategoryName = (category: NeuralNetCategory): string => {
  return neuralNetCategories[category]?.name || "Unknown";
};
