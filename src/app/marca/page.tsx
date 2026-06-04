import type { Metadata } from "next";
import { Us } from "@/modules/marca/components/us";
import { OurValues } from "@/modules/marca/components/values";
import { VisionMission } from "@/modules/marca/components/vision-mission";
import { routes } from "@/shared/config/routes";

export const metadata: Metadata = {
  title: routes.marca.name,
};

export default function MarcaPage() {
  return (
    <>
      <Us />
      <VisionMission />
      <OurValues />
    </>
  );
}
