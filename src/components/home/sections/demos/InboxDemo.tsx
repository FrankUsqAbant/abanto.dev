import React, { useRef, useState } from "react";
import { AnimatePresence, m as motion } from "framer-motion";
import { Shell, useAuto, useLive, useTimers } from "./kit";

const POOL = [
  { ch: "WhatsApp", t: "¿A qué hora abren el domingo?", tag: "Horarios", ai: true, r: "Los domingos abrimos de 9:00 a 14:00. ¡Te esperamos!" },
  { ch: "Web", t: "¿Hacen envíos a Arequipa?", tag: "Envíos", ai: true, r: "Sí, enviamos a todo el Perú. A Arequipa llega en 2 a 3 días." },
  { ch: "Email", t: "Mi pedido llegó incompleto", tag: "Reclamo", ai: false, r: "Derivado a tu equipo con el pedido y el historial adjuntos." },
  { ch: "WhatsApp", t: "¿Tienen opciones sin gluten?", tag: "Productos", ai: true, r: "Sí: brownie y galletas de avena sin gluten. ¿Te reservo alguno?" },
  { ch: "Web", t: "Quiero cambiar la fecha de mi cita", tag: "Citas", ai: true, r: "Listo: te propongo jueves 11:00 o viernes 16:00." },
  { ch: "Instagram", t: "¿Puedo pagar con Yape?", tag: "Pagos", ai: true, r: "Sí, aceptamos Yape, Plin y tarjeta." },
];

interface Item {
  id: number;
  p: number;
  st: "new" | "tag" | "done";
}

/** Atención al cliente: bandeja que la IA clasifica y responde (contador ilustrativo). */
const InboxDemo: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const { live, reduce } = useLive(ref);
  const [items, setItems] = useState<Item[]>([]);
  const [sel, setSel] = useState<number | null>(null);
  const [count, setCount] = useState({ ai: 0, all: 0 });
  const [touched, setTouched] = useState(false);
  const uid = useRef(0);
  const timers = useTimers();

  const arrive = () => {
    const id = uid.current++;
    const p = id % POOL.length;
    const set = (st: Item["st"]) => setItems((l) => l.map((x) => (x.id === id ? { ...x, st } : x)));
    const first: Item = { id, p, st: reduce ? "done" : "new" };
    setItems((l) => [first, ...l].slice(0, 4));
    const finish = () => {
      set("done");
      setSel(id);
      setCount((c) => ({ ai: c.ai + (POOL[p].ai ? 1 : 0), all: c.all + 1 }));
    };
    if (reduce) return finish();
    timers.set(() => set("tag"), 700);
    timers.set(finish, 1500);
  };

  useAuto(live && !touched, 3000, arrive, 400);
  const selItem = items.find((x) => x.id === sel);

  return (
    <Shell ref={ref} label="bandeja que la IA clasifica y responde" title="Bandeja · Tu negocio" className="dm-inbox">
      <div className="dm-inbox__head">
        <span className="dm-count" aria-live="polite">
          <b>{count.ai}</b> de {count.all} resueltos automáticamente <em>(ejemplo)</em>
        </span>
        <button type="button" className="dm-run" onClick={() => { setTouched(true); arrive(); }}>+ Simular mensaje</button>
      </div>
      <ul className="dm-inbox__list">
        <AnimatePresence initial={false} mode="popLayout">
          {items.map((x) => {
            const m = POOL[x.p];
            return (
              <motion.li
                key={x.id}
                layout
                initial={{ opacity: 0, y: -14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, ease: [0.2, 0.7, 0.1, 1] }}
              >
                <button type="button" className={`dm-row is-${x.st}${sel === x.id ? " is-sel" : ""}`} onClick={() => { setTouched(true); setSel(x.id); }}>
                  <span className="dm-row__ch">{m.ch}</span>
                  <span className="dm-row__t">{m.t}</span>
                  <span className="dm-row__tag">{x.st === "new" ? "Clasificando…" : m.tag}</span>
                  <span className={`dm-row__st${m.ai ? "" : " is-human"}`}>{x.st === "done" ? (m.ai ? "Respondido por IA ✓" : "A una persona →") : ""}</span>
                </button>
              </motion.li>
            );
          })}
        </AnimatePresence>
        {items.length === 0 ? <li className="dm-inbox__empty">Esperando mensajes…</li> : null}
      </ul>
      <AnimatePresence mode="wait" initial={false}>
        {selItem && selItem.st === "done" ? (
          <motion.p
            key={selItem.id}
            className="dm-inbox__reply"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3 }}
          >
            <span>{POOL[selItem.p].ai ? "Respuesta de la IA" : "Derivación"}</span>
            {POOL[selItem.p].r}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </Shell>
  );
};

export default InboxDemo;
