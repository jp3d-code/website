import type { Metadata } from "next";
import ServicesPage from "@/modules/servicios/components/services-page";
import { routes } from "@/shared/config/routes";

export const metadata: Metadata = {
  title: routes.servicios.name,
};

export default async function ServiciosPage() {
  return <ServicesPage />;
}
