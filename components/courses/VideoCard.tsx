import React from "react";
import { motion } from "framer-motion";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

interface VideoCardProps {
  thumbnail: string;
  title: string;
  duration: string;
  tech: string;
  isNew?: boolean;
  onClick?: () => void;
}

const techThemes: Record<
  string,
  { shadow: string; border: string; glow: string }
> = {
  React: {
    shadow: "group-hover:shadow-[0_0_30px_rgba(34,211,238,0.4)]",
    border: "group-hover:border-cyan-400",
    glow: "bg-cyan-400",
  },
  "Node.js": {
    shadow: "group-hover:shadow-[0_0_30px_rgba(74,222,128,0.4)]",
    border: "group-hover:border-green-400",
    glow: "bg-green-400",
  },
  CSS: {
    shadow: "group-hover:shadow-[0_0_30px_rgba(59,130,246,0.4)]",
    border: "group-hover:border-blue-500",
    glow: "bg-blue-500",
  },
  TypeScript: {
    shadow: "group-hover:shadow-[0_0_30px_rgba(96,165,250,0.4)]",
    border: "group-hover:border-blue-400",
    glow: "bg-blue-400",
  },
  default: {
    shadow: "group-hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]",
    border: "group-hover:border-white/40",
    glow: "bg-white",
  },
};

const VideoCard: React.FC<VideoCardProps> = ({
  thumbnail,
  title,
  duration,
  tech,
  isNew,
  onClick,
}) => {
  const theme = techThemes[tech] || techThemes.default;

  return (
    <motion.div
      whileHover={{ y: -10, scale: 1.02 }}
      onClick={onClick}
      className={cn(
        "group relative aspect-video w-full rounded-[2rem] overflow-hidden cursor-pointer bg-[#0a0a0a]",
        "transition-all duration-700 ease-out",
        "border border-white/5 hover:border-white/20",
        theme.shadow
      )}
    >
      {/* Background Image - Full Cover */}
      <img
        src={thumbnail}
        alt={title}
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:blur-[2px] opacity-80 group-hover:opacity-40"
      />

      {/* Cinematic Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80" />

      {/* Bottom Glow Line */}
      <div
        className={cn(
          "absolute bottom-0 left-0 w-full h-1 opacity-0 group-hover:h-1.5 group-hover:opacity-100 transition-all duration-500 shadow-[0_0_30px_currentColor]",
          theme.glow
        )}
      />

      {/* Content Overlay */}
      <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
        {/* Top: Badges (Hidden by Default, Appear on Hover) */}
        <div className="flex justify-between items-start w-full translate-y-[-10px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
          <span
            className={cn(
              "px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] rounded-lg backdrop-blur-xl border border-white/10 text-white shadow-2xl z-20",
              "bg-black/40"
            )}
          >
            {tech}
          </span>

          {/* Duration Badge */}
          <span className="px-3 py-1.5 text-[10px] font-mono font-bold text-white bg-black/60 backdrop-blur-md rounded-lg border border-white/10 items-center justify-center flex gap-2">
            <i className="fas fa-clock text-[10px]" /> {duration}
          </span>
        </div>

        {/* Center Play Button - Appears on Hover */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 delay-75 shadow-2xl">
            <i className="fas fa-play text-white ml-1 text-xl drop-shadow-md" />
          </div>
        </div>

        {/* Bottom Title (Hidden by default, Revealed on Hover) */}
        <div className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-75">
          {isNew && (
            <span className="inline-block px-2 py-0.5 mb-2 bg-blue-600 text-[9px] font-black uppercase tracking-widest text-white rounded shadow-lg shadow-blue-600/40">
              NEW DROP
            </span>
          )}
          <h3 className="text-2xl font-black text-white leading-tight tracking-tight drop-shadow-xl line-clamp-2">
            {title}
          </h3>
        </div>
      </div>
    </motion.div>
  );
};

export default VideoCard;
