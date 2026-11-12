
import { BlogPost, Course, Project } from '../types';

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    slug: 'react-server-components-guia',
    title: 'Domina los React Server Components',
    description: 'Aprende por qué son el futuro del rendimiento web y cómo implementarlos hoy.',
    content: `Los React Server Components (RSC) representan uno de los mayores cambios en la arquitectura de React en la última década.`,
    date: '2025-10-24',
    readTime: '12 min',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=800',
    tags: ['React', 'Next.js', 'Performance']
  },
  {
    id: 'post-2',
    slug: 'backend-architecture-2026',
    title: 'Arquitecturas Backend en 2026',
    description: 'De microservicios a macrosistemas: tendencias que definirán la ingeniería.',
    content: 'La ingeniería de software está volviendo a ciclos de consolidación...',
    date: '2026-01-15',
    readTime: '8 min',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc51?auto=format&fit=crop&q=80&w=800',
    tags: ['Architecture', 'Backend', 'Node.js']
  }
];

export const COURSES: Course[] = [
  {
    id: 'curso-node',
    title: 'Node.js Moderno: De Cero a Pro',
    description: 'Aprende a construir sistemas escalables con Node.js, Express y PostgreSQL.',
    thumbnail: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&q=80&w=800',
    badge: 'Curso Gratis',
    level: 1,
    tags: ['Backend', 'Node.js'],
    lessons: [
      { id: 'l1', title: 'Introducción a Node.js', youtubeId: 'dQw4w9WgXcQ', duration: '15:20' }
    ]
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'astro-main',
    title: 'Astro Sitio Web',
    description: 'Sitio personal optimizado con Astro.js.',
    tech: ['Astro', 'TailwindCSS'],
    githubUrl: 'https://github.com/FrankUsqAbant/astro-sitio-web',
    image: 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?auto=format&fit=crop&q=80&w=800',
    liveUrl: 'https://frankusqabant.github.io/astro-sitio-web/'
  }
];

export const BLOG_CATEGORIES = ['React', 'Node.js', 'Arquitectura', 'IA', 'Herramientas'];
