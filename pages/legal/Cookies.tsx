import React from "react";
import { Link } from "react-router-dom";
import { openConsentBanner, useConsent } from "../../lib/consent";
import LegalLayout from "./LegalLayout";

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

/** Política de cookies: lo que este sitio guarda de verdad en el navegador. */
const Cookies: React.FC = () => {
  const { consent } = useConsent();
  const state = consent === "accepted" ? "aceptadas" : consent === "rejected" ? "rechazadas" : "sin elegir todavía";
  return (
    <LegalLayout
      id="cookies-title"
      title="Política de cookies"
      intro="Este sitio no usa cookies de analítica ni de publicidad. Solo guarda en tu navegador lo imprescindible para funcionar y, si lo aceptas, carga la agenda de Cal.com."
    >
      <h2>1. Necesarias (propias)</h2>
      <p>No requieren consentimiento porque el sitio las necesita para funcionar. No te identifican ni sirven para seguirte.</p>
      <div className="legal__table" role="region" aria-label="Almacenamiento necesario" tabIndex={0}>
        <table>
          <thead>
            <tr><th>Nombre</th><th>Tipo</th><th>Para qué</th><th>Duración</th></tr>
          </thead>
          <tbody>
            <tr><td><code>fa-intro-seen-v2</code></td><td>sessionStorage</td><td>Recordar que ya viste la animación de entrada.</td><td>Hasta cerrar la pestaña</td></tr>
            <tr><td><code>cookie-consent</code></td><td>localStorage</td><td>Recordar tu elección sobre cookies y su fecha.</td><td>Hasta que lo borres</td></tr>
            <tr><td><code>gh-projects-cache</code></td><td>localStorage</td><td>Guardar la lista pública de proyectos de GitHub para no pedirla en cada visita.</td><td>Se renueva cada hora</td></tr>
          </tbody>
        </table>
      </div>

      <h2>2. De terceros (solo si aceptas)</h2>
      <p>
        <b>Cal.com</b>: si aceptas, al usar «Agendar llamada» se carga el script de Cal.com (app.cal.com) para abrir la
        agenda dentro de esta página. Cal.com puede usar cookies y almacenamiento propios para que la reserva funcione;
        se rigen por su <a href="https://cal.com/privacy" {...ext}>política de privacidad</a>. Si rechazas o aún no
        eliges, no se carga nada de Cal.com aquí: el botón abre la reserva en cal.com en una pestaña nueva.
      </p>

      <h2>3. Otros servicios sin cookies</h2>
      <ul>
        <li>Las fuentes tipográficas y los iconos se sirven desde este mismo sitio (sin Google Fonts ni CDN externos).</li>
        <li>La sección Proyectos pide la lista pública de repositorios y sus imágenes a GitHub (api.github.com y opengraph.githubassets.com), que no instalan cookies en este sitio.</li>
        <li>El formulario de contacto se envía a Formspree solo al pulsar «Enviar»; no deja cookies en este sitio.</li>
      </ul>

      <h2>4. Cómo gestionarlas</h2>
      <p>
        Estado actual: <b>{state}</b>.{" "}
        <button type="button" className="legal__btn" onClick={openConsentBanner}>Configurar cookies</button>
      </p>
      <p>
        También puedes borrar el almacenamiento y las cookies desde la configuración de tu navegador. Más detalles sobre
        tus datos en la <Link to="/privacidad">Política de privacidad</Link>.
      </p>
    </LegalLayout>
  );
};

export default Cookies;
