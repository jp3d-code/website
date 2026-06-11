import { AboutJp3d } from "@/modules/home/components/aboutJp3d-section";
import { ExploreLinksSection } from "@/modules/home/components/explore-links-section";
import { HeroSection } from "@/modules/home/components/hero-section";
import { MarqueeSection } from "@/modules/home/components/marquee-section";
import { ProjectsSection } from "@/modules/home/components/projects-section";
import { ServicesSection } from "@/modules/home/components/services-section";
import { VideosSection } from "@/modules/home/components/videos-section";

export default async function Home() {
  return (
    <>
      <HeroSection />
      <AboutJp3d />
      <ServicesSection />
      <ProjectsSection />
      <MarqueeSection />
      <VideosSection />
      {/*<SponsorsSection />*/}
      <ExploreLinksSection />
    </>
  );
}
