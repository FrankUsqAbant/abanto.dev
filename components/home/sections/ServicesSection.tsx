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

const Meta: React.FC<{ label: string }> = ({ label }) => (
  <div className="tile__meta">
    <span className="mono">{label}</span>
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
  kicker: string;
  title: string;
  text: string;
  className?: string;
}

const GroupHead: React.FC<GroupHeadProps> = ({ letter, kicker, title, text, className = "" }) => (
  <Reveal className={`group-head ${className}`}>
    <span className="group-head__k" aria-hidden="true">{letter}</span>
    <div>
      <p className="mono">{kicker}</p>
      <h3 className="h3">{title}</h3>
    </div>
    <p className="group-head__p">{text}</p>
  </Reveal>
);

const ServicesSection: React.FC = () => (
  <section className="section" id="servicios" aria-labelledby="servicios-title">
    <div className="wrap">
      <Reveal as="header" className="sec-head">
        <p className="eyebrow">01 — Servicios</p>
        <h2 className="h2" id="servicios-title">
          Dos formas de poner <em>la IA a trabajar.</em>
        </h2>
        <p className="sec-head__sub">
          Agentes listos para operar desde la primera semana, o sistemas construidos alrededor de
          cómo funciona realmente tu negocio. Tú eliges por dónde empezar.
        </p>
      </Reveal>

      {/* A · Agentes de IA */}
      <GroupHead
        letter="A"
        kicker="Agentes de IA"
        title="Agentes de IA para tu negocio"
        text="Agentes que conversan con tus datos, tus clientes y tus líneas telefónicas. En producción en semanas, no en meses."
      />
      <div className="bento">
        <Reveal as="article" className="tile tile--wide">
          <Meta label="01 · Copiloto del negocio" />
          <div className="tile__body tile__body--split">
            <div className="tile__text">
              <h3>Habla con los datos de tu negocio</h3>
              <p>
                Pregunta por ventas, stock, facturas o clientes en lenguaje natural. El agente
                traduce tu pregunta a consultas sobre tus bases y documentos, y te responde con
                cifras reales.
              </p>
              <Checks
                items={[
                  "Preguntas del día a día sobre tu operación",
                  "Consultas text-to-SQL sobre datos conectados",
                  "Acceso por WhatsApp o desde la web",
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
            Responden consultas de disponibilidad con tu stock conectado y acompañan al cliente
            hasta la reserva o la compra.
          </p>
          <WhatsAppDemo />
        </Reveal>

        <Reveal as="article" className="tile tile--half tile--voice tile--dark" delay={160}>
          <Meta label="03 · Agente de voz" />
          <h3>Voice AI</h3>
          <p className="tile__p">
            Agentes telefónicos que atienden, agendan citas, califican clientes y resuelven, a
            cualquier hora.
          </p>
          <VoiceCall />
        </Reveal>
      </div>

      {/* B · A medida */}
      <GroupHead
        letter="B"
        kicker="A medida"
        title="Sistemas hechos a medida"
        text="Automatizaciones de punta a punta y software propio, diseñados sobre tus procesos reales y no al revés."
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
                Integro tu stack para que la información viaje sola: de la campaña a la venta, de
                la venta a la factura y de la factura al reporte.
              </p>
              <Checks
                items={[
                  "Integraciones entre Marketing, ERP, CRM y e-commerce",
                  "Reportes y dashboards que se arman solos",
                  "Monitoreo y alertas desde el primer día",
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
              Plataformas internas con IA integrada: agenda, clientes, CRM, facturas y correo en
              un solo sistema que es tuyo.
            </p>
          </div>
          <InternalApp />
        </Reveal>

        <Reveal as="article" className="tile tile--five" delay={160}>
          <Meta label="06 · Consultoría y capacitación" />
          <h3>Consultoría y capacitación</h3>
          <p className="tile__p">
            Roadmaps, auditorías técnicas y entrenamiento para que tu equipo adopte la IA con
            criterio.
          </p>
          <ConsultingStages />
        </Reveal>
      </div>
    </div>
  </section>
);

export default ServicesSection;
