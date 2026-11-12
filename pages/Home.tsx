import React from "react";
import { useTranslation } from "react-i18next";
import { View, GithubRepo } from "../types";
import { STATIC_REPOS } from "../services/githubService";
import RepoCard from "../components/shared/RepoCard";
import ScrollReveal from "../components/shared/ScrollReveal";
import FAQSection from "../components/features/FAQSection";
import ContactForm from "../components/home/ContactForm";
import { PROJECTS } from "../constants";

interface HomeProps {
  onNavigate: (view: View) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const { t } = useTranslation();
  const repos = STATIC_REPOS;
  const [scrollY, setScrollY] = React.useState(0);

  React.useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="">
      {/* HERO SECTION - REFINED TO HIGHLIGHT ASTRO LINK */}
      {/* HERO SECTION - MODERNIZED */}
      <section className="relative flex flex-col items-center justify-center min-h-screen px-6 overflow-hidden pt-20">
        {/* Dynamic Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/20 blur-[120px] rounded-full mix-blend-screen animate-pulse duration-3000"></div>
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/10 blur-[100px] rounded-full mix-blend-screen opacity-50"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-600/10 blur-[100px] rounded-full mix-blend-screen opacity-50"></div>
        </div>

        <div className="w-full max-w-7xl mx-auto text-center relative z-20 flex flex-col items-center gap-8 md:gap-12">
          {/* Badge */}
          <ScrollReveal>
            <div className="animate-fade-in animate-delay-200">
              <span className="px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.2)]">
                {t("home.welcome_badge")}
              </span>
            </div>
          </ScrollReveal>

          {/* Main Title Group */}
          {/* Main Title Group */}
          <ScrollReveal delay={200}>
            <div className="space-y-2 md:space-y-6">
              <h1 className="text-[3.5rem] sm:text-[5rem] md:text-[7rem] lg:text-[8.5rem] font-extrabold tracking-tighter text-white leading-[0.85] uppercase italic select-none mix-blend-overlay animate-fade-in animate-delay-400">
                <span className="block hover:text-blue-500 transition-colors duration-500 cursor-default">
                  {t("home.hero_pre_title")}
                </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-200 to-white inline-block drop-shadow-[0_0_40px_rgba(59,130,246,0.4)] animate-glitch cursor-default">
                  {t("home.hero_post_title")}
                </span>
                <span className="block text-neutral-500 text-[2.5rem] md:text-[6rem] lg:text-[7rem] mt-2 md:mt-4">
                  {t("home.hero_highlight")}
                </span>
              </h1>
            </div>
          </ScrollReveal>

          {/* Description */}
          {/* Description */}
          <ScrollReveal delay={400}>
            <p className="text-neutral-400 text-xs md:text-base font-medium max-w-2xl mx-auto leading-relaxed animate-fade-in animate-delay-600">
              {t("home.hero_description")}
            </p>
          </ScrollReveal>

          {/* Action Buttons */}
          {/* Action Buttons */}
          <ScrollReveal delay={600}>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 w-full max-w-lg mt-8 animate-fade-in animate-delay-800">
              <button
                onClick={() => onNavigate("courses")}
                className="group w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 backdrop-blur-md text-white rounded-xl font-black text-[11px] uppercase tracking-[0.2em] transition-all hover:bg-white/10 hover:border-white/20 hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3"
              >
                {t("home.view_courses")}{" "}
                <i className="fas fa-play text-[9px] group-hover:text-blue-400 transition-colors"></i>
              </button>
            </div>
          </ScrollReveal>
        </div>

        {/* Scroll Indicator */}
        <a
          href="#github-ecosystem"
          aria-label="Desplazarse hacia abajo"
          className={`absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce transition-all duration-500 cursor-pointer group ${
            scrollY > 50
              ? "opacity-0 pointer-events-none"
              : "opacity-50 hover:opacity-100"
          }`}
        >
          <i className="fas fa-chevron-down text-white text-xl group-hover:text-cyan-400 group-hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.8)] transition-all"></i>
        </a>
      </section>

      {/* SECCIÓN DE REPOS DE GITHUB */}
      <section
        id="github-ecosystem"
        className="relative max-w-7xl mx-auto px-6 py-32"
      >
        <div className="absolute top-[20%] left-0 w-96 h-96 bg-blue-600/5 blur-[150px] rounded-full pointer-events-none"></div>

        <div className="flex flex-col md:flex-row items-baseline justify-between mb-16 gap-8 relative z-10">
          <div className="space-y-2 text-center md:text-left w-full md:w-auto">
            <span className="text-blue-500 text-[10px] font-black uppercase tracking-[0.6em] bg-blue-500/10 px-3 py-1.5 rounded-lg backdrop-blur-md">
              {t("home.open_source_badge")}
            </span>
            <h2 className="text-4xl md:text-7xl font-black text-white uppercase italic tracking-tighter leading-none mt-2">
              GitHub{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">
                {t("home.github_repos")}
              </span>
            </h2>
          </div>

          <a
            href="https://github.com/FrankUsqAbant"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex text-neutral-500 hover:text-white font-black text-[10px] uppercase tracking-widest items-center gap-3 transition-colors"
          >
            {t("home.view_full_ecosystem")}{" "}
            <i className="fab fa-github text-lg"></i>
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 relative z-10">
          {repos.map((repo, index) => (
            <ScrollReveal key={repo.id} delay={index * 100}>
              <RepoCard repo={repo} />
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* FAQ SECTION */}
      <FAQSection />

      {/* CONTACT FORM */}
      <ContactForm />
    </div>
  );
};

export default Home;
