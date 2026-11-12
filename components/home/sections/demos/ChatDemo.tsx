import React, { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Shell, useAuto, useLive, useTimers } from "./kit";

const QA = [
  { q: "¿Tienen la talla 40?", tool: "Consultando inventario", a: "Sí, quedan 3 pares en talla 40, en negro y en blanco. ¿Te separo uno?" },
  { q: "¿Cuánto cuesta el envío?", tool: "Revisando tarifas de envío", a: "A Lima cuesta S/ 10 y llega en 24–48 h. Desde S/ 150 es gratis." },
  { q: "Quiero recoger mañana", tool: "Revisando la agenda de la tienda", a: "Mañana puedes recoger a las 10:00 o a las 16:30. ¿Cuál prefieres?" },
];

interface Msg {
  id: number;
  who: "me" | "tool" | "ai";
  text: string;
  done?: boolean;
}

/** Agentes y chatbots: preguntas sugeridas, acción de herramienta y respuesta que se escribe. */
const ChatDemo: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const { live, reduce } = useLive(ref);
  const [msgs, setMsgs] = useState<Msg[]>([{ id: 0, who: "ai", text: "¡Hola! Soy el asistente de Tu tienda. ¿En qué te ayudo?", done: true }]);
  const [busy, setBusy] = useState(false);
  const [touched, setTouched] = useState(false);
  const next = useRef(0);
  const uid = useRef(1);
  const timers = useTimers();

  const ask = (i: number) => {
    if (busy) return;
    const { q, tool, a } = QA[i];
    next.current = (i + 1) % QA.length;
    setBusy(true);
    const me = uid.current++;
    const tl = uid.current++;
    const ai = uid.current++;
    const keep = (list: Msg[]) => list.slice(-4);
    setMsgs((m) => keep([...m, { id: me, who: "me", text: q }]));
    const fast = reduce ? 0 : 1;
    timers.set(() => setMsgs((m) => keep([...m, { id: tl, who: "tool", text: tool }])), 450 * fast);
    timers.set(() => setMsgs((m) => m.map((x) => (x.id === tl ? { ...x, done: true } : x))), 1500 * fast);
    timers.set(() => {
      if (reduce) {
        setMsgs((m) => keep([...m, { id: ai, who: "ai", text: a, done: true }]));
        setBusy(false);
        return;
      }
      setMsgs((m) => keep([...m, { id: ai, who: "ai", text: "" }]));
      let n = 0;
      const type = () => {
        n = Math.min(a.length, n + 2);
        setMsgs((m) => m.map((x) => (x.id === ai ? { ...x, text: a.slice(0, n), done: n >= a.length } : x)));
        if (n < a.length) timers.set(type, 22);
        else setBusy(false);
      };
      type();
    }, 1750 * fast);
  };

  useAuto(live && !touched, 6500, () => ask(next.current), 700);

  return (
    <Shell ref={ref} label="chatbot que consulta tu inventario" title="Asistente · Tu tienda" className="dm-chat">
      <div className="dm-chat__body" aria-live="polite">
        <AnimatePresence initial={false} mode="popLayout">
          {msgs.map((m) => (
            <motion.div
              key={m.id}
              layout
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: [0.2, 0.7, 0.1, 1] }}
              className={`dm-msg dm-msg--${m.who}${m.done ? " is-done" : ""}`}
            >
              {m.who === "tool" ? (
                <>
                  <i aria-hidden="true">{m.done ? "✓" : ""}</i>
                  {m.text}
                  {m.done ? "" : "…"}
                </>
              ) : (
                <>
                  {m.text}
                  {m.who === "ai" && !m.done ? <span className="dm-caret" aria-hidden="true" /> : null}
                </>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <div className="dm-chat__sugs" role="group" aria-label="Preguntas sugeridas">
        {QA.map((x, i) => (
          <button
            key={x.q}
            type="button"
            disabled={busy}
            onClick={() => {
              setTouched(true);
              ask(i);
            }}
          >
            {x.q}
          </button>
        ))}
      </div>
    </Shell>
  );
};

export default ChatDemo;
