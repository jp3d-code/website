// import configPromise from "@payload-config";
// import { RichText } from "@payloadcms/richtext-lexical/react";
// import { Star } from "lucide-react";
// import { getPayload } from "payload";
import { Hero } from "@/shared/components/ui/hero";

export async function IntroSection() {
  return (
    <Hero
      eyebrow="Nosotros"
      title="Nuestra Esencia"
      description="Un equipo que combina ingeniería, diseño y fabricación digital para dar vida a ideas que impulsan a la industria peruana. Creemos que la mejor manera de innovar es crear-haciendo, validando conceptos con prototipos funcionales y datos medibles. Nuestra pasión por la tecnología y el diseño se traduce en soluciones tangibles que transforman desafíos en oportunidades."
    ></Hero>
  );
}
