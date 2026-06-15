import type { Metadata } from "next";
import { Hero } from "@/modules/contacto/components/hero";
import { LocationsList } from "@/modules/contacto/components/locations-list";
import { routes } from "@/shared/config/routes";

export const metadata: Metadata = {
  title: routes.contacto.name,
};

export default async function ContactoPage() {
  return (
    <>
      <Hero />
      <LocationsList />
    </>
  );
}
