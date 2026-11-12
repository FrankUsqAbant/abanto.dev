import React, { useState } from "react";
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "framer-motion";
import Reveal from "./Reveal";
import {
  LAB_CATEGORIES,
  LAB_PROJECTS,
  type LabCategory,
  type LabProject,
  type LabStatus,
  type LabVisual,
} from "../../../data/homeProjects";

type Filter = LabCategory | "all";

const INITIAL = 6;
const PILL = { type: "spring", stiffness: 420, damping: 34 } as const;
const STATUS_CLASS: Record<LabStatus, string> = {
  "En uso": "is-live",
  Demo: "is-demo",
  "En desarrollo": "is-wip",
};

/* ---------- Mini-visuales (sin capturas falsas) ---------- */

const Visual: React.FC<{ kind: LabVisual }> = ({ kind }) => {
  switch (kind) {
    case "telegram":
      return (
        <div className="lv lv--chat">
          <span className="lv__b lv__b--in">/estado</span>
          <span className="lv__b lv__b--out">Todo en orden ✓</span>
          <span className="lv__b lv__b--in lv__b--typing"><i /><i /><i /></span>
          <span className="lv__badge"><i />24/7</span>
        </div>
      );
    case "server":
      return (
        <div className="lv lv--server">
          {["n8n", "bots", "docker"].map((s) => (
            <span key={s} className="lv__row"><i />{s}<em /></span>
          ))}
          <span className="lv__term">hermes › revisando servicios<b /></span>
        </div>
      );
    case "social":
      return (
        <div className="lv lv--social">
          <span className="lv__hub">n8n</span>
          {["IG", "FB", "in", "YT"].map((s, i) => (
            <span key={s} className={`lv__node lv__node--${i}`}>{s}</span>
          ))}
        </div>
      );
    case "video":
      return (
        <div className="lv lv--video">
          <div className="lv__strip">
            {[0, 1, 2, 3, 4, 5].map((i) => <span key={i} />)}
          </div>
          <span className="lv__prog"><i /></span>
        </div>
      );
    case "dashboard":
      return (
        <div className="lv lv--dash">
          <div className="lv__bars">
            {[38, 62, 48, 80, 56, 70].map((h, i) => (
              <span key={i} style={{ "--h": `${h}%`, "--i": i } as React.CSSProperties} />
            ))}
          </div>
          <span className="lv__kpi"><i />Datos limpios</span>
        </div>
      );
    case "crm":
      return (
        <div className="lv lv--crm">
          {["Nuevo", "Seguimiento", "Cerrado"].map((c) => (
            <span key={c} className="lv__col"><em>{c}</em><i /><i /></span>
          ))}
          <span className="lv__move" />
        </div>
      );
    case "life":
      return (
        <div className="lv lv--life">
          <svg viewBox="0 0 44 44" className="lv__ring" aria-hidden="true">
            <circle cx="22" cy="22" r="18" />
            <circle cx="22" cy="22" r="18" className="lv__arc" />
          </svg>
          <div className="lv__week">
            {["L", "M", "M", "J", "V", "S", "D"].map((d, i) => (
              <span key={i} style={{ "--i": i } as React.CSSProperties}>{d}</span>
            ))}
          </div>
        </div>
      );
  }
};

/* ---------- Tarjeta ---------- */

const LabCard: React.FC<{ project: LabProject; reduce: boolean }> = ({ project, reduce }) => {
  const category = LAB_CATEGORIES.find((c) => c.id === project.category)?.label;
  const media = project.image ? (
    <img src={project.image} alt={project.imageAlt ?? ""} loading="lazy" decoding="async" />
  ) : project.visual ? (
    <Visual kind={project.visual} />
  ) : null;

  return (
    <motion.article
      layout={!reduce}
      initial={reduce ? false : { opacity: 0, y: 14, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.35, ease: [0.2, 0.7, 0.1, 1] }}
      className="lab"
      aria-labelledby={`lab-${project.id}`}
    >
      {project.liveUrl ? (
        <a
          className="lab__media"
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Abrir la demo de ${project.title} (se abre en otra pestaña)`}
        >
          {media}
        </a>
      ) : (
        <div className="lab__media" aria-hidden="true">{media}</div>
      )}
      <div className="lab__body">
        <div className="lab__meta">
          <span className={`lab__status ${STATUS_CLASS[project.status]}`}><i />{project.status}</span>
          <span className="lab__cat">{category}</span>
        </div>
        <h3 id={`lab-${project.id}`}>{project.title}</h3>
        <dl className="lab__ps">
          <div><dt>Problema</dt><dd>{project.problem}</dd></div>
          <div><dt>Solución</dt><dd>{project.solution}</dd></div>
        </dl>
        <div className="lab__foot">
          <ul className="lab__stack" aria-label="Herramientas">
            {project.stack.map((t) => <li key={t}>{t}</li>)}
          </ul>
          {project.liveUrl ? (
            <a className="lab__go" href={project.liveUrl} target="_blank" rel="noopener noreferrer">
              Ver demo <span aria-hidden="true">↗</span>
              <span className="sr-only"> (se abre en otra pestaña)</span>
            </a>
          ) : null}
        </div>
      </div>
    </motion.article>
  );
};

/* ---------- Sección ---------- */

const FILTERS: { id: Filter; label: string }[] = [{ id: "all", label: "Todos" }, ...LAB_CATEGORIES];

const ProjectsSection: React.FC = () => {
  const reduce = useReducedMotion() ?? false;
  const [filter, setFilter] = useState<Filter>("all");
  const [expanded, setExpanded] = useState(false);

  const list = filter === "all" ? LAB_PROJECTS : LAB_PROJECTS.filter((p) => p.category === filter);
  const visible = expanded ? list : list.slice(0, INITIAL);
  const hidden = list.length - visible.length;

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
          </div>
        </Reveal>

        <Reveal className="lab-filters" delay={60}>
          <LayoutGroup id="lab-filters">
            <div role="group" aria-label="Filtrar proyectos">
              {FILTERS.map((f) => {
                const active = filter === f.id;
                const count = f.id === "all" ? LAB_PROJECTS.length : LAB_PROJECTS.filter((p) => p.category === f.id).length;
                return (
                  <button
                    key={f.id}
                    type="button"
                    className={`lab-chip${active ? " is-active" : ""}`}
                    aria-pressed={active}
                    onClick={() => {
                      setFilter(f.id);
                      setExpanded(false);
                    }}
                  >
                    {active ? (
                      <motion.span layoutId="lab-pill" className="lab-chip__pill" transition={reduce ? { duration: 0 } : PILL} aria-hidden="true" />
                    ) : null}
                    <span className="lab-chip__label">{f.label}</span>
                    <span className="lab-chip__n">{count}</span>
                  </button>
                );
              })}
            </div>
          </LayoutGroup>
        </Reveal>

        <motion.div layout={!reduce} className="labs" aria-live="polite">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((p) => (
              <LabCard key={p.id} project={p} reduce={reduce} />
            ))}
          </AnimatePresence>
        </motion.div>

        {hidden > 0 || expanded ? (
          <div className="lab-more">
            <button type="button" className="lab-chip lab-more__btn" onClick={() => setExpanded((v) => !v)} aria-expanded={expanded}>
              {expanded ? "Ver menos" : `Ver todo (${list.length})`}
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default ProjectsSection;
