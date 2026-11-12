import React from "react";
import { Testimonial } from "../../content/testimonials";

interface TestimonialCardProps {
  data: Testimonial;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ data }) => {
  return (
    <div className="w-[350px] md:w-[450px] bg-[#111] border border-white/5 rounded-3xl p-8 flex flex-col justify-between h-[250px] hover:border-cyan-500/30 transition-colors group relative cursor-default mx-4 flex-shrink-0 shadow-lg shadow-black/50">
      {/* Quote Icon Background */}
      <div className="absolute top-6 right-8 text-6xl text-white/5 font-serif pointer-events-none group-hover:text-cyan-500/5 transition-colors">
        "
      </div>

      <p className="text-neutral-300 italic leading-relaxed relative z-10 text-sm md:text-base">
        "{data.text}"
      </p>

      <div className="flex items-center gap-4 mt-6">
        <div className="relative">
          <img
            src={data.image}
            alt={data.name}
            className="w-12 h-12 rounded-full object-cover border border-white/10 group-hover:border-cyan-500/50 transition-colors"
          />
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        <div>
          <h4 className="text-white font-bold text-sm tracking-wide group-hover:text-cyan-400 transition-colors">
            {data.name}
          </h4>
          <span className="text-xs text-neutral-500 block max-w-[200px] truncate">
            {data.role}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
