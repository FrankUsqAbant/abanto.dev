import React, { useCallback } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import "./Hero.css";

/* ------------------------------------------------------------------ */
/* Datos                                                               */
/* ------------------------------------------------------------------ */

type CardIcon = "trend" | "blend" | "chat" | "zap";
type CardId = "ventas" | "integraciones" | "atencion" | "automatizacion";

interface SystemCard {
  id: CardId;
  index: string;
  title: string;
  description: [string, string];
  footer: string;
  icon: CardIcon;
  /** Profundidad para el parallax del mouse (px de desplazamiento máximo). */
  depth: number;
  /** Inclinación 3D (grados en Y): positivo mira hacia la derecha. */
  tilt: number;
  /** Visible también en móvil. */
  mobile: boolean;
}

const CARDS: SystemCard[] = [
  {
    id: "ventas",
    index: "01",
    title: "Ventas",
    description: ["Convierte conversaciones", "en nuevas oportunidades."],
    footer: "Seguimiento inteligente",
    icon: "trend",
    depth: 18,
    tilt: -10,
    mobile: true,
  },
  {
    id: "integraciones",
    index: "02",
    title: "Integraciones",
    description: ["Tus herramientas,", "trabajando en sincronía."],
    footer: "Todo conectado",
    icon: "blend",
    depth: 12,
    tilt: 10,
    mobile: false,
  },
  {
    id: "atencion",
    index: "03",
    title: "Atención al cliente",
    description: ["Respuestas útiles.", "Sin tiempos de espera."],
    footer: "Disponible 24/7",
    icon: "chat",
    depth: 24,
    tilt: -12,
    mobile: true,
  },
  {
    id: "automatizacion",
    index: "04",
    title: "Automatización",
    description: ["Menos tareas repetitivas.", "Más tiempo para lo importante."],
    footer: "Procesos en piloto automático",
    icon: "zap",
    depth: 28,
    tilt: 12,
    mobile: false,
  },
];

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ------------------------------------------------------------------ */
/* Iconos (SVG en línea, trazo 1.6)                                    */
/* ------------------------------------------------------------------ */

const svgProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const Icon: React.FC<{ name: CardIcon }> = ({ name }) => {
  switch (name) {
    case "trend":
      return (
        <svg {...svgProps}>
          <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
          <polyline points="16 7 22 7 22 13" />
        </svg>
      );
    case "blend":
      return (
        <svg {...svgProps}>
          <circle cx="9" cy="9" r="6" />
          <circle cx="15" cy="15" r="6" />
        </svg>
      );
    case "chat":
      return (
        <svg {...svgProps}>
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          <path d="M8 9h8M8 13h5" />
        </svg>
      );
    case "zap":
      return (
        <svg {...svgProps}>
          <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
      );
  }
};

const ArrowUpRight: React.FC<{ className?: string }> = ({ className }) => (
  <svg {...svgProps} className={className}>
    <path d="M7 17 17 7" />
    <path d="M7 7h10v10" />
  </svg>
);

const ArrowDown: React.FC<{ className?: string }> = ({ className }) => (
  <svg {...svgProps} className={className}>
    <path d="M12 5v14" />
    <path d="m19 12-7 7-7-7" />
  </svg>
);

/* ------------------------------------------------------------------ */
/* Tarjeta de vidrio                                                   */
/* ------------------------------------------------------------------ */

interface GlassCardProps {
  card: SystemCard;
  order: number;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  reduceMotion: boolean;
}

const GlassCard: React.FC<GlassCardProps> = ({
  card,
  order,
  mouseX,
  mouseY,
  reduceMotion,
}) => {
  const x = useTransform(mouseX, (v) => v * card.depth);
  const y = useTransform(mouseY, (v) => v * card.depth * 0.6);
  const rotateY = useTransform(mouseX, (v) => card.tilt + v * 6);
  const rotateX = useTransform(mouseY, (v) => 4 - v * 6);

  return (
    <motion.div
      className={`hero-card-slot hero-card-slot--${card.id}${
        card.mobile ? "" : " hero-card-slot--desktop-only"
      }`}
      style={reduceMotion ? undefined : { x, y }}
    >
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.1, delay: 1.0 + order * 0.14, ease: EASE_OUT }}
      >
        <motion.div
          animate={reduceMotion ? undefined : { y: [0, -7, 0] }}
          transition={{
            duration: 6 + order * 0.9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2 + order * 0.4,
          }}
        >
          <motion.article
            className="hero-card"
            style={
              reduceMotion
                ? { rotateY: card.tilt, rotateX: 4 }
                : { rotateY, rotateX }
            }
            aria-label={`${card.title}: ${card.description.join(" ")}`}
          >
            <header className="hero-card__top">
              <span className="hero-card__dots" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              <span className="hero-card__index">SISTEMA / {card.index}</span>
            </header>

            <div className="hero-card__body">
              <span className="hero-card__icon">
                <Icon name={card.icon} />
              </span>
              <div>
                <h3 className="hero-card__title">{card.title}</h3>
                <p className="hero-card__desc">
                  {card.description[0]}
                  <br />
                  {card.description[1]}
                </p>
              </div>
            </div>

            <footer className="hero-card__footer">
              <span className="hero-card__status">
                <i aria-hidden="true" />
                {card.footer}
              </span>
              <ArrowUpRight className="hero-card__arrow" />
            </footer>
          </motion.article>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

/* ------------------------------------------------------------------ */
/* Línea con revelado (máscara)                                        */
/* ------------------------------------------------------------------ */

const RevealLine: React.FC<{
  children: React.ReactNode;
  delay: number;
  className?: string;
  reduceMotion: boolean;
}> = ({ children, delay, className, reduceMotion }) => (
  <span className="hero-reveal">
    <motion.span
      className={`hero-reveal__inner ${className ?? ""}`}
      initial={reduceMotion ? false : { y: "110%", opacity: 0 }}
      animate={{ y: "0%", opacity: 1 }}
      transition={{ duration: 1.1, delay, ease: EASE_OUT }}
    >
      {children}
    </motion.span>
  </span>
);

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

  const fadeUp = (delay: number) =>
    reduceMotion
      ? { initial: false as const }
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.9, delay, ease: EASE_OUT },
        };

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
          <motion.p className="hero__eyebrow" {...fadeUp(0.15)}>
            Menos tareas. Más posibilidades.
          </motion.p>

          <h1 id="hero-title" className="hero__title">
            <RevealLine delay={0.3} reduceMotion={reduceMotion}>
              Construimos sistemas de IA
            </RevealLine>
            <RevealLine
              delay={0.45}
              reduceMotion={reduceMotion}
              className="hero__title-italic"
            >
              que operan tu negocio.
            </RevealLine>
          </h1>

          <motion.p className="hero__lead" {...fadeUp(0.7)}>
            Conectamos tus herramientas, automatizamos tus procesos y
            convertimos <br className="hero__br" />
            la inteligencia artificial en tu mejor equipo. Tú te enfocas en
            crecer.
          </motion.p>

          <motion.div className="hero__actions" {...fadeUp(0.85)}>
            <a href="#contacto" className="hero__btn">
              Hablemos de tu negocio
              <ArrowUpRight className="hero__btn-icon" />
            </a>
            <a href="#github-ecosystem" className="hero__link">
              Explorar soluciones
              <ArrowDown className="hero__link-icon" />
            </a>
          </motion.div>
        </div>

        {/* Escenario: foto + tarjetas */}
        <div className="hero__stage">
          <motion.div
            className="hero__photo"
            style={reduceMotion ? undefined : { x: photoX }}
            initial={reduceMotion ? false : { opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 0.55, ease: EASE_OUT }}
          >
            <picture>
              <source srcSet="/images/frank-hero.webp" type="image/webp" />
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

          {CARDS.map((card, i) => (
            <GlassCard
              key={card.id}
              card={card}
              order={i}
              mouseX={mouseX}
              mouseY={mouseY}
              reduceMotion={reduceMotion}
            />
          ))}
        </div>
      </div>

      {/* Pie del hero */}
      <motion.div className="hero__bottom" {...fadeUp(1.4)}>
        <p className="hero__bottom-left">
          Diseñados para tu negocio.
          <br />
          Conectados a tu forma de trabajar.
        </p>
        <p className="hero__bottom-right">
          Inteligencia que se convierte en acción.
        </p>
      </motion.div>
    </section>
  );
};

export default Hero;
