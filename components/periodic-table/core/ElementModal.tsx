import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HTMLPeriodicElement } from "../../../types";
import { getElementDetail, PeriodicTheme } from "../../../data/elementDetails";

interface ElementModalProps {
  element: HTMLPeriodicElement;
  onClose: () => void;
  elementType?: PeriodicTheme;
}

/**
 * Modal para mostrar información detallada del elemento
 */
export const ElementModal: React.FC<ElementModalProps> = ({
  element,
  onClose,
  elementType = "html",
}) => {
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  // Obtener datos detallados
  const elementDetail = getElementDetail(element.name, elementType);
  const hasRichData = !!elementDetail;

  // Cerrar con tecla ESC
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  const handleAnswer = (index: number) => {
    if (selectedAnswer !== null || !elementDetail) return;

    setSelectedAnswer(index);
    if (index === elementDetail.quizPool[currentQuestion].correctAnswer) {
      setScore((s) => s + 1);
    }
  };

  const nextQuestion = () => {
    if (!elementDetail) return;

    if (currentQuestion < elementDetail.quizPool.length - 1) {
      setCurrentQuestion((c) => c + 1);
      setSelectedAnswer(null);
    } else {
      setQuizFinished(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setQuizFinished(false);
    setShowQuiz(false);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="bg-[#0a0a0a] border border-white/10 rounded-2xl max-w-4xl w-full shadow-2xl overflow-hidden my-8"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-6 border-b border-white/10 bg-white/5 flex justify-between items-start sticky top-0 backdrop-blur-md z-10">
            <div>
              <div
                className="text-sm font-bold uppercase tracking-wider mb-1"
                style={{ color: elementDetail?.categoryColor || "#fff" }}
              >
                {element.category}
              </div>
              <h2 className="text-4xl font-black text-white flex items-center gap-3">
                &lt;{element.name}&gt;
                {hasRichData && (
                  <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded border border-green-500/30">
                    Rich Data
                  </span>
                )}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="text-neutral-400 hover:text-white transition-colors w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10"
              aria-label="Cerrar modal"
            >
              ✕
            </button>
          </div>

          <div className="p-0">
            {/* Tabs / Mode Switcher */}
            {hasRichData && (
              <div className="flex border-b border-white/10">
                <button
                  onClick={() => setShowQuiz(false)}
                  className={`flex-1 py-4 text-sm font-bold uppercase tracking-widest transition-colors ${
                    !showQuiz
                      ? "bg-white/5 text-white border-b-2 border-green-500"
                      : "text-neutral-500 hover:text-white"
                  }`}
                >
                  Documentación
                </button>
                <button
                  onClick={() => setShowQuiz(true)}
                  className={`flex-1 py-4 text-sm font-bold uppercase tracking-widest transition-colors ${
                    showQuiz
                      ? "bg-white/5 text-white border-b-2 border-green-500"
                      : "text-neutral-500 hover:text-white"
                  }`}
                >
                  Quiz Challenge
                </button>
              </div>
            )}

            <div className="p-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
              {!showQuiz ? (
                // Documentation View
                <div className="space-y-8">
                  {/* Descripción Principal */}
                  <div>
                    <h3 className="text-sm font-bold text-neutral-500 uppercase tracking-widest mb-3">
                      Descripción
                    </h3>
                    <p className="text-lg text-neutral-200 leading-relaxed">
                      {elementDetail?.description || element.description}
                    </p>
                  </div>

                  {/* Key Points */}
                  {elementDetail?.keyPoints && (
                    <div>
                      <h3 className="text-sm font-bold text-neutral-500 uppercase tracking-widest mb-3">
                        Puntos Clave
                      </h3>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {elementDetail.keyPoints.map((point, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-neutral-300"
                          >
                            <span className="text-green-500 mt-1">●</span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Syntax & Example */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {elementDetail?.syntax && (
                      <div>
                        <h3 className="text-sm font-bold text-neutral-500 uppercase tracking-widest mb-3">
                          Sintaxis
                        </h3>
                        <div className="bg-[#050505] p-4 rounded-lg border border-white/10 font-mono text-sm text-blue-300 overflow-x-auto">
                          <pre>{elementDetail.syntax}</pre>
                        </div>
                      </div>
                    )}
                    {(elementDetail?.codeExample || element.example) && (
                      <div>
                        <h3 className="text-sm font-bold text-neutral-500 uppercase tracking-widest mb-3">
                          Ejemplo
                        </h3>
                        <div className="bg-[#050505] p-4 rounded-lg border border-white/10 font-mono text-sm text-green-300 overflow-x-auto">
                          <pre>
                            {elementDetail?.codeExample || element.example}
                          </pre>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Use Cases & Best Practices */}
                  {elementDetail && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h3 className="text-sm font-bold text-neutral-500 uppercase tracking-widest mb-3">
                          Casos de Uso
                        </h3>
                        <ul className="space-y-2">
                          {elementDetail.useCases.map((useCase, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-2 text-sm text-neutral-400"
                            >
                              <span className="text-blue-500">✓</span> {useCase}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-neutral-500 uppercase tracking-widest mb-3">
                          Mejores Prácticas
                        </h3>
                        <ul className="space-y-2">
                          {elementDetail.bestPractices.map((practice, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-2 text-sm text-neutral-400"
                            >
                              <span className="text-purple-500">★</span>{" "}
                              {practice}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* Link a MDN */}
                  {element.mdnUrl && (
                    <div className="pt-4 border-t border-white/10">
                      <a
                        href={element.mdnUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors group"
                      >
                        <span className="group-hover:underline">
                          Ver documentación oficial en MDN
                        </span>
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </a>
                    </div>
                  )}
                </div>
              ) : (
                // Quiz View
                <div className="max-w-2xl mx-auto py-4">
                  {!quizFinished ? (
                    <div className="space-y-6">
                      <div className="flex justify-between items-center text-sm font-mono text-neutral-500">
                        <span>
                          Pregunta {currentQuestion + 1} de{" "}
                          {elementDetail?.quizPool.length}
                        </span>
                        <span>Score: {score}</span>
                      </div>

                      <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                        <h3 className="text-xl font-bold text-white mb-6">
                          {elementDetail?.quizPool[currentQuestion].question}
                        </h3>

                        <div className="space-y-3">
                          {elementDetail?.quizPool[currentQuestion].options.map(
                            (option, idx) => (
                              <button
                                key={idx}
                                onClick={() => handleAnswer(idx)}
                                disabled={selectedAnswer !== null}
                                className={`w-full text-left p-4 rounded-lg border transition-all ${
                                  selectedAnswer === null
                                    ? "border-white/10 hover:bg-white/10 text-neutral-300"
                                    : selectedAnswer === idx
                                    ? idx ===
                                      elementDetail?.quizPool[currentQuestion]
                                        .correctAnswer
                                      ? "bg-green-500/20 border-green-500 text-green-100"
                                      : "bg-red-500/20 border-red-500 text-red-100"
                                    : idx ===
                                      elementDetail?.quizPool[currentQuestion]
                                        .correctAnswer
                                    ? "bg-green-500/20 border-green-500 text-green-100"
                                    : "border-white/5 text-neutral-500"
                                }`}
                              >
                                {option}
                              </button>
                            )
                          )}
                        </div>
                      </div>

                      {selectedAnswer !== null && (
                        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
                          <div
                            className={`p-4 rounded-lg text-sm ${
                              selectedAnswer ===
                              elementDetail?.quizPool[currentQuestion]
                                .correctAnswer
                                ? "bg-green-900/30 text-green-200"
                                : "bg-red-900/30 text-red-200"
                            }`}
                          >
                            <span className="font-bold block mb-1">
                              {selectedAnswer ===
                              elementDetail?.quizPool[currentQuestion]
                                .correctAnswer
                                ? "¡Correcto!"
                                : "Incorrecto"}
                            </span>
                            {
                              elementDetail?.quizPool[currentQuestion]
                                .explanation
                            }
                          </div>

                          <button
                            onClick={nextQuestion}
                            className="w-full py-3 bg-white text-black font-bold rounded-lg hover:bg-neutral-200 transition-colors"
                          >
                            {currentQuestion <
                            (elementDetail?.quizPool.length || 0) - 1
                              ? "Siguiente Pregunta"
                              : "Finalizar Quiz"}
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="text-6xl mb-4">🏆</div>
                      <h3 className="text-3xl font-bold text-white mb-2">
                        Quiz Completado
                      </h3>
                      <p className="text-xl text-neutral-400 mb-8">
                        Tu puntuación final:{" "}
                        <span className="text-white font-bold">
                          {score} / {elementDetail?.quizPool.length}
                        </span>
                      </p>

                      <div className="flex gap-4 justify-center">
                        <button
                          onClick={resetQuiz}
                          className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors font-semibold"
                        >
                          Repetir Quiz
                        </button>
                        <button
                          onClick={onClose}
                          className="px-6 py-3 bg-white text-black rounded-lg hover:bg-neutral-200 transition-colors font-bold"
                        >
                          Explorar otros elementos
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ElementModal;
