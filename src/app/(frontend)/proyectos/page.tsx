import type { Metadata } from "next";
import { ClientsSection } from "@/modules/proyectos/components/clients-section";
import { Hero } from "@/modules/proyectos/components/hero";
import { ProjectsGrid } from "@/modules/proyectos/components/projects-grid";
import { routes } from "@/shared/config/routes";

export const metadata: Metadata = {
  title: routes.proyectos.name,
};

export default async function ProyectoPage() {
  return (
    <>
      <Hero />
      <ProjectsGrid />
      <ClientsSection />
    </>
  );
}
