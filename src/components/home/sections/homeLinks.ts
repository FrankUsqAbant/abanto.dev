/** Datos de contacto y enlaces compartidos por las secciones del inicio. */

export const CONTACT_ID = "contacto";
export const CONTACT_EMAIL = "usquizafranquer@gmail.com";

export interface SocialLink {
  name: string;
  handle: string;
  href: string;
}

export const SOCIALS: SocialLink[] = [
  { name: "YouTube", handle: "@abantofrank12", href: "https://www.youtube.com/@abantofrank12" },
  { name: "GitHub", handle: "FrankUsqAbant", href: "https://github.com/FrankUsqAbant" },
  { name: "LinkedIn", handle: "in/frankabanto", href: "https://www.linkedin.com/in/frankabanto" },
  { name: "Instagram", handle: "@abantofrank12", href: "https://www.instagram.com/abantofrank12" },
  { name: "X", handle: "@FrankUsqAbanto", href: "https://x.com/FrankUsqAbanto" },
];

/** Desplaza suavemente a una sección (o al instante con movimiento reducido). */
export const scrollToSection = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  history.replaceState(null, "", `#${id}`);
};

/** Secciones del inicio enlazadas desde la navegación (ids reales del DOM). */
export interface HomeSectionLink {
  id: string;
  label: string;
}

export const HOME_SECTIONS: HomeSectionLink[] = [
  { id: "servicios", label: "Servicios" },
  { id: "proyectos", label: "Proyectos" },
];
/* Proceso (#proceso) y Preguntas (#faq) se enlazan desde el pie. */

/** ¿Algún ancestro sigue con transform (p. ej. la transición de página)? */
const isTransformed = (el: HTMLElement) => {
  for (let n: HTMLElement | null = el; n && n !== document.body; n = n.parentElement) {
    const tr = getComputedStyle(n).transform;
    if (tr !== "none" && tr !== "matrix(1, 0, 0, 1, 0, 0)") return true;
  }
  return false;
};

/**
 * Espera a que la sección exista (p. ej. tras navegar desde otra página y
 * terminar la transición) y luego desplaza hasta ella. Al terminar el scroll
 * corrige una vez si el layout se movió (imágenes que cargan). Se rinde a los ~4 s.
 */
export const scrollToSectionWhenReady = (id: string, timeoutMs = 4000) => {
  const start = performance.now();
  let lastTop = Number.NaN;
  let stableFrames = 0;

  const correctAfterScroll = () => {
    let userMoved = false;
    const onUser = () => {
      userMoved = true;
    };
    const opts: AddEventListenerOptions = { once: true, passive: true };
    window.addEventListener("wheel", onUser, opts);
    window.addEventListener("touchstart", onUser, opts);
    window.addEventListener("keydown", onUser, opts);
    const fix = () => {
      window.removeEventListener("scrollend", fix);
      window.clearTimeout(fallback);
      const el = document.getElementById(id);
      if (!el || userMoved) return;
      const margin = parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
      const off = el.getBoundingClientRect().top - margin;
      if (Math.abs(off) > 2) window.scrollBy({ top: off, behavior: "auto" });
    };
    window.addEventListener("scrollend", fix);
    const fallback = window.setTimeout(fix, 1600);
  };

  const tick = () => {
    const el = document.getElementById(id);
    // Espera a que el nodo exista, sin transform en sus ancestros y con su
    // posición estable unos frames.
    const top =
      el && !isTransformed(el)
        ? Math.round(el.getBoundingClientRect().top + window.scrollY)
        : Number.NaN;
    stableFrames = top === lastTop ? stableFrames + 1 : 0;
    lastTop = top;
    if (stableFrames >= 3) {
      scrollToSection(id);
      correctAfterScroll();
      return;
    }
    if (performance.now() - start < timeoutMs) requestAnimationFrame(tick);
    else if (el) scrollToSection(id);
  };
  requestAnimationFrame(tick);
};
