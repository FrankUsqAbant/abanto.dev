import React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface FloatingDockProps {
  progress?: number;
}

const FloatingDock: React.FC<FloatingDockProps> = ({ progress = 0 }) => {
  const mouseX = useMotionValue(Infinity);
  const navigate = useNavigate();

  const links = [
    { icon: "house", label: "Home", path: "/" },
    { icon: "newspaper", label: "Tech Reads", path: "/tech" },
    { icon: "blog", label: "Blog", path: "/blog" },
    { icon: "graduation-cap", label: "Courses", path: "/courses" },
    { icon: "user", label: "About", path: "/about" },
  ];

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-4">
      {/* 4. Reading Progress Indicator (Requested) */}
      {progress > 0 && (
        <div className="w-full max-w-[200px] h-1 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          />
        </div>
      )}

      {/* Floating Dock Container (Glassmorphism) */}
      <motion.div
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="flex h-16 items-end gap-4 rounded-2xl bg-white/5 px-4 pb-3 border border-white/10 backdrop-blur-xl shadow-2xl"
      >
        {links.map((link) => (
          <AppIcon
            mouseX={mouseX}
            key={link.path}
            icon={link.icon}
            onClick={() => navigate(link.path)}
            label={link.label}
          />
        ))}
      </motion.div>
    </div>
  );
};

// Magnetic Icon Component
function AppIcon({
  mouseX,
  icon,
  onClick,
  label,
}: {
  mouseX: any;
  icon: string;
  onClick: () => void;
  label: string;
}) {
  const ref = React.useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  const width = useSpring(widthSync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const [hovered, setHovered] = React.useState(false);

  return (
    <motion.div
      ref={ref}
      style={{ width }}
      className="aspect-square flex items-center justify-center rounded-full bg-neutral-900 border border-white/10 cursor-pointer relative group"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileTap={{ scale: 0.9 }}
    >
      {/* Tooltip */}
      {hovered && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: -45 }}
          className="absolute text-[10px] font-black uppercase tracking-widest bg-black/80 px-2 py-1 rounded text-white whitespace-nowrap pointer-events-none border border-white/10"
        >
          {label}
        </motion.div>
      )}
      <i className={`fas fa-${icon} text-white/80`}></i>
    </motion.div>
  );
}

export default FloatingDock;
