import React from "react";
import Reveal from "./Reveal";
import {
  AutomationFlow,
  ConsultingStages,
  CopilotChat,
  InternalApp,
  VoiceCall,
  WhatsAppDemo,
} from "./ServiceDemos";

const Sample: React.FC = () => <span className="sample">datos de ejemplo</span>;

/* Solo el aviso de "datos de ejemplo" (el número y nombre repetían el título). */
const Meta: React.FC<{ label: string }> = ({ label }) => (
  <div className="tile__meta" data-label={label}>
    <Sample />
  </div>
);

const Checks: React.FC<{ items: string[] }> = ({ items }) => (
  <ul className="checks">
    {items.map((it) => (
      <li key={it}>{it}</li>
    ))}
  </ul>
);

interface GroupHeadProps {
  letter: string;
  title: string;
  text: string;
  className?: string;
}

const GroupHead: React.FC<GroupHeadProps> = ({ letter, title, text, className = "" }) => (
  <Reveal className={`group-head ${className}`}>
    <span className="group-head__k" aria-hidden="true">{letter}</span>
    <div>
      <h3 className="h3">{title}</h3>
    </div>
    <p className="group-head__p">{text}</p>
  </Reveal>
);

const ServicesSection: React.FC = () => (
  <section className="section" id="servicios" aria-labelledby="servicios-title">
    <div className="wrap">
      <Reveal as="header" className="sec-head">
        <h2 className="h2" id="servicios-title">
          Dos formas de poner <em>la IA a trabajar.</em>
        </h2>
        <p className="sec-head__sub">
          Agentes listos en semanas o sistemas hechos sobre tu negocio. Tú eliges por dónde
          empezar.
        </p>
      </Reveal>

      {/* A · Agentes de IA */}
      <GroupHead
        letter="A"
        title="Agentes de IA para tu negocio"
        text="Conversan con tus datos, tus clientes y tus llamadas. En producción en semanas."
      />
      <div className="bento">
        <Reveal as="article" className="tile tile--wide">
          <Meta label="01 · Copiloto del negocio" />
          <div className="tile__body tile__body--split">
            <div className="tile__text">
              <h3>Habla con los datos de tu negocio</h3>
              <p>
                Pregunta por ventas, stock o clientes en lenguaje natural y recibe cifras reales.
              </p>
              <Checks
                items={[
                  "Consultas sobre tus bases y documentos",
                  "Por WhatsApp o desde la web",
                ]}
              />
            </div>
            <CopilotChat />
          </div>
        </Reveal>

        <Reveal as="article" className="tile tile--half" delay={80}>
          <Meta label="02 · Agente conversacional" />
          <h3>Agentes conversacionales</h3>
          <p className="tile__p">
            Responden con tu stock real y llevan al cliente hasta la compra.
          </p>
          <WhatsAppDemo />
        </Reveal>

        <Reveal as="article" className="tile tile--half tile--voice tile--dark" delay={160}>
          <Meta label="03 · Agente de voz" />
          <h3>Voice AI</h3>
          <p className="tile__p">
            Atienden llamadas y agendan citas a cualquier hora.
          </p>
          <VoiceCall />
        </Reveal>
      </div>

      {/* B · A medida */}
      <GroupHead
        letter="B"
        title="Sistemas hechos a medida"
        text="Automatizaciones y software propio, diseñados sobre tus procesos reales."
        className="group-head--b"
      />
      <div className="bento">
        <Reveal as="article" className="tile tile--wide">
          <Meta label="04 · Automatizaciones end-to-end" />
          <div className="tile__body tile__body--split tile__body--auto">
            <div className="tile__text">
              <h3>
                Automatizaciones
                <br />
                <em>end-to-end</em>
              </h3>
              <p>
                La información viaja sola: de la campaña a la venta y de la venta al reporte.
              </p>
              <Checks
                items={[
                  "ERP, CRM, marketing y e-commerce conectados",
                  "Reportes que se arman solos",
                ]}
              />
            </div>
            <AutomationFlow />
          </div>
        </Reveal>

        <Reveal as="article" className="tile tile--seven" delay={80}>
          <Meta label="05 · Software con IA a medida" />
          <div className="tile__head2">
            <h3>Software con IA a medida</h3>
            <p>
              Agenda, clientes, facturas y correo en un solo sistema con IA, y es tuyo.
            </p>
          </div>
          <InternalApp />
        </Reveal>

        <Reveal as="article" className="tile tile--five" delay={160}>
          <Meta label="06 · Consultoría y capacitación" />
          <h3>Consultoría y capacitación</h3>
          <p className="tile__p">
            Roadmaps, auditorías y formación para adoptar la IA con criterio.
          </p>
          <ConsultingStages />
        </Reveal>
      </div>
    </div>
  </section>
);

export default ServicesSection;
