import type { Metadata } from "next";
import { Hero } from "@/modules/contacto/components/hero";
import { routes } from "@/shared/config/routes";

export const metadata: Metadata = {
  title: routes.contacto.name,
};

export default function ContactoPage() {
  return <Hero />;
}
