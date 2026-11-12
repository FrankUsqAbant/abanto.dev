import React, { useCallback, useEffect, useRef, useState } from "react";
import { useInView, usePrefersReducedMotion } from "../useInView";

/**
 * Piezas comunes de las demos de Servicios: "en vivo" solo en pantalla y sin
 * reduced-motion; temporizadores que se limpian al pausar o desmontar.
 */
export const useLive = <T extends Element>(ref: React.RefObject<T | null>) => {
  const inView = useInView(ref, { threshold: 0.3, rootMargin: "0px" });
  const reduce = usePrefersReducedMotion();
  return { live: inView && !reduce, reduce };
};

/** setTimeout con limpieza automática. */
export const useTimers = () => {
  const ids = useRef<number[]>([]);
  const clear = useCallback(() => {
    ids.current.forEach((t) => window.clearTimeout(t));
    ids.current = [];
  }, []);
  const set = useCallback((fn: () => void, ms: number) => {
    ids.current.push(window.setTimeout(fn, ms));
  }, []);
  useEffect(() => clear, [clear]);
  return { set, clear };
};

/** Ejecuta `fn` cada `every` ms mientras `on` (p. ej. en vivo y sin interacción del usuario). */
export const useAuto = (on: boolean, every: number, fn: () => void, startAfter = 900) => {
  const ref = useRef(fn);
  ref.current = fn;
  useEffect(() => {
    if (!on) return;
    let id = 0;
    const t = window.setTimeout(() => {
      ref.current();
      id = window.setInterval(() => !document.hidden && ref.current(), every);
    }, startAfter);
    return () => {
      window.clearTimeout(t);
      window.clearInterval(id);
    };
  }, [on, every, startAfter]);
};

/** Número que se anima hasta su valor (rAF, ~700 ms). */
export const useTween = (value: number, animate: boolean) => {
  const [n, setN] = useState(value);
  const from = useRef(value);
  useEffect(() => {
    if (!animate) {
      from.current = value;
      setN(value);
      return;
    }
    const a = from.current;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / 700);
      const v = a + (value - a) * (1 - Math.pow(1 - p, 3));
      from.current = v;
      setN(v);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, animate]);
  return n;
};

interface ShellProps {
  label: string;
  title: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}

/** Tarjeta de vidrio con la etiqueta "Demo interactiva". */
export const Shell = React.forwardRef<HTMLElement, ShellProps>(({ label, title, className = "", children }, ref) => (
  <figure ref={ref} className={`dm ${className}`} aria-label={`Demo interactiva: ${label}`}>
    <figcaption className="dm__top">
      <span className="dm__tag"><i aria-hidden="true" />Demo interactiva</span>
      <span className="dm__title">{title}</span>
    </figcaption>
    {children}
  </figure>
));
Shell.displayName = "Shell";
