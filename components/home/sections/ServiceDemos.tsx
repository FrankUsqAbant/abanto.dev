import React, { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion, useInView } from "./useInView";
import { ShoeIcon } from "./icons";

/**
 * Mini-interfaces "en vivo" de los servicios. Solo se animan mientras están
 * en pantalla y si el sistema no pide reducir movimiento; si no, muestran
 * su estado final. Todo son datos de ejemplo.
 */

const useLive = <T extends Element>(ref: React.RefObject<T | null>): boolean => {
  const inView = useInView(ref, { threshold: 0.25 });
  const reduce = usePrefersReducedMotion();
  return inView && !reduce;
};

/** Muestra mensajes uno a uno y reinicia la secuencia cada `cycle` ms. */
const useSequence = (live: boolean, count: number, step: number, cycle: number): number => {
  const [shown, setShown] = useState(count);
  useEffect(() => {
    if (!live) {
      setShown(count);
      return;
    }
    const timers: number[] = [];
    const run = () => {
      setShown(0);
      for (let i = 0; i < count; i++) {
        timers.push(window.setTimeout(() => setShown(i + 1), 500 + i * step));
      }
    };
    run();
    const id = window.setInterval(run, cycle);
    return () => {
      window.clearInterval(id);
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, [live, count, step, cycle]);
  return shown;
};

const msgClass = (base: string, i: number, shown: number) =>
  `msg ${base}${i < shown ? "" : " is-hidden"}`;

/* ------------------------------------------------------------------ */
/* 01 · Copiloto del negocio (chat con SQL)                            */
/* ------------------------------------------------------------------ */

export const CopilotChat: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const shown = useSequence(useLive(ref), 4, 1100, 9000);

  return (
    <div className="chat chat--sql" ref={ref} aria-label="Ejemplo: chat con el copiloto del negocio" role="img">
      <div className="chat__top">
        <span className="avatar">IA</span>
        <div>
          <b>Copiloto del negocio</b>
          <small>
            <i className="dot-live" /> conectado a ventas_db
          </small>
        </div>
        <div className="chan">
          <span className="is-on">WhatsApp</span>
          <span>Web</span>
        </div>
      </div>
      <div className="chat__body" aria-hidden="true">
        <div className={msgClass("msg--me", 0, shown)}>
          ¿Cuál fue el producto más vendido en octubre y cuánto stock queda?
        </div>
        <div className={msgClass("msg--sql", 1, shown)}>
          <span className="mono">Consulta generada</span>
          <pre>
            <span className="k">SELECT</span> producto, <span className="k">SUM</span>(cantidad){" "}
            <span className="k">AS</span> vendidos{"\n"}
            <span className="k">FROM</span> ventas <span className="k">WHERE</span> mes ={" "}
            <span className="s">'2026-10'</span>
            {"\n"}
            <span className="k">GROUP BY</span> producto <span className="k">ORDER BY</span> vendidos{" "}
            <span className="k">DESC LIMIT</span> 1;
          </pre>
        </div>
        <div className={msgClass("msg--ai", 2, shown)}>
          El más vendido fue <b>Café de altura 500 g</b>: <b>1 284 unidades</b>. Quedan <b>212</b> en
          almacén, suficiente para unos 5 días al ritmo actual. ¿Quieres que genere la orden de
          reposición?
        </div>
        <div className={msgClass("msg--me", 3, shown)}>Sí, prepárala 👍</div>
      </div>
      <div className="chat__input" aria-hidden="true">
        <span>Pregunta lo que quieras a tus datos…</span>
        <b>↑</b>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* 02 · Agente conversacional (WhatsApp)                               */
/* ------------------------------------------------------------------ */

export const WhatsAppDemo: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const shown = useSequence(useLive(ref), 4, 900, 8000);

  return (
    <div className="wa" ref={ref} role="img" aria-label="Ejemplo: conversación de WhatsApp con un asistente de tienda">
      <div className="wa__top">
        <span className="avatar avatar--g">T</span>
        <div>
          <b>Tienda · Asistente</b>
          <small>en línea · WhatsApp</small>
        </div>
      </div>
      <div className="wa__body" aria-hidden="true">
        <div className={msgClass("msg--in", 0, shown)}>
          Hola, ¿tienen las zapatillas Runner en talla 41?
        </div>
        <div className={msgClass("msg--out", 1, shown)}>
          ¡Hola! Sí 🙌 Nos quedan <b>3 pares</b> en talla 41. ¿Prefieres reservarlas para recoger o
          comprarlas ahora?
        </div>
        <div className={`product${shown > 2 ? "" : " is-hidden"}`}>
          <div className="product__img">
            <ShoeIcon />
          </div>
          <div>
            <b>Runner Pro · Negro</b>
            <small>Talla 41 · S/ 289</small>
            <em>
              <i className="dot-live" /> 3 en stock
            </em>
          </div>
        </div>
        <div className={`wa__actions${shown > 3 ? "" : " is-hidden"}`}>
          <span>Reservar</span>
          <span className="is-on">Comprar ahora</span>
        </div>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* 03 · Agente de voz                                                  */
/* ------------------------------------------------------------------ */

const BARS = 46;
const waveShape = (i: number) => {
  const x = i / BARS;
  return 18 + 70 * Math.abs(Math.sin(x * 9.3) * Math.cos(x * 3.1 + 1));
};
const fmtTime = (t: number) =>
  `${String(Math.floor(t / 60)).padStart(2, "0")}:${String(t % 60).padStart(2, "0")}`;

export const VoiceCall: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const waveRef = useRef<HTMLDivElement>(null);
  const live = useLive(ref);
  const [seconds, setSeconds] = useState(84);

  useEffect(() => {
    if (!live) return;
    const clock = window.setInterval(() => setSeconds((s) => s + 1), 1000);
    // La onda se actualiza directamente en el DOM (sin re-render de React).
    const wave = window.setInterval(() => {
      waveRef.current?.querySelectorAll<HTMLElement>("i").forEach((bar) => {
        bar.style.setProperty("--h", `${12 + Math.random() * 82}%`);
      });
    }, 180);
    return () => {
      window.clearInterval(clock);
      window.clearInterval(wave);
    };
  }, [live]);

  return (
    <div className="call" ref={ref} role="img" aria-label="Ejemplo: llamada atendida por una recepcionista con IA">
      <div className="call__status" aria-hidden="true">
        <i className="dot-rec" /> En llamada <span className="call__timer">{fmtTime(seconds)}</span>
      </div>
      <div className="call__who" aria-hidden="true">
        <span className="call__avatar">V</span>
        <div>
          <b>Valeria</b>
          <small>Recepcionista IA · Clínica de ejemplo</small>
        </div>
      </div>
      <div className="wave" ref={waveRef} aria-hidden="true">
        {Array.from({ length: BARS }, (_, i) => (
          <i key={i} style={{ "--h": `${waveShape(i)}%` } as React.CSSProperties} />
        ))}
      </div>
      <p className="call__transcript" aria-hidden="true">
        “…perfecto, te reservo el jueves a las <b>4:30 p. m.</b> ¿Te envío la confirmación por
        WhatsApp?”
      </p>
      <div className="call__btns" aria-hidden="true">
        <span>Silenciar</span>
        <span>Transferir</span>
        <span className="end">Finalizar</span>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* 04 · Automatizaciones: flujo + hoja que se suma sola                */
/* ------------------------------------------------------------------ */

const SHEET_ROWS: { origin: string; concept: string; value: number }[] = [
  { origin: "E-commerce", concept: "Ventas online", value: 12480 },
  { origin: "CRM", concept: "Contratos cerrados", value: 8600 },
  { origin: "ERP", concept: "Facturado", value: 5240 },
  { origin: "Marketing", concept: "Leads convertidos", value: 3150 },
  { origin: "ERP", concept: "Servicios", value: 1930 },
];
const SHEET_TOTAL = SHEET_ROWS.reduce((a, r) => a + r.value, 0);
const fmtNum = (n: number) => n.toLocaleString("es-PE").replace(/[,.]/g, " ");

export const AutomationFlow: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const live = useLive(ref);
  const [flash, setFlash] = useState(-1);
  const [total, setTotal] = useState(SHEET_TOTAL);

  useEffect(() => {
    if (!live) {
      setFlash(-1);
      setTotal(SHEET_TOTAL);
      return;
    }
    const timers: number[] = [];
    let raf = 0;
    const countTo = (from: number, to: number) => {
      const t0 = performance.now();
      const stepFn = (now: number) => {
        const p = Math.min(1, (now - t0) / 500);
        setTotal(Math.round(from + (to - from) * p));
        if (p < 1) raf = requestAnimationFrame(stepFn);
      };
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(stepFn);
    };
    const run = () => {
      let acc = 0;
      setTotal(0);
      SHEET_ROWS.forEach((row, i) => {
        timers.push(
          window.setTimeout(() => {
            setFlash(i);
            const from = acc;
            acc += row.value;
            countTo(from, acc);
          }, 400 + i * 700)
        );
      });
      timers.push(window.setTimeout(() => setFlash(-1), 400 + SHEET_ROWS.length * 700));
    };
    run();
    const id = window.setInterval(run, 8000);
    return () => {
      window.clearInterval(id);
      timers.forEach((t) => window.clearTimeout(t));
      cancelAnimationFrame(raf);
    };
  }, [live]);

  return (
    <div className={`flow${live ? " is-live" : ""}`} ref={ref} role="img" aria-label="Ejemplo: Marketing, ERP, CRM y e-commerce alimentan un reporte que se suma solo">
      <div className="flow__srcs" aria-hidden="true">
        <span><i>◎</i>Marketing</span>
        <span><i>▦</i>ERP</span>
        <span><i>◉</i>CRM</span>
        <span><i>◫</i>E-commerce</span>
      </div>
      <div className="flow__pipe" aria-hidden="true">
        <svg viewBox="0 0 60 220" preserveAspectRatio="none">
          <path
            d="M0 28 C30 28 30 110 60 110 M0 82 C30 82 30 110 60 110 M0 138 C30 138 30 110 60 110 M0 192 C30 192 30 110 60 110"
            fill="none"
            stroke="#141414"
            strokeOpacity=".35"
            strokeDasharray="3 4"
          />
        </svg>
        <b>auto</b>
      </div>
      <div className="sheet" aria-hidden="true">
        <div className="sheet__tabs">
          <span className="is-on">reporte_semanal.xlsx</span>
          <em>
            <i className="dot-live" /> Sincronizado
          </em>
        </div>
        <table>
          <thead>
            <tr>
              <th />
              <th>A · Origen</th>
              <th>B · Concepto</th>
              <th>C · Monto</th>
            </tr>
          </thead>
          <tbody>
            {SHEET_ROWS.map((row, i) => (
              <tr key={i} className={flash === i ? "flash" : undefined}>
                <td>{i + 1}</td>
                <td>{row.origin}</td>
                <td>{row.concept}</td>
                <td className="num">{fmtNum(row.value)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td>Σ</td>
              <td colSpan={2}>
                TOTAL <span className="formula">=SUMA(C1:C5)</span>
              </td>
              <td className="num total">{fmtNum(total)}</td>
            </tr>
          </tfoot>
        </table>
        <div className="sheet__alert">
          <i className="dot-live" /> Reporte enviado a gerencia · lunes 8:00 a. m.
        </div>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* 05 · Software con IA a medida (panel interno)                       */
/* ------------------------------------------------------------------ */

const TABS = ["Agenda", "Clientes", "CRM", "Facturas", "Mail"] as const;

export const InternalApp: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const live = useLive(ref);
  const [hint, setHint] = useState(true);

  // La sugerencia de la IA aparece de nuevo cada cierto tiempo.
  useEffect(() => {
    if (!live) {
      setHint(true);
      return;
    }
    let t = 0;
    const run = () => {
      setHint(false);
      t = window.setTimeout(() => setHint(true), 1200);
    };
    run();
    const id = window.setInterval(run, 7000);
    return () => {
      window.clearInterval(id);
      window.clearTimeout(t);
    };
  }, [live]);

  return (
    <div className="app" ref={ref} role="img" aria-label="Ejemplo: panel interno con clientes, CRM y sugerencias de la IA">
      <div className="app__bar" aria-hidden="true">
        <span className="dots"><i /><i /><i /></span>
        <b>◐ Panel interno</b>
        <span className="app__conn">
          <i className="dot-live" /> Conectado · Gmail
        </span>
      </div>
      <div className="app__tabs" aria-hidden="true">
        {TABS.map((t) => (
          <span key={t} className={t === "Clientes" ? "is-on" : undefined}>{t}</span>
        ))}
      </div>
      <div className="app__main" aria-hidden="true">
        <div className="kpis">
          <div><small>Clientes activos</small><b>184</b><em className="up">+8 %</em></div>
          <div><small>Por facturar</small><b>S/ 9,2 k</b><em className="up">12 docs</em></div>
          <div><small>Resuelto por IA</small><b>72 %</b><em className="up">+5 pts</em></div>
        </div>
        <div className="crm">
          <div className="crm__row crm__row--h"><span>Cliente</span><span>Etapa</span><span>Próximo paso</span><span>Valor</span></div>
          <div className="crm__row"><span><i className="av">MR</i>Mercado Rojas</span><span><em className="st st--g">Propuesta</em></span><span>Llamada jueves</span><span>S/ 4 800</span></div>
          <div className="crm__row"><span><i className="av">AL</i>Andes Logística</span><span><em className="st">Negociación</em></span><span>Enviar contrato</span><span>S/ 12 300</span></div>
          <div className="crm__row"><span><i className="av">CV</i>Clínica Vida</span><span><em className="st st--d">Ganado</em></span><span>Onboarding</span><span>S/ 7 650</span></div>
        </div>
        <div className={`ai-hint${hint ? "" : " is-hidden"}`}>
          <span className="avatar">IA</span>
          <p>
            Andes Logística abrió tu propuesta 3 veces hoy. <b>¿Redacto un correo de seguimiento?</b>
          </p>
        </div>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* 06 · Consultoría y capacitación (etapas)                            */
/* ------------------------------------------------------------------ */

export const ConsultingStages: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { once: true, threshold: 0.3 });

  return (
    <div className={`stages${seen ? " is-in" : ""}`} ref={ref} role="img" aria-label="Ejemplo: proyecto de consultoría en 3 etapas, la primera completada">
      <div className="stages__top" aria-hidden="true">
        <span className="mono">Proyecto · Empresa de ejemplo</span>
        <span className="pill-st">En planificación</span>
      </div>
      <ol aria-hidden="true">
        <li className="done"><i>✓</i><div><b>Entender tu problema</b><small>Mapeamos procesos, stack y objetivos.</small></div></li>
        <li className="now"><i>2</i><div><b>Módulos personalizados</b><small>Talleres y plan a la medida de tu equipo.</small></div></li>
        <li><i>3</i><div><b>Puesta en producción</b><small>Acompañamiento hasta que funcione solo.</small></div></li>
      </ol>
      <div className="stages__prog" aria-hidden="true">
        <div><small>Etapas completadas</small><b>1 <span>/ 3</span></b></div>
        <div className="bar"><i /></div>
      </div>
      <p className="stages__note" aria-hidden="true">Alcance, accesos y prioridades definidos en conjunto.</p>
    </div>
  );
};
