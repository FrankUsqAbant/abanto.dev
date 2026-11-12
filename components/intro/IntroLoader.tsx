import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { INTRO_TIMING, useIntro } from "./IntroContext";

interface IntroLoaderProps {
  /** Imágenes que deben estar decodificadas antes de salir (p. ej. la foto del hero). */
  images?: string[];
  /** Selector del logo del navbar hacia el que viaja la firma al salir. */
  logoSelector?: string;
}

const EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];
const SIGNATURE_FONT = '64px "La Belle Aurore"';
const WRITE_MS = 680;
const HOLD_MS = 220;

const wait = (ms: number) =>
  new Promise<void>((resolve) => window.setTimeout(resolve, ms));

/** Resuelve cuando la imagen está descargada y decodificada (o falla). */
const decodeImage = (src: string): Promise<void> =>
  new Promise<void>((resolve) => {
    const img = new Image();
    img.src = src;
    if (typeof img.decode === "function") {
      img.decode().then(() => resolve(), () => resolve());
    } else {
      img.onload = () => resolve();
      img.onerror = () => resolve();
    }
  });

interface ExitTarget {
  x: number;
  y: number;
  scale: number;
}

/**
 * Pantalla de carga: "Frank Abanto Dev" se escribe al centro mientras
 * cargan las fuentes y la foto. Al terminar, la firma viaja hasta el logo
 * del navbar y el fondo se desvanece.
 */
const IntroLoader: React.FC<IntroLoaderProps> = ({
  images = [],
  logoSelector = "[data-intro-logo]",
}) => {
  const { phase, mode, advance, showLogo } = useIntro();
  const [writing, setWriting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [exit, setExit] = useState<ExitTarget | null>(null);
  const [gone, setGone] = useState(false);
  const nameRef = useRef<HTMLSpanElement>(null);
  const imagesKey = images.join("|");

  const active = mode === "full" && phase !== "done" && !gone;

  useEffect(() => {
    if (mode !== "full") return;
    let cancelled = false;
    const start = performance.now();
    const tasks = 3;
    let doneTasks = 0;
    const tick = () => {
      doneTasks += 1;
      if (!cancelled) setProgress(doneTasks / tasks);
    };

    // 1) La firma empieza a escribirse en cuanto su fuente está lista (máx. 450 ms).
    const signatureFont =
      "fonts" in document
        ? document.fonts.load(SIGNATURE_FONT).then(() => undefined, () => undefined)
        : Promise.resolve();
    const written = Promise.race([signatureFont, wait(450)])
      .then(() => {
        if (!cancelled) setWriting(true);
        // escribe la firma y la deja respirar un instante antes de salir
        return wait(WRITE_MS + HOLD_MS);
      })
      .then(tick);

    // 2) Todas las fuentes de la página.
    const fonts = ("fonts" in document ? document.fonts.ready.then(() => undefined) : Promise.resolve()).then(
      tick,
      tick
    );

    // 3) Foto(s) del hero decodificadas.
    const imgs = Promise.all(imagesKey ? imagesKey.split("|").map(decodeImage) : []).then(tick);

    const ready = Promise.all([written, fonts, imgs, wait(INTRO_TIMING.loaderMin)]);
    const elapsedCap = Math.max(0, INTRO_TIMING.loaderMax - (performance.now() - start));

    Promise.race([ready, wait(elapsedCap)]).then(() => {
      if (cancelled) return;
      setProgress(1);
      // Calcula hacia dónde viaja la firma (logo del navbar).
      const name = nameRef.current;
      const logo = document.querySelector<HTMLElement>(logoSelector);
      let target: ExitTarget = { x: 0, y: -24, scale: 0.9 };
      if (name && logo) {
        const a = name.getBoundingClientRect();
        const b = logo.getBoundingClientRect();
        if (a.width > 0 && b.width > 0) {
          target = {
            x: b.left + b.width / 2 - (a.left + a.width / 2),
            y: b.top + b.height / 2 - (a.top + a.height / 2),
            scale: b.width / a.width,
          };
        }
      }
      setWriting(true);
      setExit(target);
      // La foto empieza a revelarse mientras la cortina se va.
      window.setTimeout(() => {
        if (!cancelled) advance("photo");
      }, INTRO_TIMING.loaderExit * 0.45);
    });

    return () => {
      cancelled = true;
    };
  }, [mode, imagesKey, logoSelector, advance]);

  if (!active) return null;

  const exiting = exit !== null;

  return createPortal(
    <motion.div
      className="intro-loader"
      role="status"
      aria-live="polite"
      aria-label="Cargando el sitio de Frank Abanto"
      initial={false}
      animate={{ opacity: exiting ? 0 : 1 }}
      transition={{
        duration: INTRO_TIMING.loaderExit / 1000,
        delay: exiting ? 0.12 : 0,
        ease: EASE,
      }}
      style={{ pointerEvents: exiting ? "none" : "auto" }}
    >
      <div className="intro-loader__sig" aria-hidden="true">
        <motion.span
          ref={nameRef}
          className="intro-loader__name"
          initial={false}
          animate={exit ? { x: exit.x, y: exit.y, scale: exit.scale } : { x: 0, y: 0, scale: 1 }}
          transition={{ duration: INTRO_TIMING.loaderExit / 1000, ease: EASE }}
          onAnimationComplete={() => {
            if (!exiting) return;
            showLogo();
            setGone(true);
          }}
        >
          <span className={`intro-loader__ink${writing ? " is-writing" : ""}`}>
            Frank Abanto
          </span>
        </motion.span>
        <motion.span
          className="intro-loader__dev"
          initial={false}
          animate={{ opacity: exiting ? 0 : 1, y: exiting ? -8 : 0 }}
          transition={{ duration: 0.3, ease: EASE }}
        >
          <span className={`intro-loader__dev-ink${writing ? " is-writing" : ""}`}>
            Dev
          </span>
        </motion.span>
      </div>

      <motion.div
        className="intro-loader__bar"
        aria-hidden="true"
        initial={false}
        animate={{ opacity: exiting ? 0 : 1 }}
        transition={{ duration: 0.25 }}
      >
        <span style={{ transform: `scaleX(${progress})` }} />
      </motion.div>
    </motion.div>,
    document.body
  );
};

export default IntroLoader;
