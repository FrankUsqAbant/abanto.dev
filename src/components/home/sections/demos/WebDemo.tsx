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
  ["Latte", "S/ 9"],
  ["Croissant", "S/ 7"],
  ["Cold brew", "S/ 11"],
];
const SPRING = { type: "spring", stiffness: 260, damping: 30 } as const;

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
              <b>Tu cafetería</b>
              <span aria-hidden="true"><i /><i /><i /></span>
            </m.div>
            <m.div layout="position" transition={SPRING} className={`dm-web__hero ${b(2)}`}>
              <h4>Café de especialidad, a un clic.</h4>
              <p>Pide por WhatsApp y recoge en minutos.</p>
              <span className="dm-web__btn">Pedir por WhatsApp</span>
            </m.div>
            <m.div layout transition={SPRING} className={`dm-web__cards ${b(3)}`}>
              {PRODUCTS.map(([n, p], i) => (
                <m.div layout transition={SPRING} key={n} className={`dm-web__card ${b(3 + (i > 0 ? 1 : 0))}`}>
                  <i aria-hidden="true" />
                  <b>{n}</b>
                  <small>{p}</small>
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
