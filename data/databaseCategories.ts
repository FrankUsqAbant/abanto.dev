import { DatabaseFeatureCategory } from "../types";

// Database Feature Categories with colors (SQL + NoSQL)
export const databaseCategories: Record<
  DatabaseFeatureCategory,
  { name: string; color: string }
> = {
  dml: {
    name: "SQL DML",
    color: "#2e7d32", // Verde oscuro
  },
  ddl: {
    name: "SQL DDL",
    color: "#1976d2", // Azul
  },
  joins: {
    name: "SQL Joins",
    color: "#7b1fa2", // Morado
  },
  aggregation: {
    name: "SQL Aggregation",
    color: "#f57c00", // Naranja
  },
  nosql_queries: {
    name: "NoSQL Queries",
    color: "#d32f2f", // Rojo
  },
  nosql_concepts: {
    name: "NoSQL Concepts",
    color: "#0097a7", // Cian
  },
  datatypes: {
    name: "Data Types",
    color: "#fbc02d", // Amarillo
  },
  transactions: {
    name: "Transactions",
    color: "#388e3c", // Verde claro
  },
  indexing: {
    name: "Indexing",
    color: "#c2185b", // Rosa
  },
  advanced: {
    name: "Advanced",
    color: "#616161", // Gris
  },
};

// Helper function to get category color
export const getCategoryColor = (category: DatabaseFeatureCategory): string => {
  return databaseCategories[category]?.color || "#616161";
};

// Helper function to get category name
export const getCategoryName = (category: DatabaseFeatureCategory): string => {
  return databaseCategories[category]?.name || "Unknown";
};
