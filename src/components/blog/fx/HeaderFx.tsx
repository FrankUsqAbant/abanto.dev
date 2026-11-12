import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, m } from "framer-motion";

const reduced = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Número que cuenta hasta su valor (ease-out, ~0.9 s). */
export const CountUp: React.FC<{ value: number | null }> = ({ value }) => {
  const [n, setN] = useState(value ?? 0);
  const from = useRef(0);
  useEffect(() => {
    if (value === null) return;
    if (reduced()) {
      setN(value);
      return;
    }
    const start = performance.now();
    const a = from.current;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / 900);
      const v = Math.round(a + (value - a) * (1 - Math.pow(1 - p, 3)));
      setN(v);
      from.current = v;
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value]);
  return <b>{value === null ? "…" : n}</b>;
};

const HINTS = [
  "Pasa el cursor: cada pieza reacciona",
  "Ctrl K para buscar sin soltar el teclado",
  "Toca una categoría para filtrar la tabla",
  "Enter abre el primer resultado de la búsqueda",
  "Cada ficha trae un ejemplo y errores comunes",
];

/** Línea de pista que rota cada pocos segundos. */
export const HintRotator: React.FC = () => {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = window.setInterval(() => !document.hidden && setI((v) => (v + 1) % HINTS.length), 4600);
    return () => window.clearInterval(id);
  }, []);
  return (
    <p className="pt-hint" aria-hidden="true">
      <i />
      <AnimatePresence mode="wait" initial={false}>
        <m.span
          key={i}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: [0.2, 0.7, 0.1, 1] }}
        >
          {HINTS[i]}
        </m.span>
      </AnimatePresence>
    </p>
  );
};

/** Capa ambiental: manchas de color lentas (tinte de la tabla) + retícula de puntos con parallax. */
export const Ambient: React.FC<{ colors: string[]; tint: string }> = ({ colors, tint }) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || reduced() || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    let raf = 0;
    let x = 0;
    let y = 0;
    const onMove = (e: PointerEvent) => {
      x = e.clientX / window.innerWidth - 0.5;
      y = e.clientY / window.innerHeight - 0.5;
      if (!raf)
        raf = requestAnimationFrame(() => {
          raf = 0;
          el.style.setProperty("--px", x.toFixed(3));
          el.style.setProperty("--py", y.toFixed(3));
        });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);
  const [a = "#C9A27E", b = "#8FA4BA", c = "#9DB39A"] = colors;
  return (
    <div ref={ref} className="ptp__amb" aria-hidden="true">
      <div key={tint} className="ptp__blobs" style={{ "--b1": a, "--b2": b, "--b3": c } as React.CSSProperties}>
        <i />
        <i />
        <i />
      </div>
      <div className="ptp__dots" />
    </div>
  );
};
