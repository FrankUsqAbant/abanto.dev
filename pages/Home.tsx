import React from "react";
import { useTranslation } from "react-i18next";
import { View } from "../types";
import { STATIC_REPOS } from "../services/githubService";
import RepoCard from "../components/shared/RepoCard";
import ScrollReveal from "../components/shared/ScrollReveal";
import FAQSection from "../components/features/FAQSection";
import ContactForm from "../components/home/ContactForm";
import Hero from "../components/home/Hero";

interface HomeProps {
  onNavigate: (view: View) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const { t } = useTranslation();
  const repos = STATIC_REPOS;

  return (
    <div className="">
      {/* HERO */}
      <Hero />

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
