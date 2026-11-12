import React, { useId, useState } from "react";
import Reveal from "./Reveal";
import { CONTACT_ID, scrollToSection } from "./homeLinks";

const FAQS: { q: string; a: string }[] = [
  {
    q: "¿Con qué tipo de negocios trabajas?",
    a: "Con empresas pequeñas y medianas que ya venden y quieren ordenar su operación: comercio, servicios, educación y salud. Si tu equipo pierde horas en tareas repetitivas, probablemente podamos ayudarte.",
  },
  {
    q: "¿Cuánto cuesta un proyecto?",
    a: "Depende del alcance. Después de la llamada de diagnóstico recibes una propuesta con precio cerrado y entregables claros.",
  },
  {
    q: "¿Puedes trabajar con las herramientas que ya uso?",
    a: "Sí. La idea es conectar lo que ya tienes (ERP, CRM, hojas de cálculo, WhatsApp, correo) en lugar de obligarte a cambiar todo.",
  },
  {
    q: "¿Necesito saber de tecnología para trabajar contigo?",
    a: "No. Yo me encargo de la parte técnica y te explico cada decisión en lenguaje simple.",
  },
  {
    q: "¿Qué pasa después del lanzamiento?",
    a: "Seguimos midiendo y mejorando. Puedes quedarte con soporte mensual o llevarte el sistema con toda la documentación.",
  },
];

/** Acordeón accesible: botones con aria-expanded y regiones asociadas; uno abierto a la vez. */
const FaqSection: React.FC = () => {
  const [open, setOpen] = useState<number | null>(0);
  const uid = useId();

  return (
    <section className="section section--alt" id="faq" aria-labelledby="faq-title">
      <div className="wrap faq">
        <Reveal as="header" className="faq__head">
          <p className="eyebrow">04 — Preguntas</p>
          <h2 className="h2" id="faq-title">
            Lo que suelen <em>preguntarme.</em>
          </h2>
          <p className="sec-head__sub">¿Tienes otra duda? Escríbeme y te respondo personalmente.</p>
          <a
            className="link-arrow"
            href={`#${CONTACT_ID}`}
            onClick={(e) => {
              e.preventDefault();
              scrollToSection(CONTACT_ID);
            }}
          >
            Ir a contacto <i aria-hidden="true">→</i>
          </a>
        </Reveal>
        <Reveal className="acc" delay={100}>
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            const btnId = `${uid}-q${i}`;
            const panelId = `${uid}-a${i}`;
            return (
              <div key={f.q} className={`acc__item${isOpen ? " is-open" : ""}`}>
                <h3 className="acc__h">
                  <button
                    type="button"
                    id={btnId}
                    className="acc__btn"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    <span>{f.q}</span>
                    <i aria-hidden="true" />
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={btnId}
                  className="acc__panel"
                  hidden={!isOpen}
                >
                  <p>{f.a}</p>
                </div>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
};

export default FaqSection;
