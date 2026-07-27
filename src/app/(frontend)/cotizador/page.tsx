import type { Metadata } from "next";
import CotizadorPage from "@/modules/cotizador/components/pages/cotizador-page";
import { routes } from "@/shared/config/routes";

export const metadata: Metadata = {
  title: routes.cotizador.name,
  description: routes.cotizador.description,
};

export default async function Page() {
  return <CotizadorPage />;
}
