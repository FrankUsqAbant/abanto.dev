import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Logo from "../shared/Logo";
import { View } from "../../types";
import { fetchLatestPush } from "../../services/githubService";

interface FooterProps {
  onNavigate: (view: View) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { t } = useTranslation();
  const [lastUpdate, setLastUpdate] = useState<string>("");

  useEffect(() => {
    fetchLatestPush().then(setLastUpdate);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const socialLinks = [
    {
      icon: "youtube",
      link: "https://youtube.com/@frankabanto",
      label: "YouTube",
      color: "#FF0000",
      glowColor: "rgba(255, 0, 0, 0.4)",
    },
    {
      icon: "github",
      link: "https://github.com/FrankUsqAbant",
      label: "GitHub",
      color: "#ffffff",
      glowColor: "rgba(255, 255, 255, 0.4)",
    },
    {
      icon: "instagram",
      link: "https://instagram.com/frankabanto",
      label: "Instagram",
      color: "#E1306C",
      glowColor: "rgba(225, 48, 108, 0.4)",
    },
    {
      icon: "x-twitter",
      link: "https://x.com/FrankUsqAbanto",
      label: "X",
      color: "#ffffff",
      glowColor: "rgba(255, 255, 255, 0.4)",
    },
    {
      icon: "linkedin",
      link: "https://linkedin.com/in/frankabanto",
      label: "LinkedIn",
      color: "#0077b5",
      glowColor: "rgba(0, 119, 181, 0.4)",
    },
    {
      icon: "discord",
      link: "#",
      label: "Discord",
      color: "#5865F2",
      glowColor: "rgba(88, 101, 242, 0.4)",
    },
    {
      icon: "envelope",
      link: "mailto:usquizafranquer@gmail.com",
      label: "Email",
      color: "#ffffff",
      glowColor: "rgba(255, 255, 255, 0.4)",
      isSolid: true,
    },
  ];

  return (
    <footer className="relative w-full bg-[#020202] border-t border-white/5 overflow-hidden">
      {/* Decorative Glow Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent shadow-[0_0_15px_rgba(59,130,246,0.5)]"></div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-600/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 py-16 md:py-20 relative z-10">
        <div className="flex flex-col items-center justify-center text-center space-y-12">
          {/* 1. Motivational Phrase */}
          <div className="space-y-4 max-w-2xl animate-fade-in">
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-white tracking-tight">
              {t("footer.motivational_title")}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                {t("footer.motivational_highlight")}
              </span>
            </h2>
            <p className="text-neutral-500 text-sm md:text-base font-medium">
              {t("footer.motivational_desc")}
            </p>
          </div>

          {/* 2. Social Media with Glow Interactions */}
          <div className="flex flex-wrap justify-center gap-6">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center justify-center w-12 h-12 rounded-full bg-[#1a1a1a] border border-white/5 transition-all duration-300 hover:-translate-y-1 hover:bg-[#2a2a2a]"
                style={
                  {
                    "--glow-color": social.glowColor,
                  } as React.CSSProperties
                }
              >
                {/* Glow Effect */}
                <div
                  className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md"
                  style={{ backgroundColor: social.glowColor }}
                ></div>

                {/* Icon */}
                <i
                  className={`${social.isSolid ? "fas" : "fab"} fa-${
                    social.icon
                  } text-xl relative z-10 transition-colors duration-300 text-white`}
                ></i>
              </a>
            ))}
          </div>

          {/* Divider */}
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent my-8"></div>

          {/* Bottom Structure */}
          <div className="w-full flex flex-col-reverse md:flex-row justify-between items-center gap-6 md:gap-0">
            {/* System Status */}
            <div className="flex flex-col md:flex-row items-center gap-4 text-xs font-mono text-neutral-500">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="tracking-wider uppercase text-[10px] text-neutral-400">
                  {t("footer.system_status")}
                </span>
              </div>
              <span className="hidden md:inline text-neutral-700">|</span>
              <span className="text-[10px] tracking-wide opacity-70">
                {t("footer.last_update")} {lastUpdate || "..."}
              </span>
            </div>

            {/* Back to Top Logic */}
            <button
              onClick={scrollToTop}
              className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-400 hover:text-white transition-colors py-2"
            >
              {t("footer.back_to_top")}
              <i className="fas fa-arrow-up text-[10px] group-hover:-translate-y-1 transition-transform duration-300"></i>
            </button>
          </div>

          <div className="pt-8 text-[10px] text-neutral-600 font-bold uppercase tracking-[0.2em]">
            © 2026 Frank Abanto. {t("footer.rights")}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
