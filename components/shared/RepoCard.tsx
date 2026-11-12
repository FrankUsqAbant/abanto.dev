import React from "react";
import { GithubRepo } from "../../types";

interface RepoCardProps {
  repo: GithubRepo;
}

const RepoCard: React.FC<RepoCardProps> = ({ repo }) => {
  return (
    <div className="group relative flex flex-col h-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:border-blue-500/50 hover:shadow-[0_0_40px_rgba(59,130,246,0.15)]">
      {/* Image Preview Area */}
      <div className="relative h-44 w-full overflow-hidden group">
        {/* Background Image / Placeholder */}
        <div className="absolute inset-0 bg-[#0a0a0a]">
          {repo.bannerImage ? (
            <img
              src={repo.bannerImage}
              alt={repo.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-neutral-900 to-black">
              <i className="fas fa-code text-4xl text-neutral-800"></i>
            </div>
          )}
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent"></div>

        {/* Floating Language Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-[10px] font-bold uppercase tracking-wider text-blue-400 shadow-xl">
            <i className="fas fa-code-branch mr-1.5"></i>
            {repo.language}
          </span>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-6 flex flex-col flex-1 relative bg-gradient-to-b from-[#050505] to-transparent">
        <div className="flex justify-between items-start mb-4 gap-4">
          <h3 className="text-lg md:text-xl font-bold text-white tracking-tight leading-tight group-hover:text-blue-400 transition-colors uppercase italic truncate">
            {repo.name.replace(/-/g, " ")}
          </h3>
          <div className="flex items-center gap-1.5 text-yellow-500 bg-yellow-500/10 px-2 py-1 rounded-lg border border-yellow-500/20 shrink-0">
            <i className="fas fa-star text-xs"></i>
            <span className="text-xs font-bold">{repo.stars}</span>
          </div>
        </div>

        <p className="text-neutral-400 text-xs md:text-sm leading-relaxed mb-6 line-clamp-2 md:line-clamp-3 min-h-[40px]">
          {repo.description}
        </p>

        {/* Tech Stack Mini-Pills */}
        {repo.tech && repo.tech.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6 mt-auto">
            {repo.tech.slice(0, 3).map((t) => (
              <span
                key={t}
                className="text-[9px] font-bold text-neutral-500 uppercase tracking-wider px-2 py-1 rounded-md bg-white/5 border border-white/5"
              >
                {t}
              </span>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 mt-4">
          <a
            href={repo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-xs font-bold text-white transition-all hover:scale-105 active:scale-95 group/btn"
          >
            <i className="fab fa-github text-sm text-neutral-400 group-hover/btn:text-white transition-colors"></i>{" "}
            Code
          </a>

          {repo.homepage ? (
            <a
              href={repo.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-xs font-bold text-white shadow-lg shadow-blue-900/20 transition-all hover:scale-105 active:scale-95 hover:shadow-blue-600/30"
            >
              <i className="fas fa-rocket"></i> Live Demo
            </a>
          ) : (
            <button
              disabled
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/5 border border-white/5 text-xs font-bold text-neutral-600 cursor-not-allowed opacity-50"
            >
              <i className="fas fa-lock"></i> Demo Privada
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RepoCard;
