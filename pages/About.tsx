import React from "react";
import Reveal from "../components/home/sections/Reveal";
import CalLink from "../components/shared/CalLink";
import { SOCIALS } from "../components/home/sections/homeLinks";
import "../components/home/sections/home.css";
import "./about.css";

const STACK = ["React", "TypeScript", "Node.js", "Tailwind", "Python", "IA / LLMs"];

const VALUES: { title: string; text: string }[] = [
  { title: "Un solo responsable", text: "Diseño, construyo y acompaño el sistema de punta a punta, sin intermediarios." },
  { title: "Sobre tus procesos reales", text: "Conecto lo que ya usas en lugar de obligarte a cambiar todo." },
  { title: "Claro y medible", text: "Entregas cada semana y decisiones explicadas en lenguaje simple." },
];

const JOURNEY: { year: string; title: string; text: string }[] = [
  { year: "2024", title: "Primeros pasos en código", text: "JavaScript y las bases de la web." },
  { year: "2025", title: "Especialización frontend", text: "React, Astro y diseño de interfaces." },
  { year: "2026", title: "Software e IA a medida", text: "Freelance: agentes, automatizaciones y apps para negocios." },
];

/** Sobre mí: misma estética que el inicio (crema, serif, vidrio, revelados suaves). */
const About: React.FC = () => (
  <div className="hm about">
    <section className="about-hero" aria-labelledby="about-title">
      <div className="about-hero__glow" aria-hidden="true" />
      <div className="wrap about-hero__grid">
        <Reveal className="about-hero__text">
          <h1 className="about-hero__name" id="about-title">Frank Abanto</h1>
          <p className="about-hero__line">
            Construyo software e IA <em>que trabajan por tu negocio.</em>
          </p>
          <p className="about-hero__p">
            Soy desarrollador y me enfoco en sistemas de IA que operan negocios: agentes que
            atienden y venden, automatizaciones que mueven la información sola y software a medida.
          </p>
          <p className="about-hero__p">
            Me importa que el código resuelva problemas reales de forma simple, y que entiendas
            cada decisión.
          </p>
          <ul className="about-chips" aria-label="Tecnologías">
            {STACK.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </Reveal>
        <Reveal className="about-hero__photo" delay={120}>
          <img
            src="/images/frank-hero.webp"
            srcSet="/images/frank-hero-360.webp 360w, /images/frank-hero-520.webp 520w, /images/frank-hero.webp 695w"
            sizes="(max-width: 899px) min(80vw, 420px), 34vw"
            alt="Frank Abanto con chaqueta negra y lentes de sol"
            width={695}
            height={1642}
            decoding="async"
          />
        </Reveal>
      </div>
    </section>

    <section className="section about-sec" aria-labelledby="about-values">
      <div className="wrap">
        <Reveal as="header" className="sec-head">
          <h2 className="h2" id="about-values">
            Cómo <em>trabajo.</em>
          </h2>
        </Reveal>
        <ul className="about-values">
          {VALUES.map((v, i) => (
            <Reveal as="li" key={v.title} className="about-card" delay={i * 90}>
              <span className="about-card__n" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
              <h3>{v.title}</h3>
              <p>{v.text}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>

    <section className="section section--alt about-sec" aria-labelledby="about-journey">
      <div className="wrap">
        <Reveal as="header" className="sec-head">
          <h2 className="h2" id="about-journey">
            Mi <em>trayectoria.</em>
          </h2>
        </Reveal>
        <ol className="about-journey">
          {JOURNEY.map((j, i) => (
            <Reveal as="li" key={j.year} delay={i * 90}>
              <span className="about-journey__y">{j.year}</span>
              <h3>{j.title}</h3>
              <p>{j.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>

    <section className="section about-sec about-cta" aria-labelledby="about-cta">
      <Reveal className="wrap about-cta__inner">
        <h2 className="h2" id="about-cta">
          ¿Hablamos de <em>tu proyecto?</em>
        </h2>
        <p className="sec-head__sub">30 minutos, sin compromiso.</p>
        <CalLink className="btn btn--dark btn--lg" aria-label="Agendar llamada de 30 minutos (Cal.com)">
          Agendar llamada <i className="arr" aria-hidden="true">↗</i>
        </CalLink>
        <ul className="about-socials" aria-label="Redes sociales">
          {SOCIALS.map((s) => (
            <li key={s.name}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${s.name}: ${s.handle} (se abre en otra pestaña)`}
              >
                <span>{s.name}</span>
                <em>{s.handle}</em>
              </a>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  </div>
);

export default About;
