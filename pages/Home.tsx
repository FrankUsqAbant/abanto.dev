import React from "react";
import { View } from "../types";
import Hero from "../components/home/Hero";
import ServicesSection from "../components/home/sections/ServicesSection";
import CallBand from "../components/home/sections/CallBand";
import ProjectsSection from "../components/home/sections/ProjectsSection";
import ProcessSection from "../components/home/sections/ProcessSection";
import FaqSection from "../components/home/sections/FaqSection";
import ContactSection from "../components/home/sections/ContactSection";
import "../components/home/sections/home.css";

interface HomeProps {
  onNavigate: (view: View) => void;
}

/**
 * Inicio: Hero (intro + órbita) y, debajo, las secciones del mockup aprobado.
 * Las secciones antiguas (repos de GitHub, FAQ oscuro, formulario viejo) ya
 * no se muestran aquí; sus archivos siguen en el proyecto.
 */
const Home: React.FC<HomeProps> = () => (
  <>
    <Hero />
    <div className="hm">
      <ServicesSection />
      <CallBand />
      <ProjectsSection />
      <ProcessSection />
      <FaqSection />
      <ContactSection />
    </div>
  </>
);

export default Home;
