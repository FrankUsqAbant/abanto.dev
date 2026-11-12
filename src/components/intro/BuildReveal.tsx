import React from "react";

export type RevealVariant = "up" | "card";

type RevealTag = "div" | "span" | "li" | "p";

interface BuildRevealProps {
  /** Retraso (ms) desde que se levanta la cortina. */
  delay: number;
  children: React.ReactNode;
  /** up: fundido hacia arriba · card: llega desde la profundidad. */
  variant?: RevealVariant;
  as?: RevealTag;
  inline?: boolean;
  className?: string;
}

/**
 * Pieza del hero que entra en la toma de la intro. Siempre está montada en
 * su sitio (sin saltos de layout); el CSS de intro.css la tiene pausada en
 * su primer fotograma durante "loading" y la anima en "reveal".
 * Fuera de la intro no añade ningún efecto.
 */
const BuildReveal: React.FC<BuildRevealProps> = ({
  delay,
  children,
  variant = "up",
  as: Tag = "div",
  inline = false,
  className = "",
}) => {
  const classes = ["build", inline ? "build--inline" : "", className]
    .filter(Boolean)
    .join(" ");
  return (
    <Tag className={classes} style={{ "--ix-delay": `${delay}ms` } as React.CSSProperties}>
      <span className={`build__content ix-${variant}`}>{children}</span>
    </Tag>
  );
};

export default BuildReveal;
