import React from "react";
import WebDemo from "./WebDemo";
import ChatDemo from "./ChatDemo";
import FlowDemo from "./FlowDemo";
import IntegrationsDemo from "./IntegrationsDemo";
import DashDemo from "./DashDemo";
import InboxDemo from "./InboxDemo";
import "./demos.css";

export type DemoId = "web" | "chat" | "flow" | "int" | "dash" | "inbox";

const DEMOS: Record<DemoId, React.FC> = { web: WebDemo, chat: ChatDemo, flow: FlowDemo, int: IntegrationsDemo, dash: DashDemo, inbox: InboxDemo };

/** Demos de Servicios (chunk diferido: se carga al acercarse a la sección). */
const ServiceDemo: React.FC<{ id: DemoId }> = ({ id }) => {
  const Demo = DEMOS[id];
  return <Demo />;
};

export default ServiceDemo;
