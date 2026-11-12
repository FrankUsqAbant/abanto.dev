import React, { useRef } from "react";
import { useInView } from "./useInView";

type RevealTag = "div" | "section" | "article" | "li" | "header" | "p";

interface RevealProps extends React.HTMLAttributes<HTMLElement> {
  as?: RevealTag;
  /** Retraso en ms (para escalonar elementos hermanos). */
  delay?: number;
  children: React.ReactNode;
}

/**
 * Aparece suavemente (fundido + subida) la primera vez que entra en pantalla.
 * Con movimiento reducido, el CSS lo deja visible sin animación.
 */
const Reveal: React.FC<RevealProps> = ({
  as: Tag = "div",
  delay = 0,
  className = "",
  style,
  children,
  ...rest
}) => {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true });
  const vars = { ...style, "--rv-delay": `${delay}ms` } as React.CSSProperties;

  return React.createElement(
    Tag,
    {
      ...rest,
      ref,
      className: `rv${inView ? " is-in" : ""}${className ? ` ${className}` : ""}`,
      style: vars,
    },
    children
  );
};

export default Reveal;
