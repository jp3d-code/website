import { BrandTokensSection } from "@/modules/home/components/brand-tokens-section";
import { ExploreLinksSection } from "@/modules/home/components/explore-links-section";
import { HeroSection } from "@/modules/home/components/hero-section";
import { MarqueeSection } from "@/modules/home/components/marquee-section";
import { ProductsSection } from "@/modules/home/components/products-section";
import { ProjectsSection } from "@/modules/home/components/projects-section";
import { ServicesSection } from "@/modules/home/components/services-section";
import { SponsorsSection } from "@/modules/home/components/sponsors-section";
import { VideosSection } from "@/modules/home/components/videos-section";

export default function Home() {
  return (
    <>
      <HeroSection />
      <BrandTokensSection />
      <ProjectsSection />
      <ServicesSection />
      {/*<ProductsSection />
      <VideosSection />
      <MarqueeSection />
      <SponsorsSection />
      <ExploreLinksSection />*/}
    </>
  );
}
