import React, { useState } from "react";
import { View } from "../../types";
import Logo from "../shared/Logo";

import { useTranslation } from "react-i18next";

interface NavbarProps {
  currentView: View;
  onNavigate: (view: View) => void;
  onOpenSearch: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  onOpenSearch,
}) => {
  const { t, i18n } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: View; label: string; href?: string }[] = [
    { id: "home", label: t("navbar.home") },
    { id: "courses", label: t("navbar.courses") },
    { id: "theme", label: t("navbar.theme") },
    { id: "blog", label: t("navbar.blog") },
    { id: "about", label: t("navbar.about") },
  ];

  const handleNavClick = (item: (typeof navItems)[0]) => {
    if (item.href) {
      window.open(item.href, "_blank");
    } else {
      onNavigate(item.id as View);
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[100] bg-[#050505]/95 backdrop-blur-2xl border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 md:h-20 flex items-center justify-between gap-2 md:gap-4">
          {/* Logo & Brand */}
          <div
            className="flex items-center gap-2 md:gap-3 cursor-pointer group shrink-0"
            onClick={() => handleNavClick(navItems[0])}
          >
            <Logo className="w-8 h-8 md:w-10 md:h-10 group-hover:scale-110 transition-all duration-300" />
            <span className="font-black text-base md:text-xl tracking-tighter text-white uppercase block italic">
              FRANK<span className="text-blue-500">.</span>DEV
            </span>
          </div>

          {/* Navigation - Centered and Visible on small screens and up */}
          <div className="hidden sm:flex items-center justify-center gap-1 md:gap-2 lg:gap-3 flex-1 px-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item)}
                className={`px-2.5 md:px-4 py-2 rounded-xl text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] transition-all border border-transparent whitespace-nowrap ${
                  currentView === item.id
                    ? "bg-blue-600/15 text-blue-400 border-blue-500/25 shadow-[0_0_25px_rgba(0,112,243,0.2)]"
                    : "text-neutral-500 hover:text-white hover:bg-white/5"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2 md:gap-4 shrink-0">
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-2 md:gap-3 px-3 md:px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-neutral-500 hover:text-white transition-all group active:scale-95"
              title="Buscar (⌘ K)"
            >
              <i className="fas fa-search text-[10px] group-hover:text-blue-500"></i>
              <span className="hidden lg:inline-block px-1.5 py-0.5 bg-black/50 border border-white/10 rounded text-[8px] font-black text-blue-500/80 uppercase">
                ⌘ K
              </span>
            </button>

            <button className="hidden lg:block px-5 lg:px-6 py-2.5 bg-white text-black rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all shadow-xl active:scale-95">
              {t("navbar.login")}
            </button>

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="sm:hidden w-10 h-10 flex items-center justify-center text-white bg-white/5 rounded-xl border border-white/10 active:scale-95"
            >
              <i
                className={`fas ${mobileMenuOpen ? "fa-times" : "fa-bars"}`}
              ></i>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[90] bg-[#050505]/98 backdrop-blur-3xl sm:hidden flex flex-col pt-24 px-6 animate-fade-in">
          <div className="flex flex-col gap-2 mt-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item)}
                className={`w-full text-left px-6 py-5 rounded-2xl text-[11px] font-black uppercase tracking-[0.3em] transition-all border ${
                  currentView === item.id
                    ? "bg-blue-600/10 text-blue-400 border-blue-500/20"
                    : "text-neutral-500 border-transparent hover:text-white"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
