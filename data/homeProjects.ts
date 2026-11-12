/**
 * Proyectos del inicio. Datos verificados en GitHub (api.github.com,
 * usuario FrankUsqAbant) el 12/11/2026: nombre, descripción del README,
 * lenguajes y enlaces. Sin métricas inventadas.
 */

export interface HomeProject {
  id: string;
  name: string;
  description: string;
  /** Línea de resultado: describe lo que hace, sin cifras inventadas. */
  outcome: string;
  tags: string[];
  repoUrl: string;
  liveUrl: string;
  image: string;
  imageAlt: string;
  featured: boolean;
}

const GH = "https://github.com/FrankUsqAbant";

export const HOME_PROJECTS: HomeProject[] = [
  {
    id: "clavez-originals",
    name: "Clavez Originals",
    description:
      "Tienda web de calzado deportivo y urbano en Cajamarca: vitrina interactiva, catálogo administrable con Supabase y pedidos por WhatsApp.",
    outcome: "Catálogo que el negocio administra solo.",
    tags: ["React", "TypeScript", "Supabase"],
    repoUrl: `${GH}/chavez-originals`,
    liveUrl: "https://chavez-originals.pages.dev",
    image: "/images/projects/clavez-originals.webp",
    imageAlt: "Portada de Clavez Originals: zapatilla de fútbol roja sobre un podio",
    featured: true,
  },
  {
    id: "hostal-aguilar",
    name: "Hostal Aguilar",
    description:
      "Web para un hospedaje con recepción 24 horas en Cajamarca: habitaciones, reservas por WhatsApp y panel administrable con Supabase.",
    outcome: "Reservas por WhatsApp y panel propio.",
    tags: ["React", "TypeScript", "Supabase"],
    repoUrl: `${GH}/hostal-aguilar`,
    liveUrl: "https://hostal-aguilar.pages.dev",
    image: "/images/projects/hostal-aguilar.webp",
    imageAlt: "Portada de Hostal Aguilar: habitación con luz cálida en una ventana en arco",
    featured: true,
  },
  {
    id: "jireh-pasteleria",
    name: "JIRÉH Pastelería",
    description:
      "Catálogo de tortas a medida con «Arma tu torta» en vivo y pedidos por WhatsApp.",
    outcome: "El cliente arma su torta y la pide en un mensaje.",
    tags: ["React", "Supabase", "Tailwind"],
    repoUrl: `${GH}/jireh-pasteleria`,
    liveUrl: "https://jireh-pasteleria.pages.dev",
    image: "/images/projects/jireh-pasteleria.webp",
    imageAlt: "Portada de JIRÉH: torta con fresas sobre fondo chocolate",
    featured: false,
  },
  {
    id: "nexus-studio-pro",
    name: "NEXUS Studio Pro",
    description:
      "Estudio para convertir texto e imágenes en arte ASCII y exportarlo en PNG, SVG, ANSI o Markdown.",
    outcome: "Arte ASCII listo para tu terminal o README.",
    tags: ["React", "TypeScript", "Vite"],
    repoUrl: `${GH}/NEXUS-ASCII-Generator`,
    liveUrl: "https://frankusqabant.github.io/NEXUS-ASCII-Generator/",
    image: "/images/projects/nexus-studio-pro.webp",
    imageAlt: "Captura de NEXUS Studio Pro generando texto ASCII",
    featured: false,
  },
  {
    id: "hogwarts-legacy-astro",
    name: "Hogwarts Legacy · Fan site",
    description:
      "Landing inmersiva inspirada en Hogwarts Legacy, con arquitectura de islas, modo claro y oscuro y carga diferida.",
    outcome: "Una experiencia cinematográfica que carga rápido.",
    tags: ["Astro", "React", "CSS"],
    repoUrl: `${GH}/astro-sitio-web`,
    liveUrl: "https://frankusqabant.github.io/astro-sitio-web/",
    image: "/images/projects/hogwarts-legacy-astro.webp",
    imageAlt: "Captura del fan site de Hogwarts Legacy hecho con Astro",
    featured: false,
  },
  {
    id: "pokedex-next-gen",
    name: "Pokédex Next-Gen",
    description:
      "Consulta la PokéAPI para explorar los 151 Pokémon de Kanto, con portada cinematográfica y temas claro y oscuro.",
    outcome: "Datos de una API pública, fáciles de explorar.",
    tags: ["JavaScript", "PokéAPI", "CSS"],
    repoUrl: `${GH}/PokeAPI`,
    liveUrl: "https://frankusqabant.github.io/PokeAPI/",
    image: "/images/projects/pokedex-next-gen.webp",
    imageAlt: "Captura de Pokédex Next-Gen con tarjetas de Pokémon",
    featured: false,
  },
];
