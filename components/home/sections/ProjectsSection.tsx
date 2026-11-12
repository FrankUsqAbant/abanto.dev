import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, type PanInfo } from "framer-motion";
import Reveal from "./Reveal";
import { GITHUB_REPOS_URL, initialProjects, refreshProjects, type Project } from "../../../lib/github";

const AUTO_MS = 5000;
const SPRING = { type: "spring", stiffness: 260, damping: 32, mass: 0.9 } as const;

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
  return (
    <div className="gh__media">
      {failed ? (
        <Fallback project={project} />
      ) : (
        <img
          src={src}
          alt={`Vista previa del repositorio ${project.title} en GitHub`}
          decoding="async"
          draggable={false}
          onError={() => setAttempt((a) => a + 1)}
        />
      )}
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

/* ---------- Carrusel coverflow ---------- */

const offsetOf = (i: number, active: number, n: number) => {
  let d = (((i - active) % n) + n) % n;
  if (d > n / 2) d -= n;
  return d;
};

const Carousel: React.FC<{ projects: Project[] }> = ({ projects }) => {
  const n = projects.length;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const go = useCallback((step: number) => setActive((a) => (((a + step) % n) + n) % n), [n]);

  useEffect(() => {
    if (active >= n) setActive(0);
  }, [n, active]);

  // Avance automático: se pausa con hover/foco, pestaña oculta o fuera de pantalla.
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  useEffect(() => {
    if (paused || !inView || n < 2) return;
    const id = window.setInterval(() => {
      if (!document.hidden) go(1);
    }, AUTO_MS);
    return () => window.clearInterval(id);
  }, [paused, inView, n, go, active]);

  const panned = useRef(false);
  const onPanEnd = (_: PointerEvent | MouseEvent | TouchEvent, info: PanInfo) => {
    // evita que el click al soltar active la tarjeta lateral
    panned.current = true;
    window.setTimeout(() => {
      panned.current = false;
    }, 0);
    if (Math.abs(info.offset.x) < 50 && Math.abs(info.velocity.x) < 400) return;
    go(info.offset.x < 0 ? 1 : -1);
  };

  return (
    <div
      ref={rootRef}
      className="ghc"
      role="region"
      aria-roledescription="carrusel"
      aria-label="Proyectos de GitHub"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setPaused(false);
      }}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(1);
        if (e.key === "ArrowLeft") go(-1);
      }}
    >
      <motion.div className="ghc__stage" onPanEnd={onPanEnd} style={{ touchAction: "pan-y" }}>
        {projects.map((p, i) => {
          const d = offsetOf(i, active, n);
          const ad = Math.abs(d);
          const shown = ad <= 2;
          return (
            <motion.div
              key={p.id}
              className="ghc__slot"
              aria-hidden={d !== 0}
              role="group"
              aria-roledescription="diapositiva"
              aria-label={`${i + 1} de ${n}`}
              initial={false}
              animate={{
                x: `${d * 62}%`,
                scale: 1 - Math.min(ad, 2) * 0.13,
                rotateY: d === 0 ? 0 : d > 0 ? -22 : 22,
                opacity: shown ? (ad === 0 ? 1 : ad === 1 ? 0.78 : 0) : 0,
                filter: ad === 0 ? "saturate(1)" : "saturate(0.7)",
              }}
              transition={SPRING}
              style={{ zIndex: 10 - ad, pointerEvents: shown ? "auto" : "none" }}
              onClick={d !== 0 ? () => !panned.current && go(d) : undefined}
            >
              <Card project={p} active={d === 0} />
            </motion.div>
          );
        })}
      </motion.div>

      {n > 1 ? (
        <div className="ghc__ctrl">
          <button type="button" className="ghc__arrow" onClick={() => go(-1)} aria-label="Proyecto anterior">←</button>
          <div className="ghc__dots">
            {projects.map((p, i) => (
              <button
                key={p.id}
                type="button"
                className={`ghc__dot${i === active ? " is-active" : ""}`}
                aria-label={`Ir a ${p.title}`}
                aria-current={i === active}
                onClick={() => setActive(i)}
              >
                {i === active && !paused ? <i key={active} style={{ animationDuration: `${AUTO_MS}ms` }} /> : null}
              </button>
            ))}
          </div>
          <button type="button" className="ghc__arrow" onClick={() => go(1)} aria-label="Proyecto siguiente">→</button>
        </div>
      ) : null}
      <p className="sr-only" aria-live="polite">{projects[active]?.title}</p>
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
