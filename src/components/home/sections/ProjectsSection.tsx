import React, { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import Reveal from "./Reveal";
import { GITHUB_REPOS_URL, initialProjects, refreshProjects, type Project } from "../../../lib/github";


/* ---------- Imagen: vista previa de GitHub o visual de respaldo ---------- */

const Fallback: React.FC<{ project: Project }> = ({ project }) => (
  <div className="ghv" aria-hidden="true">
    <span className="ghv__glyph">{"</>"}</span>
    <span className="ghv__lang">{project.language ?? project.topics[0] ?? "código"}</span>
    <i /><i /><i />
  </div>
);

const Media: React.FC<{ project: Project }> = ({ project }) => {
  // un reintento (otra clave de caché del servicio) antes del visual de respaldo
  const [attempt, setAttempt] = useState(0);
  const failed = attempt > 1;
  const src = attempt === 0 ? project.image : project.image.replace("/1/", "/2/");
  const host = (project.demoUrl ?? project.codeUrl).replace(/^https?:\/\//, "").replace(/\/$/, "");
  return (
    <div className="gh__media">
      <div className="gh__bar" aria-hidden="true">
        <span className="gh__dots"><i /><i /><i /></span>
        <span className="gh__url">{host}</span>
      </div>
      <div className="gh__shot">
      {failed ? (
        <Fallback project={project} />
      ) : (
        <img
          src={src}
          alt={project.realShot ? `Captura de ${project.title}` : `Vista previa del repositorio ${project.title} en GitHub`}
          loading="lazy"
          decoding="async"
          draggable={false}
          onError={() => setAttempt((a) => (project.realShot ? 2 : a + 1))}
        />
      )}
      </div>
    </div>
  );
};

/* ---------- Tarjeta ---------- */

const Card: React.FC<{ project: Project; active: boolean }> = ({ project, active }) => {
  const tab = active ? 0 : -1;
  return (
    <article className="gh" aria-labelledby={`gh-${project.id}`}>
      <Media project={project} />
      <div className="gh__body">
        <div className="gh__meta">
          <span className={`gh__status${project.status === "Activo" ? " is-live" : ""}`}><i />{project.status}</span>
          <ul className="gh__chips" aria-label="Tecnologías">
            {project.chips.map((c) => <li key={c}>{c}</li>)}
          </ul>
        </div>
        <h3 id={`gh-${project.id}`}>{project.title}</h3>
        <p>{project.description}</p>
        <div className="gh__links">
          <a className="gh__go" href={project.codeUrl} target="_blank" rel="noopener noreferrer" tabIndex={tab}>
            Código <span aria-hidden="true">↗</span><span className="sr-only"> de {project.title} en GitHub</span>
          </a>
          {project.demoUrl ? (
            <a className="gh__go gh__go--dark" href={project.demoUrl} target="_blank" rel="noopener noreferrer" tabIndex={tab}>
              Ver demo <span aria-hidden="true">↗</span><span className="sr-only"> de {project.title} (otra pestaña)</span>
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
};

/* ---------- Carrusel coverflow continuo ---------- */

/** Segundos por vuelta completa (se ajusta al número de proyectos). */
const LOOP_S = 50;
/** Separación entre tarjetas: fracción del ancho de una tarjeta. */
const GAP = 0.62;
/** Móvil (< 720px): pista plana, sin inclinación, tarjetas casi contiguas. */
const FLAT_GAP = 1.05;
const FLAT_MQ = "(max-width: 719px)";
const isFlat = () => typeof window !== "undefined" && window.matchMedia(FLAT_MQ).matches;
const gapNow = () => (isFlat() ? FLAT_GAP : GAP);

const wrap = (d: number, n: number) => {
  let r = ((d % n) + n) % n;
  if (r >= n / 2) r -= n;
  return r;
};

/** Coloca cada tarjeta según su distancia (continua) a la posición actual. */
const place = (el: HTMLElement, d: number, flat: boolean) => {
  const ad = Math.abs(d);
  const s = el.style;
  if (flat) {
    s.transform = `translate3d(${(d * FLAT_GAP * 100).toFixed(3)}%,0,0)`;
    s.opacity = (ad <= 1 ? 1 - ad * 0.15 : ad <= 1.6 ? 0.85 * ((1.6 - ad) / 0.6) : 0).toFixed(3);
  } else {
    s.transform = `translate3d(${(d * GAP * 100).toFixed(3)}%,0,0) scale(${(1 - Math.min(ad, 2) * 0.13).toFixed(4)}) rotateY(${(Math.max(-1, Math.min(1, d)) * -22).toFixed(2)}deg)`;
    s.opacity = (ad <= 1 ? 1 - ad * 0.22 : ad <= 2 ? 0.78 * (2 - ad) : 0).toFixed(3);
  }
  s.zIndex = String(Math.round(100 - ad * 10));
  s.pointerEvents = ad < (flat ? 0.6 : 1.6) ? "auto" : "none";
  s.visibility = ad > (flat ? 1.65 : 2.05) ? "hidden" : "visible";
};

const Carousel: React.FC<{ projects: Project[] }> = ({ projects }) => {
  const n = projects.length;
  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const slotRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Estado de movimiento (fuera de React: se actualiza en cada frame).
  const pos = useRef(0); // en «tarjetas»
  const vel = useRef(0); // tarjetas por segundo
  const nudge = useRef(0); // desplazamiento pendiente de las flechas
  const hold = useRef({ hover: false, focus: false, offscreen: true, paused: false });
  const drag = useRef<{ id: number; x: number; pos: number; lastX: number; lastT: number; v: number; moved: boolean } | null>(null);
  const suppressClick = useRef(false);
  /** Reanuda el bucle de animación (se detiene solo cuando el carrusel está quieto). */
  const wake = useRef<() => void>(() => {});

  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const activeRef = useRef(0);

  const base = n / LOOP_S;

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      hold.current.offscreen = !e.isIntersecting;
      wake.current();
    }, { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (n === 0) return;
    let raf = 0;
    let last = performance.now();
    const unit = () => (slotRefs.current[0]?.offsetWidth ?? 500) * gapNow();
    const mq = window.matchMedia(FLAT_MQ);

    const settled = (h: typeof hold.current) =>
      !drag.current &&
      nudge.current === 0 &&
      Math.abs(vel.current) < 1e-3 &&
      (n <= 1 || h.hover || h.focus || h.offscreen || h.paused || document.hidden);

    const frame = (now: number) => {
      const dt = Math.min(now - last, 64) / 1000;
      last = now;
      const h = hold.current;
      const dr = drag.current;

      if (!dr) {
        const target = n > 1 && !(h.hover || h.focus || h.offscreen || h.paused || document.hidden) ? base : 0;
        // inercia tras arrastrar: frena más despacio que el cambio normal
        const k = Math.abs(vel.current) > base * 1.5 ? 1.6 : 2.4;
        vel.current += (target - vel.current) * Math.min(1, dt * k);
        pos.current += vel.current * dt;
        if (nudge.current !== 0) {
          const step = nudge.current * Math.min(1, dt * 5);
          pos.current += step;
          nudge.current = Math.abs(nudge.current - step) < 0.001 ? 0 : nudge.current - step;
        }
      }
      pos.current = ((pos.current % n) + n) % n;

      slotRefs.current.forEach((el, i) => {
        if (el) place(el, wrap(i - pos.current, n), mq.matches);
      });
      const a = Math.round(pos.current) % n;
      if (a !== activeRef.current) {
        activeRef.current = a;
        setActive(a);
      }
      // Quieto (pausado, fuera de pantalla o pestaña oculta): no gastar frames.
      if (settled(h)) {
        vel.current = 0;
        raf = 0;
        return;
      }
      raf = requestAnimationFrame(frame);
    };
    wake.current = () => {
      if (raf) return;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    document.addEventListener("visibilitychange", wake.current);

    // Arrastre con puntero (ratón y táctil)
    const stage = stageRef.current;
    const down = (e: PointerEvent) => {
      if (e.button !== 0 || (e.target as HTMLElement).closest("a,button")) return;
      drag.current = { id: e.pointerId, x: e.clientX, pos: pos.current, lastX: e.clientX, lastT: performance.now(), v: 0, moved: false };
      nudge.current = 0;
      wake.current();
    };
    const move = (e: PointerEvent) => {
      const dr = drag.current;
      if (!dr || e.pointerId !== dr.id) return;
      const dx = e.clientX - dr.x;
      if (!dr.moved && Math.abs(dx) > 6) {
        dr.moved = true;
        stage?.setPointerCapture(e.pointerId);
      }
      if (!dr.moved) return;
      const t = performance.now();
      const inst = -(e.clientX - dr.lastX) / unit() / Math.max((t - dr.lastT) / 1000, 0.008);
      dr.v = dr.v * 0.6 + inst * 0.4;
      dr.lastX = e.clientX;
      dr.lastT = t;
      pos.current = dr.pos - dx / unit();
    };
    const up = (e: PointerEvent) => {
      const dr = drag.current;
      if (!dr || e.pointerId !== dr.id) return;
      drag.current = null;
      if (dr.moved) {
        vel.current = Math.max(-8, Math.min(8, dr.v)); // sigue deslizando desde donde lo soltaste
        suppressClick.current = true;
        window.setTimeout(() => {
          suppressClick.current = false;
        }, 0);
      }
    };
    stage?.addEventListener("pointerdown", down);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
    return () => {
      cancelAnimationFrame(raf);
      raf = 1; // evita que un wake tardío reanude un bucle desmontado
      document.removeEventListener("visibilitychange", wake.current);
      stage?.removeEventListener("pointerdown", down);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
    };
  }, [n, base]);

  const go = (step: number) => {
    // empuje suave hasta la tarjeta siguiente/anterior
    const target = Math.round(pos.current + nudge.current) + step;
    nudge.current = target - pos.current;
    wake.current();
  };

  return (
    <div
      ref={rootRef}
      className="ghc"
      role="region"
      aria-roledescription="carrusel"
      aria-label="Proyectos de GitHub"
      onPointerEnter={(e) => {
        if (e.pointerType === "mouse") hold.current.hover = true;
      }}
      onPointerLeave={() => {
        hold.current.hover = false;
        wake.current();
      }}
      onFocus={() => {
        hold.current.focus = true;
      }}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
          hold.current.focus = false;
          wake.current();
        }
      }}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(1);
        if (e.key === "ArrowLeft") go(-1);
      }}
    >
      <div ref={stageRef} className="ghc__stage" style={{ touchAction: "pan-y" }}>
        {projects.map((p, i) => {
          const isActive = i === active;
          return (
            <div
              key={p.id}
              ref={(el) => {
                slotRefs.current[i] = el;
              }}
              className="ghc__slot"
              aria-hidden={!isActive}
              role="group"
              aria-roledescription="diapositiva"
              aria-label={`${i + 1} de ${n}`}
              onClick={
                isActive
                  ? undefined
                  : () => {
                      if (!suppressClick.current) go(Math.round(wrap(i - pos.current, n)));
                    }
              }
            >
              <Card project={p} active={isActive} />
            </div>
          );
        })}
      </div>

      {n > 1 ? (
        <div className="ghc__ctrl">
          <button type="button" className="ghc__arrow" onClick={() => go(-1)} aria-label="Proyecto anterior">←</button>
          <button
            type="button"
            className="ghc__toggle"
            aria-pressed={paused}
            onClick={() => {
              hold.current.paused = !paused;
              wake.current();
              setPaused(!paused);
            }}
          >
            {paused ? "Reanudar" : "Pausar"}
          </button>
          <button type="button" className="ghc__arrow" onClick={() => go(1)} aria-label="Proyecto siguiente">→</button>
        </div>
      ) : null}
    </div>
  );
};

/* ---------- Sección ---------- */

const ProjectsSection: React.FC = () => {
  const reduce = useReducedMotion() ?? false;
  const [projects, setProjects] = useState<Project[]>(initialProjects);

  useEffect(() => {
    const ctrl = new AbortController();
    refreshProjects(ctrl.signal).then((fresh) => {
      if (fresh) setProjects(fresh);
    });
    return () => ctrl.abort();
  }, []);

  return (
    <section className="section section--alt" id="proyectos" aria-labelledby="proyectos-title">
      <div className="wrap">
        <Reveal as="header" className="sec-head sec-head--row">
          <div>
            <h2 className="h2" id="proyectos-title">
              Proyectos y <br />
              <em>laboratorio.</em>
            </h2>
          </div>
          <div className="sec-head__side">
            <p className="sec-head__sub">
              Lo que construyo y uso a diario. Cada sistema que ofrezco ya lo probé en mis propios proyectos.
            </p>
            <a className="link-arrow" href={GITHUB_REPOS_URL} target="_blank" rel="noopener noreferrer">
              Ver todos en GitHub <i aria-hidden="true">↗</i>
            </a>
          </div>
        </Reveal>

        <Reveal delay={80}>
          {projects.length === 0 ? (
            <div className="gh-empty">
              <span className="ghv__glyph" aria-hidden="true">{"</>"}</span>
              <h3>Pronto nuevos proyectos</h3>
              <p>Mientras tanto, puedes ver lo que estoy construyendo en GitHub.</p>
              <a className="gh__go gh__go--dark" href={GITHUB_REPOS_URL} target="_blank" rel="noopener noreferrer">
                Ir a GitHub <span aria-hidden="true">↗</span>
              </a>
            </div>
          ) : reduce ? (
            <div className="gh-grid">
              {projects.map((p) => <Card key={p.id} project={p} active />)}
            </div>
          ) : (
            <Carousel projects={projects} />
          )}
        </Reveal>
      </div>
    </section>
  );
};

export default ProjectsSection;
