import type { Metadata } from "next";
import MarcaPage from "@/modules/marca/components/pages/marca-page";
import { routes } from "@/shared/config/routes";

export const metadata: Metadata = {
  title: routes.marca.name,
};

export default function Page() {
  return <MarcaPage />;
}
