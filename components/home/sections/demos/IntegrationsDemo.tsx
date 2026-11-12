import React, { useRef, useState } from "react";
import { Shell, useAuto, useLive } from "./kit";

type AppId = "wa" | "sheets" | "crm" | "shop";

const HUB = { x: 160, y: 112 };
const APPS: Record<AppId, { name: string; x: number; y: number; color: string; to: AppId[]; say: string; icon: React.ReactNode }> = {
  wa: { name: "WhatsApp", x: 46, y: 42, color: "#3a9b5c", to: ["crm", "sheets"], say: "Pedido por WhatsApp → contacto en el CRM y fila nueva en Sheets", icon: <path d="M5 19l1.3-3.6A7 7 0 1 1 9 18.3z" /> },
  sheets: { name: "Sheets", x: 274, y: 42, color: "#4f8a5b", to: ["shop"], say: "Cambias un precio en Sheets → se actualiza en tu tienda online", icon: <path d="M6 4h12v16H6zM6 9h12M6 14h12M11 4v16" /> },
  crm: { name: "CRM", x: 46, y: 182, color: "#3f6c8f", to: ["wa"], say: "Cliente nuevo en el CRM → mensaje de bienvenida por WhatsApp", icon: <path d="M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM3 20c0-3 3-5 6-5s6 2 6 5M16 11a2.5 2.5 0 1 0 0-5M21 19c0-2-1.5-3.6-4-4" /> },
  shop: { name: "Tienda", x: 274, y: 182, color: "#8a5a3b", to: ["sheets", "wa"], say: "Venta en la tienda → stock en Sheets y confirmación por WhatsApp", icon: <path d="M5 8h14l-1 12H6zM9 8V6a3 3 0 0 1 6 0v2" /> },
};
const ORDER: AppId[] = ["wa", "shop", "crm", "sheets"];
type V = React.CSSProperties & Record<`--${string}`, string>;

/** Integraciones: apps conectadas a tu negocio; al tocar una, los datos viajan a las demás. */
const IntegrationsDemo: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const { live, reduce } = useLive(ref);
  const [src, setSrc] = useState<AppId | null>(null);
  const [run, setRun] = useState(0);
  const [touched, setTouched] = useState(false);
  const idx = useRef(0);

  const fire = (id: AppId) => {
    setSrc(id);
    setRun((r) => r + 1);
  };
  useAuto(live && !touched, 3600, () => {
    fire(ORDER[idx.current % ORDER.length]);
    idx.current++;
  }, 500);

  const active = new Set<AppId>(src ? [src, ...APPS[src].to] : []);
  const pct = (v: number, of: number) => `${(v / of) * 100}%`;

  return (
    <Shell ref={ref} label="tus apps conectadas entre sí" title="Integraciones · Tu negocio" className="dm-int">
      <div className="dm-int__stage">
        <svg viewBox="0 0 320 224" aria-hidden="true">
          {(Object.keys(APPS) as AppId[]).map((id) => (
            <line key={id} x1={APPS[id].x} y1={APPS[id].y} x2={HUB.x} y2={HUB.y} className={active.has(id) ? "is-on" : ""} />
          ))}
          {src && !reduce
            ? APPS[src].to.map((t, i) => {
                const s: V = {
                  "--x0": `${APPS[src].x}px`, "--y0": `${APPS[src].y}px`,
                  "--xh": `${HUB.x}px`, "--yh": `${HUB.y}px`,
                  "--x1": `${APPS[t].x}px`, "--y1": `${APPS[t].y}px`,
                  "--d": `${i * 180}ms`, fill: APPS[src].color,
                };
                return [0, 1, 2].map((k) => (
                  <circle key={`${run}-${t}-${k}`} r={4 - k} className="dm-pkt" style={{ ...s, animationDelay: `${i * 180 + k * 110}ms` }} />
                ));
              })
            : null}
        </svg>
        <span className="dm-hub" style={{ left: pct(HUB.x, 320), top: pct(HUB.y, 224) }} key={`hub-${run}`}>
          Tu negocio
        </span>
        {(Object.keys(APPS) as AppId[]).map((id) => {
          const a = APPS[id];
          return (
            <button
              key={id}
              type="button"
              className={`dm-app${src === id ? " is-src" : active.has(id) ? " is-to" : ""}`}
              style={{ left: pct(a.x, 320), top: pct(a.y, 224), "--c": a.color } as React.CSSProperties}
              aria-pressed={src === id}
              onClick={() => {
                setTouched(true);
                fire(id);
              }}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">{a.icon}</svg>
              <span>{a.name}</span>
            </button>
          );
        })}
      </div>
      <p className="dm-int__say" aria-live="polite">{src ? APPS[src].say : "Toca una app para ver cómo viajan los datos."}</p>
    </Shell>
  );
};

export default IntegrationsDemo;
