import React from "react";

interface CategoryFilterProps {
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
  categories: string[];
  categoryLabels: Record<string, string>;
}

/**
 * Barra de filtros por categoría (genérica)
 */
export const CategoryFilter: React.FC<CategoryFilterProps> = React.memo(
  ({ selectedCategory, onSelectCategory, categories, categoryLabels }) => {
    return (
      <div className="mb-6">
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {/* Botón "All" */}
          <button
            onClick={() => onSelectCategory(null)}
            className={`px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
              selectedCategory === null
                ? "bg-white/20 text-white border border-white/30"
                : "bg-white/5 text-neutral-500 hover:bg-white/10 hover:text-white border border-white/10"
            }`}
          >
            All
          </button>

          {/* Botones de categorías */}
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onSelectCategory(category)}
              className={`px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === category
                  ? "bg-white/20 text-white border border-white/30"
                  : "bg-white/5 text-neutral-500 hover:bg-white/10 hover:text-white border border-white/10"
              }`}
            >
              {categoryLabels[category]}
            </button>
          ))}
        </div>
      </div>
    );
  }
);

CategoryFilter.displayName = "CategoryFilter";

export default CategoryFilter;
