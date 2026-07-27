import type { Metadata } from "next";
import SobreNosotrosPage from "@/modules/sobre-nosotros/components/pages/sobre-nosotros-page";
import { routes } from "@/shared/config/routes";

export const metadata: Metadata = {
  title: routes.sobreNosotros.name,
  description: routes.sobreNosotros.description,
};

export default function Page() {
  return <SobreNosotrosPage />;
}
