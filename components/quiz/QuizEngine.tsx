import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Tipos
interface Question {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

interface QuizEngineProps {
  questions: Question[];
  questionsPerSession?: number;
  categoryColor?: string;
}

type AnswerState = "unanswered" | "correct" | "incorrect";

/**
 * QuizEngine - Motor de Quiz Inteligente
 * Selecciona preguntas aleatorias del pool y permite reintentar con nuevas preguntas
 */
const QuizEngine: React.FC<QuizEngineProps> = ({
  questions,
  questionsPerSession = 5,
  categoryColor = "#0070f3",
}) => {
  const [selectedQuestions, setSelectedQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answerState, setAnswerState] = useState<AnswerState>("unanswered");
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  // Función para barajar y seleccionar preguntas aleatorias
  const shuffleAndSelect = useCallback(() => {
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(
      0,
      Math.min(questionsPerSession, questions.length)
    );
    setSelectedQuestions(selected);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setAnswerState("unanswered");
    setScore(0);
    setIsComplete(false);
  }, [questions, questionsPerSession]);

  // Inicializar al montar
  useEffect(() => {
    shuffleAndSelect();
  }, [shuffleAndSelect]);

  // Manejar selección de respuesta
  const handleSelectAnswer = (optionIndex: number) => {
    if (answerState !== "unanswered") return;

    setSelectedAnswer(optionIndex);
    const currentQuestion = selectedQuestions[currentIndex];
    const isCorrect = optionIndex === currentQuestion.correctIndex;

    if (isCorrect) {
      setScore((prev) => prev + 1);
      setAnswerState("correct");
    } else {
      setAnswerState("incorrect");
    }
  };

  // Avanzar a siguiente pregunta
  const handleNext = () => {
    if (currentIndex < selectedQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setAnswerState("unanswered");
    } else {
      setIsComplete(true);
    }
  };

  // Si no hay preguntas
  if (selectedQuestions.length === 0) {
    return (
      <div className="p-8 border border-white/10 rounded-2xl bg-white/[0.02] text-center">
        <p className="text-white/60">Cargando preguntas...</p>
      </div>
    );
  }

  const currentQuestion = selectedQuestions[currentIndex];
  const progress = ((currentIndex + 1) / selectedQuestions.length) * 100;

  // Pantalla de resultados
  if (isComplete) {
    const percentage = Math.round((score / selectedQuestions.length) * 100);
    const isExcellent = percentage >= 80;
    const isGood = percentage >= 60 && percentage < 80;

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="p-8 border border-white/10 rounded-2xl bg-white/[0.02] text-center"
      >
        {/* Emoji según resultado */}
        <div className="text-6xl mb-4">
          {isExcellent ? "🎉" : isGood ? "👍" : "📚"}
        </div>

        {/* Puntuación */}
        <h3 className="text-2xl font-bold text-white mb-2">
          {score}/{selectedQuestions.length} correctas
        </h3>
        <p className="text-lg text-white/60 mb-6">{percentage}% de acierto</p>

        {/* Mensaje personalizado */}
        <p className="text-white/80 mb-8">
          {isExcellent
            ? "¡Excelente! Dominas este elemento."
            : isGood
            ? "¡Buen trabajo! Sigue practicando."
            : "Hay espacio para mejorar. ¡Inténtalo de nuevo!"}
        </p>

        {/* Botón de reintentar */}
        <button
          onClick={shuffleAndSelect}
          className="px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
          style={{
            backgroundColor: categoryColor,
            color: "#050505",
          }}
        >
          🔄 Intentar de nuevo con nuevas preguntas
        </button>
      </motion.div>
    );
  }

  return (
    <div className="border border-white/10 rounded-2xl bg-white/[0.02] overflow-hidden">
      {/* Header con progreso */}
      <div className="p-4 border-b border-white/10 flex items-center justify-between">
        <span className="text-sm font-mono text-white/60">
          Pregunta {currentIndex + 1}/{selectedQuestions.length}
        </span>
        <span className="text-sm font-mono" style={{ color: categoryColor }}>
          Puntuación: {score}
        </span>
      </div>

      {/* Barra de progreso */}
      <div className="h-1 bg-white/5">
        <motion.div
          className="h-full"
          style={{ backgroundColor: categoryColor }}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Contenido del quiz */}
      <div className="p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {/* Pregunta */}
            <h3 className="text-lg font-semibold text-white mb-6">
              {currentQuestion.question}
            </h3>

            {/* Opciones */}
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrect = index === currentQuestion.correctIndex;
                const showAsCorrect = answerState !== "unanswered" && isCorrect;
                const showAsIncorrect =
                  answerState === "incorrect" && isSelected;

                return (
                  <button
                    key={index}
                    onClick={() => handleSelectAnswer(index)}
                    disabled={answerState !== "unanswered"}
                    className={`
                      w-full p-4 rounded-xl text-left transition-all duration-200
                      border-2 
                      ${
                        answerState === "unanswered"
                          ? "border-white/10 hover:border-white/30 bg-white/[0.02] hover:bg-white/5"
                          : showAsCorrect
                          ? "border-green-500 bg-green-500/10"
                          : showAsIncorrect
                          ? "border-red-500 bg-red-500/10"
                          : "border-white/5 bg-white/[0.01] opacity-50"
                      }
                    `}
                  >
                    <div className="flex items-center gap-3">
                      {/* Indicador */}
                      <span
                        className={`
                          w-7 h-7 rounded-full flex items-center justify-center text-sm font-semibold
                          ${
                            showAsCorrect
                              ? "bg-green-500 text-white"
                              : showAsIncorrect
                              ? "bg-red-500 text-white"
                              : "bg-white/10 text-white/60"
                          }
                        `}
                      >
                        {showAsCorrect
                          ? "✓"
                          : showAsIncorrect
                          ? "✗"
                          : String.fromCharCode(65 + index)}
                      </span>
                      {/* Texto de la opción */}
                      <span
                        className={`
                          ${
                            showAsCorrect
                              ? "text-green-400"
                              : showAsIncorrect
                              ? "text-red-400"
                              : "text-white/80"
                          }
                        `}
                      >
                        {option}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Explicación (solo después de responder) */}
            <AnimatePresence>
              {answerState !== "unanswered" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-6"
                >
                  <div
                    className={`
                      p-4 rounded-xl border
                      ${
                        answerState === "correct"
                          ? "border-green-500/30 bg-green-500/5"
                          : "border-yellow-500/30 bg-yellow-500/5"
                      }
                    `}
                  >
                    <p className="text-sm text-white/80">
                      <span className="font-semibold text-white">
                        💡 Explicación:
                      </span>{" "}
                      {currentQuestion.explanation}
                    </p>
                  </div>

                  {/* Botón siguiente */}
                  <button
                    onClick={handleNext}
                    className="mt-4 w-full py-3 rounded-xl font-semibold transition-all duration-200 hover:scale-[1.02]"
                    style={{
                      backgroundColor: categoryColor,
                      color: "#050505",
                    }}
                  >
                    {currentIndex < selectedQuestions.length - 1
                      ? "Siguiente pregunta →"
                      : "Ver resultados"}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default QuizEngine;
