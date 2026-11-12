import React from "react";
import type { View } from "../../../types";
import CalLink from "../../shared/CalLink";
import { CONTACT_ID, SOCIALS, scrollToSection, scrollToSectionWhenReady } from "./homeLinks";

interface SiteFooterProps {
  onNavigate: (view: View) => void;
}

/** Pie del sitio (oscuro, según el mockup aprobado). */
const SiteFooter: React.FC<SiteFooterProps> = ({ onNavigate }) => {
  const go = (view: View) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onNavigate(view);
  };

  const toHomeSection = (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (window.location.pathname === "/") {
      scrollToSection(id);
    } else {
      onNavigate("home");
      scrollToSectionWhenReady(id);
    }
  };

  return (
    <div className="hm hm-footer">
      <footer className="footer" id="pie">
        <div className="wrap footer__grid">
          <div>
            <a className="logo logo--lg" href="/" onClick={go("home")} aria-label="Frank Abanto — Inicio">
              Frank Abanto
            </a>
            <p className="footer__tag">
              Software Architect &amp; Content Creator.
              <br />
              Agentes de IA, automatizaciones y software a medida.
            </p>
          </div>
          <nav aria-label="Navegación del pie">
            <h2 className="footer__h">Navegación</h2>
            <a href="/" onClick={go("home")}>Inicio</a>
            <a href="/aprende" onClick={go("aprende")}>Aprende</a>
            <a href="/about" onClick={go("about")}>Sobre mí</a>
            <a href="/#proceso" onClick={toHomeSection("proceso")}>Proceso</a>
            <a href="/#faq" onClick={toHomeSection("faq")}>Preguntas</a>
            <a href={`/#${CONTACT_ID}`} onClick={toHomeSection(CONTACT_ID)}>Contacto</a>
            <CalLink>
              Agendar llamada <span aria-hidden="true">↗</span>
            </CalLink>
          </nav>
          <nav aria-label="Servicios">
            <h2 className="footer__h">Servicios</h2>
            <a href="/#servicios" onClick={toHomeSection("servicios")}>Páginas web</a>
            <a href="/#servicios" onClick={toHomeSection("servicios")}>Agentes y chatbots de IA</a>
            <a href="/#servicios" onClick={toHomeSection("servicios")}>Automatización de procesos</a>
            <a href="/#servicios" onClick={toHomeSection("servicios")}>Dashboards y datos</a>
          </nav>
          <nav aria-label="Redes sociales">
            <h2 className="footer__h">Sígueme</h2>
            {SOCIALS.map((s) => (
              <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={`${s.name} (se abre en otra pestaña)`}>
                {s.name} <span aria-hidden="true">↗</span>
              </a>
            ))}
          </nav>
        </div>
        <div className="wrap footer__bottom">
          <span>© {new Date().getFullYear()} Frank Abanto · Todos los derechos reservados.</span>
          <span className="mono">Transformando ideas en código, un commit a la vez.</span>
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
              window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
            }}
          >
            Volver arriba <span aria-hidden="true">↑</span>
          </a>
        </div>
      </footer>
    </div>
  );
};

export default SiteFooter;
