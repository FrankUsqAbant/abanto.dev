/** Datos de contacto y enlaces compartidos por las secciones del inicio. */

export const CONTACT_ID = "contacto";
export const CONTACT_EMAIL = "usquizafranquer@gmail.com";

export interface SocialLink {
  name: string;
  handle: string;
  href: string;
}

export const SOCIALS: SocialLink[] = [
  { name: "YouTube", handle: "@frankabanto", href: "https://www.youtube.com/@frankabanto" },
  { name: "GitHub", handle: "FrankUsqAbant", href: "https://github.com/FrankUsqAbant" },
  { name: "LinkedIn", handle: "in/frankabanto", href: "https://www.linkedin.com/in/frankabanto" },
  { name: "Instagram", handle: "@frankabanto", href: "https://www.instagram.com/frankabanto" },
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
