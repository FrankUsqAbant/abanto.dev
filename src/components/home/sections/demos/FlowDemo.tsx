import React, { useRef, useState } from "react";
import { Shell, useAuto, useLive, useTimers } from "./kit";

const NODES = [
  { k: "Formulario nuevo", s: "Disparador · web", ic: "▤" },
  { k: "Guardar en el CRM", s: "Contacto creado", ic: "◎" },
  { k: "Email de bienvenida", s: "Enviado al cliente", ic: "✉" },
  { k: "Aviso en Slack", s: "#ventas", ic: "#" },
];

/** Automatización: nodos que se encienden en secuencia al pulsar "Ejecutar". */
const FlowDemo: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const { live, reduce } = useLive(ref);
  const [at, setAt] = useState(-1);
  const [touched, setTouched] = useState(false);
  const [runs, setRuns] = useState(0);
  const timers = useTimers();
  const running = at >= 0 && at < NODES.length;

  const run = () => {
    if (running) return;
    timers.clear();
    if (reduce) {
      setAt(NODES.length);
      setRuns((r) => r + 1);
      return;
    }
    setAt(0);
    for (let i = 1; i <= NODES.length; i++) timers.set(() => setAt(i), i * 750);
    timers.set(() => setRuns((r) => r + 1), NODES.length * 750);
  };

  useAuto(live && !touched, 7000, run, 600);

  return (
    <Shell ref={ref} label="flujo automático de un formulario nuevo" title="Flujo · Nuevo cliente" className="dm-flow">
      <ol className="dm-flow__list">
        {NODES.map((n, i) => {
          const state = at > i ? "is-done" : at === i ? "is-on" : "";
          return (
            <li key={n.k} className={`dm-node ${state}`}>
              <span className="dm-node__ic" aria-hidden="true">{n.ic}</span>
              <span className="dm-node__t">
                <b>{n.k}</b>
                <small>{n.s}</small>
              </span>
              <span className="dm-node__st" aria-hidden="true">{at > i ? "✓" : at === i ? "" : "·"}</span>
              {i < NODES.length - 1 ? <i className="dm-node__wire" aria-hidden="true" /> : null}
            </li>
          );
        })}
      </ol>
      <div className="dm-flow__foot">
        <button
          type="button"
          className="dm-run"
          disabled={running}
          onClick={() => {
            setTouched(true);
            run();
          }}
        >
          {running ? "Ejecutando…" : "▸ Ejecutar"}
        </button>
        <span className="dm-flow__res" aria-live="polite">
          {at >= NODES.length ? "Listo: 4 pasos sin tocar nada" : running ? `Paso ${at + 1} de ${NODES.length}` : "Esperando un formulario"}
          {runs ? <em> · ejecuciones de prueba: {runs}</em> : null}
        </span>
      </div>
    </Shell>
  );
};

export default FlowDemo;
