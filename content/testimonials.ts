export interface Testimonial {
  id: string;
  name: string;
  role: string;
  image: string;
  text: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "Dr. Elara Vance",
    role: "Lead Backend Engineer @ Quantum Labs",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150",
    text: "Frank ha simplificado la complejidad del desarrollo backend como nadie. Sus tutoriales son directos y sus soluciones, elegantes. ¡Un mentor excepcional!",
  },
  {
    id: "2",
    name: "Leo Chen",
    role: "Founder & CEO @ PixelForge",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150",
    text: "Gracias a la metodología de Frank, pude lanzar mi primer proyecto full-stack en tiempo récord. Su enfoque es innovador y práctico. ¡Recomendadísimo!",
  },
  {
    id: "3",
    name: "Sofia Rodriguez",
    role: "Frontend Architect @ Innovatech",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150",
    text: "La claridad con la que Frank explica conceptos avanzados es insuperable. Sus artículos de 'Tech Reads' son siempre mi primera parada para mantenerme actualizado.",
  },
  {
    id: "4",
    name: "Marcus Thorne",
    role: "Product Manager @ OmniVerse Dev",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150",
    text: "Trabajar con Frank ha sido un placer. Su código es limpio, su visión es clara y su compromiso con la calidad es palpable. ¡Un verdadero profesional!",
  },
  {
    id: "5",
    name: "Isabella Rossi",
    role: "Junior Developer @ CodeAlchemy",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150&h=150",
    text: "Si buscas ir más allá del copy-paste, los cursos de Frank son el camino. Me ayudaron a entender el 'porqué' detrás del código y a pensar como un ingeniero.",
  },
];
