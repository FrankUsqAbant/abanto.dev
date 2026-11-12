import React, { useEffect } from "react";
import { CAL_URL, loadCalEmbed, openCalPopup } from "../../lib/calEmbed";

type AnchorProps = Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  "href" | "target" | "rel"
>;

interface CalLinkProps extends AnchorProps {
  children: React.ReactNode;
}

/**
 * Enlace "Agendar llamada": abre el popup de Cal.com en la página.
 * Si el embed no cargó, el <a> abre la reserva en una pestaña nueva.
 */
const CalLink: React.FC<CalLinkProps> = ({ children, onClick, onMouseEnter, onFocus, ...rest }) => {
  useEffect(() => {
    // Precarga en segundo plano para que el primer clic sea inmediato.
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
    };
    if (w.requestIdleCallback) w.requestIdleCallback(() => void loadCalEmbed(), { timeout: 3000 });
    else window.setTimeout(() => void loadCalEmbed(), 1500);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented) return;
    // Ctrl/Cmd/Mayús/clic central: respeta la intención de abrir pestaña.
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    if (openCalPopup()) e.preventDefault();
  };

  return (
    <a
      {...rest}
      href={CAL_URL}
      target="_blank"
      rel="noopener"
      onClick={handleClick}
      onMouseEnter={(e) => {
        void loadCalEmbed();
        onMouseEnter?.(e);
      }}
      onFocus={(e) => {
        void loadCalEmbed();
        onFocus?.(e);
      }}
    >
      {children}
    </a>
  );
};

export default CalLink;
