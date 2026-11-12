/**
 * Cal.com: popup de reserva embebido (snippet oficial de embed.js, sin dependencias).
 * Si el script no carga (bloqueador, sin red…), los enlaces abren la página de
 * Cal.com en otra pestaña (comportamiento por defecto del <a target="_blank">).
 */

export const CAL_USERNAME = "franquer-abanto-i45gjj";
export const CAL_EVENT_SLUG = "30min"; // "Reunión de 30 min"
export const CAL_LINK = `${CAL_USERNAME}/${CAL_EVENT_SLUG}`;
export const CAL_URL = `https://cal.com/${CAL_LINK}`;

const CAL_NAMESPACE = "llamada30";
const CAL_ORIGIN = "https://app.cal.com";
const CAL_SCRIPT = `${CAL_ORIGIN}/embed/embed.js`;
const BRAND = "#1b1a19"; // mismo tono que la píldora oscura "Agendar llamada"

type CalArgs = unknown[];

interface CalQueue {
  (...args: CalArgs): void;
  q: CalArgs[];
}

interface CalGlobal extends CalQueue {
  ns: Record<string, CalQueue>;
  loaded: boolean;
}

declare global {
  interface Window {
    Cal?: CalGlobal;
  }
}

type Status = "idle" | "loading" | "ready" | "failed";
let status: Status = "idle";
let readyPromise: Promise<boolean> | null = null;

const makeQueue = (): CalQueue => {
  const fn = ((...args: CalArgs) => {
    fn.q.push(args);
  }) as CalQueue;
  fn.q = [];
  return fn;
};

/** Crea la cola global igual que el snippet oficial, pero cargando el script nosotros. */
const installStub = (): CalGlobal => {
  if (window.Cal) return window.Cal;
  const cal = ((...args: CalArgs) => {
    if (args[0] === "init" && typeof args[1] === "string") {
      const name = args[1];
      cal.ns[name] = cal.ns[name] ?? makeQueue();
      cal.ns[name].q.push(args);
      cal.q.push(["initNamespace", name]);
      return;
    }
    cal.q.push(args);
  }) as CalGlobal;
  cal.q = [];
  cal.ns = {};
  cal.loaded = true; // el script lo insertamos nosotros (con onload/onerror)
  window.Cal = cal;
  return cal;
};

/** Carga embed.js una sola vez. Resuelve true si quedó listo. */
export const loadCalEmbed = (): Promise<boolean> => {
  if (readyPromise) return readyPromise;
  if (typeof window === "undefined") return Promise.resolve(false);
  status = "loading";
  readyPromise = new Promise<boolean>((resolve) => {
    const cal = installStub();
    cal("init", CAL_NAMESPACE, { origin: CAL_ORIGIN });
    cal.ns[CAL_NAMESPACE]("ui", {
      theme: "light",
      hideEventTypeDetails: false,
      layout: "month_view",
      cssVarsPerTheme: {
        light: { "cal-brand": BRAND },
        dark: { "cal-brand": "#f4f2ee" },
      },
    });

    const script = document.createElement("script");
    script.src = CAL_SCRIPT;
    script.async = true;
    const timer = window.setTimeout(() => {
      status = "failed";
      resolve(false);
    }, 10000);
    script.onload = () => {
      window.clearTimeout(timer);
      status = "ready";
      resolve(true);
    };
    script.onerror = () => {
      window.clearTimeout(timer);
      status = "failed";
      resolve(false);
    };
    document.head.appendChild(script);
  });
  return readyPromise;
};

export const isCalReady = () => status === "ready";

/**
 * Abre el popup. Devuelve false si el embed no está disponible
 * (el llamador deja entonces que el enlace abra la pestaña nueva).
 */
export const openCalPopup = (): boolean => {
  const api = window.Cal?.ns[CAL_NAMESPACE];
  if (status !== "ready" || !api) return false;
  api("modal", {
    calLink: CAL_LINK,
    calOrigin: "https://cal.com",
    config: { layout: "month_view", theme: "light" },
  });
  return true;
};
