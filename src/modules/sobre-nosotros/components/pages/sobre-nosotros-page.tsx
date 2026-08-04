import { HistorySection } from "@/modules/sobre-nosotros/components/sections/history-section";
import { IntroSection } from "@/modules/sobre-nosotros/components/sections/intro-section";
import { TeamSection } from "@/modules/sobre-nosotros/components/sections/team-section";
import { TestimonialsSection } from "@/modules/sobre-nosotros/components/sections/testimonials-section";
import { VideosSection } from "@/modules/sobre-nosotros/components/sections/videos-section";

export default function SobreNosotrosPage() {
  return (
    <>
      <IntroSection />
      <TeamSection />
      <TestimonialsSection />
      <HistorySection />
      <VideosSection />
    </>
  );
}
