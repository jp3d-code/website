import type { Metadata } from "next";
import { Hero } from "@/modules/marca/components/hero";
import { OurValues } from "@/modules/marca/components/values";
import { VisionMission } from "@/modules/marca/components/vision-mission";
import { routes } from "@/shared/config/routes";

export const metadata: Metadata = {
  title: routes.marca.name,
};

export default async function MarcaPage() {
  return (
    <>
      <Hero />
      <VisionMission />
      <OurValues />
    </>
  );
}
