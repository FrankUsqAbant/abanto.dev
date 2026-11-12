import React from "react";
import Reveal from "./Reveal";
import { CONTACT_ID, scrollToSection } from "./homeLinks";

/** Banda oscura "Agendar llamada" entre Servicios y Proyectos. */
const CallBand: React.FC = () => (
  <section className="band" id="agendar" aria-labelledby="agendar-title">
    <div className="band__glow" aria-hidden="true" />
    <Reveal className="wrap band__inner">
      <p className="eyebrow eyebrow--light">¿No sabes cuál encaja contigo?</p>
      <h2 className="h-band" id="agendar-title">
        Hablemos 30 minutos <br />
        <em>y lo vemos juntos.</em>
      </h2>
      <a
        className="btn btn--light btn--xl"
        href={`#${CONTACT_ID}`}
        onClick={(e) => {
          e.preventDefault();
          scrollToSection(CONTACT_ID);
        }}
      >
        Agendar llamada <i className="arr" aria-hidden="true">↗</i>
      </a>
      <p className="band__note">Sin compromiso · Te digo con honestidad si puedo ayudarte</p>
    </Reveal>
  </section>
);

export default CallBand;
