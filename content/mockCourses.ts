export interface Video {
  id: string;
  title: string;
  duration: string;
  youtubeId: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  videos: Video[];
}

export const MOCK_COURSES: Record<string, Course> = {
  "1": {
    // Matches "Mastering React Hooks" ID from Courses.tsx
    id: "1",
    title: "Mastering React Hooks",
    description:
      "Dominando los Hooks de React desde cero hasta patrones avanzados.",
    videos: [
      {
        id: "intro",
        title: "Introducción a Hooks",
        duration: "10:05",
        youtubeId: "TNhaISOUy6Q",
      }, // Fireship React 100s
      {
        id: "usestate",
        title: "useState Deep Dive",
        duration: "15:20",
        youtubeId: "O6P86uwfdR0",
      }, // Web Dev Simplified
      {
        id: "useeffect",
        title: "useEffect Correctamente",
        duration: "20:15",
        youtubeId: "0ZJgIjIuY7U",
      },
      {
        id: "custom-hooks",
        title: "Creando Custom Hooks",
        duration: "12:40",
        youtubeId: "6ThRufp5o8A",
      },
    ],
  },
  "2": {
    id: "2",
    title: "Modern API with Node.js",
    description: "Construye APIs RESTful escalables con Node y Express.",
    videos: [
      {
        id: "setup",
        title: "Configuración del Servidor",
        duration: "08:30",
        youtubeId: "L72fhGm1tfE",
      },
      {
        id: "routes",
        title: "Rutas y Controladores",
        duration: "18:45",
        youtubeId: "Mus_vwhTCq0",
      },
      {
        id: "db",
        title: "Conexión a Base de Datos",
        duration: "25:10",
        youtubeId: "WDrU305J1yw",
      },
    ],
  },
  "3": {
    id: "3",
    title: "Advanced CSS Layouts",
    description: "Domina Grid y Flexbox para layouts complejos.",
    videos: [
      {
        id: "grid-intro",
        title: "CSS Grid Básico",
        duration: "12:00",
        youtubeId: "9zBsdzdE4sM",
      },
      {
        id: "flexbox",
        title: "Flexbox vs Grid",
        duration: "15:00",
        youtubeId: "t6CBKf8K_Ac",
      },
    ],
  },
};
