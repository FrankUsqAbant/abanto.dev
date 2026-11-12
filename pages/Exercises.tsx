import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

// --- MOCK DATA ---
const STUDY_PLANS = [
  {
    id: 1,
    title: "30 Days of JavaScript",
    progress: 45,
    level: "Intermediate",
    levelColor: "bg-yellow-500",
    image:
      "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?auto=format&fit=crop&q=80&w=300",
  },
  {
    id: 2,
    title: "SQL Mastery",
    progress: 10,
    level: "Beginner",
    levelColor: "bg-green-500",
    image:
      "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&q=80&w=300",
  },
];

const EXERCISES = [
  {
    id: 1,
    title: "🤖 Compromised Files",
    tags: ["Logic", "Files"],
    difficulty: "Easy",
    tech: "JavaScript",
    status: "completed",
  },
  {
    id: 2,
    title: "⚡ The Server Attack",
    tags: ["Async", "Network"],
    difficulty: "Hard",
    tech: "Python",
    status: "pending",
  },
  {
    id: 3,
    title: "📦 Database Optimization",
    tags: ["SQL", "Performance"],
    difficulty: "Medium",
    tech: "SQL",
    status: "pending",
  },
  {
    id: 4,
    title: "🎨 CSS Paint API",
    tags: ["CSS", "Creative"],
    difficulty: "Medium",
    tech: "CSS",
    status: "pending",
  },
  {
    id: 5,
    title: "🔄 React Re-renders",
    tags: ["React", "Hooks"],
    difficulty: "Hard",
    tech: "React",
    status: "pending",
  },
];

const DIFFICULTY_COLORS = {
  Easy: "text-green-400",
  Medium: "text-yellow-400",
  Hard: "text-red-400",
};

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

const Exercises: React.FC = () => {
  const { t } = useTranslation();
  const [filterTech, setFilterTech] = useState<string>("All");
  const [filterDifficulty, setFilterDifficulty] = useState<string>("All");

  const filteredExercises = EXERCISES.filter((ex) => {
    const matchTech = filterTech === "All" || ex.tech === filterTech;
    const matchDiff =
      filterDifficulty === "All" || ex.difficulty === filterDifficulty;
    return matchTech && matchDiff;
  });

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-24 pb-20 px-6 font-['Inter'] selection:bg-blue-500/30">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header & Study Plans */}
        <section>
          <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10"
          >
            <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
              Academia de{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                Retos
              </span>
            </h1>
            <p className="text-neutral-400 max-w-2xl text-lg">
              Mejora tus habilidades resolviendo problemas reales. Sigue un plan
              o elige retos sueltos.
            </p>
          </motion.header>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {STUDY_PLANS.map((plan) => (
              <motion.div
                key={plan.id}
                variants={itemVariants}
                className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-5 hover:border-white/10 transition-all group cursor-pointer relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex gap-4">
                    <img
                      src={plan.image}
                      alt={plan.title}
                      className="w-16 h-16 rounded-xl object-cover"
                    />
                    <div>
                      <span
                        className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded ${plan.levelColor} text-black bg-opacity-80`}
                      >
                        {plan.level}
                      </span>
                      <h3 className="font-bold text-lg mt-1 group-hover:text-blue-400 transition-colors">
                        {plan.title}
                      </h3>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-neutral-500 font-mono">
                    <span>PROGRESS</span>
                    <span>{plan.progress}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 transition-all duration-1000 ease-out"
                      style={{ width: `${plan.progress}%` }}
                    ></div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Challenge List */}
        <section className="space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <h2 className="text-2xl font-bold">Desafíos Disponibles</h2>

            {/* Filters */}
            <div className="flex flex-wrap gap-2">
              {["All", "JavaScript", "React", "Python", "SQL", "CSS"].map(
                (tech) => (
                  <button
                    key={tech}
                    onClick={() => setFilterTech(tech)}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all border ${
                      filterTech === tech
                        ? "bg-white text-black border-white"
                        : "bg-transparent text-neutral-400 border-white/10 hover:border-white/30"
                    }`}
                  >
                    {tech}
                  </button>
                )
              )}
            </div>
          </div>

          <motion.div
            className="bg-[#0a0a0a] border border-white/5 rounded-2xl overflow-hidden backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {/* Header Row */}
            <div className="hidden md:grid grid-cols-12 gap-4 p-4 border-b border-white/5 text-xs font-mono text-neutral-500 uppercase tracking-widest">
              <div className="col-span-1 text-center">Estado</div>
              <div className="col-span-6">Título</div>
              <div className="col-span-3">Tags</div>
              <div className="col-span-2 text-right">Dificultad</div>
            </div>

            {/* Rows */}
            <div className="divide-y divide-white/5">
              {filteredExercises.map((ex) => (
                <Link
                  to={`/exercises/${ex.id}`}
                  key={ex.id}
                  className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 items-center hover:bg-white/5 transition-colors group"
                >
                  {/* Status */}
                  <div className="col-span-1 flex justify-center">
                    {ex.status === "completed" ? (
                      <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3.5 w-3.5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    ) : (
                      <div className="w-6 h-6 rounded-full border-2 border-white/10 group-hover:border-white/30"></div>
                    )}
                  </div>

                  {/* Title */}
                  <div className="col-span-11 md:col-span-6">
                    <h3 className="font-bold text-white group-hover:text-blue-400 transition-colors">
                      {ex.title}
                    </h3>
                  </div>

                  {/* Tags */}
                  <div className="col-span-11 md:col-span-3 col-start-2 md:col-start-auto flex gap-2">
                    {ex.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 text-neutral-400 border border-white/5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Difficulty */}
                  <div
                    className={`col-span-11 md:col-span-2 col-start-2 md:col-start-auto text-sm font-bold md:text-right ${
                      DIFFICULTY_COLORS[
                        ex.difficulty as keyof typeof DIFFICULTY_COLORS
                      ]
                    }`}
                  >
                    {ex.difficulty}
                  </div>
                </Link>
              ))}

              {filteredExercises.length === 0 && (
                <div className="p-12 text-center text-neutral-500">
                  No se encontraron retos con estos filtros.
                </div>
              )}
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
};

export default Exercises;
