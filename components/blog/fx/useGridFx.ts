import { useEffect, type RefObject } from "react";

/**
 * Efectos de la cuadrícula sin re-renders de React (solo variables CSS en el DOM):
 *  - inclinación 3D + foco de luz que sigue al cursor en la pieza bajo el puntero;
 *  - proximidad: las vecinas reaccionan con una caída suave (--near 0..1);
 *  - vida ambiental: con el usuario inactivo, una pieza al azar brilla cada pocos segundos.
 * Desactivado con prefers-reduced-motion; la inclinación solo con puntero fino (no táctil).
 */
interface Opts {
  /** Permite el brillo ambiental (p. ej. sin ficha abierta ni filtros). */
  idle: boolean;
  /** Cambia cuando cambian las piezas (tabla nueva) para volver a medir. */
  dep: unknown;
}

interface TileBox {
  el: HTMLElement;
  x: number;
  y: number;
  w: number;
  h: number;
  near: number;
}

const RADIUS = 210;
const TILT_X = 9;
const TILT_Y = 11;

export function useGridFx(root: RefObject<HTMLElement | null>, { idle, dep }: Opts) {
  // Inclinación, foco y proximidad.
  useEffect(() => {
    const host = root.current;
    if (!host) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (reduce.matches || !fine.matches) return;

    let tiles: TileBox[] | null = null;
    let hov: TileBox | null = null;
    let raf = 0;
    let px = 0;
    let py = 0;

    const measure = () => {
      tiles = Array.from(host.querySelectorAll<HTMLElement>(".tile")).map((el) => {
        const r = el.getBoundingClientRect();
        return { el, x: r.left + r.width / 2 + window.scrollX, y: r.top + r.height / 2 + window.scrollY, w: r.width, h: r.height, near: 0 };
      });
    };
    const invalidate = () => {
      tiles = null;
    };
    const clearHov = () => {
      if (!hov) return;
      const s = hov.el.style;
      s.setProperty("--rx", "0deg");
      s.setProperty("--ry", "0deg");
      hov.el.classList.remove("is-hov");
      hov = null;
    };

    const frame = () => {
      raf = 0;
      if (!tiles) measure();
      let inside: TileBox | null = null;
      for (const t of tiles ?? []) {
        const dx = px - t.x;
        const dy = py - t.y;
        const isIn = Math.abs(dx) < t.w / 2 && Math.abs(dy) < t.h / 2;
        const near = isIn ? 0 : Math.max(0, 1 - Math.hypot(dx, dy) / RADIUS);
        const q = Math.round(near * 40) / 40;
        if (q !== t.near) {
          t.near = q;
          t.el.style.setProperty("--near", String(q));
        }
        if (isIn) {
          inside = t;
          const s = t.el.style;
          s.setProperty("--mx", `${((dx / t.w + 0.5) * 100).toFixed(1)}%`);
          s.setProperty("--my", `${((dy / t.h + 0.5) * 100).toFixed(1)}%`);
          s.setProperty("--rx", `${((-dy / t.h) * TILT_X).toFixed(2)}deg`);
          s.setProperty("--ry", `${((dx / t.w) * TILT_Y).toFixed(2)}deg`);
        }
      }
      if (inside !== hov) {
        clearHov();
        if (inside) {
          hov = inside;
          inside.el.classList.add("is-hov");
        }
      }
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      px = e.pageX;
      py = e.pageY;
      if (!raf) raf = requestAnimationFrame(frame);
    };
    const onLeave = () => {
      cancelAnimationFrame(raf);
      raf = 0;
      clearHov();
      for (const t of tiles ?? []) {
        if (t.near) {
          t.near = 0;
          t.el.style.setProperty("--near", "0");
        }
      }
    };

    host.addEventListener("pointerenter", invalidate);
    host.addEventListener("pointermove", onMove, { passive: true });
    host.addEventListener("pointerleave", onLeave);
    window.addEventListener("resize", invalidate);
    return () => {
      onLeave();
      host.removeEventListener("pointerenter", invalidate);
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", invalidate);
    };
  }, [root, dep]);

  // Vida ambiental: una pieza destacada cada pocos segundos con el usuario inactivo.
  useEffect(() => {
    const host = root.current;
    if (!host || !idle || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let last = performance.now();
    const poke = () => {
      last = performance.now();
    };
    const timers: number[] = [];
    const id = window.setInterval(() => {
      if (document.hidden || performance.now() - last < 4000) return;
      const pool = Array.from(host.querySelectorAll<HTMLElement>(".tile:not(.is-dim):not(.is-hov):not(.is-feat)"));
      const el = pool[Math.floor(Math.random() * pool.length)];
      if (!el) return;
      el.classList.add("is-feat");
      timers.push(window.setTimeout(() => el.classList.remove("is-feat"), 2000));
    }, 3200);
    window.addEventListener("pointermove", poke, { passive: true });
    window.addEventListener("keydown", poke);
    window.addEventListener("scroll", poke, { passive: true });
    return () => {
      window.clearInterval(id);
      timers.forEach((t) => window.clearTimeout(t));
      host.querySelectorAll(".is-feat").forEach((n) => n.classList.remove("is-feat"));
      window.removeEventListener("pointermove", poke);
      window.removeEventListener("keydown", poke);
      window.removeEventListener("scroll", poke);
    };
  }, [root, idle, dep]);
}
