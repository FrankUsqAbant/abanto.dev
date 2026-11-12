import React from "react";
import { Link } from "react-router-dom";
import { CONTACT_EMAIL } from "../../components/home/sections/homeLinks";
import LegalLayout from "./LegalLayout";

const mail = (subject: string) => `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`;
const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

/** Política de privacidad (Ley 29733 del Perú y su reglamento; compatible con el RGPD). */
const Privacidad: React.FC = () => (
  <LegalLayout
    id="priv-title"
    title="Política de privacidad"
    intro="Explica qué datos personales recojo en este sitio, para qué los uso y cómo puedes ejercer tus derechos. Está pensada conforme a la Ley N.º 29733, Ley de Protección de Datos Personales del Perú, y su reglamento, y es compatible con el Reglamento General de Protección de Datos (RGPD) de la Unión Europea."
  >
    <h2>1. Responsable</h2>
    <p>
      El responsable del tratamiento es Frank Abanto, desarrollador independiente. Puedes escribirme a{" "}
      <a href={mail("Privacidad")}>{CONTACT_EMAIL}</a> para cualquier tema relacionado con tus datos.
    </p>

    <h2>2. Qué datos recojo</h2>
    <ul>
      <li><b>Formulario de contacto:</b> nombre, email, el mensaje que escribas y la aceptación de esta política.</li>
      <li><b>Agendar una llamada:</b> si reservas, Cal.com recoge tu nombre, email, la fecha y hora elegidas y las notas que añadas, y me envía esa información.</li>
      <li><b>Datos técnicos:</b> al visitar el sitio, el proveedor de alojamiento procesa tu dirección IP y datos de la conexión para servir las páginas y protegerlas de abusos.</li>
    </ul>
    <p>No uso herramientas de analítica, publicidad ni perfiles de comportamiento, y no pido datos sensibles.</p>

    <h2>3. Para qué los uso</h2>
    <p>
      Solo para responder tu consulta, preparar y realizar la llamada que reserves y, si me lo pides, enviarte una
      cotización. No tomo decisiones automatizadas sobre ti ni uso tus datos para otros fines.
    </p>

    <h2>4. Base legal</h2>
    <p>
      Tu consentimiento libre, previo, expreso, informado e inequívoco, que das al marcar la casilla del formulario o al
      reservar una llamada. Cuando me pides una cotización, el tratamiento también es necesario para atender esa
      solicitud antes de un posible contrato. Puedes retirar tu consentimiento cuando quieras, sin efecto retroactivo.
    </p>

    <h2>5. Proveedores y transferencias internacionales</h2>
    <p>Para que el sitio funcione, algunos proveedores tratan datos por encargo, con sus propias medidas de seguridad:</p>
    <ul>
      <li><a href="https://formspree.io/legal/privacy-policy" {...ext}>Formspree</a> (EE. UU.): recibe el formulario y me lo reenvía por correo.</li>
      <li><a href="https://cal.com/privacy" {...ext}>Cal.com</a> (EE. UU.): gestiona las reservas de llamadas.</li>
      <li><a href="https://policies.google.com/privacy" {...ext}>Google (Gmail)</a> (EE. UU.): es el servicio de correo donde recibo y respondo los mensajes.</li>
      <li><a href="https://www.cloudflare.com/privacypolicy/" {...ext}>Cloudflare</a> (EE. UU., red global): aloja y sirve el sitio.</li>
      <li><a href="https://docs.github.com/es/site-policy/privacy-policies/github-general-privacy-statement" {...ext}>GitHub</a> (EE. UU.): tu navegador le pide la lista pública de mis proyectos y sus imágenes, por lo que recibe tu dirección IP.</li>
    </ul>
    <p>
      Las fuentes tipográficas y los iconos se sirven desde este mismo sitio, sin Google Fonts ni CDN externos. Como estos proveedores están fuera del
      Perú, tus datos se transfieren a otros países, que pueden no ofrecer un nivel de protección equivalente. Esa
      transferencia se hace con tu consentimiento y solo para las finalidades indicadas.
    </p>

    <h2>6. Cuánto tiempo los conservo</h2>
    <p>
      Mientras dure nuestra conversación y hasta 12 meses después del último contacto. Si empezamos a trabajar juntos,
      el tiempo que exijan las obligaciones legales y contractuales. Después los elimino. Si me lo pides antes, los borro
      antes.
    </p>

    <h2>7. Tus derechos (ARCO)</h2>
    <p>
      Puedes ejercer tus derechos de <b>acceso</b>, <b>rectificación</b>, <b>cancelación</b> y <b>oposición</b>, y,
      cuando aplique el RGPD, también los de limitación del tratamiento, portabilidad y retiro del consentimiento.
      Escríbeme a <a href={mail("Derechos ARCO")}>{CONTACT_EMAIL}</a> con el asunto «Derechos ARCO» indicando qué
      necesitas; responderé en los plazos que fija la ley. Si no estás conforme con mi respuesta, puedes acudir a la
      Autoridad Nacional de Protección de Datos Personales del Ministerio de Justicia y Derechos Humanos del Perú o, si
      resides en la UE, a la autoridad de tu país.
    </p>

    <h2>8. Seguridad</h2>
    <p>
      El sitio funciona con HTTPS, solo yo accedo a los mensajes y uso proveedores con medidas de seguridad reconocidas.
      Ningún sistema es infalible; si detectara un incidente que afecte tus datos, te lo comunicaría.
    </p>

    <h2>9. Menores de edad</h2>
    <p>
      Este sitio está dirigido a negocios y profesionales. Si eres menor de 14 años, no envíes tus datos sin la
      autorización de tus padres o tutores.
    </p>

    <h2>10. Cookies</h2>
    <p>
      Lo que el sitio guarda en tu navegador se explica en la <Link to="/cookies">Política de cookies</Link>.
    </p>

    <h2>11. Cambios</h2>
    <p>Si cambio esta política, publicaré aquí la nueva versión con su fecha de actualización.</p>
  </LegalLayout>
);

export default Privacidad;
