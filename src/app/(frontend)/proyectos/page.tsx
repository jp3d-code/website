import type { Metadata } from "next";
import ProyectosPage from "@/modules/proyectos/components/pages/proyectos-page";
import { routes } from "@/shared/config/routes";

export const metadata: Metadata = {
  title: routes.proyectos.name,
  description: routes.proyectos.description,
};

export default function Page() {
  return <ProyectosPage />;
}
