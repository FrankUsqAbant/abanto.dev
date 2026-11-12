import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  UNIVERSE_DATA,
  UniverseCategory,
  UniverseElement,
} from "../data/universe";
import { View } from "../types";
import { cn } from "../utils";
import {
  PERIODIC_TABLE_CONFIG,
  hasPeriodicTable,
} from "../components/periodic-table/config/periodicTableConfig";
import { ElementCard } from "../components/periodic-table/core/ElementCard";

interface BlogProps {
  onNavigate: (view: View) => void;
}

const Blog: React.FC<BlogProps> = ({ onNavigate }) => {
  const [activeCategoryId, setActiveCategoryId] = useState<string>(
    UNIVERSE_DATA[0].id
  );
  const [selectedElement, setSelectedElement] =
    useState<UniverseElement | null>(null);

  const activeCategory =
    UNIVERSE_DATA.find((c) => c.id === activeCategoryId) ?? UNIVERSE_DATA[0];

  return (
    <div className="min-h-screen bg-[#050505] text-white font-mono selection:bg-green-500/30 selection:text-green-200 flex flex-col relative overflow-hidden">
      {/* Matrix Rain / Background noise effect could go here */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 255, 0, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 0, 0.1) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      ></div>

      {/* 1. COMMAND BAR (Top Navigation) */}
      <header className="sticky top-0 z-50 bg-[#050505]/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center gap-6 overflow-x-auto no-scrollbar mask-gradient-x">
          {/* Home/Back Button */}
          <button
            onClick={() => onNavigate("home")}
            className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg border border-white/10 hover:bg-white/5 hover:border-white/30 transition-all active:scale-95"
          >
            <i className="fas fa-home text-neutral-400"></i>
          </button>

          <div className="h-8 w-px bg-white/10 flex-shrink-0"></div>

          {/* Categories */}
          <div className="flex gap-2">
            {UNIVERSE_DATA.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategoryId(cat.id);
                  setSelectedElement(null);
                }}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-300 uppercase tracking-wider text-xs font-bold whitespace-nowrap",
                  activeCategoryId === cat.id
                    ? "bg-white/5 shadow-[0_0_15px_rgba(var(--color-glow))] text-white"
                    : "border-transparent text-neutral-500 hover:text-white hover:bg-white/5 hover:border-white/10"
                )}
                style={{
                  borderColor:
                    activeCategoryId === cat.id ? "currentColor" : undefined,
                  color: activeCategoryId === cat.id ? undefined : undefined, // Let Tailwind handle inactive
                }}
              >
                <span className={activeCategoryId === cat.id ? cat.color : ""}>
                  <i className={cat.icon}></i>
                </span>
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full p-6 flex flex-col lg:flex-row gap-8 relative z-10">
        {/* 2. THE GRID (Periodic Table) */}
        <section className="flex-1">
          <div className="mb-4 flex justify-between items-end">
            <div>
              <h2 className="text-sm text-neutral-500 uppercase tracking-[0.2em] mb-1">
                Sector Analysis
              </h2>
              <h1
                className={cn(
                  "text-3xl font-black uppercase tracking-tight",
                  activeCategory.color
                )}
              >
                {activeCategory.name}
              </h1>
            </div>
          </div>

          {/* Renderizado dinámico de tablas periódicas */}
          {PERIODIC_TABLE_CONFIG[activeCategory.id] ? (
            React.createElement(
              PERIODIC_TABLE_CONFIG[activeCategory.id].component
            )
          ) : (
            <motion.div
              layout
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
            >
              <AnimatePresence mode="popLayout">
                {activeCategory.elements.map((el) => (
                  <ElementCard
                    key={el.id}
                    number={el.number}
                    symbol={el.symbol}
                    name={el.name}
                    category={el.category}
                    categoryColor={activeCategory.color}
                    isSelected={selectedElement?.id === el.id}
                    onClick={() => setSelectedElement(el)}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </section>

        {/* 3. DATA READER (Info Panel) - Oculto para tablas periódicas */}
        {!hasPeriodicTable(activeCategory.id) && (
          <aside className="lg:w-[400px] flex-shrink-0">
            <AnimatePresence mode="wait">
              {selectedElement ? (
                <motion.div
                  key={selectedElement.id}
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 50, opacity: 0 }}
                  className="sticky top-24 bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
                >
                  {/* Header */}
                  <div className="p-6 border-b border-white/10 bg-white/5 relative overflow-hidden">
                    <div
                      className={cn(
                        "absolute top-0 right-0 p-4 opacity-20 text-6xl font-black",
                        activeCategory.color
                      )}
                    >
                      {selectedElement.symbol}
                    </div>
                    <div className="relative z-10">
                      <div className="flex gap-2 mb-4">
                        {selectedElement.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] font-bold px-2 py-0.5 rounded bg-black/40 border border-white/10 text-neutral-400 uppercase"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h2 className="text-3xl font-black text-white mb-1">
                        {selectedElement.name}
                      </h2>
                      <p className="text-sm text-neutral-400 font-mono">
                        {selectedElement.category.toUpperCase()}
                      </p>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-6">
                    <div>
                      <h4 className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-2">
                        Definition
                      </h4>
                      <p className="text-sm text-neutral-300 leading-relaxed">
                        {selectedElement.description}
                      </p>
                    </div>

                    {selectedElement.codeSnippet && (
                      <div>
                        <h4 className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-2">
                          Payload / Syntax
                        </h4>
                        <div className="bg-[#050505] p-4 rounded-lg border border-white/5 font-mono text-xs text-green-400 overflow-x-auto selection:bg-white/20">
                          <pre>{selectedElement.codeSnippet}</pre>
                        </div>
                      </div>
                    )}

                    <div>
                      <h4 className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-2">
                        {activeCategoryId === "hacking"
                          ? "Danger Level"
                          : "Complexity"}
                      </h4>
                      <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{
                            width: `${(selectedElement.difficulty ?? 1) * 10}%`,
                          }}
                          className={cn(
                            "h-full rounded-full relative overflow-hidden",
                            activeCategoryId === "hacking"
                              ? "bg-red-500"
                              : "bg-blue-500"
                          )}
                        >
                          <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                        </motion.div>
                      </div>
                      <div className="flex justify-between text-[10px] font-mono text-neutral-500 mt-1">
                        <span>SAFE</span>
                        <span>CRITICAL</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </aside>
        )}
      </main>
    </div>
  );
};

export default Blog;
