import type { Metadata } from "next";
import AboutPage from "@/modules/sobre-nosotros/components/about-page";
import { routes } from "@/shared/config/routes";

export const metadata: Metadata = {
  title: routes.sobreNosotros.name,
};

export default function SobreNosotrosPage() {
  return <AboutPage />;
}
