import pythonCategories from "../json/pythonCategories.json";

export const getCategoryColor = (category: string): string => {
  const cat = pythonCategories[category as keyof typeof pythonCategories];
  return cat ? cat.color : "#616161";
};
