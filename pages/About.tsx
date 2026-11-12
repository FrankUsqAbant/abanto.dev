import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import BentoItem from "../components/about/BentoItem";
import TechStack from "../components/about/TechStack";
import Timeline from "../components/about/Timeline";
import FunFact from "../components/about/FunFact";
import TestimonialCarousel from "../components/about/TestimonialCarousel";
import { fetchGithubProfile, GithubProfile } from "../services/githubService";

const About: React.FC = () => {
  const { t } = useTranslation();
  const [profile, setProfile] = React.useState<GithubProfile | null>(null);

  React.useEffect(() => {
    fetchGithubProfile().then(setProfile);
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-24 pb-20 px-6 font-['Inter']">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-black mb-4">
            {t("about.hero_title") || "About"}{" "}
            <span className="text-cyan-400">Me</span>.
          </h1>
          <p className="text-neutral-400 text-lg max-w-2xl">
            {t("about.description")}
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-3 gap-4 auto-rows-[minmax(180px,auto)]">
          {/* 1. Profile / Bio - Large Item (2x2) */}
          <BentoItem
            className="md:col-span-2 md:row-span-2 relative min-h-[300px]"
            delay={0.1}
          >
            <div className="h-full flex flex-col justify-end relative z-10">
              <div className="absolute top-0 right-0 p-4 opacity-10 md:opacity-20 text-9xl font-black text-white pointer-events-none select-none">
                {t("about.bento.profile_dev")}
              </div>
              <div className="flex items-center gap-6 mb-4">
                <div className="relative">
                  <img
                    src={
                      profile?.avatar_url ||
                      "https://github.com/FrankUsqAbant.png"
                    }
                    alt="Profile"
                    className="w-24 h-24 rounded-full border-4 border-[#222] shadow-2xl grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                  <div className="absolute inset-0 rounded-full border border-white/10" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold">
                    {profile?.name || "Frank Abanto"}
                  </h2>
                  <span className="text-neutral-500 font-mono text-sm">
                    @{profile?.company || "Freelance"}
                  </span>
                </div>
              </div>

              <p className="text-neutral-300 leading-relaxed max-w-lg mb-6">
                "{profile?.bio || t("about.description")}"
              </p>
              <div className="flex flex-wrap gap-4 items-center">
                <a
                  href={profile?.html_url || "https://github.com/FrankUsqAbant"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2 bg-white text-black font-bold rounded-full hover:bg-neutral-200 transition-colors flex items-center gap-2"
                >
                  <i className="fab fa-github"></i> GitHub
                </a>
                {profile?.blog && (
                  <a
                    href={
                      profile.blog.startsWith("http")
                        ? profile.blog
                        : `https://${profile.blog}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2 bg-[#111] border border-white/20 text-white font-bold rounded-full hover:bg-[#222] transition-colors flex items-center gap-2"
                  >
                    <i className="fas fa-link"></i> Website
                  </a>
                )}
                {profile?.twitter_username && (
                  <a
                    href={`https://twitter.com/${profile.twitter_username}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2 bg-[#1DA1F2]/10 text-[#1DA1F2] border border-[#1DA1F2]/20 font-bold rounded-full hover:bg-[#1DA1F2]/20 transition-colors flex items-center gap-2"
                  >
                    <i className="fab fa-twitter"></i> Twitter
                  </a>
                )}

                <div className="hidden md:flex items-center gap-4 text-xs font-mono text-neutral-500 ml-auto mt-2 md:mt-0">
                  <span>
                    <i className="fas fa-code-branch mr-2"></i>
                    {profile?.public_repos || 0} {t("about.bento.repos")}
                  </span>
                  <span>
                    <i className="fas fa-users mr-2"></i>
                    {profile?.followers || 0} {t("about.bento.followers")}
                  </span>
                </div>
              </div>
            </div>
          </BentoItem>

          {/* 2. Tech Stack - (1x2) */}
          <BentoItem
            title={t("about.bento.my_arsenal")}
            className="md:row-span-2"
            delay={0.2}
          >
            <TechStack />
          </BentoItem>

          {/* 3. Location - Small (1x1) */}
          <BentoItem
            className="md:col-span-1 bg-gradient-to-br from-[#111] to-[#0a0a0a]"
            delay={0.3}
          >
            <div className="h-full flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center mb-3 animate-pulse">
                <i className="fas fa-map-marker-alt text-red-500" />
              </div>
              <h3 className="font-bold text-lg">
                {t("about.bento.location_title")}
              </h3>
              <p className="text-neutral-500">
                {profile?.location || t("about.bento.location_default")}
              </p>
            </div>
          </BentoItem>

          {/* 4. Timeline - Tall (1x2 vertical) - Adjusted position for better flow */}
          <BentoItem
            title={t("about.bento.journey")}
            className="md:col-span-1 md:row-span-2"
            delay={0.4}
          >
            <Timeline />
          </BentoItem>

          <BentoItem className="" delay={0.5}>
            <FunFact />
          </BentoItem>
        </div>

        {/* Testimonials Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mt-20 md:mt-32"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            {t("about.testimonials_title")}{" "}
            <span className="text-cyan-400">
              {t("about.testimonials_highlight")}
            </span>
          </h2>
          <TestimonialCarousel />
        </motion.div>
      </div>
    </div>
  );
};

export default About;
