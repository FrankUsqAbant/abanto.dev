import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

/* ------------------------------------------------------------------ */
/* Tipos                                                               */
/* ------------------------------------------------------------------ */

/** Fases de la intro, en orden. */
export const INTRO_PHASES = [
  "loading", // crema vacía (espacio ya reservado) mientras cargan fuentes y foto
  "nav", // aparece la cabecera: primero la firma, luego enlaces y botón
  "photo", // revelado de la foto
  "typing", // el titular se escribe solo
  "building", // la IA "construye" el resto de la interfaz
  "done", // estado final, sin animaciones de entrada
] as const;

export type IntroPhase = (typeof INTRO_PHASES)[number];

/**
 * full  → primera visita de la sesión: secuencia completa (~3.5–4 s)
 * short → visitas siguientes: solo el titular escribiéndose rápido (~1 s)
 * off   → movimiento reducido o la página no empezó en Inicio
 */
export type IntroMode = "full" | "short" | "off";

export interface IntroContextValue {
  phase: IntroPhase;
  mode: IntroMode;
  /** true si el visitante saltó la intro (todo debe aparecer sin animar). */
  skipped: boolean;
  /** Avanza a una fase posterior (nunca retrocede). */
  advance: (to: IntroPhase) => void;
  /** Salta al estado final al instante. */
  skip: () => void;
}

/* ------------------------------------------------------------------ */
/* Tiempos (ms)                                                        */
/* ------------------------------------------------------------------ */

export const INTRO_TIMING = {
  /** Espera mínima/máxima a fuentes + foto antes de empezar (nada se ve aún). */
  loaderMin: 150,
  loaderMax: 1800,
  /** Desde que empieza la cabecera hasta que empieza el hero. */
  navLead: 1150,
  /** Desde que empieza el revelado de la foto hasta que empieza a escribir. */
  photoLead: 280,
  photoReveal: 1000,
  /** Ms por carácter del titular (promedio). */
  typeFull: 17,
  typeShort: 11,
  linePause: 140,
  /** Construcción: retraso base, separación entre piezas y duración de cada una. */
  buildBase: 240,
  buildStagger: 90,
  buildFill: 720,
  buildTotal: 1750,
  buildTotalShort: 380,
} as const;

const STORAGE_KEY = "fa-intro-seen-v1";

export const phaseIndex = (p: IntroPhase): number => INTRO_PHASES.indexOf(p);
export const reached = (current: IntroPhase, target: IntroPhase): boolean =>
  phaseIndex(current) >= phaseIndex(target);

/* ------------------------------------------------------------------ */
/* Contexto                                                            */
/* ------------------------------------------------------------------ */

const noop = () => {};

/** Valor por defecto: sin proveedor, todo se muestra en su estado final. */
const DONE_VALUE: IntroContextValue = {
  phase: "done",
  mode: "off",
  skipped: false,
  advance: noop,
  skip: noop,
};

const IntroContext = createContext<IntroContextValue>(DONE_VALUE);

export const useIntro = (): IntroContextValue => useContext(IntroContext);

const prefersReducedMotion = (): boolean =>
  typeof window !== "undefined" &&
  typeof window.matchMedia === "function" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const hasSeenIntro = (): boolean => {
  try {
    return window.sessionStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
};

const markIntroSeen = () => {
  try {
    window.sessionStorage.setItem(STORAGE_KEY, "1");
  } catch {
    /* modo privado sin storage: no pasa nada */
  }
};

const resolveMode = (enabled: boolean): IntroMode => {
  if (!enabled || prefersReducedMotion()) return "off";
  return hasSeenIntro() ? "short" : "full";
};

const initialPhase = (mode: IntroMode): IntroPhase => {
  if (mode === "full") return "loading";
  if (mode === "short") return "typing";
  return "done";
};

interface IntroProviderProps {
  /** Si es false, la página aparece directamente en su estado final. */
  enabled: boolean;
  children: React.ReactNode;
}

export const IntroProvider: React.FC<IntroProviderProps> = ({
  enabled,
  children,
}) => {
  // Se decide una sola vez, de forma síncrona, para no mostrar un
  // fotograma del estado final antes de la intro.
  const [mode] = useState<IntroMode>(() => resolveMode(enabled));
  const [phase, setPhase] = useState<IntroPhase>(() => initialPhase(mode));
  const [skipped, setSkipped] = useState(false);
  const phaseRef = useRef(phase);
  phaseRef.current = phase;

  const advance = useCallback((to: IntroPhase) => {
    setPhase((cur) => (phaseIndex(to) > phaseIndex(cur) ? to : cur));
  }, []);

  const skip = useCallback(() => {
    if (phaseRef.current === "done") return;
    setSkipped(true);
    setPhase("done");
  }, []);

  // Expone la fase en <html> para estilos globales (p. ej. ocultar la barra de scroll).
  useLayoutEffect(() => {
    const root = document.documentElement;
    root.dataset.introPhase = phase;
    root.dataset.introMode = mode;
  }, [phase, mode]);

  // nav → photo: el hero llega cuando la cabecera ya casi terminó
  useEffect(() => {
    if (phase !== "nav") return;
    const id = window.setTimeout(() => advance("photo"), INTRO_TIMING.navLead);
    return () => window.clearTimeout(id);
  }, [phase, advance]);

  // photo → typing
  useEffect(() => {
    if (phase !== "photo") return;
    const id = window.setTimeout(() => advance("typing"), INTRO_TIMING.photoLead);
    return () => window.clearTimeout(id);
  }, [phase, advance]);

  // building → done
  useEffect(() => {
    if (phase !== "building") return;
    const ms =
      mode === "short" ? INTRO_TIMING.buildTotalShort : INTRO_TIMING.buildTotal;
    const id = window.setTimeout(() => advance("done"), ms);
    return () => window.clearTimeout(id);
  }, [phase, mode, advance]);

  // Al terminar (o saltar), la sesión ya vio la intro.
  useEffect(() => {
    if (phase === "done" && mode !== "off") {
      markIntroSeen();
    }
  }, [phase, mode]);

  // Cualquier clic, tecla, rueda o gesto salta la intro.
  useEffect(() => {
    if (phase === "done") return;
    const opts: AddEventListenerOptions = { passive: true };
    const events: (keyof WindowEventMap)[] = [
      "pointerdown",
      "keydown",
      "wheel",
      "touchmove",
    ];
    events.forEach((e) => window.addEventListener(e, skip, opts));
    return () => events.forEach((e) => window.removeEventListener(e, skip, opts));
  }, [phase === "done", skip]); // eslint-disable-line react-hooks/exhaustive-deps

  const value = useMemo<IntroContextValue>(
    () => ({ phase, mode, skipped, advance, skip }),
    [phase, mode, skipped, advance, skip]
  );

  return (
    <IntroContext.Provider value={value}>
      {children}
    </IntroContext.Provider>
  );
};
