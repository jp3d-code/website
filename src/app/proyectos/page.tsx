import type { Metadata } from "next";
import ProjectsPage from "@/modules/proyectos/components/projects-page";
import { routes } from "@/shared/config/routes";

export const metadata: Metadata = {
  title: routes.proyectos.name,
};

export default function ProyectoPage() {
  return <ProjectsPage />;
}
