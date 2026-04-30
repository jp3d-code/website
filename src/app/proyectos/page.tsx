import type { Metadata } from "next";
import Title from "@/modules/proyectos/components/title";
import { routes } from "@/shared/config/routes";

export const metadata: Metadata = {
  title: routes.proyectos.name,
};

export default function ProyectoPage() {
  return <Title />;
}
