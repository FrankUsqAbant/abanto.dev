import React, { useEffect, useRef } from "react";
import { useAnimationFrame, type MotionValue } from "framer-motion";
import { BuildReveal, useIntro } from "../intro";
import { ArrowUpRight, ServiceIcon, type ServiceIconName } from "./heroIcons";
import "./ServiceOrbit.css";

/* ------------------------------------------------------------------ */
/* Datos                                                               */
/* ------------------------------------------------------------------ */

export interface Service {
  id: string;
  index: string;
  title: string;
  description: [string, string];
  footer: string;
  icon: ServiceIconName;
}

/**
 * Orden alrededor del anillo. Los 4 primeros arrancan delante de la foto;
 * los otros 4, detrás.
 */
export const SERVICES: Service[] = [
  {
    id: "ventas",
    index: "01",
    title: "Ventas",
    description: ["Convierte conversaciones", "en nuevas oportunidades."],
    footer: "Seguimiento inteligente",
    icon: "trend",
  },
  {
    id: "integraciones",
    index: "02",
    title: "Integraciones",
    description: ["Tus herramientas,", "trabajando en sincronía."],
    footer: "Todo conectado",
    icon: "blend",
  },
  {
    id: "atencion",
    index: "03",
    title: "Atención al cliente",
    description: ["Respuestas útiles.", "Sin tiempos de espera."],
    footer: "Disponible 24/7",
    icon: "chat",
  },
  {
    id: "automatizacion",
    index: "04",
    title: "Automatización",
    description: ["Menos tareas repetitivas.", "Más tiempo para lo importante."],
    footer: "Procesos en piloto automático",
    icon: "zap",
  },
  {
    id: "web",
    index: "05",
    title: "Páginas web",
    description: ["Sitios rápidos y a medida,", "pensados para vender."],
    footer: "Diseño y desarrollo",
    icon: "globe",
  },
  {
    id: "redes",
    index: "06",
    title: "Redes sociales",
    description: ["Contenido que se publica solo,", "con tu estilo y a tiempo."],
    footer: "Publicación automática",
    icon: "share",
  },
  {
    id: "agentes",
    index: "07",
    title: "Agentes de IA",
    description: ["Asistentes que responden", "y ejecutan tareas por ti."],
    footer: "Conectados a tu negocio",
    icon: "bot",
  },
  {
    id: "datos",
    index: "08",
    title: "Datos y dashboards",
    description: ["Reportes en tiempo real", "para decidir con claridad."],
    footer: "Métricas siempre al día",
    icon: "chart",
  },
];

/* ------------------------------------------------------------------ */
/* Tarjeta                                                             */
/* ------------------------------------------------------------------ */

export const ServiceCard: React.FC<{ service: Service; labelled?: boolean }> = ({
  service,
  labelled = true,
}) => (
  <article
    className="hero-card"
    aria-label={
      labelled ? `${service.title}: ${service.description.join(" ")}` : undefined
    }
  >
    <header className="hero-card__top">
      <span className="hero-card__dots" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
      <span className="hero-card__index">SISTEMA / {service.index}</span>
    </header>

    <div className="hero-card__body">
      <span className="hero-card__icon">
        <ServiceIcon name={service.icon} />
      </span>
      <div>
        <h3 className="hero-card__title">{service.title}</h3>
        <p className="hero-card__desc">
          {service.description[0]}
          <br />
          {service.description[1]}
        </p>
      </div>
    </div>

    <footer className="hero-card__footer">
      <span className="hero-card__status">
        <i aria-hidden="true" />
        {service.footer}
      </span>
      <ArrowUpRight className="hero-card__arrow" />
    </footer>
  </article>
);

/* ------------------------------------------------------------------ */
/* Anillo orbital                                                      */
/* ------------------------------------------------------------------ */

/** Segundos por vuelta completa. */
const REVOLUTION_S = 34;
/** Velocidad relativa con el mouse encima de una tarjeta. */
const HOVER_SPEED = 0.12;
/** Ángulo inicial (rad): con 8 tarjetas, 4 quedan delante (sin > 0). */
const START = Math.PI / 8;
const TAU = Math.PI * 2;

interface Depth {
  ox: number;
  oy: number;
  k: number;
  dim: number;
  z: number;
  back: boolean;
}

/** Posición en la elipse para un ángulo: y > 0 = delante de la foto. */
const depthAt = (theta: number): Depth => {
  const ox = Math.cos(theta);
  const oy = Math.sin(theta);
  const front = (oy + 1) / 2; // 0 detrás … 1 delante
  return {
    ox,
    oy,
    k: 0.74 + 0.26 * front,
    dim: 0.5 * (1 - front) * (1 - front),
    // la foto está en z-index 20: detrás 10–19, delante 21–30
    z: oy > 0 ? 21 + Math.round(front * 9) : 10 + Math.round(front * 9),
    back: oy <= 0,
  };
};

const applyDepth = (el: HTMLElement, d: Depth) => {
  const s = el.style;
  s.setProperty("--ox", d.ox.toFixed(4));
  s.setProperty("--oy", d.oy.toFixed(4));
  s.setProperty("--k", d.k.toFixed(4));
  s.setProperty("--dim", d.dim.toFixed(3));
  s.zIndex = String(d.z);
  if (el.dataset.back !== String(d.back)) el.dataset.back = String(d.back);
};

interface ServiceOrbitProps {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  reduceMotion: boolean;
  /** Orden de construcción de la primera tarjeta (intro). */
  buildDelay: number;
}

/**
 * Las tarjetas de servicios giran en una elipse alrededor de la foto:
 * pasan por detrás (más pequeñas y tenues) y por delante (más grandes y
 * nítidas), siempre mirando al visitante. Solo se escriben variables CSS
 * y transformaciones en cada frame, sin re-renderizar React.
 */
const ServiceOrbit: React.FC<ServiceOrbitProps> = ({
  mouseX,
  mouseY,
  reduceMotion,
  buildDelay,
}) => {
  const { phase } = useIntro();
  const ringRef = useRef<HTMLDivElement>(null);
  const slotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const angle = useRef(0);
  const speed = useRef(0);
  const hovered = useRef(false);
  // Ya orbita mientras las tarjetas llegan (arranque suave por la inercia).
  const running = phase !== "loading" && !reduceMotion;
  const runningRef = useRef(running);
  runningRef.current = running;

  const n = SERVICES.length;
  const baseAngle = (i: number) => START + (i / n) * TAU;

  // Posición estática inicial (también es la de movimiento reducido).
  useEffect(() => {
    slotRefs.current.forEach((el, i) => {
      if (el) applyDepth(el, depthAt(baseAngle(i) + angle.current));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useAnimationFrame((_, delta) => {
    if (reduceMotion) return;
    const dt = Math.min(delta, 64) / 1000;
    const target = runningRef.current ? (hovered.current ? HOVER_SPEED : 1) : 0;
    // arranque y frenado suaves
    speed.current += (target - speed.current) * Math.min(1, dt * 2.2);
    if (Math.abs(speed.current) < 0.0005 && target === 0) return;

    angle.current = (angle.current + dt * speed.current * (TAU / REVOLUTION_S)) % TAU;

    const ring = ringRef.current;
    if (ring) {
      ring.style.setProperty("--mx", mouseX.get().toFixed(4));
      ring.style.setProperty("--my", mouseY.get().toFixed(4));
    }
    slotRefs.current.forEach((el, i) => {
      if (el) applyDepth(el, depthAt(baseAngle(i) + angle.current));
    });
  });

  // El parallax del mouse también debe moverse con el anillo quieto (intro / hover).
  useEffect(() => {
    if (reduceMotion) return;
    const update = () => {
      const ring = ringRef.current;
      if (!ring) return;
      ring.style.setProperty("--mx", mouseX.get().toFixed(4));
      ring.style.setProperty("--my", mouseY.get().toFixed(4));
    };
    const a = mouseX.on("change", update);
    const b = mouseY.on("change", update);
    return () => {
      a();
      b();
    };
  }, [mouseX, mouseY, reduceMotion]);

  return (
    <div
      ref={ringRef}
      className="orbit"
      role="list"
      aria-label="Servicios"
    >
      {SERVICES.map((service, i) => {
        const d = depthAt(baseAngle(i));
        const style = {
          "--ox": d.ox.toFixed(4),
          "--oy": d.oy.toFixed(4),
          "--k": d.k.toFixed(4),
          "--dim": d.dim.toFixed(3),
          zIndex: d.z,
        } as React.CSSProperties;
        return (
          <div
            key={service.id}
            ref={(el) => {
              slotRefs.current[i] = el;
            }}
            className="orbit__slot"
            role="listitem"
            data-back={String(d.back)}
            style={style}
            onPointerEnter={() => {
              hovered.current = true;
            }}
            onPointerLeave={() => {
              hovered.current = false;
            }}
          >
            <BuildReveal delay={buildDelay + i * 60} variant="card">
              <ServiceCard service={service} />
            </BuildReveal>
          </div>
        );
      })}
    </div>
  );
};

export default ServiceOrbit;

/* ------------------------------------------------------------------ */
/* Móvil: cinta que se desplaza sola                                   */
/* ------------------------------------------------------------------ */

export const ServiceMarquee: React.FC<{ buildDelay: number }> = ({ buildDelay }) => (
  <BuildReveal delay={buildDelay} className="marquee-wrap">
    <div className="marquee" aria-label="Servicios">
      <div className="marquee__track">
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            className="marquee__group"
            aria-hidden={copy === 1 ? true : undefined}
          >
            {SERVICES.map((service) => (
              <li key={service.id} className="marquee__item">
                <ServiceCard service={service} labelled={copy === 0} />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  </BuildReveal>
);
