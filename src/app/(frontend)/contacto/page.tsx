import type { Metadata } from "next";
import ContactoPage from "@/modules/contacto/components/pages/contacto-page";
import { routes } from "@/shared/config/routes";

export const metadata: Metadata = {
  title: routes.contacto.name,
  description: routes.contacto.description,
};

export default function Page() {
  return <ContactoPage />;
}
