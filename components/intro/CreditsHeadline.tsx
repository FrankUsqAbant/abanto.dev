import React from "react";

interface HeadlineLine {
  text: string;
  className?: string;
}

interface CreditsHeadlineProps {
  id?: string;
  className?: string;
  lineClassName?: string;
  lines: HeadlineLine[];
  /** Retraso (ms) de la primera línea y separación entre líneas. */
  delay?: number;
  stagger?: number;
}

/**
 * Titular que entra como créditos de cine: cada línea sube desde su propia
 * máscara. El texto real está siempre en el DOM (y en el aria-label).
 */
const CreditsHeadline: React.FC<CreditsHeadlineProps> = ({
  id,
  className,
  lineClassName = "",
  lines,
  delay = 0,
  stagger = 120,
}) => (
  <h1 id={id} className={className} aria-label={lines.map((l) => l.text).join(" ")}>
    {lines.map((line, i) => (
      <React.Fragment key={i}>
        {i > 0 ? " " : null}
        <span className={`ix-mask ${lineClassName} ${line.className ?? ""}`} aria-hidden="true">
          <span
            className="ix-rise"
            style={{ "--ix-delay": `${delay + i * stagger}ms` } as React.CSSProperties}
          >
            {line.text}
          </span>
        </span>
      </React.Fragment>
    ))}
  </h1>
);

export default CreditsHeadline;
