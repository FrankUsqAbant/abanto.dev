import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { View } from "../../types";
import {
  CONTACT_ID,
  HOME_SECTIONS,
  scrollToSection,
  scrollToSectionWhenReady,
} from "../home/sections/homeLinks";
import { useActiveSection } from "./useActiveSection";
import CalLink from "../shared/CalLink";
import Icon from "../shared/Icon";

interface NavbarProps {
  currentView: View;
  onNavigate: (view: View) => void;
  onOpenSearch: () => void;
}

type NavItem =
  | { kind: "view"; view: View; label: string }
  | { kind: "section"; id: string; label: string };

/** Secciones observadas para el resaltado (en orden del DOM). Se observan
 *  también las que no están en el menú para que "Proyectos" se apague al
 *  pasar a Proceso/Preguntas/Contacto. */
const OBSERVED_IDS = ["servicios", "agendar", "proyectos", "proceso", "faq", CONTACT_ID, "pie"];

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

/* Entrada de la cabecera en la intro (ver intro.css): cuando la firma
   aterriza en el logo, los enlaces y el botón aparecen suavemente. */
const NAV_LINKS_DELAY = 760;
const NAV_LINK_STAGGER = 45;
const navDelay = (ms: number): React.CSSProperties =>
  ({ "--ix-delay": `${ms}ms` }) as React.CSSProperties;

const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  onOpenSearch,
}) => {
  const { t } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // En Inicio el encabezado es claro (sobre el hero crema);
  // en el resto de páginas, que siguen siendo oscuras, usa la variante oscura.
  const isLight = currentView === "home" || currentView === "aprende" || currentView === "about" || currentView === "privacidad" || currentView === "terminos" || currentView === "cookies";
  const onHome = currentView === "home";

  const navItems: NavItem[] = [
    ...HOME_SECTIONS.map(
      (sec): NavItem => ({
        kind: "section",
        id: sec.id,
        label: t(sec.i18nKey, { defaultValue: sec.label }),
      }),
    ),
    { kind: "view", view: "aprende", label: t("navbar.learn") },
    // Inicio = el logo; Proceso, Preguntas y Sobre mí viven en el pie.
  ];

  const activeSection = useActiveSection(OBSERVED_IDS, onHome);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileMenuOpen]);

  // Cierra el menú móvil si la ventana crece hasta el layout de escritorio.
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => mq.matches && setMobileMenuOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [mobileMenuOpen]);

  const handleNavClick = (view: View) => {
    onNavigate(view);
    setMobileMenuOpen(false);
  };

  /** Va a una sección del inicio; desde otra página navega a / y luego desplaza. */
  const goToSection = (id: string) => {
    setMobileMenuOpen(false);
    if (currentView === "home") {
      scrollToSection(id);
    } else {
      onNavigate("home");
      scrollToSectionWhenReady(id);
    }
  };

  const onSectionLink =
    (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      goToSection(id);
    };

  const isItemActive = (item: NavItem) =>
    item.kind === "section"
      ? onHome && activeSection === item.id
      : item.view === "home"
        ? onHome && activeSection === null
        : currentView === item.view;

  const ariaCurrent = (item: NavItem, active: boolean) =>
    active ? (item.kind === "section" ? "location" : "page") : undefined;

  const itemKey = (item: NavItem) =>
    item.kind === "section" ? `s-${item.id}` : `v-${item.view}`;

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
        <div className="relative max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 h-20 grid grid-cols-[1fr_auto] lg:grid-cols-[1fr_auto_1fr] items-center gap-4">
          {/* Firma */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("home");
            }}
            className="ix-logo justify-self-start font-signature text-[25px] min-[400px]:text-[28px] sm:text-[30px] lg:text-[34px] leading-none pt-1 select-none"
            aria-label="Frank Abanto — Inicio"
            data-intro-logo=""
          >
            Frank Abanto
          </a>

          {/* Navegación central */}
          <ul className="hidden lg:flex items-center gap-5 xl:gap-8">
            {navItems.map((item, i) => {
              const active = isItemActive(item);
              const cls = `relative inline-flex items-center py-2 leading-none text-[13px] tracking-[0.005em] transition-colors duration-300 ${
                active ? theme.active : theme.link
              }`;
              const dot = (
                <span
                  aria-hidden="true"
                  className={`absolute left-1/2 -bottom-0.5 h-[3px] w-[3px] -translate-x-1/2 rounded-full bg-current transition-opacity duration-300 ${
                    active ? "opacity-100" : "opacity-0"
                  }`}
                />
              );
              return (
                <li key={itemKey(item)}>
                  <span className="ix-nav inline-block" style={navDelay(NAV_LINKS_DELAY + i * NAV_LINK_STAGGER)}>
                    {item.kind === "section" ? (
                      <a
                        href={`/#${item.id}`}
                        onClick={onSectionLink(item.id)}
                        aria-current={ariaCurrent(item, active)}
                        className={cls}
                      >
                        <span className={labelClass}>{item.label}</span>
                        {dot}
                      </a>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleNavClick(item.view)}
                        aria-current={ariaCurrent(item, active)}
                        className={cls}
                      >
                        <span className={labelClass}>{item.label}</span>
                        {dot}
                      </button>
                    )}
                  </span>
                </li>
              );
            })}
          </ul>

          {/* Acciones */}
          <div
            className="ix-nav justify-self-end"
            style={navDelay(NAV_LINKS_DELAY + navItems.length * NAV_LINK_STAGGER + 60)}
          >
          <div className="flex items-center gap-2">
            {/* Móvil: píldora compacta, siempre a mano */}
            <CalLink
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Agendar llamada de 30 minutos (Cal.com)"
              className={`sm:hidden inline-flex items-center h-9 px-3.5 rounded-full text-[12px] font-medium whitespace-nowrap shadow-[0_8px_20px_-10px_rgba(0,0,0,0.5)] transition-colors duration-300 ${theme.cta}`}
            >
              Agendar llamada
            </CalLink>
            <CalLink
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Agendar llamada de 30 minutos (Cal.com)"
              className={`group hidden sm:inline-flex items-center gap-3 h-10 pl-5 pr-4 rounded-full text-[13px] font-medium shadow-[0_8px_20px_-10px_rgba(0,0,0,0.5)] transition-colors duration-300 ${theme.cta}`}
            >
              Agendar llamada
              <ArrowUpRight />
            </CalLink>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
              className={`lg:hidden w-10 h-10 flex items-center justify-center rounded-full border transition-colors ${theme.icon}`}
            >
              <Icon name={mobileMenuOpen ? "times" : "bars"} size={16} />
            </button>
          </div>
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
          className={`fixed inset-0 z-[90] lg:hidden flex flex-col pt-24 pb-8 px-6 overflow-y-auto animate-fade-in ${theme.menu}`}
        >
          <ul className="flex flex-col">
            {navItems.map((item) => {
              const active = isItemActive(item);
              const cls = `w-full text-left py-2.5 font-serif-display text-[32px] leading-tight transition-colors ${
                active ? theme.active : theme.menuItem
              }`;
              return (
                <li key={itemKey(item)}>
                  {item.kind === "section" ? (
                    <a
                      href={`/#${item.id}`}
                      onClick={onSectionLink(item.id)}
                      aria-current={ariaCurrent(item, active)}
                      className={`block ${cls}`}
                    >
                      <span className={labelClass}>{item.label}</span>
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleNavClick(item.view)}
                      aria-current={ariaCurrent(item, active)}
                      className={cls}
                    >
                      <span className={labelClass}>{item.label}</span>
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
          <div className="mt-6 flex flex-col gap-3">
            <CalLink
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Agendar llamada de 30 minutos (Cal.com)"
              className={`group inline-flex items-center justify-center gap-3 h-12 rounded-full text-sm font-medium ${theme.cta}`}
            >
              Agendar llamada
              <ArrowUpRight />
            </CalLink>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSearch();
              }}
              className={`h-12 rounded-full border text-sm ${theme.icon}`}
            >
              <Icon name="search" size={13} className="inline-block mr-2 -mt-0.5" />
              Buscar
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
