import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { INTRO_TIMING, useIntro } from "./IntroContext";

interface IntroLoaderProps {
  /** Imágenes que deben estar decodificadas antes de levantar la cortina. */
  images?: string[];
  /** Logo del navbar al que viaja la firma. */
  logoSelector?: string;
}

const SIGNATURE_FONT = '96px "La Belle Aurore"';
/** Fuentes visibles en la primera pantalla: se esperan bajo la cortina. */
const CRITICAL_FONTS = [
  SIGNATURE_FONT,
  '66px "Instrument Serif"',
  'italic 66px "Instrument Serif"',
  '13px "Inter"',
  '500 13px "Inter"',
];

const wait = (ms: number) =>
  new Promise<void>((resolve) => window.setTimeout(resolve, ms));
const nextFrame = () =>
  new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));

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

const loadFonts = (): Promise<void> =>
  "fonts" in document
    ? Promise.all(CRITICAL_FONTS.map((f) => document.fonts.load(f).catch(() => undefined)))
        .then(() => document.fonts.ready)
        .then(() => undefined, () => undefined)
    : Promise.resolve();

/** Animaciones CSS de la intro (todas se llaman `ix-*`). */
const introAnimations = (): Animation[] =>
  document
    .getAnimations()
    .filter(
      (a) => typeof CSSAnimation !== "undefined" && a instanceof CSSAnimation && a.animationName.startsWith("ix-")
    );

/** Caja de los glifos de un elemento (independiente de padding y line-height). */
const textRect = (el: Element): DOMRect => {
  const range = document.createRange();
  range.selectNodeContents(el);
  return range.getBoundingClientRect();
};

/**
 * Cortina + firma de la intro en una sola toma.
 * La página entera ya está debajo en su layout final; el CSS (intro.css)
 * tiene cada pieza pausada en su primer fotograma mientras la fase es
 * "loading" y las suelta todas a la vez en "reveal".
 */
const IntroLoader: React.FC<IntroLoaderProps> = ({
  images = [],
  logoSelector = "[data-intro-logo]",
}) => {
  const { phase, mode, skipped, advance } = useIntro();
  const [drawing, setDrawing] = useState(false);
  const sigRef = useRef<HTMLSpanElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);
  const started = useRef(false);
  const imagesKey = images.join("|");

  /** FLIP: mide la firma y el logo del navbar y arranca la toma. */
  const startReveal = useCallback(() => {
    if (started.current) return;
    started.current = true;
    const sig = sigRef.current;
    const logo = document.querySelector<HTMLElement>(logoSelector);
    if (sig && logo) {
      const from = textRect(sig);
      const to = textRect(logo);
      const box = sig.getBoundingClientRect(); // origen de la transformación: 0 0
      if (from.width > 0 && to.width > 0) {
        const s = to.width / from.width;
        const tx = to.left - (box.left + s * (from.left - box.left));
        const ty = to.top - (box.top + s * (from.top - box.top));
        sig.style.setProperty("--fly-x", `${tx.toFixed(2)}px`);
        sig.style.setProperty("--fly-y", `${ty.toFixed(2)}px`);
        sig.style.setProperty("--fly-s", s.toFixed(4));
      }
    }
    advance("reveal");
  }, [advance, logoSelector]);

  // Mismo color que el logo real para que el fundido final sea invisible.
  useLayoutEffect(() => {
    const logo = document.querySelector<HTMLElement>(logoSelector);
    if (logo && layerRef.current) layerRef.current.style.color = getComputedStyle(logo).color;
  }, [logoSelector]);

  // Espera bajo la cortina: firma dibujada + fuentes + foto (con tope).
  useEffect(() => {
    if (mode === "off") return;
    let cancelled = false;
    const full = mode === "full";
    const ready = Promise.race([
      Promise.all([
        loadFonts(),
        Promise.all(imagesKey ? imagesKey.split("|").map(decodeImage) : []),
      ]),
      wait(full ? INTRO_TIMING.readyMax : INTRO_TIMING.shortReadyMax),
    ]);
    const drawn = full
      ? Promise.race([
          "fonts" in document ? document.fonts.load(SIGNATURE_FONT).catch(() => undefined) : Promise.resolve(),
          wait(INTRO_TIMING.signatureFontMax),
        ]).then(() => {
          if (!cancelled) setDrawing(true);
          return wait(INTRO_TIMING.draw + INTRO_TIMING.hold);
        })
      : Promise.resolve();
    Promise.all([ready, drawn])
      .then(nextFrame)
      .then(() => {
        if (!cancelled) startReveal();
      });
    return () => {
      cancelled = true;
    };
  }, [mode, imagesKey, startReveal]);

  // Fin de la toma: cuando todas las animaciones ix-* terminan → done.
  useEffect(() => {
    if (phase !== "reveal") return;
    let cancelled = false;
    nextFrame()
      .then(nextFrame)
      .then(() =>
        Promise.race([
          Promise.all(introAnimations().map((a) => a.finished.catch(() => undefined))),
          wait(6000),
        ])
      )
      .then(() => {
        if (!cancelled) advance("done");
      });
    return () => {
      cancelled = true;
    };
  }, [phase, advance]);

  // Saltar: arranca (si aún esperaba) y acelera lo que falte → fundido rápido.
  useEffect(() => {
    if (!skipped || phase === "done") return;
    setDrawing(true);
    startReveal();
    nextFrame()
      .then(nextFrame)
      .then(() =>
        introAnimations().forEach((a) => a.updatePlaybackRate(INTRO_TIMING.skipRate))
      );
  }, [skipped]); // eslint-disable-line react-hooks/exhaustive-deps

  if (mode === "off" || phase === "done") return null;

  return createPortal(
    <>
      <div className="ix-curtain" aria-hidden="true" />
      {mode === "full" ? (
        <div ref={layerRef} className={`ix-sig-layer${drawing ? "" : " is-waiting"}`} aria-hidden="true">
          <span ref={sigRef} className="ix-sig">
            <span className={`ix-sig__ink${drawing ? " is-drawing" : ""}`}>Frank Abanto</span>
          </span>
        </div>
      ) : null}
      <span className="sr-only" role="status">
        Cargando el sitio de Frank Abanto
      </span>
    </>,
    document.body
  );
};

export default IntroLoader;
