import React, { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Shell, useAuto, useLive, useTween } from "./kit";

type Period = "semana" | "mes";
const DATA: Record<Period, { labels: string[]; vals: number[]; kpi: [number, number, number]; tip: string }> = {
  semana: { labels: ["L", "M", "X", "J", "V", "S", "D"], vals: [420, 580, 510, 660, 730, 950, 880], kpi: [4730, 312, 15.2], tip: "El sábado es el mejor día" },
  mes: { labels: ["Sem 1", "Sem 2", "Sem 3", "Sem 4"], vals: [4100, 4730, 5600, 5410], kpi: [19840, 1296, 15.3], tip: "La semana 3 fue la mejor del mes" },
};
const fmt = (n: number, d = 0) => n.toLocaleString("es-PE", { minimumFractionDigits: d, maximumFractionDigits: d });

const Kpi: React.FC<{ label: string; value: number; pre?: string; dec?: number; anim: boolean }> = ({ label, value, pre = "", dec = 0, anim }) => {
  const v = useTween(value, anim);
  return (
    <div>
      <small>{label}</small>
      <b>{pre}{fmt(v, dec)}</b>
    </div>
  );
};

/** Dashboards: gráfico animado con cambio de periodo (datos ilustrativos). */
const DashDemo: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const { live, reduce } = useLive(ref);
  const [period, setPeriod] = useState<Period>("semana");
  const [touched, setTouched] = useState(false);
  const [hover, setHover] = useState<number | null>(null);
  const d = DATA[period];
  const max = Math.max(...d.vals);
  const best = d.vals.indexOf(max);

  useAuto(live && !touched, 4200, () => setPeriod((p) => (p === "semana" ? "mes" : "semana")), 2400);

  return (
    <Shell ref={ref} label="panel de ventas con cambio de periodo" title="Ventas · Tu cafetería" className="dm-dash">
      <div className="dm-dash__head">
        <div className="dm-seg" role="group" aria-label="Periodo">
          {(["semana", "mes"] as Period[]).map((p) => (
            <button key={p} type="button" aria-pressed={period === p} onClick={() => { setTouched(true); setPeriod(p); }}>
              {p === "semana" ? "Semana" : "Mes"}
            </button>
          ))}
        </div>
        <span className="dm-note">Datos ilustrativos</span>
      </div>
      <div className="dm-kpis">
        <Kpi label="Ventas" value={d.kpi[0]} pre="S/ " anim={!reduce} />
        <Kpi label="Pedidos" value={d.kpi[1]} anim={!reduce} />
        <Kpi label="Ticket medio" value={d.kpi[2]} pre="S/ " dec={1} anim={!reduce} />
      </div>
      <div className="dm-chart" onMouseLeave={() => setHover(null)}>
        <AnimatePresence initial={false} mode="popLayout">
          {d.vals.map((v, i) => (
            <motion.div
              key={`${period}-${i}`}
              layout
              className={`dm-bar${i === best ? " is-best" : ""}`}
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: 1, scaleY: 1 }}
              exit={{ opacity: 0, scaleY: 0 }}
              transition={{ duration: 0.55, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              onMouseEnter={() => setHover(i)}
            >
              <i style={{ transform: `scaleY(${v / max})` }} />
              {hover === i ? <em>S/ {fmt(v)}</em> : null}
              <small>{d.labels[i]}</small>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <p className="dm-dash__tip"><i aria-hidden="true">↗</i> {d.tip}</p>
    </Shell>
  );
};

export default DashDemo;
