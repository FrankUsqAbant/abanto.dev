import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { fetchLatestTechTopics } from "../services/aiService";
import { Topic } from "../types";
import TechCard from "../components/shared/TechCard";

const Tech: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);

  const loadData = async (force = false) => {
    setLoading(true);
    try {
      // Pass the current language to the service
      const data = await fetchLatestTechTopics(force, i18n.language);
      setTopics(data);
    } catch (error) {
      console.error("Error loading tech topics:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [i18n.language]); // Refetch when language changes

  if (selectedTopic) {
    return (
      <div className="max-w-4xl mx-auto px-6 pt-32 pb-20 animate-fade-in">
        <button
          onClick={() => setSelectedTopic(null)}
          className="mb-8 text-neutral-500 hover:text-white flex items-center gap-2 font-bold transition-colors uppercase text-[10px] tracking-widest"
        >
          <i className="fas fa-arrow-left"></i> {t("tech.back_to_feed")}
        </button>

        <img
          src={selectedTopic.imageUrl}
          className="w-full h-80 object-cover rounded-[2.5rem] mb-12 border border-white/5 shadow-2xl"
          alt={selectedTopic.title}
        />

        <div className="space-y-6">
          <h1 className="text-5xl md:text-7xl font-black leading-tight text-white tracking-tighter uppercase italic">
            {selectedTopic.title}
          </h1>
          <p className="text-neutral-300 text-lg md:text-xl leading-relaxed font-medium">
            {selectedTopic.fullContent || selectedTopic.summary}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 pt-32 pb-20 animate-fade-in">
      <header className="mb-20 max-w-2xl">
        <p className="text-3xl md:text-4xl font-black text-white leading-tight">
          "Stay curious. Stay ahead.{" "}
          <span className="text-blue-500">Reading is the fuel</span> for those
          who build the future of technology."
        </p>
      </header>

      <div className="flex flex-col gap-8 max-w-5xl mx-auto">
        {topics.length === 0 && !loading && (
          <div className="col-span-full py-20 text-center">
            <p className="text-neutral-600 font-black uppercase tracking-widest italic">
              {t("tech.empty_state")}
            </p>
          </div>
        )}
        {topics.map((topic, index) => (
          <TechCard key={topic.id} topic={topic} index={index} />
        ))}
      </div>
    </div>
  );
};

export default Tech;
