import type { Metadata } from "next";
import Title from "@/modules/servicios/components/title";
import { routes } from "@/shared/config/routes";

export const metadata: Metadata = {
  title: routes.servicios.name,
};

export default function ServiciosPage() {
  return <Title />;
}
