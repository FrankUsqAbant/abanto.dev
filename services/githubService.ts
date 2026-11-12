import { GithubRepo } from "../types";

const GITHUB_USERNAME = "FrankUsqAbant";

export interface GithubProfile {
  name: string;
  bio: string;
  avatar_url: string;
  location: string;
  html_url: string;
  twitter_username?: string;
  public_repos: number;
  followers: number;
  created_at: string;
  company?: string;
  blog?: string;
}

export const STATIC_REPOS: GithubRepo[] = [
  {
    id: "101",
    name: "astro-sitio-web",
    description:
      "Sitio web optimizado y rápido construido con Astro y TailwindCSS, inspirado en el diseño de Hogwarts Legacy.",
    stars: 15,
    forks: 4,
    language: "Astro",
    url: `https://github.com/${GITHUB_USERNAME}/astro-sitio-web`,
    homepage: "https://frankusqabant.github.io/astro-sitio-web/",
    tech: ["Astro", "TailwindCSS", "React"],
    bannerImage: "/projects/astro-hogwarts.png",
  },
  {
    id: "102",
    name: "NEXUS-ASCII-Generator",
    description:
      "Herramienta CLI para transformar texto e imágenes en arte ASCII. Ideal para documentación técnica.",
    stars: 23,
    forks: 8,
    language: "TypeScript",
    url: `https://github.com/${GITHUB_USERNAME}/NEXUS-ASCII-Generator`,
    homepage: "https://frankusqabant.github.io/NEXUS-ASCII-Generator/",
    tech: ["TypeScript", "Node.js", "CLI"],
    bannerImage: "/projects/nexus-ascii.png",
  },
  {
    id: "103",
    name: "PredictorDePartidos",
    description:
      "FrankBet - Analista inteligente de apuestas deportivas y cálculo de probabilidades de partidos.",
    stars: 45,
    forks: 12,
    language: "Python",
    url: `https://github.com/${GITHUB_USERNAME}/PredictorDePartidos`,
    homepage: "https://frankusqabant.github.io/PredictorDePartidos/",
    tech: ["Python", "AI", "Data Sci"],
    bannerImage: "/projects/match-predictor.png",
  },
  {
    id: "104",
    name: "Developer-Theme-Portfolio",
    description:
      "Portafolio personal con tema oscuro y diseño minimalista para desarrolladores web.",
    stars: 30,
    forks: 5,
    language: "React",
    url: `https://github.com/${GITHUB_USERNAME}/Developer-Theme-Portfolio`,
    homepage: "https://frankusqabant.github.io/Developer-Theme-Portfolio/",
    tech: ["React", "CSS", "Vite"],
    bannerImage: "/projects/developer-theme.png",
  },
  {
    id: "105",
    name: "proyecto-curso-html",
    description:
      "Proyecto fundamental aplicando semántica HTML5 y estructuras web modernas.",
    stars: 10,
    forks: 2,
    language: "HTML",
    url: `https://github.com/${GITHUB_USERNAME}/proyecto-curso-html`,
    homepage: "https://frankusqabant.github.io/proyecto-curso-html/",
    tech: ["HTML5", "CSS3"],
    bannerImage: "/projects/glottis-project.png",
  },
  {
    id: "106",
    name: "tiktok-clone",
    description:
      "Clon funcional de la interfaz de TikTok desarrollado para fines educativos y práctica de UI/UX.",
    stars: 18,
    forks: 5,
    language: "TypeScript",
    url: `https://github.com/${GITHUB_USERNAME}/tiktok-clone`,
    homepage: `https://${GITHUB_USERNAME}.github.io/tiktok-clone/`,
    tech: ["React", "TypeScript", "Vite"],
    bannerImage: `https://opengraph.githubassets.com/1/${GITHUB_USERNAME}/tiktok-clone`,
  },
  {
    id: "107",
    name: "PokeAPI",
    description:
      "Interfaz de consumo de datos de Pokémon utilizando la PokeAPI para listar y buscar.",
    stars: 12,
    forks: 3,
    language: "JavaScript",
    url: `https://github.com/${GITHUB_USERNAME}/PokeAPI`,
    homepage: `https://${GITHUB_USERNAME}.github.io/PokeAPI/`,
    tech: ["JavaScript", "API", "DOM"],
    bannerImage: "/projects/pokeapi-project.png",
  },
];

export const fetchMyGithubRepos = async (): Promise<GithubRepo[]> => {
  // Simulamos un delay mínimo para suavidad, pero garantizamos éxito
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(STATIC_REPOS);
    }, 300);
  });
};

export const fetchLatestPush = async (): Promise<string> => {
  try {
    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=pushed&per_page=1`
    );
    if (!response.ok) throw new Error("GitHub API Error");

    const data = await response.json();
    if (data && data.length > 0) {
      const date = new Date(data[0].pushed_at);
      return date.toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    }
    return new Date().toLocaleDateString("es-ES");
  } catch (error) {
    console.error("Error fetching github status:", error);
    return new Date().toLocaleDateString("es-ES");
  }
};

export const fetchGithubProfile = async (): Promise<GithubProfile | null> => {
  try {
    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}`
    );
    if (!response.ok) throw new Error("GitHub Profile Error");
    return await response.json();
  } catch (error) {
    console.error("Error fetching github profile:", error);
    return null;
  }
};
