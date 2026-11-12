import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../../utils";

interface ElementCardProps {
  number: number;
  symbol: string;
  name: string;
  category: string;
  categoryColor: string;
  isSelected: boolean;
  onClick: () => void;
}

/**
 * Componente reutilizable para mostrar una celda de elemento
 * Diseño refinado coherente con la estética FrankDev
 */
export const ElementCard: React.FC<ElementCardProps> = ({
  number,
  symbol,
  name,
  categoryColor,
  isSelected,
  onClick,
}) => {
  return (
    <motion.button
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      onClick={onClick}
      className={cn(
        // Base styles - cuadrado con centrado perfecto
        "relative min-w-[65px] min-h-[65px] aspect-square",
        "flex flex-col items-center justify-center",
        "rounded-xl p-2 overflow-visible",
        "transition-all duration-300 ease-out",
        "group cursor-pointer",

        // Estado normal - fondo oscuro sutil (no interfiere con colores)
        !isSelected && [
          "bg-black/30 border border-white/[0.08]",
          // Hover - expansión con glow
          "hover:scale-[1.15] hover:-translate-y-1",
          "hover:min-h-[85px]",
          "hover:bg-black/50 hover:border-white/25",
          "hover:shadow-[0_0_25px_rgba(0,112,243,0.25),0_20px_25px_-5px_rgba(0,0,0,0.4)]",
          "hover:z-30",
        ],

        // Estado seleccionado
        isSelected && [
          "scale-110 -translate-y-1",
          "bg-white/10 border border-white/50",
          "shadow-[0_0_30px_rgba(0,112,243,0.4),0_15px_25px_rgba(0,0,0,0.4)]",
          "z-20",
        ]
      )}
    >
      {/* Número - esquina superior izquierda */}
      <span className="absolute top-1 left-1.5 text-[10px] font-mono text-white/60">
        {number}
      </span>

      {/* Símbolo - centrado y grande */}
      <span
        className={cn(
          "text-[1.75rem] font-black leading-none tracking-tight uppercase",
          "text-center my-auto",
          isSelected ? "text-white" : ""
        )}
        style={{ color: isSelected ? undefined : categoryColor }}
      >
        {symbol}
      </span>

      {/* Nombre - visible solo en hover con expansión */}
      <span
        className={cn(
          "text-[0.55rem] font-medium uppercase tracking-wide text-white/90 text-center",
          "whitespace-nowrap mt-1",
          // Oculto por defecto, visible en hover
          "opacity-0 max-h-0 overflow-hidden",
          "group-hover:opacity-100 group-hover:max-h-[20px]",
          "transition-all duration-250 ease-out",
          // Siempre visible si está seleccionado
          isSelected && "opacity-100 max-h-[20px]"
        )}
      >
        {name}
      </span>
    </motion.button>
  );
};

export default ElementCard;
