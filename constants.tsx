
import { BlogPost, Course, Project } from './types';

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'react-2026',
    slug: 'react-en-la-era-de-los-agentes',
    title: 'React en la era de los Agentes',
    description: 'Cómo la IA está cambiando la forma en que escribimos componentes.',
    date: 'Mar 15, 2026',
    readTime: '10 min',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=800',
    tags: ['React', 'IA'],
    content: 'Contenido detallado aquí...'
  }
];

export const BLOG_CATEGORIES = ['React', 'TypeScript', 'IA', 'Node.js', 'Arquitectura'];

export const COURSES: Course[] = [
  {
    id: 'frontend-pro',
    title: 'Arquitectura Frontend Pro',
    description: 'Domina el stack moderno.',
    level: 1,
    unlocked: true,
    tags: ['React', 'NextJS'],
    icon: 'fa-layer-group'
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'astro-main',
    title: 'Astro Sitio Web',
    description: 'Mi sitio web personal construido con Astro, optimizado para rendimiento y SEO.',
    tech: ['Astro', 'TailwindCSS', 'JavaScript'],
    githubUrl: 'https://github.com/FrankUsqAbant/astro-sitio-web',
    image: 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?auto=format&fit=crop&q=80&w=800',
    liveUrl: 'https://frankusqabant.github.io/astro-sitio-web/'
  },
  {
    id: '1',
    title: 'Nexus Intelligence',
    description: 'Motor de búsqueda semántica con integración profunda de IA.',
    tech: ['TypeScript', 'Gemini', 'Node.js'],
    githubUrl: 'https://github.com/FrankUsqAbant',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800',
    liveUrl: 'https://nexus-ai-demo.vercel.app'
  }
];

export const TECH_STACK = [
  { name: 'React', icon: 'fa-react', color: 'text-sky-400' },
  { name: 'TypeScript', icon: 'fa-code', color: 'text-blue-600' },
  { name: 'Node.js', icon: 'fa-node-js', color: 'text-green-500' }
];
