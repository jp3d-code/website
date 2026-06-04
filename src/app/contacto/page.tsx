import type { Metadata } from "next";
import ContactPage from "@/modules/contacto/components/contact-page";
import { routes } from "@/shared/config/routes";

export const metadata: Metadata = {
  title: routes.contacto.name,
};

export default function ContactoPage() {
  return <ContactPage />;
}
