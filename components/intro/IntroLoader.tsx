import { useEffect } from "react";
import { INTRO_TIMING, useIntro } from "./IntroContext";

interface IntroLoaderProps {
  /** Imágenes que deben estar decodificadas antes de empezar (p. ej. la foto del hero). */
  images?: string[];
}

/** Fuentes que se ven en la primera pantalla: se esperan para que no haya saltos por swap. */
const CRITICAL_FONTS = [
  '34px "La Belle Aurore"',
  '66px "Instrument Serif"',
  'italic 66px "Instrument Serif"',
  '13px "Inter"',
  '500 13px "Inter"',
];

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

/**
 * Precarga invisible de la intro: mientras está en "loading" la página ya
 * tiene su layout final (todo con opacity 0), así que aquí solo se espera
 * a que las fuentes y la foto estén listas para que nada cambie de tamaño
 * ni aparezca de golpe. Luego arranca la cabecera ("nav").
 */
const IntroLoader = ({ images = [] }: IntroLoaderProps): null => {
  const { mode, advance } = useIntro();
  const imagesKey = images.join("|");

  useEffect(() => {
    if (mode !== "full") return;
    let cancelled = false;
    const fonts =
      "fonts" in document
        ? Promise.all(CRITICAL_FONTS.map((f) => document.fonts.load(f).catch(() => undefined)))
            .then(() => document.fonts.ready)
            .then(() => undefined, () => undefined)
        : Promise.resolve();
    const imgs = Promise.all(imagesKey ? imagesKey.split("|").map(decodeImage) : []);
    const ready = Promise.all([fonts, imgs, wait(INTRO_TIMING.loaderMin)]);

    Promise.race([ready, wait(INTRO_TIMING.loaderMax)]).then(() => {
      // un frame extra para que el primer pintado con las fuentes ya esté hecho
      requestAnimationFrame(() => {
        if (!cancelled) advance("nav");
      });
    });
    return () => {
      cancelled = true;
    };
  }, [mode, imagesKey, advance]);

  return null;
};

export default IntroLoader;
