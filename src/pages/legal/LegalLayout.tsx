import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../../components/home/sections/home.css";

export const UPDATED = "12 de noviembre de 2026";

const PAGES = [
  { to: "/privacidad", label: "Privacidad" },
  { to: "/terminos", label: "Términos" },
  { to: "/cookies", label: "Cookies" },
];

interface LegalLayoutProps {
  id: string;
  title: string;
  intro: React.ReactNode;
  children: React.ReactNode;
}

/** Plantilla de las páginas legales: crema, serif, texto legible y aviso final. */
const LegalLayout: React.FC<LegalLayoutProps> = ({ id, title, intro, children }) => {
  const { pathname } = useLocation();
  return (
  <div className="hm legal">
    <article className="wrap legal__in" aria-labelledby={id}>
      <nav className="legal__tabs" aria-label="Páginas legales">
        {PAGES.map((p) => (
          <Link key={p.to} to={p.to} aria-current={pathname === p.to ? "page" : undefined}>
            {p.label}
          </Link>
        ))}
      </nav>
      <h1 className="h2" id={id}>{title}</h1>
      <p className="legal__date">Última actualización: {UPDATED}</p>
      <p className="legal__lead">{intro}</p>
      {children}
      <p className="legal__note">
        Este texto es informativo y se redactó de buena fe para explicar cómo funciona este sitio. No sustituye el
        asesoramiento de un abogado; puede revisarse con uno para adaptarlo a cada caso.
      </p>
    </article>
  </div>
  );
};

export default LegalLayout;
