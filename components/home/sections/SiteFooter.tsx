import React from "react";
import type { View } from "../../../types";
import CalLink from "../../shared/CalLink";
import Reveal from "./Reveal";
import { CONTACT_EMAIL, SOCIALS, scrollToSection, scrollToSectionWhenReady } from "./homeLinks";

interface SiteFooterProps {
  onNavigate: (view: View) => void;
}

type NavLink = { label: string } & ({ section: string } | { view: View });

const NAV: NavLink[] = [
  { label: "Servicios", section: "servicios" },
  { label: "Proyectos", section: "proyectos" },
  { label: "Aprende", view: "aprende" },
  { label: "Proceso", section: "proceso" },
  { label: "Preguntas", section: "faq" },
  { label: "Sobre mí", view: "about" },
];

const ICONS: Record<string, React.ReactNode> = {
  YouTube: <path d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8zM10 15V9l5.2 3z" />,
  GitHub: <path d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.3-3.4-1.3-.4-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.6 2.4 1.1 3 .9.1-.7.3-1.1.6-1.4-2.2-.3-4.6-1.1-4.6-5a3.9 3.9 0 0 1 1-2.7 3.6 3.6 0 0 1 .1-2.7s.8-.3 2.8 1a9.6 9.6 0 0 1 5 0c2-1.3 2.8-1 2.8-1a3.6 3.6 0 0 1 .1 2.7 3.9 3.9 0 0 1 1 2.7c0 3.9-2.4 4.7-4.6 5 .4.3.7.9.7 1.9V21c0 .3.2.6.7.5A10 10 0 0 0 12 2z" />,
  LinkedIn: <path d="M4.5 3.5a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM3 9h3v12H3zM9 9h2.9v1.7c.4-.8 1.4-1.9 3.2-1.9 3.4 0 3.9 2.2 3.9 5.1V21h-3v-6.3c0-1.5 0-3.4-2.1-3.4s-2.4 1.6-2.4 3.3V21H9z" />,
  Instagram: <path d="M12 7.3a4.7 4.7 0 1 0 0 9.4 4.7 4.7 0 0 0 0-9.4zm0 7.7a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm4.9-8.9a1.1 1.1 0 1 0 0 2.2 1.1 1.1 0 0 0 0-2.2zM20.9 8c-.1-1.5-.4-2.8-1.5-3.9S17.5 2.7 16 2.6c-1.5-.1-6.4-.1-7.9 0-1.5.1-2.8.4-3.9 1.5S2.7 6.5 2.6 8c-.1 1.5-.1 6.4 0 7.9.1 1.5.4 2.8 1.5 3.9s2.4 1.4 3.9 1.5c1.5.1 6.4.1 7.9 0 1.5-.1 2.8-.4 3.9-1.5s1.4-2.4 1.5-3.9c.1-1.5.1-6.4-.4-7.9zM19 17.8a3 3 0 0 1-1.7 1.7c-1.2.5-4 .4-5.3.4s-4.1.1-5.3-.4A3 3 0 0 1 5 17.8c-.5-1.2-.4-4-.4-5.3s-.1-4.1.4-5.3A3 3 0 0 1 6.7 5.5c1.2-.5 4-.4 5.3-.4s4.1-.1 5.3.4A3 3 0 0 1 19 7.2c.5 1.2.4 4 .4 5.3s.1 4.1-.4 5.3z" />,
  X: <path d="M17.8 3h3.1l-6.8 7.8L22 21h-6.2l-4.9-6.4L5.3 21H2.2l7.3-8.3L2 3h6.4l4.4 5.8zm-1.1 16.2h1.7L7.4 4.7H5.6z" />,
};

/** Pie del sitio: marca, contacto, navegación, redes y barra legal. Crema, sin repetir secciones. */
const SiteFooter: React.FC<SiteFooterProps> = ({ onNavigate }) => {
  const go = (view: View) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onNavigate(view);
  };
  const toSection = (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (window.location.pathname === "/") scrollToSection(id);
    else {
      onNavigate("home");
      scrollToSectionWhenReady(id);
    }
  };
  const toTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <div className="hm hm-footer">
      <footer className="ft" id="pie">
        <div className="wrap">
          <Reveal className="ft__top">
            <div className="ft__brand">
              <a className="logo logo--lg" href="/" onClick={go("home")} aria-label="Frank Abanto, inicio">
                Frank Abanto
              </a>
              <p className="ft__tag">
                Software e IA <em>hechos a tu medida.</em>
              </p>
            </div>
            <div className="ft__cta">
              <CalLink className="btn btn--dark">
                Agendar llamada <span aria-hidden="true">↗</span>
              </CalLink>
              <a className="ft__mail" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            </div>
          </Reveal>

          <Reveal className="ft__mid" delay={80}>
            <nav aria-label="Navegación del pie">
              <ul className="ft__nav">
                {NAV.map((l) =>
                  "section" in l ? (
                    <li key={l.label}><a href={`/#${l.section}`} onClick={toSection(l.section)}>{l.label}</a></li>
                  ) : (
                    <li key={l.label}><a href={`/${l.view}`} onClick={go(l.view)}>{l.label}</a></li>
                  ),
                )}
              </ul>
            </nav>
            <ul className="ft__soc" aria-label="Redes sociales">
              {SOCIALS.map((s) => (
                <li key={s.name}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={`${s.name}: ${s.handle} (se abre en otra pestaña)`} title={`${s.name} · ${s.handle}`}>
                    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">{ICONS[s.name]}</svg>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          <div className="ft__bot">
            <span>© {new Date().getFullYear()} Frank Abanto</span>
            <a href="/privacidad" onClick={go("privacidad")}>Privacidad</a>
            <a className="ft__up" href="#top" onClick={toTop}>
              Volver arriba <span aria-hidden="true">↑</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SiteFooter;
