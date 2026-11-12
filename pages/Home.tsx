import React, { Suspense, lazy, useEffect } from "react";
import { View } from "../types";
import Hero from "../components/home/Hero";
import { scrollToSectionWhenReady } from "../components/home/sections/homeLinks";
import "../components/home/sections/home.css";

const HomeSections = lazy(() => import("../components/home/sections/HomeSections"));

interface HomeProps {
  onNavigate: (view: View) => void;
}

/**
 * Inicio: Hero (intro + órbita) y, debajo, las secciones del mockup aprobado.
 * Las secciones antiguas (repos de GitHub, FAQ oscuro, formulario viejo) ya
 * no se muestran aquí; sus archivos siguen en el proyecto.
 */
const Home: React.FC<HomeProps> = () => {
  // Enlace directo (p. ej. /#proyectos): desplaza a la sección al cargar.
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (id) scrollToSectionWhenReady(id);
  }, []);

  return (
  <>
    <Hero />
    <div className="hm">
      <Suspense fallback={<div style={{ minHeight: "100vh" }} aria-hidden="true" />}>
        <HomeSections />
      </Suspense>
    </div>
  </>
  );
};

export default Home;
