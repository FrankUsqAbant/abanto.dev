import React, { useId, useState } from "react";
import Reveal from "./Reveal";
import { CONTACT_ID, scrollToSection } from "./homeLinks";

const FAQS: { q: string; a: string }[] = [
  {
    q: "¿Con qué tipo de negocios trabajas?",
    a: "Con pequeños negocios, emprendedores, empresas medianas y profesionales independientes que quieren ordenar su operación y ganar tiempo.",
  },
  {
    q: "¿Cuánto cuesta un proyecto?",
    a: "Depende del alcance. Tras la llamada de diagnóstico recibes un precio cerrado.",
  },
  {
    q: "¿Puedes trabajar con las herramientas que ya uso?",
    a: "Sí. Conecto lo que ya tienes (ERP, CRM, hojas de cálculo, WhatsApp) sin obligarte a cambiar todo.",
  },
  {
    q: "¿Necesito saber de tecnología para trabajar contigo?",
    a: "No. Yo me encargo de la parte técnica y te explico cada decisión en lenguaje simple.",
  },
  {
    q: "¿Cuánto tarda un proyecto?",
    a: "Depende del alcance. Una web sencilla o una automatización suele estar lista en 1 a 3 semanas; los sistemas más grandes se cotizan con plazos claros tras la llamada.",
  },
  {
    q: "¿Qué pasa después de la entrega?",
    a: "Te acompaño con soporte y ajustes tras la entrega, te dejo el sistema documentado y, si lo necesitas, seguimos con un mantenimiento opcional.",
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
