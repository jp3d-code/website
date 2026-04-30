import type { Metadata } from "next";
import Title from "@/modules/contacto/components/title";
import { routes } from "@/shared/config/routes";

export const metadata: Metadata = {
  title: routes.contacto.name,
};

export default function ContactoPage() {
  return <Title />;
}
