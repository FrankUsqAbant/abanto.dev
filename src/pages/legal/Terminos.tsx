import React from "react";
import { CONTACT_EMAIL } from "../../components/home/sections/homeLinks";
import LegalLayout from "./LegalLayout";

/** Términos de uso del sitio (breves). */
const Terminos: React.FC = () => (
  <LegalLayout
    id="terms-title"
    title="Términos de uso"
    intro="Estas condiciones regulan el uso de este sitio web de Frank Abanto. Al navegarlo, las aceptas."
  >
    <h2>1. Contenido y propiedad</h2>
    <p>
      Los textos, el diseño, el código del sitio y el contenido de la sección Aprende son de Frank Abanto, salvo que se
      indique otra cosa. Puedes citarlos con un enlace a la fuente; para otros usos, escríbeme. Las marcas y logotipos
      de terceros pertenecen a sus dueños, y los proyectos publicados en GitHub tienen su propia licencia.
    </p>

    <h2>2. Contenido educativo</h2>
    <p>
      Aprende es material educativo e informativo. Procuro que sea correcto y esté al día, pero puede contener errores o
      quedar desactualizado, y no sustituye la documentación oficial ni el asesoramiento profesional.
    </p>

    <h2>3. Demos ilustrativas</h2>
    <p>
      Las demos interactivas de la sección Servicios son ejemplos para explicar cómo funcionaría cada servicio. Los
      negocios, nombres, conversaciones y cifras que muestran son ficticios y no representan resultados
      reales.
    </p>

    <h2>4. Servicios y cotizaciones</h2>
    <p>
      La información del sitio no es una oferta vinculante. El alcance, el precio y los plazos de cada proyecto se
      acuerdan por escrito antes de empezar.
    </p>

    <h2>5. Enlaces externos</h2>
    <p>
      El sitio enlaza a servicios y páginas de terceros (por ejemplo GitHub, Cal.com o redes sociales). No controlo su
      contenido ni sus políticas, que debes revisar en cada caso.
    </p>

    <h2>6. Responsabilidad</h2>
    <p>
      El sitio se ofrece «tal cual». En la medida que permita la ley, no respondo por daños derivados de su uso, de
      interrupciones del servicio o de decisiones tomadas solo con base en su contenido.
    </p>

    <h2>7. Ley aplicable</h2>
    <p>
      Estos términos se rigen por las leyes de la República del Perú. Cualquier controversia se someterá a los jueces y
      tribunales competentes del Perú, salvo que la ley disponga otra cosa.
    </p>

    <h2>8. Cambios y contacto</h2>
    <p>
      Puedo actualizar estos términos; la versión vigente es la publicada aquí. Para dudas, escríbeme a{" "}
      <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
    </p>
  </LegalLayout>
);

export default Terminos;
