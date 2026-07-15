import { Hero } from "@/shared/components/ui/hero";
import { routes } from "@/shared/config/routes";

export function HeroSection() {
  return (
    <Hero
      id={routes.marca.sections.intro.hash}
      eyebrow="Nosotros"
      title="Líderes en fabricación digital y 3D"
      description="JP 3D nace con la convicción de fusionar ingeniería, fabricación digital y formación STEM para convertir las ideas más ambiciosas en soluciones tangibles que impulsen la competitividad de nuestros clientes."
    />
  );
}
