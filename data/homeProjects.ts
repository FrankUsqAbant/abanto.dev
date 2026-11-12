/**
 * Proyectos y laboratorio del inicio. Todo es práctica o uso personal:
 * sin clientes, métricas ni resultados inventados. Solo se enlaza donde
 * existe una URL real.
 */

export type LabCategory = "auto" | "webs" | "apps";
export type LabStatus = "En uso" | "Demo" | "En desarrollo";
export type LabVisual = "telegram" | "server" | "social" | "video" | "dashboard" | "crm" | "life";

export interface LabProject {
  id: string;
  category: LabCategory;
  title: string;
  problem: string;
  solution: string;
  stack: string[];
  status: LabStatus;
  liveUrl?: string;
  image?: string;
  imageAlt?: string;
  visual?: LabVisual;
}

export const LAB_CATEGORIES: { id: LabCategory; label: string }[] = [
  { id: "auto", label: "Automatización e IA" },
  { id: "webs", label: "Webs demo" },
  { id: "apps", label: "Apps" },
];

const DEMO_WEB = "Web de demostración para presentar a negocios.";

/** El orden define qué se ve primero en «Todos». */
export const LAB_PROJECTS: LabProject[] = [
  {
    id: "telegram-n8n",
    category: "auto",
    title: "Bots de Telegram con n8n",
    problem: "Tareas que necesitaba resolver a cualquier hora, sin estar frente a la computadora.",
    solution: "Bots que funcionan 24/7 en un VPS de Oracle Cloud (capa gratuita) con flujos de n8n.",
    stack: ["n8n", "Telegram API", "Oracle Cloud", "Docker"],
    status: "En uso",
    visual: "telegram",
  },
  {
    id: "hermes",
    category: "auto",
    title: "Hermes, agente que administra mi servidor",
    problem: "Vigilar a mano el VPS y sus servicios quita tiempo y se olvida.",
    solution: "Un agente de IA que monitorea y gestiona el servidor y sus servicios, como n8n.",
    stack: ["IA / LLM", "Linux", "Docker"],
    status: "En uso",
    visual: "server",
  },
  {
    id: "redes",
    category: "auto",
    title: "Publicación automática en redes",
    problem: "Publicar lo mismo en cuatro redes, una por una, es lento y repetitivo.",
    solution: "Automatizaciones que publican en Instagram, Facebook, LinkedIn y YouTube.",
    stack: ["n8n", "API de Meta", "API de LinkedIn", "API de YouTube"],
    status: "En uso",
    visual: "social",
  },
  {
    id: "clavez-originals",
    category: "webs",
    title: "Clavez Originals",
    problem: "Una tienda de calzado necesita mostrar su catálogo y recibir pedidos fácil.",
    solution: DEMO_WEB + " Catálogo administrable y pedidos por WhatsApp.",
    stack: ["React", "TypeScript", "Supabase"],
    status: "Demo",
    liveUrl: "https://chavez-originals.pages.dev",
    image: "/images/projects/clavez-originals.webp",
    imageAlt: "Portada de la demo Clavez Originals: zapatilla de fútbol roja sobre un podio",
  },
  {
    id: "crm",
    category: "apps",
    title: "CRM de prospectos",
    problem: "Los prospectos y sus seguimientos se pierden entre chats y notas.",
    solution: "Una app para registrar prospectos y acompañar cada seguimiento.",
    stack: ["App web", "Seguimientos"],
    status: "En uso",
    visual: "crm",
  },
  {
    id: "dashboards",
    category: "auto",
    title: "Dashboards de datos",
    problem: "Los datos en bruto son difíciles de leer y de usar para decidir.",
    solution: "Filtro y transformo la información en dashboards claros.",
    stack: ["Limpieza de datos", "Visualización"],
    status: "Demo",
    visual: "dashboard",
  },
  {
    id: "hostal-aguilar",
    category: "webs",
    title: "Hostal Aguilar",
    problem: "Un hospedaje necesita mostrar sus habitaciones y recibir reservas.",
    solution: DEMO_WEB + " Reservas por WhatsApp y panel propio.",
    stack: ["React", "TypeScript", "Supabase"],
    status: "Demo",
    liveUrl: "https://hostal-aguilar.pages.dev",
    image: "/images/projects/hostal-aguilar.webp",
    imageAlt: "Portada de la demo Hostal Aguilar: habitación con luz cálida en una ventana en arco",
  },
  {
    id: "vida",
    category: "apps",
    title: "App de gestión de tiempo y vida",
    problem: "Organizar el día y medir hábitos en varias apps sueltas no funciona.",
    solution: "Una app personal para gestionar mi tiempo y llevar control de mi vida.",
    stack: ["App personal", "Hábitos", "Tiempo"],
    status: "En uso",
    visual: "life",
  },
  {
    id: "videos",
    category: "auto",
    title: "Videos automáticos para redes",
    problem: "Editar videos cortos a mano para cada publicación toma horas.",
    solution: "Un flujo que genera videos cortos de forma automática.",
    stack: ["Automatización", "Video corto"],
    status: "En desarrollo",
    visual: "video",
  },
  {
    id: "jireh-pasteleria",
    category: "webs",
    title: "JIRÉH Pastelería",
    problem: "Una pastelería necesita mostrar sus tortas y tomar pedidos personalizados.",
    solution: DEMO_WEB + " «Arma tu torta» en vivo y pedidos por WhatsApp.",
    stack: ["React", "Supabase", "Tailwind"],
    status: "Demo",
    liveUrl: "https://jireh-pasteleria.pages.dev",
    image: "/images/projects/jireh-pasteleria.webp",
    imageAlt: "Portada de la demo JIRÉH Pastelería: torta con fresas sobre fondo chocolate",
  },
];
