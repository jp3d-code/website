import { AboutJp3dSection } from "@/modules/home/components/sections/about-jp3d-section";
import { ClientsSection } from "@/modules/home/components/sections/clients-section";
import { ExploreLinksSection } from "@/modules/home/components/sections/explore-links-section";
import { HeroSection } from "@/modules/home/components/sections/hero-section";
import { MarqueeSection } from "@/modules/home/components/sections/marquee-section";
import { ProjectsSection } from "@/modules/home/components/sections/projects-section";
import { ServicesSection } from "@/modules/home/components/sections/services-section";
import { VideosSection } from "@/modules/home/components/sections/videos-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutJp3dSection />
      <ServicesSection />
      <ProjectsSection />
      <ClientsSection />
      <VideosSection />
      <MarqueeSection />
      <ExploreLinksSection />
    </>
  );
}
