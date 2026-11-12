import React, { useCallback, useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { BuildReveal, CreditsHeadline, IntroLoader, useIntro } from "../intro";
import { ArrowDown, ArrowUpRight } from "./heroIcons";
import ServiceOrbit, { ServiceMarquee } from "./ServiceOrbit";
import "./Hero.css";

const HERO_PHOTO = "/images/frank-hero.webp";
const HERO_SRCSET = "/images/frank-hero-360.webp 360w, /images/frank-hero-520.webp 520w, /images/frank-hero.webp 695w";
/** Ancho real de la foto: móvil, tablet y desktop (escala --s del hero). */
const HERO_SIZES = "(max-width: 639px) min(72vw, 380px), (max-width: 1023px) 340px, 25vw";

/**
 * Retrasos (ms) de cada pieza desde que la cortina empieza a subir.
 * La cortina descubre la página de abajo hacia arriba, así que primero
 * entran la foto y las tarjetas, y el titular justo cuando queda a la vista.
 */
const DELAY = {
  photo: 150,
  cards: 300, // + 60 ms por tarjeta
  marquee: 500,
  headline: 620,
  lead: 820,
  primary: 930,
  secondary: 1000,
} as const;

/* ------------------------------------------------------------------ */
/* Indicador de scroll                                                 */
/* ------------------------------------------------------------------ */

/** Aparece al terminar la intro, se oculta al hacer scroll y lleva a Servicios. */
const ScrollCue: React.FC<{ reduceMotion: boolean }> = ({ reduceMotion }) => {
  const { phase } = useIntro();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const target = document.getElementById("servicios");
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  };

  const visible = phase === "done" && !scrolled;
  return (
    <a
      href="#servicios"
      className="hero__cue"
      data-visible={visible}
      data-static={reduceMotion}
      onClick={go}
      tabIndex={visible ? 0 : -1}
      aria-label="Desliza hasta Servicios"
    >
      <span className="hero__cue-text">Desliza</span>
      <span className="hero__cue-line" aria-hidden="true" />
    </a>
  );
};

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

const Hero: React.FC = () => {
  const reduceMotion = useReducedMotion() ?? false;

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const mouseX = useSpring(rawX, { stiffness: 60, damping: 18, mass: 0.6 });
  const mouseY = useSpring(rawY, { stiffness: 60, damping: 18, mass: 0.6 });
  const photoX = useTransform(mouseX, (v) => v * -6);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLElement>) => {
      if (reduceMotion || e.pointerType !== "mouse") return;
      const rect = e.currentTarget.getBoundingClientRect();
      rawX.set((e.clientX - rect.left) / rect.width - 0.5);
      rawY.set((e.clientY - rect.top) / rect.height - 0.5);
    },
    [rawX, rawY, reduceMotion]
  );

  const handlePointerLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
  }, [rawX, rawY]);


  return (
    <section
      className="hero"
      aria-labelledby="hero-title"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <div className="hero__bg" aria-hidden="true" />

      <div className="hero__frame">
        {/* Texto central */}
        <div className="hero__content">
          <CreditsHeadline
            id="hero-title"
            delay={DELAY.headline}
            className="hero__title"
            lineClassName="hero__title-line"
            lines={[
              { text: "Software e IA" },
              { text: "hechos a tu medida.", className: "hero__title-italic" },
            ]}
          />

          <BuildReveal
            delay={DELAY.lead}
            inline
            className="hero__lead-wrap"
          >
            <p className="hero__lead">
              Conectamos tus herramientas, automatizamos tus procesos y
              convertimos <br className="hero__br" />
              la inteligencia artificial en tu mejor equipo. Tú te enfocas en
              crecer.
            </p>
          </BuildReveal>

          <div className="hero__actions">
            <BuildReveal delay={DELAY.primary} inline>
              <a href="#contacto" className="hero__btn">
                Hablemos de tu negocio
                <ArrowUpRight className="hero__btn-icon" />
              </a>
            </BuildReveal>
            <BuildReveal delay={DELAY.secondary} inline>
              <a href="#servicios" className="hero__link">
                Explorar soluciones
                <ArrowDown className="hero__link-icon" />
              </a>
            </BuildReveal>
          </div>
        </div>

        {/* Escenario: foto + tarjetas */}
        <div className="hero__stage">
          <motion.div
            className="hero__photo"
            style={reduceMotion ? undefined : { x: photoX }}
          >
            <div
              className="ix-photo"
              style={{ "--ix-delay": `${DELAY.photo}ms` } as React.CSSProperties}
            >
            <picture>
              <source
                srcSet={HERO_SRCSET}
                sizes={HERO_SIZES}
                type="image/webp"
              />
              <img
                src="/images/frank-hero.png"
                alt="Frank Abanto con chaqueta negra y lentes de sol"
                width={695}
                height={1642}
                decoding="async"
                fetchPriority="high"
                draggable={false}
              />
            </picture>
            </div>
          </motion.div>

          {/* Servicios orbitando alrededor de la foto (tablet/desktop) */}
          <ServiceOrbit
            mouseX={mouseX}
            mouseY={mouseY}
            reduceMotion={reduceMotion}
            buildDelay={DELAY.cards}
          />

          {/* Móvil: cinta de servicios que se desplaza sola */}
          <ServiceMarquee buildDelay={DELAY.marquee} />
        </div>
      </div>

      <ScrollCue reduceMotion={reduceMotion} />

      {/* Intro: cortina + firma; espera fuentes y foto antes de la toma */}
      <IntroLoader images={[HERO_PHOTO]} />
    </section>
  );
};

export default Hero;
