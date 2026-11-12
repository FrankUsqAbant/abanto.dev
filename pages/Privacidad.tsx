import React from "react";
import { CONTACT_EMAIL } from "../components/home/sections/homeLinks";
import "../components/home/sections/home.css";

/** Política de privacidad mínima: qué recoge el formulario y para qué. */
const Privacidad: React.FC = () => (
  <div className="hm legal">
    <article className="wrap legal__in" aria-labelledby="priv-title">
      <h1 className="h2" id="priv-title">Privacidad</h1>
      <p className="legal__date">Última actualización: 12 de noviembre de 2026</p>

      <h2>Qué datos recojo</h2>
      <p>Solo los que escribes en el formulario de contacto: tu nombre, tu email y tu mensaje.</p>

      <h2>Cómo se envían</h2>
      <p>
        El formulario se envía a través de{" "}
        <a href="https://formspree.io/legal/privacy-policy" target="_blank" rel="noopener noreferrer">Formspree</a>, un servicio que me
        reenvía el mensaje por correo. Si agendas una llamada, la reserva la gestiona{" "}
        <a href="https://cal.com/privacy" target="_blank" rel="noopener noreferrer">Cal.com</a> con su propia política.
      </p>

      <h2>Para qué los uso</h2>
      <p>Únicamente para responderte. No los vendo, no los comparto con terceros ni los uso para publicidad.</p>

      <h2>Borrar tus datos</h2>
      <p>
        Puedes pedirme que los borre cuando quieras escribiendo a{" "}
        <a href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Borrar mis datos")}`}>{CONTACT_EMAIL}</a>.
      </p>
    </article>
  </div>
);

export default Privacidad;
