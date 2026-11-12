import React from "react";
import { useTranslation } from "react-i18next";

interface TimelineItem {
  year: string;
  title: string;
  company: string;
  description: string;
}

const Timeline: React.FC = () => {
  const { t } = useTranslation();
  const timeline = t("about.timeline", {
    returnObjects: true,
  }) as TimelineItem[];

  return (
    <div className="relative space-y-8 pl-4 py-2">
      {/* Vertical Line */}
      <div className="absolute top-2 bottom-2 left-[5px] w-px bg-gradient-to-b from-cyan-500/50 via-white/10 to-transparent" />

      {timeline.map((item, index) => (
        <div key={index} className="relative pl-6 group">
          {/* Dot */}
          <div className="absolute left-[-2px] top-1.5 w-3.5 h-3.5 rounded-full border border-[#222] bg-neutral-800 group-hover:bg-cyan-500 transition-colors shadow-lg z-10" />

          <div className="flex flex-col">
            <span className="text-xs font-mono text-cyan-500 font-bold mb-0.5">
              {item.year}
            </span>
            <h4 className="font-bold text-white text-sm">{item.title}</h4>
            <p className="text-xs text-neutral-500 mb-1">{item.company}</p>
            <p className="text-xs text-neutral-400 leading-relaxed">
              {item.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Timeline;
