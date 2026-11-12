import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import VideoCard from "../components/courses/VideoCard";
import ExerciseCard from "../components/courses/ExerciseCard";

// --- MOCK DATA FOR SIMULATION ---
const MOCK_VIDEOS = [
  {
    id: 1,
    thumbnail:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1000&auto=format&fit=crop",
    title: "Mastering React Hooks: The Ultimate Guide",
    duration: "15:20",
    tech: "React",
    isNew: true,
  },
  {
    id: 2,
    thumbnail:
      "https://images.unsplash.com/photo-1627398242454-45a1465c2479?q=80&w=1000&auto=format&fit=crop",
    title: "Build a Modern API with Node.js & Express",
    duration: "22:15",
    tech: "Node.js",
  },
  {
    id: 3,
    thumbnail:
      "https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=1000&auto=format&fit=crop",
    title: "Advanced CSS Grid & Flexbox Layouts",
    duration: "12:45",
    tech: "CSS",
  },
  {
    id: 4,
    thumbnail:
      "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=1000&auto=format&fit=crop",
    title: "TypeScript Generics Explained Simply",
    duration: "18:30",
    tech: "TypeScript",
    isNew: true,
  },
];

const MOCK_EXERCISES = [
  {
    id: 1,
    language: "JavaScript",
    difficulty: "Easy" as const,
    title: "Array Manipulation Basics",
    description:
      "Learn how to filter, map, and reduce arrays efficiently in real-world scenarios.",
  },
  {
    id: 2,
    language: "React",
    difficulty: "Medium" as const,
    title: "Create a Custom Hook",
    description:
      "Build a useFetch hook from scratch to handle API calls with loading and error states.",
  },
  {
    id: 3,
    language: "TypeScript",
    difficulty: "Hard" as const,
    title: "Complex Union Types",
    description:
      "Master discriminating unions and type guards to build bulletproof interfaces.",
  },
  {
    id: 4,
    language: "Python",
    difficulty: "Easy" as const,
    title: "Python Data Structures",
    description:
      "Understand lists, dictionaries, and sets by building a simple contact manager.",
  },
  {
    id: 5,
    language: "Algorithm",
    difficulty: "Hard" as const,
    title: "Binary Tree Traversal",
    description:
      "Implement in-order, pre-order, and post-order traversal algorithms recursively.",
  },
  {
    id: 6,
    language: "CSS",
    difficulty: "Medium" as const,
    title: "Grid Area Layouts",
    description:
      "Recreate a complex magazine layout using only CSS Grid areas and media queries.",
  },
];

const Courses: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"videos" | "exercises">("videos");

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-32 pb-20 px-6 font-sans relative overflow-hidden">
      {/* Ambient Background */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-blue-900/10 via-[#050505] to-[#050505] pointer-events-none" />
      <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[100px] mix-blend-screen pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <header className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8 relative z-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-blue-500 mb-2 block">
              Formación & Aprendizaje
            </span>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white">
              Cursos, Tutoriales y Retos
            </h1>
            <p className="text-neutral-400 mt-2 text-sm max-w-xl">
              Explora lecciones en video, proyectos guiados y desafíos de programación interactivos para dominar el desarrollo moderno.
            </p>
          </div>

          {/* Premium Tab Navigation */}
          <div className="flex bg-white/5 backdrop-blur-3xl p-1.5 rounded-full border border-white/10 relative">
            {(["videos", "exercises"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-colors z-20 ${
                  activeTab === tab
                    ? "text-white"
                    : "text-neutral-500 hover:text-white"
                }`}
              >
                {activeTab === tab && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-blue-600 rounded-full shadow-[0_0_20px_rgba(37,99,235,0.4)]"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">
                  {tab === "videos" ? "Tutorials" : "Challenges"}
                </span>
              </button>
            ))}
          </div>
        </header>

        {/* Content Area */}
        <AnimatePresence mode="wait">
          {activeTab === "videos" ? (
            <motion.div
              key="videos"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 gap-6"
            >
              {/* Featured Video (Layout Change for First Item if needed, keeping simple list for now) */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {MOCK_VIDEOS.map((video) => (
                  <VideoCard
                    key={video.id}
                    {...video}
                    onClick={() => {
                      // Using mock courseId "1" for React videos. In real app, video should belong to course.
                      // For generic "React" tag, map to "1".
                      const courseMap: Record<string, string> = {
                        React: "1",
                        "Node.js": "2",
                        CSS: "3",
                      };
                      const courseId = courseMap[video.tech] || "1";
                      navigate(`/courses/${courseId}/learn`);
                    }}
                  />
                ))}
                {/* Placeholder for 'More Coming Soon' */}
                <div className="flex items-center justify-center h-full min-h-[250px] border border-dashed border-[#333] rounded-2xl bg-[#0a0a0a]">
                  <p className="text-[#444] font-mono text-sm uppercase tracking-widest">
                    More content loading...
                  </p>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="exercises"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-fr"
            >
              {MOCK_EXERCISES.map((exercise) => (
                <ExerciseCard
                  key={exercise.id}
                  {...exercise}
                  onClick={() => {
                    console.log("Clicked exercise:", exercise.id);
                    navigate(`/exercises/${exercise.id}`);
                  }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Courses;
