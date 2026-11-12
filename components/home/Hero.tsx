import React, { useCallback } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  BuildReveal,
  IntroLoader,
  TypewriterHeadline,
  reached,
  useIntro,
} from "../intro";
import { ArrowDown, ArrowUpRight } from "./heroIcons";
import ServiceOrbit, { ServiceMarquee } from "./ServiceOrbit";
import "./Hero.css";

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

const HERO_PHOTO = "/images/frank-hero.webp";

/** Orden de construcción de cada pieza del hero (el navbar usa 2–7). */
const BUILD_ORDER = {
  eyebrow: 0,
  lead: 1,
  primary: 2,
  secondary: 3,
  cards: 4, // 4–7.5 (medio paso por tarjeta)
  bottomLeft: 8,
  bottomRight: 9,
} as const;

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

  const { phase, mode, skipped } = useIntro();
  const photoShown = reached(phase, "photo");
  const animatePhoto = mode === "full" && !skipped;
  const building = phase === "building" && mode === "full";

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
          <BuildReveal
            order={BUILD_ORDER.eyebrow}
            variant="chip"
            label="<Eyebrow />"
            inline
          >
            <p className="hero__eyebrow">Menos tareas. Más posibilidades.</p>
          </BuildReveal>

          <TypewriterHeadline
            id="hero-title"
            className="hero__title"
            lineClassName="hero__title-line"
            lines={[
              { text: "Software e IA" },
              { text: "hechos a tu medida.", className: "hero__title-italic" },
            ]}
          />

          <BuildReveal
            order={BUILD_ORDER.lead}
            variant="lines"
            label="<Lead />"
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
            <BuildReveal
              order={BUILD_ORDER.primary}
              variant="pill"
              label="<Button primary />"
              inline
            >
              <a href="#contacto" className="hero__btn">
                Hablemos de tu negocio
                <ArrowUpRight className="hero__btn-icon" />
              </a>
            </BuildReveal>
            <BuildReveal order={BUILD_ORDER.secondary} variant="pill" inline>
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
            initial={false}
            animate={
              photoShown
                ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }
                : { opacity: 0, y: 48, scale: 1.03, filter: "blur(18px)" }
            }
            transition={
              animatePhoto
                ? { duration: 1.0, ease: EASE_OUT }
                : { duration: 0 }
            }
          >
            <picture>
              <source srcSet={HERO_PHOTO} type="image/webp" />
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
          </motion.div>

          {/* Servicios orbitando alrededor de la foto (tablet/desktop) */}
          <ServiceOrbit
            mouseX={mouseX}
            mouseY={mouseY}
            reduceMotion={reduceMotion}
            buildOrder={BUILD_ORDER.cards}
          />

          {/* Móvil: cinta de servicios que se desplaza sola */}
          <ServiceMarquee buildOrder={BUILD_ORDER.cards} />
        </div>
      </div>

      {/* Pie del hero */}
      <div className="hero__bottom">
        <BuildReveal
          order={BUILD_ORDER.bottomLeft}
          variant="lines"
          as="div"
          inline
        >
          <p className="hero__bottom-left">
            Diseñados para tu negocio.
            <br />
            Conectados a tu forma de trabajar.
          </p>
        </BuildReveal>
        <BuildReveal order={BUILD_ORDER.bottomRight} variant="text" inline>
          <p className="hero__bottom-right">
            Inteligencia que se convierte en acción.
          </p>
        </BuildReveal>
      </div>

      {/* Intro: firma de carga, escaneo e indicador de construcción */}
      <IntroLoader images={[HERO_PHOTO]} />
      {building ? (
        <>
          <div className="intro-scan" aria-hidden="true" />
          <div className="intro-status" aria-hidden="true">
            <i />
            IA construyendo la interfaz…
          </div>
        </>
      ) : null}
    </section>
  );
};

export default Hero;
