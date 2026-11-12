import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { setPageMeta } from "../lib/seo";
import "../components/home/sections/home.css";

/** 404 en el estilo del sitio: crema, serif y dos salidas claras. */
const NotFound: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    setPageMeta({
      title: "Página no encontrada",
      description: "Esta página no existe o cambió de dirección.",
      path: pathname,
      noindex: true,
    });
  }, [pathname]);

  return (
    <div className="hm nf">
      <section className="wrap nf__in" aria-labelledby="nf-title">
        <p className="nf__code" aria-hidden="true">404</p>
        <h1 className="h2" id="nf-title">
          Esta página <em>no existe.</em>
        </h1>
        <p className="nf__lead">
          Puede que el enlace esté mal escrito o que la página haya cambiado de lugar. Estas dos te pueden servir:
        </p>
        <div className="nf__actions">
          <Link to="/" className="btn btn--dark">
            Volver al inicio <span className="arr" aria-hidden="true">→</span>
          </Link>
          <Link to="/aprende/fundamentos-web" className="link-arrow">
            Ir a Aprende <i aria-hidden="true">→</i>
          </Link>
        </div>
        <p className="nf__path">
          <code>{pathname}</code>
        </p>
      </section>
    </div>
  );
};

export default NotFound;
