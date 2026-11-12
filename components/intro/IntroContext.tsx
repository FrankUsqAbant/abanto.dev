import React, {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";

/* ------------------------------------------------------------------ */
/* Tipos                                                               */
/* ------------------------------------------------------------------ */

/**
 * Fases de la intro "en una sola toma":
 *  loading → cortina crema con la firma dibujándose; debajo, la página ya
 *            está montada en su layout final (todo en el primer fotograma
 *            de su animación, pausado) mientras cargan fuentes y foto.
 *  reveal  → la firma viaja al navbar, la cortina sube y el hero entra.
 *  done    → estado final sin animaciones.
 */
export const INTRO_PHASES = ["loading", "reveal", "done"] as const;

export type IntroPhase = (typeof INTRO_PHASES)[number];

/**
 * full  → primera visita de la sesión: toma completa (~3 s)
 * short → visitas siguientes: fundido de cortina + subida rápida (~1 s)
 * off   → movimiento reducido o la página no empezó en Inicio
 */
export type IntroMode = "full" | "short" | "off";

export interface IntroContextValue {
  phase: IntroPhase;
  mode: IntroMode;
  /** El visitante pidió saltar: lo que quede se acelera (fundido rápido). */
  skipped: boolean;
  /** Avanza a una fase posterior (nunca retrocede). */
  advance: (to: IntroPhase) => void;
  skip: () => void;
}

/* ------------------------------------------------------------------ */
/* Tiempos (ms)                                                        */
/* ------------------------------------------------------------------ */

export const INTRO_TIMING = {
  /** Máximo que se espera a fuentes + foto (la cortina sigue cubriendo). */
  readyMax: 1800,
  /** Máximo que se espera a la fuente de la firma antes de dibujarla. */
  signatureFontMax: 1400,
  /** Trazo de la firma y respiro antes de viajar. */
  draw: 1150,
  hold: 150,
  /** Visitas repetidas: espera máxima antes del fundido. */
  shortReadyMax: 600,
  /** Velocidad a la que se termina lo que falte al saltar. */
  skipRate: 7,
} as const;

const STORAGE_KEY = "fa-intro-seen-v2";

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

interface IntroProviderProps {
  /** Si es false, la página aparece directamente en su estado final. */
  enabled: boolean;
  children: React.ReactNode;
}

export const IntroProvider: React.FC<IntroProviderProps> = ({
  enabled,
  children,
}) => {
  // Se decide una sola vez, de forma síncrona, para que el primer
  // fotograma ya sea el de la intro (o el final).
  const [mode] = useState<IntroMode>(() => resolveMode(enabled));
  const [phase, setPhase] = useState<IntroPhase>(() =>
    mode === "off" ? "done" : "loading"
  );
  const [skipped, setSkipped] = useState(false);

  const advance = useCallback((to: IntroPhase) => {
    setPhase((cur) => (phaseIndex(to) > phaseIndex(cur) ? to : cur));
  }, []);

  const skip = useCallback(() => setSkipped(true), []);

  // La fase vive en <html> para que el CSS lo orqueste todo (antes del
  // primer pintado: useLayoutEffect).
  useLayoutEffect(() => {
    const root = document.documentElement;
    root.dataset.introPhase = phase;
    root.dataset.introMode = mode;
    if (phase === "done" && mode !== "off") markIntroSeen();
  }, [phase, mode]);

  // Cualquier clic, tecla, rueda o gesto acelera la intro hasta el final.
  useLayoutEffect(() => {
    if (phase === "done" || skipped) return;
    const opts: AddEventListenerOptions = { passive: true };
    const events: (keyof WindowEventMap)[] = [
      "pointerdown",
      "keydown",
      "wheel",
      "touchmove",
    ];
    events.forEach((e) => window.addEventListener(e, skip, opts));
    return () => events.forEach((e) => window.removeEventListener(e, skip, opts));
  }, [phase === "done", skipped, skip]); // eslint-disable-line react-hooks/exhaustive-deps

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
