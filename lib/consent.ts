import { useSyncExternalStore } from "react";

/**
 * Consentimiento de cookies de terceros (hoy: el embed de Cal.com).
 * Se guarda en localStorage. Sin elección o con "rechazar", no se carga nada de terceros.
 */
export type Consent = "accepted" | "rejected" | null;

const KEY = "cookie-consent";
const listeners = new Set<() => void>();
let bannerOpen = false;

const read = (): Consent => {
  try {
    const v = window.localStorage.getItem(KEY);
    if (!v) return null;
    const parsed = JSON.parse(v) as { choice?: unknown };
    return parsed.choice === "accepted" || parsed.choice === "rejected" ? parsed.choice : null;
  } catch {
    return null;
  }
};

let current: Consent = typeof window === "undefined" ? null : read();
const emit = () => listeners.forEach((l) => l());

export const getConsent = (): Consent => current;
export const hasConsent = (): boolean => current === "accepted";

export const setConsent = (choice: Exclude<Consent, null>) => {
  current = choice;
  bannerOpen = false;
  try {
    window.localStorage.setItem(KEY, JSON.stringify({ choice, date: new Date().toISOString() }));
  } catch {
    /* almacenamiento no disponible: la elección vale solo para esta visita */
  }
  emit();
};

/** Reabre el aviso (enlace "Configurar cookies"). */
export const openConsentBanner = () => {
  bannerOpen = true;
  emit();
};

const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => listeners.delete(l);
};

export const useConsent = () => {
  const consent = useSyncExternalStore(subscribe, () => current, () => null);
  const open = useSyncExternalStore(subscribe, () => bannerOpen, () => false);
  return { consent, showBanner: open || consent === null };
};
