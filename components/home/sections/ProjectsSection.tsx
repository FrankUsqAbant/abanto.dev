import React from "react";
import Reveal from "./Reveal";
import { HOME_PROJECTS, type HomeProject } from "../../../data/homeProjects";

const hostOf = (url: string) => url.replace(/^https?:\/\//, "").replace(/\/$/, "");

const ProjectCard: React.FC<{ project: HomeProject; index: number }> = ({ project, index }) => (
  <Reveal
    as="article"
    className={`proj${project.featured ? " proj--feat" : ""}`}
    delay={(index % 4) * 70}
    aria-labelledby={`proj-${project.id}`}
  >
    <a
      className="proj__cover"
      href={project.liveUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Abrir ${project.name} en vivo (se abre en otra pestaña)`}
    >
      <div className="proj__bar" aria-hidden="true">
        <span className="dots"><i /><i /><i /></span>
        <span className="proj__url">{hostOf(project.liveUrl)}</span>
      </div>
      <img src={project.image} alt={project.imageAlt} loading="lazy" decoding="async" />
    </a>
    <div className="proj__body">
      <div className="proj__top">
        <span className="mono">{String(index + 1).padStart(2, "0")}</span>
        <ul className="tags" aria-label="Tecnologías">
          {project.tags.map((t) => (
            <li key={t}><span>{t}</span></li>
          ))}
        </ul>
      </div>
      <h3 id={`proj-${project.id}`}>{project.name}</h3>
      <p>{project.description}</p>
      <div className="proj__foot">
        <span className="proj__res">{project.outcome}</span>
        <div className="proj__links">
          <a className="proj__go" href={project.liveUrl} target="_blank" rel="noopener noreferrer">
            En vivo <span aria-hidden="true">↗</span>
            <span className="sr-only"> (se abre en otra pestaña)</span>
          </a>
          <a className="proj__go" href={project.repoUrl} target="_blank" rel="noopener noreferrer">
            GitHub <span aria-hidden="true">↗</span>
            <span className="sr-only"> — código de {project.name}</span>
          </a>
        </div>
      </div>
    </div>
  </Reveal>
);

const ProjectsSection: React.FC = () => (
  <section className="section section--alt" id="proyectos" aria-labelledby="proyectos-title">
    <div className="wrap">
      <Reveal as="header" className="sec-head sec-head--row">
        <div>
          <p className="eyebrow">02 — Mis proyectos</p>
          <h2 className="h2" id="proyectos-title">
            Proyectos que <br />
            <em>ya están en el mundo.</em>
          </h2>
        </div>
        <div className="sec-head__side">
          <p className="sec-head__sub">
            Una selección de lo que he construido: webs para negocios reales, herramientas y
            experimentos. Todo el código está en GitHub.
          </p>
          <a
            className="link-arrow"
            href="https://github.com/FrankUsqAbant"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ver todo en GitHub <i aria-hidden="true">↗</i>
          </a>
        </div>
      </Reveal>
      <div className="projs">
        {HOME_PROJECTS.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i} />
        ))}
      </div>
    </div>
  </section>
);

export default ProjectsSection;
