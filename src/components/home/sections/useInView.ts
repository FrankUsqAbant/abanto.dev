import { useEffect, useState, type RefObject } from "react";

interface InViewOptions {
  /** Deja de observar tras la primera aparición. */
  once?: boolean;
  rootMargin?: string;
  threshold?: number;
}

/** true mientras el elemento está (o estuvo, con `once`) en pantalla. */
export const useInView = <T extends Element>(
  ref: RefObject<T | null>,
  { once = false, rootMargin = "0px 0px -10% 0px", threshold = 0.15 }: InViewOptions = {}
): boolean => {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) io.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { rootMargin, threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, once, rootMargin, threshold]);

  return inView;
};

/** Preferencia del sistema de reducir movimiento (se actualiza en vivo). */
export const usePrefersReducedMotion = (): boolean => {
  const query = "(prefers-reduced-motion: reduce)";
  const [reduce, setReduce] = useState(
    () => typeof window !== "undefined" && window.matchMedia(query).matches
  );
  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = () => setReduce(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduce;
};
