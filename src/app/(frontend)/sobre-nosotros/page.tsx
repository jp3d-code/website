import type { Metadata } from "next";
import { HistorySection } from "@/modules/sobre-nosotros/components/history-section";
import { IntroSection } from "@/modules/sobre-nosotros/components/intro-section";
import { TeamSection } from "@/modules/sobre-nosotros/components/team-section";
import { VideosSection } from "@/modules/sobre-nosotros/components/videos-section";
import { routes } from "@/shared/config/routes";

export const metadata: Metadata = {
  title: routes.sobreNosotros.name,
};

export default async function SobreNosotrosPage() {
  return (
    <>
      <IntroSection />
      <TeamSection />
      <HistorySection />
      <VideosSection />
    </>
  );
}
