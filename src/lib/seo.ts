/** Metadatos por página (SPA): título, descripción, canónica y Open Graph. */
export const SITE_URL = "https://abanto.pages.dev";
export const SITE_NAME = "Frank Abanto";
export const DEFAULT_TITLE = "Frank Abanto — Software e IA hechos a tu medida";
export const DEFAULT_DESCRIPTION =
  "Páginas web, automatizaciones, agentes de IA e integraciones para pequeños negocios, emprendedores y profesionales. Agenda una llamada de 30 minutos sin compromiso.";

const setMeta = (attr: "name" | "property", key: string, content: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = content;
};

export interface PageMeta {
  /** Título sin el sufijo del sitio; vacío = título por defecto. */
  title?: string;
  description?: string;
  path: string;
  noindex?: boolean;
}

export const setPageMeta = ({ title, description = DEFAULT_DESCRIPTION, path, noindex = false }: PageMeta) => {
  const full = title ? `${title} · ${SITE_NAME}` : DEFAULT_TITLE;
  const url = `${SITE_URL}${path === "/" ? "/" : path.replace(/\/$/, "")}`;
  document.title = full;
  setMeta("name", "description", description);
  setMeta("property", "og:title", full);
  setMeta("property", "og:description", description);
  setMeta("property", "og:url", url);
  setMeta("name", "twitter:title", full);
  setMeta("name", "twitter:description", description);
  setMeta("name", "robots", noindex ? "noindex, follow" : "index, follow");
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) {
    link = document.createElement("link");
    link.rel = "canonical";
    document.head.appendChild(link);
  }
  link.href = url;
};
