import { JSFeatureCategory } from "../../types";
import jsCategories from "../json/jsCategories.json";

/**
 * Helper function to get category color
 * Extracted from jsCategories.ts for separation of concerns
 */
export const getCategoryColor = (category: JSFeatureCategory): string => {
  return jsCategories[category]?.color || "#616161";
};

/**
 * Helper function to get category name
 */
export const getCategoryName = (category: JSFeatureCategory): string => {
  return jsCategories[category]?.name || "Unknown";
};
