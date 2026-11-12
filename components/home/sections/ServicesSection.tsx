import React from "react";
import Reveal from "./Reveal";
import CalLink from "../../shared/CalLink";
import { ServiceIcon, type ServiceIconName } from "../heroIcons";
import { CONTACT_ID, scrollToSection } from "./homeLinks";

/** Tipos de cliente a los que apunta cada servicio. */
type Audience = "pequenos" | "emprendedores" | "medianas" | "independientes";

const AUDIENCES: { id: Audience; label: string; icon: React.ReactNode }[] = [
  { id: "pequenos", label: "Pequeños negocios", icon: <path d="M4 10h16l-1.5-5h-13zM5 10v9h14v-9M10 19v-5h4v5" /> },
  { id: "emprendedores", label: "Emprendedores", icon: <path d="M12 3c3 2 5 6 4 11l-4 3-4-3c-1-5 1-9 4-11zM9 17l-2 4M15 17l2 4M12 9.5h.01" /> },
  { id: "medianas", label: "Empresas medianas", icon: <path d="M4 21V7l8-4v18M12 9h8v12M7 9h2M7 13h2M7 17h2M15 13h2M15 17h2M3 21h18" /> },
  { id: "independientes", label: "Profesionales independientes", icon: <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM5 21c0-4 3-6 7-6s7 2 7 6" /> },
];

const LABEL: Record<Audience, string> = Object.fromEntries(AUDIENCES.map((a) => [a.id, a.label])) as Record<Audience, string>;

interface Service {
  title: string;
  icon: ServiceIconName;
  /** Problema que quita o beneficio, en palabras del cliente. */
  pain: string;
  examples: [string, string];
  ideal: Audience[];
}

const SERVICES: Service[] = [
  {
    title: "Páginas web",
    icon: "globe",
    pain: "Que te encuentren en Google y te escriban, sin depender solo de las redes sociales.",
    examples: ["Web con catálogo y pedidos por WhatsApp", "Landing para una campaña o un lanzamiento"],
    ideal: ["pequenos", "emprendedores", "independientes"],
  },
  {
    title: "Agentes y chatbots de IA",
    icon: "bot",
    pain: "Un asistente que responde y hace tareas por ti, con la información real de tu negocio.",
    examples: ["Chatbot que responde en WhatsApp 24/7", "Asistente interno que consulta tus precios y documentos"],
    ideal: ["pequenos", "medianas"],
  },
  {
    title: "Automatización de procesos",
    icon: "zap",
    pain: "Deja de copiar y pegar datos entre hojas, correos y sistemas cada semana.",
    examples: ["Reporte de ventas automático cada lunes", "Pedido nuevo → factura, aviso y registro sin tocar nada"],
    ideal: ["medianas", "pequenos"],
  },
  {
    title: "Integraciones y APIs",
    icon: "blend",
    pain: "Que tus herramientas se hablen entre sí y la información viva en un solo lugar.",
    examples: ["Formulario web conectado a tu CRM o Google Sheets", "Pagos e inventario sincronizados con tu tienda online"],
    ideal: ["medianas", "emprendedores"],
  },
  {
    title: "Dashboards y datos",
    icon: "chart",
    pain: "Decide con números claros en una pantalla, no con hojas sueltas ni intuición.",
    examples: ["Panel de ventas, gastos y stock al día", "Alerta cuando un indicador se sale de lo normal"],
    ideal: ["medianas", "pequenos"],
  },
  {
    title: "Atención al cliente con IA",
    icon: "chat",
    pain: "Responde rápido a cada cliente, también fuera de horario, sin sumar más personal.",
    examples: ["Respuestas automáticas a preguntas frecuentes en web y WhatsApp", "Agenda de citas y paso a una persona cuando hace falta"],
    ideal: ["independientes", "pequenos"],
  },
];

const AudienceIcon: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">{children}</svg>
);

const ServicesSection: React.FC = () => (
  <section className="section" id="servicios" aria-labelledby="servicios-title">
    <div className="wrap">
      <Reveal as="header" className="sec-head">
        <h2 className="h2" id="servicios-title">
          Lo que puedo <em>construir para ti.</em>
        </h2>
        <p className="sec-head__sub">
          Seis servicios para vender más, responder mejor y dejar de hacer a mano lo que puede
          hacerse solo.
        </p>
      </Reveal>

      <Reveal className="svc-for" delay={60}>
        <span className="svc-for__k">Para quién</span>
        <ul className="svc-for__list">
          {AUDIENCES.map((a) => (
            <li key={a.id}>
              <AudienceIcon>{a.icon}</AudienceIcon>
              {a.label}
            </li>
          ))}
        </ul>
      </Reveal>

      <div className="svc-grid">
        {SERVICES.map((s, i) => (
          <Reveal as="article" className="svc" key={s.title} delay={(i % 3) * 80}>
            <div className="svc__top">
              <span className="svc__ic" aria-hidden="true"><ServiceIcon name={s.icon} /></span>
              <span className="svc__n" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
            </div>
            <h3>{s.title}</h3>
            <p className="svc__pain">{s.pain}</p>
            <p className="svc__k">Por ejemplo</p>
            <ul className="checks">
              {s.examples.map((e) => <li key={e}>{e}</li>)}
            </ul>
            <p className="svc__ideal">
              <span>Ideal para</span> {s.ideal.map((a) => LABEL[a]).join(" · ")}
            </p>
          </Reveal>
        ))}
      </div>

      <Reveal className="svc-trust">
        <div>
          <p className="svc-trust__t">
            Cada servicio está probado en proyectos propios; <em>ahora quiero aplicarlo a tu negocio.</em>
          </p>
          <p className="svc-trust__s">Sin precios fijos: te envío una cotización según lo que necesitas.</p>
        </div>
        <div className="svc-trust__cta">
          <CalLink className="btn btn--dark">
            Cotización sin compromiso <span aria-hidden="true">↗</span>
          </CalLink>
          <a
            className="link-arrow"
            href={`#${CONTACT_ID}`}
            onClick={(e) => {
              e.preventDefault();
              scrollToSection(CONTACT_ID);
            }}
          >
            o escríbeme <i aria-hidden="true">↓</i>
          </a>
        </div>
      </Reveal>
    </div>
  </section>
);

export default ServicesSection;
