import React from "react";
import Reveal from "./Reveal";

interface Step {
  week: string;
  title: string;
  text: string;
  items: string[];
  loop?: boolean;
}

const STEPS: Step[] = [
  { week: "Semana 1", title: "Descubrimiento", text: "Entiendo tu operación, tus herramientas y qué resultado quieres mover.", items: ["Llamada de diagnóstico", "Mapa de procesos", "Métricas de éxito"] },
  { week: "Semana 2", title: "Arquitectura", text: "Diseño el sistema, las integraciones y el plan de entrega.", items: ["Diagrama de arquitectura", "Alcance y prioridades", "Estimación cerrada"] },
  { week: "Semanas 3–5", title: "Desarrollo", text: "Construyo en ciclos cortos con demos semanales que puedes probar.", items: ["Entregas cada semana", "Pruebas con datos reales", "Ajustes en el camino"] },
  { week: "Semana 6", title: "Lanzamiento", text: "Salimos a producción con monitoreo y capacitación a tu equipo.", items: ["Despliegue y alertas", "Documentación", "Capacitación del equipo"] },
  { week: "Continuo", title: "Evolución", text: "Medimos, mejoramos y sumamos nuevas automatizaciones.", items: ["Revisión mensual", "Nuevas funciones", "Soporte prioritario"], loop: true },
];

const ProcessSection: React.FC = () => (
  <section className="section" id="proceso" aria-labelledby="proceso-title">
    <div className="wrap">
      <Reveal as="header" className="sec-head">
        <p className="eyebrow">03 — Cómo trabajamos</p>
        <h2 className="h2" id="proceso-title">
          De la idea al sistema, <em>semana a semana.</em>
        </h2>
        <p className="sec-head__sub">
          Un solo responsable de punta a punta: diseño, construyo y acompaño la operación. Sin
          traspasos ni intermediarios.
        </p>
      </Reveal>
      <Reveal as="div" className="timeline-wrap">
        <ol className="timeline">
          {STEPS.map((s, i) => (
            <li
              key={s.title}
              className={s.loop ? "is-loop" : undefined}
              style={{ "--i": i } as React.CSSProperties}
            >
              <span className="tl-week">{s.week}</span>
              <span className="tl-dot" aria-hidden="true" />
              <span className="tl-n" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="tl-title">{s.title}</h3>
              <p>{s.text}</p>
              <ul>
                {s.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </Reveal>
    </div>
  </section>
);

export default ProcessSection;
