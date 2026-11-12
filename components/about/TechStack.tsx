import React from "react";
import { motion } from "framer-motion";

const TECH_STACK = [
  {
    name: "React",
    icon: "fab fa-react",
    color: "text-cyan-400",
    bg: "group-hover:bg-cyan-400/10",
  },
  {
    name: "TypeScript",
    icon: "fab fa-js",
    color: "text-blue-500",
    bg: "group-hover:bg-blue-500/10",
  }, // Using JS icon as TS for now if specific not avail
  {
    name: "Node.js",
    icon: "fab fa-node",
    color: "text-green-500",
    bg: "group-hover:bg-green-500/10",
  },
  {
    name: "Tailwind",
    icon: "fas fa-wind",
    color: "text-cyan-300",
    bg: "group-hover:bg-cyan-300/10",
  },
  {
    name: "Git",
    icon: "fab fa-git-alt",
    color: "text-orange-500",
    bg: "group-hover:bg-orange-500/10",
  },
  {
    name: "Database",
    icon: "fas fa-database",
    color: "text-yellow-400",
    bg: "group-hover:bg-yellow-400/10",
  },
];

const TechStack: React.FC = () => {
  return (
    <div className="grid grid-cols-3 gap-3 h-full content-center">
      {TECH_STACK.map((tech, i) => (
        <motion.div
          key={tech.name}
          whileHover={{ scale: 1.05 }}
          className={`aspect-square rounded-2xl bg-white/5 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors ${tech.bg} group`}
        >
          <i
            className={`${tech.icon} text-2xl ${tech.color} opacity-80 group-hover:opacity-100 transition-opacity`}
          />
          <span className="text-[10px] font-bold text-neutral-400 group-hover:text-white transition-colors">
            {tech.name}
          </span>
        </motion.div>
      ))}
    </div>
  );
};

export default TechStack;
