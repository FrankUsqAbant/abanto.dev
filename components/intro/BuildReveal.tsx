import React from "react";
import { INTRO_TIMING, reached, useIntro } from "./IntroContext";

export type BuildVariant = "text" | "lines" | "pill" | "card" | "chip";

type BuildTag = "div" | "span" | "li" | "p";

interface BuildRevealProps {
  /** Orden en la cola de construcción (0 = primero). */
  order: number;
  children: React.ReactNode;
  /** Forma del esqueleto mientras se "construye". */
  variant?: BuildVariant;
  /** Etiqueta tipo componente que se ve sobre el esqueleto, p. ej. `<Card ventas />`. */
  label?: string;
  as?: BuildTag;
  inline?: boolean;
  className?: string;
  /** Estilo extra del esqueleto (p. ej. la misma inclinación 3D de una tarjeta). */
  skeletonStyle?: React.CSSProperties;
}

const BAR_COUNT: Record<BuildVariant, number> = {
  text: 1,
  lines: 2,
  pill: 1,
  card: 3,
  chip: 1,
};

type CSSVars = React.CSSProperties & Record<`--${string}`, string>;

/**
 * Envuelve una pieza de la interfaz para que, durante la intro, aparezca
 * primero como un esqueleto (contorno punteado + barras con brillo) y
 * luego se "rellene" con el contenido real, como si una IA la armara.
 * Fuera de la intro no añade ningún efecto.
 */
const BuildReveal: React.FC<BuildRevealProps> = ({
  order,
  children,
  variant = "text",
  label,
  as: Tag = "div",
  inline = false,
  className = "",
  skeletonStyle,
}) => {
  const { phase, mode, skipped } = useIntro();

  const state: "idle" | "waiting" | "building" | "quick" =
    phase === "done" || mode === "off" || skipped
      ? "idle"
      : !reached(phase, "building")
        ? "waiting"
        : mode === "short"
          ? "quick"
          : "building";

  const delay =
    state === "quick"
      ? order * 25
      : INTRO_TIMING.buildBase + order * INTRO_TIMING.buildStagger;

  const style: CSSVars | undefined =
    state === "idle"
      ? undefined
      : {
          "--build-delay": `${delay}ms`,
          "--build-fill": `${INTRO_TIMING.buildFill}ms`,
        };

  const classes = [
    "build",
    inline ? "build--inline" : "",
    `build--${variant}`,
    state !== "idle" ? `is-${state}` : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Tag className={classes} style={style}>
      <span className="build__content">{children}</span>
      {state === "building" || state === "waiting" ? (
        <span className="build__skeleton" aria-hidden="true" style={skeletonStyle}>
          {label ? <span className="build__label">{label}</span> : null}
          {Array.from({ length: BAR_COUNT[variant] }, (_, i) => (
            <span key={i} className="build__bar" />
          ))}
        </span>
      ) : null}
    </Tag>
  );
};

export default BuildReveal;
