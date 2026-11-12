import React, { useEffect } from "react";
import { CAL_URL, loadCalEmbed, openCalPopup } from "../../lib/calEmbed";
import { hasConsent, useConsent } from "../../lib/consent";

type AnchorProps = Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  "href" | "target" | "rel"
>;

interface CalLinkProps extends AnchorProps {
  children: React.ReactNode;
}

/**
 * Enlace "Agendar llamada": abre el popup de Cal.com en la página solo si se
 * aceptaron las cookies de terceros. Sin consentimiento (o si el embed no
 * cargó), el <a> abre la reserva en cal.com en una pestaña nueva.
 */
const CalLink: React.FC<CalLinkProps> = ({ children, onClick, onMouseEnter, onFocus, ...rest }) => {
  const { consent } = useConsent();
  useEffect(() => {
    if (consent !== "accepted") return;
    // Precarga en segundo plano para que el primer clic sea inmediato.
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
    };
    if (w.requestIdleCallback) w.requestIdleCallback(() => void loadCalEmbed(), { timeout: 3000 });
    else window.setTimeout(() => void loadCalEmbed(), 1500);
  }, [consent]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented) return;
    // Ctrl/Cmd/Mayús/clic central: respeta la intención de abrir pestaña.
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    if (hasConsent() && openCalPopup()) e.preventDefault();
  };

  return (
    <a
      {...rest}
      href={CAL_URL}
      target="_blank"
      rel="noopener"
      onClick={handleClick}
      onMouseEnter={(e) => {
        if (hasConsent()) void loadCalEmbed();
        onMouseEnter?.(e);
      }}
      onFocus={(e) => {
        if (hasConsent()) void loadCalEmbed();
        onFocus?.(e);
      }}
    >
      {children}
    </a>
  );
};

export default CalLink;
