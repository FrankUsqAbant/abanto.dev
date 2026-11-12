import React, { useEffect, useRef, useState } from "react";
import { m } from "framer-motion";
import { Shell, useAuto, useLive, useTimers } from "./kit";

const COLORS = [
  { name: "Café", c: "#8a5a3b" },
  { name: "Oliva", c: "#5b7b5a" },
  { name: "Mar", c: "#3f6c8f" },
  { name: "Vino", c: "#8e3b4f" },
];

const PRODUCTS = [
  { id: "latte", name: "Latte", price: "S/ 9", desc: "Espresso y leche" },
  { id: "croissant", name: "Croissant", price: "S/ 7", desc: "Horneado del día" },
  { id: "cold", name: "Cold brew", price: "S/ 11", desc: "12 h de infusión" },
] as const;

const NAV = ["Carta", "Pedidos", "Horario"] as const;
const SPRING = { type: "spring", stiffness: 260, damping: 30 } as const;

type ProductId = (typeof PRODUCTS)[number]["id"];

const LogoMark: React.FC = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M8.6 3.4c.7 1-.3 1.6.3 2.6" fill="none" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" />
    <path d="M12 3c.7 1-.3 1.6.3 2.6" fill="none" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" />
    <path d="M15.4 3.4c.7 1-.3 1.6.3 2.6" fill="none" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" />
    <path d="M6.4 9.1h9.4v6.3a3.7 3.7 0 0 1-3.7 3.7h-2a3.7 3.7 0 0 1-3.7-3.7V9.1Z" fill="currentColor" />
    <path d="M15.8 10.3h1.55a2.15 2.15 0 1 1 0 4.3H15.8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M7.2 20.3h9.6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const HeroArt: React.FC = () => (
  <svg viewBox="0 0 160 160" className="dm-web__art" aria-hidden="true">
    <path d="M66 50c5-10-4-14 1-24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" opacity=".4" />
    <path d="M80 46c5-10-4-14 1-24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" opacity=".5" />
    <path d="M93 50c5-10-4-14 1-24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" opacity=".4" />
    <ellipse cx="78" cy="132" rx="50" ry="9" fill="currentColor" opacity=".16" />
    <ellipse cx="78" cy="129" rx="36" ry="5.5" fill="currentColor" opacity=".1" />
    <path d="M108 76c18 2 20 32 1 36" fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="round" />
    <path d="M46 68h64l-7 50a24 24 0 0 1-24 20h-2a24 24 0 0 1-24-20L46 68Z" fill="currentColor" />
    <ellipse cx="78" cy="70" rx="28" ry="9" fill="#f7f1e8" />
    <path d="M78 67.5c-5.2-6.8 6.8-9 7.2-2.6.4-6.4 12.4-4.2 7.2 2.6C88.4 73 78 81 78 81s-10.4-8-14.4-13.5Z" fill="currentColor" opacity=".55" />
    <g fill="currentColor">
      <ellipse cx="28" cy="110" rx="9" ry="5.6" transform="rotate(-32 28 110)" opacity=".62" />
      <ellipse cx="42" cy="122" rx="7.5" ry="4.6" transform="rotate(18 42 122)" opacity=".4" />
      <ellipse cx="132" cy="116" rx="8" ry="5" transform="rotate(28 132 116)" opacity=".45" />
    </g>
    <path d="M23 108.5c4 2.4 9 3.6 11 4" fill="none" stroke="#f7f1e8" strokeWidth="1" opacity=".55" />
  </svg>
);

const ProductThumb: React.FC<{ id: ProductId }> = ({ id }) => {
  if (id === "latte") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M9 8c.6.9-.2 1.4.2 2.3M13 7.4c.6.9-.2 1.4.2 2.3M17 8c.6.9-.2 1.4.2 2.3" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M7 12.2h14.5v8.2A4.6 4.6 0 0 1 16.9 25h-5.3A4.6 4.6 0 0 1 7 20.4v-8.2Z" fill="currentColor" opacity=".9" />
        <ellipse cx="14.2" cy="12.4" rx="6.2" ry="2.1" fill="#f7f1e8" />
        <path d="M21.5 13.6h2.1a2.5 2.5 0 1 1 0 5h-2.1" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M9 27.4h12" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    );
  }
  if (id === "croissant") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M6 22c2-10 10-16 20-16-2 6-2 12 0 18-8 2-16-1-20-2Z" fill="currentColor" opacity=".92" />
        <path d="M10 21c5-1 10-1 14.5.6M12 17c4-.8 8-.6 12 1.2M14.2 13.4c3-.6 6-.3 9 1.2" fill="none" stroke="#f7f1e8" strokeWidth="1.15" strokeLinecap="round" opacity=".7" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path d="M11 6h10l1.4 18.5A4.2 4.2 0 0 1 18.2 29h-4.4a4.2 4.2 0 0 1-4.2-4.5L11 6Z" fill="currentColor" opacity=".9" />
      <path d="M12.2 8.2h7.6v4.2c0 1.8-7.6 1.8-7.6 0V8.2Z" fill="#f7f1e8" opacity=".55" />
      <rect x="13" y="10.2" width="3.2" height="3.2" rx=".7" fill="#f7f1e8" opacity=".9" transform="rotate(-12 14.6 11.8)" />
      <rect x="16.4" y="9.4" width="2.6" height="2.6" rx=".6" fill="#f7f1e8" opacity=".75" transform="rotate(16 17.7 10.7)" />
      <path d="M21 8.5c4 .6 5.6 4 4.2 8.2" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
};

const ChatIcon: React.FC = () => (
  <svg viewBox="0 0 16 16" aria-hidden="true">
    <path d="M8 1.6A6.4 6.4 0 0 0 2.3 11.2L1.5 14.5l3.4-.8A6.4 6.4 0 1 0 8 1.6Z" fill="currentColor" />
    <path d="M5.6 5.3c.2-.4.4-.4.6-.4h.5c.2 0 .4.1.5.4l.6 1.4c.1.2 0 .4-.1.5l-.4.4c-.1.1-.1.3 0 .4a5 5 0 0 0 1.6 1.6c.2.1.3.1.4 0l.4-.4c.2-.2.4-.2.5-.1l1.4.6c.3.1.4.3.4.5v.5c0 .2 0 .4-.4.6A3.2 3.2 0 0 1 8.4 12 4.8 4.8 0 0 1 5.2 6c0-.3.2-.6.4-.7Z" fill="#fff" />
  </svg>
);

/** Páginas web: mini navegador que se arma solo; vista escritorio/móvil y color de marca en vivo. */
const WebDemo: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const { live, reduce } = useLive(ref);
  const [mobile, setMobile] = useState(false);
  const [color, setColor] = useState(0);
  const [step, setStep] = useState(reduce ? 4 : 0);
  const [touched, setTouched] = useState(false);
  const tick = useRef(0);
  const timers = useTimers();

  // Se arma por bloques la primera vez que entra en pantalla.
  useEffect(() => {
    if (reduce) return setStep(4);
    if (!live || step >= 4) return;
    for (let i = step + 1; i <= 4; i++) timers.set(() => setStep(i), (i - step) * 320);
    return timers.clear;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [live, reduce]);

  useAuto(live && !touched && step >= 4, 2600, () => {
    tick.current++;
    if (tick.current % 3 === 0) setMobile((m) => !m);
    else setColor((c) => (c + 1) % COLORS.length);
  });

  const b = (n: number) => `dm-b${step >= n ? " on" : ""}`;
  const user = (fn: () => void) => () => {
    setTouched(true);
    fn();
  };

  return (
    <Shell ref={ref} label="página web que se adapta" title="tucafeteria.pe" className="dm-web">
      <div className="dm-web__ctrls">
        <div className="dm-seg" role="group" aria-label="Vista">
          <button type="button" aria-pressed={!mobile} onClick={user(() => setMobile(false))}>Escritorio</button>
          <button type="button" aria-pressed={mobile} onClick={user(() => setMobile(true))}>Móvil</button>
        </div>
        <div className="dm-sw" role="group" aria-label="Color de marca">
          {COLORS.map((c, i) => (
            <button
              key={c.name}
              type="button"
              aria-label={`Color ${c.name}`}
              aria-pressed={color === i}
              style={{ "--c": c.c } as React.CSSProperties}
              onClick={user(() => setColor(i))}
            />
          ))}
        </div>
      </div>
      <div className="dm-web__stage">
        <m.div
          layout
          transition={SPRING}
          className={`dm-web__frame${mobile ? " is-m" : ""}`}
          style={{ "--brand": COLORS[color].c } as React.CSSProperties}
        >
          <m.div layout="position" transition={SPRING} className="dm-web__bar" aria-hidden="true">
            <span className="dm-dots"><i /><i /><i /></span>
            <span>tucafeteria.pe</span>
          </m.div>
          <m.div layout transition={SPRING} className="dm-web__page">
            <m.div layout="position" transition={SPRING} className={`dm-web__nav ${b(1)}`}>
              <span className="dm-web__brand">
                <span className="dm-web__logo"><LogoMark /></span>
                <b>Tu cafetería</b>
              </span>
              <span className="dm-web__menu" aria-hidden="true">
                {NAV.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </span>
              <span className="dm-web__burger" aria-hidden="true"><i /><i /><i /></span>
            </m.div>
            <m.div layout="position" transition={SPRING} className={`dm-web__hero ${b(2)}`}>
              <div className="dm-web__copy">
                <span className="dm-web__chip">
                  <svg viewBox="0 0 12 12" aria-hidden="true">
                    <path d="M6 1.2 7.4 4l3.1.4-2.3 2.1.6 3.1L6 8.2 3.2 9.6l.6-3.1L1.5 4.4 4.6 4 6 1.2Z" fill="currentColor" />
                  </svg>
                  4.9
                  <i />
                  <span className="dm-web__hrs">Abierto ahora · 7–20 h</span>
                </span>
                <h4>Café de especialidad, a un clic.</h4>
                <p>Pide por WhatsApp y recoge en minutos.</p>
                <span className="dm-web__btn"><ChatIcon />Pedir por WhatsApp</span>
              </div>
              <div className="dm-web__visual" aria-hidden="true">
                <HeroArt />
              </div>
            </m.div>
            <m.div layout transition={SPRING} className={`dm-web__cards ${b(3)}`}>
              {PRODUCTS.map((p, i) => (
                <m.div layout transition={SPRING} key={p.id} className={`dm-web__card ${b(3 + (i > 0 ? 1 : 0))}`}>
                  <span className={`dm-web__thumb is-${p.id}`} aria-hidden="true">
                    <ProductThumb id={p.id} />
                  </span>
                  <span className="dm-web__meta">
                    <b>{p.name}</b>
                    <small>{p.desc}</small>
                  </span>
                  <em>{p.price}</em>
                </m.div>
              ))}
            </m.div>
          </m.div>
        </m.div>
      </div>
    </Shell>
  );
};

export default WebDemo;
