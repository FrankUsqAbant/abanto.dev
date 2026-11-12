import React from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import elementsData from "../data/elementsDetail/htmlElementsData.json";
import CodeBlock from "../components/ui/CodeBlock";
import QuizEngine from "../components/quiz/QuizEngine";

// Tipos para el JSON
interface Question {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

interface ElementData {
  id: string;
  symbol: string;
  title: string;
  category: string;
  categoryColor: string;
  description: string;
  keyPoints: string[];
  syntax: string;
  codeExample: string;
  useCases: string[];
  bestPractices: string[];
  commonMistakes: string[];
  quizPool: Question[];
}

/**
 * Página de detalle de elemento de la Tabla Periódica
 * Muestra teoría, ejemplos y quiz interactivo
 */
const ElementDetail: React.FC = () => {
  const { tag } = useParams<{ tag: string }>();

  // Obtener datos del elemento desde el JSON
  const element = tag
    ? (elementsData.elements as Record<string, ElementData>)[tag]
    : null;

  // Si no existe el elemento, mostrar 404
  if (!element) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center">
        <h1 className="text-4xl font-black mb-4">Elemento no encontrado</h1>
        <p className="text-white/60 mb-8">
          El elemento "{tag}" no existe en nuestra base de datos.
        </p>
        <Link
          to="/blog"
          className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl transition-colors"
        >
          Volver a la Tabla Periódica
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      {/* Contenedor principal - ancho de lectura */}
      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Navegación */}
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-8 transition-colors"
        >
          <span>←</span>
          <span>Volver a la Tabla Periódica</span>
        </Link>

        {/* Header con título neón */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          {/* Categoría */}
          <span
            className="inline-block px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider mb-4"
            style={{
              backgroundColor: `${element.categoryColor}20`,
              color: element.categoryColor,
            }}
          >
            {element.category}
          </span>

          {/* Título con glow neón */}
          <h1
            className="text-4xl md:text-5xl font-black leading-tight"
            style={{
              color: element.categoryColor,
              textShadow: `0 0 30px ${element.categoryColor}50`,
            }}
          >
            {element.title}
          </h1>
        </motion.header>

        {/* Descripción */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <p className="text-lg text-white/80 leading-relaxed">
            {element.description}
          </p>
        </motion.section>

        {/* Puntos clave */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-xl font-bold mb-4 text-white">📌 Puntos Clave</h2>
          <ul className="space-y-3">
            {element.keyPoints.map((point, index) => (
              <li key={index} className="flex items-start gap-3 text-white/80">
                <span
                  className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                  style={{ backgroundColor: element.categoryColor }}
                />
                <span
                  dangerouslySetInnerHTML={{
                    __html: point.replace(
                      /\*\*(.*?)\*\*/g,
                      '<strong class="text-white">$1</strong>'
                    ),
                  }}
                />
              </li>
            ))}
          </ul>
        </motion.section>

        {/* Sintaxis */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <h2 className="text-xl font-bold mb-4 text-white">💻 Sintaxis</h2>
          <CodeBlock code={element.syntax} language="html" />
        </motion.section>

        {/* Ejemplo de código */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-xl font-bold mb-4 text-white">📝 Ejemplo</h2>
          <CodeBlock
            code={element.codeExample}
            language="html"
            title="Ejemplo práctico"
          />
        </motion.section>

        {/* Casos de uso */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-xl font-bold mb-4 text-white">🎯 Casos de Uso</h2>
          <div className="flex flex-wrap gap-2">
            {element.useCases.map((useCase, index) => (
              <span
                key={index}
                className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white/80"
              >
                {useCase}
              </span>
            ))}
          </div>
        </motion.section>

        {/* Buenas prácticas */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-xl font-bold mb-4 text-white">
            ✅ Buenas Prácticas
          </h2>
          <ul className="space-y-2">
            {element.bestPractices.map((practice, index) => (
              <li key={index} className="flex items-start gap-3 text-white/80">
                <span className="text-green-400">✓</span>
                <span>{practice}</span>
              </li>
            ))}
          </ul>
        </motion.section>

        {/* Errores comunes */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mb-12"
        >
          <h2 className="text-xl font-bold mb-4 text-white">
            ⚠️ Errores Comunes
          </h2>
          <ul className="space-y-2">
            {element.commonMistakes.map((mistake, index) => (
              <li key={index} className="flex items-start gap-3 text-white/80">
                <span className="text-red-400">✗</span>
                <span>{mistake}</span>
              </li>
            ))}
          </ul>
        </motion.section>

        {/* Separador visual */}
        <div className="border-t border-white/10 my-12" />

        {/* Quiz placeholder - se implementará en Fase 2 */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold mb-6 text-white">
            📝 Quiz: Pon a prueba tu conocimiento
          </h2>
          <QuizEngine
            questions={element.quizPool}
            questionsPerSession={5}
            categoryColor={element.categoryColor}
          />
        </motion.section>
      </div>
    </div>
  );
};

export default ElementDetail;
