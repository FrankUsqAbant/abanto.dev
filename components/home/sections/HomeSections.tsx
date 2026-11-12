import React from "react";
import ServicesSection from "./ServicesSection";
import CallBand from "./CallBand";
import ProjectsSection from "./ProjectsSection";
import ProcessSection from "./ProcessSection";
import FaqSection from "./FaqSection";
import ContactSection from "./ContactSection";

/** Todo lo que va bajo el hero. Se carga en un chunk aparte para que el hero pinte antes. */
const HomeSections: React.FC = () => (
  <>
    <ServicesSection />
    <CallBand />
    <ProjectsSection />
    <ProcessSection />
    <FaqSection />
    <ContactSection />
  </>
);

export default HomeSections;
