import React, { useState } from "react";
import ScrollReveal from "../shared/ScrollReveal";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: "¿Es realmente gratuito el contenido de Frank.Dev?",
      answer:
        "Sí, el 100% del contenido educativo base es gratuito. Mi misión es democratizar el acceso a la educación de software de alta calidad. Creo que el conocimiento fundamental no debería tener barreras de entrada.",
    },
    {
      question: "¿Cómo puedo acceder a los repositorios y proyectos?",
      answer:
        "Todos los proyectos mostrados son Open Source y están disponibles directamente en mi perfil de GitHub. Puedes clonarlos, estudiarlos y usarlos como base para tus propias creaciones sin restricciones.",
    },
    {
      question: "¿Se actualiza el contenido frecuentemente?",
      answer:
        "Absolutamente. La tecnología avanza rápido, y este portafolio junto con los cursos se mantienen al día con las últimas versiones de React, Astro, Node.js y más. Lo que aprendes aquí es lo que se usa hoy en la industria.",
    },
    {
      question: "¿Ofreces mentoría o ayuda personalizada?",
      answer:
        "Sí, a través de la comunidad en Discord. Es un espacio donde desarrolladores de todos los niveles nos ayudamos mutuamente. También realizo sesiones de 'Live Coding' ocasionales donde resuelvo dudas en tiempo real.",
    },
    {
      question: "¿Para qué nivel de experiencia son estos recursos?",
      answer:
        "He diseñado el contenido para ser escalable. Desde fundamentos sólidos para principiantes hasta arquitecturas complejas y patrones de diseño para desarrolladores senior que buscan pulir sus habilidades.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative w-full max-w-4xl mx-auto px-6 py-24 mb-12">
      <ScrollReveal>
        <div className="text-center mb-16">
          <span className="text-blue-500 text-[10px] font-black uppercase tracking-[0.2em] bg-blue-500/10 px-3 py-1.5 rounded-lg border border-blue-500/20">
            Comunidad & Aprendizaje
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-white mt-6 mb-4">
            Preguntas{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              Frecuentes
            </span>
          </h2>
          <p className="text-neutral-400 text-sm md:text-base max-w-2xl mx-auto">
            Resolviendo tus dudas para que puedas enfocarte en lo importante:{" "}
            <span className="text-white font-bold">crear y aprender.</span>
          </p>
        </div>
      </ScrollReveal>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <ScrollReveal key={index} delay={index * 100}>
            <div
              className={`group rounded-2xl border transition-all duration-300 overflow-hidden ${
                openIndex === index
                  ? "bg-white/5 border-blue-500/30 shadow-[0_0_30px_rgba(59,130,246,0.1)]"
                  : "bg-[#0a0a0a] border-white/5 hover:border-white/10"
              }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 text-left cursor-pointer focus:outline-none"
              >
                <span
                  className={`font-bold text-sm md:text-base transition-colors ${
                    openIndex === index
                      ? "text-white"
                      : "text-neutral-400 group-hover:text-white"
                  }`}
                >
                  {faq.question}
                </span>
                <i
                  className={`fas fa-chevron-down text-xs transition-transform duration-300 ${
                    openIndex === index
                      ? "rotate-180 text-blue-400"
                      : "text-neutral-600"
                  }`}
                ></i>
              </button>

              <div
                className={`transition-all duration-300 ease-in-out ${
                  openIndex === index
                    ? "max-h-48 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="p-6 pt-0 text-neutral-400 text-sm leading-relaxed border-t border-white/5">
                  {faq.answer}
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
};

export default FAQSection;
