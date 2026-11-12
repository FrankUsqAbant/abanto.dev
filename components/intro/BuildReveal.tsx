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

type CSSVars = React.CSSProperties & Record<`--${string}`, string>;

/**
 * Envuelve una pieza de la interfaz para que, durante la intro, entre con
 * un fundido suave hacia arriba en su turno. El espacio está reservado
 * desde el primer render (opacity 0), así que no hay saltos de layout.
 * `label`, `variant` y `skeletonStyle` se conservan por compatibilidad.
 * Fuera de la intro no añade ningún efecto.
 */
const BuildReveal: React.FC<BuildRevealProps> = ({
  order,
  children,
  variant = "text",

  as: Tag = "div",
  inline = false,
  className = "",
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
    </Tag>
  );
};

export default BuildReveal;
