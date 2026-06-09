import type { Metadata } from "next";
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
    </>
  );
}
