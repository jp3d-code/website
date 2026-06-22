import { ClientsSection } from "@/modules/proyectos/components/sections/clients-section";
import { HeroSection } from "@/modules/proyectos/components/sections/hero-section";
import { ProjectsGridSection } from "@/modules/proyectos/components/sections/projects-grid-section";

export default function ProyectosPage() {
  return (
    <>
      <HeroSection />
      <ProjectsGridSection />
      <ClientsSection />
    </>
  );
}
