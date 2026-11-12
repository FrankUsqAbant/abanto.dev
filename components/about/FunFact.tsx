import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";

const FunFact: React.FC = () => {
  const { t } = useTranslation();
  const facts = t("about.fun_facts", { returnObjects: true }) as string[];
  const [index, setIndex] = useState(0);

  const nextFact = () => {
    setIndex((prev) => (prev + 1) % facts.length);
  };

  return (
    <div
      onClick={nextFact}
      className="h-full flex flex-col items-center justify-center text-center cursor-pointer select-none"
    >
      <div className="w-12 h-12 rounded-full bg-cyan-500/10 flex items-center justify-center mb-4 text-cyan-400">
        <i className="fas fa-lightbulb" />
      </div>

      <h4 className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-2">
        {t("about.bento.fun_fact_title")}
      </h4>

      <div className="h-12 flex items-center justify-center w-full px-4">
        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="font-medium text-white italic"
          >
            "{facts[index]}"
          </motion.p>
        </AnimatePresence>
      </div>

      <p className="text-[10px] text-neutral-600 mt-4">
        {t("about.bento.click_more")}
      </p>
    </div>
  );
};

export default FunFact;
