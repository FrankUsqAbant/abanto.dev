import { useEffect } from "react";

/**
 * Marca con `data-off` las secciones que están fuera de pantalla para que el CSS
 * pause sus animaciones infinitas (pulsos, marquesina, cursores…). Así no se
 * recalculan estilos ni se repinta nada que nadie ve.
 */
export const usePauseOffscreen = (selector: string) => {
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const els = Array.from(document.querySelectorAll<HTMLElement>(selector));
    if (els.length === 0) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) delete (e.target as HTMLElement).dataset.off;
          else (e.target as HTMLElement).dataset.off = "";
        }
      },
      { rootMargin: "100px 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => {
      io.disconnect();
      els.forEach((el) => delete el.dataset.off);
    };
  }, [selector]);
};
