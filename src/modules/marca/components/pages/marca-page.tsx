import { HeroSection } from "@/modules/marca/components/sections/hero-section";
import { ValuesSection } from "@/modules/marca/components/sections/values-section";
import { VisionMissionSection } from "@/modules/marca/components/sections/vision-mission-section";

export default function MarcaPage() {
  return (
    <>
      <HeroSection />
      <VisionMissionSection />
      <ValuesSection />
    </>
  );
}
