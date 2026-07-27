import type { Metadata } from "next";
import ServiciosPage from "@/modules/servicios/components/pages/servicios-page";
import { routes } from "@/shared/config/routes";

export const metadata: Metadata = {
  title: routes.servicios.name,
  description: routes.servicios.description,
};

export default function Page() {
  return <ServiciosPage />;
}
