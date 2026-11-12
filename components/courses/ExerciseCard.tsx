import React from "react";
import { motion } from "framer-motion";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

interface ExerciseCardProps {
  language: string;
  difficulty: "Easy" | "Medium" | "Hard";
  title: string;
  description: string;
  onClick?: () => void;
}

const difficultyColors = {
  Easy: "text-green-400 bg-green-400/10 border-green-400/20",
  Medium: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
  Hard: "text-red-500 bg-red-500/10 border-red-500/20",
};

const ExerciseCard: React.FC<ExerciseCardProps> = ({
  language,
  difficulty,
  title,
  description,
  onClick,
}) => {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.01 }}
      onClick={onClick}
      className="group relative bg-[#0a0a0a]/80 backdrop-blur-md border border-white/5 rounded-[2rem] p-8 flex flex-col justify-between h-[320px] overflow-hidden hover:border-white/10 transition-all duration-500 cursor-pointer shadow-xl hover:shadow-2xl"
    >
      {/* Background Gradient Blob - Pulsing */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] pointer-events-none group-hover:bg-cyan-500/20 transition-all duration-700 group-hover:scale-125 opacity-50" />
      <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-500/5 rounded-full blur-[60px] pointer-events-none group-hover:bg-purple-500/15 transition-all duration-700 opacity-30" />

      {/* Header */}
      <div className="flex justify-between items-start relative z-10">
        <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-white/20 group-hover:bg-white/10 transition-all duration-300 shadow-inner">
          <i className="fas fa-code text-neutral-400 group-hover:text-white text-lg transition-colors" />
        </div>
        <span
          className={cn(
            "px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-[0.2em] border backdrop-blur-md shadow-lg",
            difficultyColors[difficulty]
          )}
        >
          {difficulty}
        </span>
      </div>

      {/* Content */}
      <div className="relative z-10 mt-6">
        <div className="text-[9px] font-black text-neutral-500 uppercase tracking-[0.3em] mb-3 group-hover:text-blue-400 transition-colors">
          {language}
        </div>
        <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-neutral-400 transition-all duration-300 leading-tight">
          {title}
        </h3>
        <p className="text-neutral-500 text-sm leading-relaxed line-clamp-3 group-hover:text-neutral-400 transition-colors">
          {description}
        </p>
      </div>

      {/* Action Line */}
      <div className="relative z-10 pt-6 mt-auto border-t border-white/5 flex items-center justify-between group-hover:border-white/10 transition-colors">
        <span className="text-xs font-mono font-bold text-neutral-600 group-hover:text-white transition-colors uppercase tracking-widest">
          Start Challenge
        </span>
        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
          <i className="fas fa-arrow-right text-[10px] text-neutral-600 group-hover:text-white -rotate-45 group-hover:rotate-0 transition-transform duration-500" />
        </div>
      </div>
    </motion.div>
  );
};

export default ExerciseCard;
