import type { Metadata } from "next";
import Title from "@/modules/marca/components/title";
import { routes } from "@/shared/config/routes";

export const metadata: Metadata = {
  title: routes.marca.name,
};

export default function MarcaPage() {
  return <Title />;
}
