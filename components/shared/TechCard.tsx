import React from "react";
import { useTranslation } from "react-i18next";
import { Topic } from "../../types";
import ScrollReveal from "./ScrollReveal";

interface TechCardProps {
  topic: Topic;
  index: number;
}

const TechCard: React.FC<TechCardProps> = ({ topic, index }) => {
  const { t } = useTranslation();

  return (
    <ScrollReveal delay={index * 100}>
      <article className="group relative bg-[#0a0a0a] border border-white/5 rounded-2xl overflow-hidden hover:bg-white/5 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-900/10">
        <div className="flex flex-col md:flex-row h-full">
          {/* Image Section */}
          <div className="w-full md:w-72 h-48 md:h-auto shrink-0 overflow-hidden bg-black/50">
            <img
              src={
                topic.imageUrl ||
                "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800"
              }
              alt={topic.title}
              className="w-full h-full object-contain p-2 transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
          </div>

          {/* Content Section */}
          <div className="flex flex-col flex-1 p-6 justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  {topic.category || t("tech.default_category")}
                </span>
              </div>

              <a
                href={topic.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <h3 className="text-xl md:text-2xl font-bold text-white leading-tight group-hover:text-blue-400 transition-colors">
                  {topic.title}
                </h3>
              </a>

              <p className="text-sm text-neutral-400 line-clamp-2 md:line-clamp-3 leading-relaxed">
                {topic.summary}
              </p>
            </div>

            <div className="pt-4 mt-2 flex items-center justify-between border-t border-white/5">
              <a
                href={topic.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 group-hover:text-blue-400 transition-colors flex items-center gap-2"
              >
                {t("tech.read_article")}
                <i className="fas fa-arrow-right -rotate-45 group-hover:rotate-0 transition-transform"></i>
              </a>
            </div>
          </div>
        </div>
      </article>
    </ScrollReveal>
  );
};

export default TechCard;
