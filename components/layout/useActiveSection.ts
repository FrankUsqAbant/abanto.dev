import { useEffect, useState } from "react";

/**
 * Devuelve el id de la sección del inicio visible bajo la barra de navegación
 * (o null si se está en el hero / fuera de las secciones).
 * Usa IntersectionObserver; reintenta hasta que las secciones estén montadas.
 */
export const useActiveSection = (ids: string[], enabled: boolean): string | null => {
  const [active, setActive] = useState<string | null>(null);
  const key = ids.join("|");

  useEffect(() => {
    if (!enabled) {
      setActive(null);
      return;
    }
    const list = key.split("|");
    const visible = new Set<string>();
    let observer: IntersectionObserver | null = null;
    let retry: number | undefined;
    let attempts = 0;

    const attach = () => {
      const els = list
        .map((id) => document.getElementById(id))
        .filter((el): el is HTMLElement => el !== null);
      if (els.length < list.length && attempts++ < 30) {
        retry = window.setTimeout(attach, 150);
        return;
      }
      // Franja "activa": desde algo debajo de la barra (96px) hasta el 45% del viewport.
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) visible.add(entry.target.id);
            else visible.delete(entry.target.id);
          }
          setActive(list.find((id) => visible.has(id)) ?? null);
        },
        { rootMargin: "-96px 0px -55% 0px", threshold: 0 },
      );
      els.forEach((el) => observer?.observe(el));
    };
    attach();

    return () => {
      window.clearTimeout(retry);
      observer?.disconnect();
    };
  }, [key, enabled]);

  return active;
};
