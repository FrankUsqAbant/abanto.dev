import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { View } from "../../types";

interface NavbarProps {
  currentView: View;
  onNavigate: (view: View) => void;
  onOpenSearch: () => void;
}

const CONTACT_ID = "contacto";

const ArrowUpRight: React.FC = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
  >
    <path d="M7 17 17 7" />
    <path d="M7 7h10v10" />
  </svg>
);

const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  onOpenSearch,
}) => {
  const { t } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // En Inicio el encabezado es claro (sobre el hero crema);
  // en el resto de páginas, que siguen siendo oscuras, usa la variante oscura.
  const isLight = currentView === "home";

  const navItems: { id: View; label: string }[] = [
    { id: "home", label: t("navbar.home") },
    { id: "courses", label: t("navbar.courses") },
    { id: "theme", label: t("navbar.theme") },
    { id: "blog", label: t("navbar.blog") },
    { id: "about", label: t("navbar.about") },
  ];

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileMenuOpen]);

  const handleNavClick = (view: View) => {
    onNavigate(view);
    setMobileMenuOpen(false);
  };

  const scrollToContact = () => {
    document
      .getElementById(CONTACT_ID)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (currentView === "home") {
      scrollToContact();
    } else {
      onNavigate("home");
      // Espera a que la página de inicio se monte (transición de página).
      window.setTimeout(scrollToContact, 700);
    }
  };

  // "INICIO" -> "Inicio" (las traducciones vienen en mayúsculas).
  const labelClass =
    "inline-block lowercase first-letter:uppercase whitespace-nowrap";

  const theme = isLight
    ? {
        bar: "bg-[#f4f2ee] text-[#161514]",
        line: "bg-black/[0.09]",
        link: "text-[#7a766f] hover:text-[#161514]",
        active: "text-[#161514] font-medium",
        cta: "bg-[#1b1a19] text-white hover:bg-black",
        icon: "text-[#161514] border-black/10 hover:bg-black/5",
        menu: "bg-[#f4f2ee] text-[#161514]",
        menuItem: "text-[#7a766f] hover:text-[#161514]",
      }
    : {
        bar: "bg-[#050505]/90 text-white",
        line: "bg-white/[0.08]",
        link: "text-neutral-500 hover:text-white",
        active: "text-white font-medium",
        cta: "bg-white text-black hover:bg-neutral-200",
        icon: "text-white border-white/15 hover:bg-white/5",
        menu: "bg-[#050505] text-white",
        menuItem: "text-neutral-500 hover:text-white",
      };

  return (
    <>
      <nav
        aria-label="Principal"
        className={`fixed top-0 left-0 right-0 z-[100] backdrop-blur-xl transition-colors duration-500 ${theme.bar}`}
      >
        <div className="relative max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 h-20 grid grid-cols-[1fr_auto] md:grid-cols-[1fr_auto_1fr] items-center gap-4">
          {/* Firma */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("home");
            }}
            className="justify-self-start font-signature text-[30px] lg:text-[34px] leading-none pt-1 select-none"
            aria-label="Frank Abanto — Inicio"
          >
            Frank Abanto
          </a>

          {/* Navegación central */}
          <ul className="hidden md:flex items-center gap-7 lg:gap-9">
            {navItems.map((item) => {
              const active = currentView === item.id;
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => handleNavClick(item.id)}
                    aria-current={active ? "page" : undefined}
                    className={`text-[13px] tracking-[0.005em] transition-colors duration-300 ${
                      active ? theme.active : theme.link
                    }`}
                  >
                    <span className={labelClass}>{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Acciones */}
          <div className="justify-self-end flex items-center gap-2">
            <a
              href={`/#${CONTACT_ID}`}
              onClick={handleContactClick}
              className={`group hidden sm:inline-flex items-center gap-3 h-10 pl-5 pr-4 rounded-full text-[13px] font-medium shadow-[0_8px_20px_-10px_rgba(0,0,0,0.5)] transition-colors duration-300 ${theme.cta}`}
            >
              Agendar llamada
              <ArrowUpRight />
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
              className={`md:hidden w-10 h-10 flex items-center justify-center rounded-full border transition-colors ${theme.icon}`}
            >
              <i
                className={`fas ${mobileMenuOpen ? "fa-times" : "fa-bars"} text-sm`}
                aria-hidden="true"
              ></i>
            </button>
          </div>

          {/* Línea divisoria */}
          <span
            aria-hidden="true"
            className={`pointer-events-none absolute bottom-0 left-5 right-5 sm:left-8 sm:right-8 lg:left-12 lg:right-12 h-px ${theme.line}`}
          />
        </div>
      </nav>

      {/* Menú móvil */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu"
          className={`fixed inset-0 z-[90] md:hidden flex flex-col pt-28 px-6 animate-fade-in ${theme.menu}`}
        >
          <ul className="flex flex-col gap-1">
            {navItems.map((item) => {
              const active = currentView === item.id;
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => handleNavClick(item.id)}
                    aria-current={active ? "page" : undefined}
                    className={`w-full text-left py-4 font-serif-display text-4xl transition-colors ${
                      active ? theme.active : theme.menuItem
                    }`}
                  >
                    <span className={labelClass}>{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
          <div className="mt-8 flex flex-col gap-3">
            <a
              href={`/#${CONTACT_ID}`}
              onClick={handleContactClick}
              className={`group inline-flex items-center justify-center gap-3 h-12 rounded-full text-sm font-medium ${theme.cta}`}
            >
              Agendar llamada
              <ArrowUpRight />
            </a>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSearch();
              }}
              className={`h-12 rounded-full border text-sm ${theme.icon}`}
            >
              <i className="fas fa-search mr-2 text-xs" aria-hidden="true"></i>
              Buscar
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
