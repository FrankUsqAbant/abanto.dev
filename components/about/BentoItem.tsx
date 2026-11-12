import React from "react";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

interface BentoItemProps {
  className?: string;
  title?: string;
  children: React.ReactNode;
  delay?: number;
}

const BentoItem: React.FC<BentoItemProps> = ({
  className,
  title,
  children,
  delay = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className={twMerge(
        "bg-[#111] border border-white/5 rounded-3xl p-6 flex flex-col hover:border-white/10 transition-colors relative overflow-hidden group",
        className
      )}
    >
      {/* Glow Effect */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

      {title && (
        <h3 className="text-sm font-bold text-neutral-400 uppercase tracking-widest mb-4 relative z-10">
          {title}
        </h3>
      )}

      <div className="relative z-10 flex-1">{children}</div>
    </motion.div>
  );
};

export default BentoItem;
