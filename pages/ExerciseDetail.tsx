import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import ReactMarkdown from "react-markdown";

// --- MOCK DATA FOR DETAIL ---
// In a real app, this would come from an API or a shared data file
const EXERCISE_DATA: Record<string, any> = {
  "1": {
    id: 1,
    title: "🤖 Compromised Files",
    difficulty: "Easy",
    description: `
## El Problema

El sistema de archivos de la nave ha sido comprometido. Se han detectado archivos duplicados con extensiones corruptas que están llenando el almacenamiento.

Tu misión es crear una función \`cleanSystemFiles(files)\` que reciba una lista de nombres de archivos y devuelva solo los archivos seguros (los que terminan en \`.safe\`).

### Ejemplo

\`\`\`javascript
const files = [
  "system.safe", 
  "virus.exe", 
  "notes.txt", 
  "backup.safe"
];

const result = cleanSystemFiles(files);
// Debería devolver: ["system.safe", "backup.safe"]
\`\`\`

### Notas
- La función debe ser inmutable.
- Considera edge cases como arrays vacíos.
    `,
    starterCode: `function cleanSystemFiles(files) {
  // Tu código aquí
  return [];
}`,
    resources: [
      {
        title: "Array.prototype.filter() - MDN",
        url: "https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/filter",
      },
      {
        title: "Arrow Functions",
        url: "https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Functions/Arrow_functions",
      },
    ],
  },
};

const ExerciseDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [exercise, setExercise] = useState<any>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [code, setCode] = useState("");

  useEffect(() => {
    // Simulate Fetch
    if (id && EXERCISE_DATA[id]) {
      setExercise(EXERCISE_DATA[id]);
      setCode(EXERCISE_DATA[id].starterCode);

      // Check local storage
      const savedStatus = localStorage.getItem(`exercise_${id}_status`);
      if (savedStatus === "completed") {
        setIsCompleted(true);
      }
    }
  }, [id]);

  const handleComplete = () => {
    if (!exercise) return;

    // Gamification: Confetti
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#60A5FA", "#34D399", "#F472B6"],
    });

    // Save status
    localStorage.setItem(`exercise_${exercise.id}_status`, "completed");
    setIsCompleted(true);
  };

  const handleReset = () => {
    localStorage.removeItem(`exercise_${id}_status`);
    setIsCompleted(false);
  };

  if (!exercise) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Cargando misión...</h2>
          <Link to="/exercises" className="text-blue-400 hover:underline">
            Volver al Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col pt-20 font-['Inter']">
      {/* Top Bar */}
      <header className="h-16 border-b border-white/5 bg-[#0a0a0a] px-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            to="/exercises"
            className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors text-neutral-400"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          </Link>
          <h1 className="font-bold text-lg">{exercise.title}</h1>
          <span
            className={`text-xs font-bold px-2 py-0.5 rounded border ${
              exercise.difficulty === "Easy"
                ? "border-green-500/30 text-green-400 bg-green-500/10"
                : exercise.difficulty === "Medium"
                ? "border-yellow-500/30 text-yellow-400 bg-yellow-500/10"
                : "border-red-500/30 text-red-400 bg-red-500/10"
            }`}
          >
            {exercise.difficulty}
          </span>
        </div>

        <div className="flex items-center gap-4">
          {isCompleted && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="flex items-center gap-2 text-green-400 text-sm font-bold bg-green-500/10 px-3 py-1 rounded-full border border-green-500/20"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              Misión Completada
            </motion.span>
          )}
        </div>
      </header>

      {/* Main Split Layout */}
      <main className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Left Panel: Description */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="w-full md:w-1/2 p-6 overflow-y-auto border-r border-white/5 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent"
        >
          <div className="prose prose-invert prose-blue max-w-none">
            <ReactMarkdown>{exercise.description}</ReactMarkdown>
          </div>

          <div className="mt-12 pt-8 border-t border-white/10">
            <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-500 mb-4">
              Recursos de la Academia
            </h3>
            <ul className="space-y-2">
              {exercise.resources.map((res: any, idx: number) => (
                <li key={idx}>
                  <a
                    href={res.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-400 hover:underline text-sm group"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    {res.title}
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                      →
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Right Panel: Code Editor (Simulated) */}
        <div className="w-full md:w-1/2 flex flex-col bg-[#0e0e0e]">
          {/* Editor Tabs */}
          <div className="flex border-b border-white/5">
            <div className="px-4 py-2 text-sm text-blue-400 border-b-2 border-blue-500 bg-white/5">
              solution.js
            </div>
          </div>

          {/* Editor Area */}
          <div className="flex-1 relative font-mono text-sm">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-full bg-transparent p-4 resize-none outline-none text-neutral-300 selection:bg-blue-500/30"
              spellCheck={false}
            />
          </div>

          {/* Action Bar */}
          <div className="p-4 border-t border-white/5 bg-[#0a0a0a] flex justify-end gap-4">
            <a
              href="https://github.com/FrankDev/community/discussions"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm text-neutral-400 hover:text-white transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              Comunidad
            </a>

            {isCompleted ? (
              <button
                onClick={handleReset}
                className="px-6 py-2 rounded-lg font-bold text-sm text-neutral-500 hover:text-white transition-colors"
              >
                Reiniciar Reto
              </button>
            ) : (
              <button className="px-6 py-2 rounded-lg font-bold text-sm bg-white/5 hover:bg-white/10 text-white transition-colors border border-white/10">
                Ejecutar Tests
              </button>
            )}

            <button
              onClick={handleComplete}
              disabled={isCompleted}
              className={`px-8 py-2 rounded-lg font-bold text-sm shadow-lg transition-all transform hover:-translate-y-0.5 ${
                isCompleted
                  ? "bg-green-600 text-white cursor-default opacity-50"
                  : "bg-blue-600 hover:bg-blue-500 text-white shadow-blue-900/20"
              }`}
            >
              {isCompleted ? "¡Completado!" : "Enviar Solución"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ExerciseDetail;
