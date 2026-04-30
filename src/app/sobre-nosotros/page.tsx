import type { Metadata } from "next";
import Title from "@/modules/sobre-nosotros/components/title";
import { routes } from "@/shared/config/routes";

export const metadata: Metadata = {
  title: routes.sobreNosotros.name,
};

export default function SobreNosotrosPage() {
  return <Title />;
}
