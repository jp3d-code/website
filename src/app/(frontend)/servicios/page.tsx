import type { Metadata } from "next";
import { Hero } from "@/modules/servicios/components/hero";
import ServicesSections from "@/modules/servicios/components/services-sections";
import { routes } from "@/shared/config/routes";

export const metadata: Metadata = {
  title: routes.servicios.name,
};

export default async function ServiciosPage() {
  return (
    <>
      <Hero />
      <ServicesSections />
    </>
  );
}
