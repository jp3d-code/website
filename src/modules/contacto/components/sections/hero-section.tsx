import { ContactInfo } from "@/modules/contacto/components/ui/contact-info";
import { Hero } from "@/shared/components/ui/hero";

export async function HeroSection() {
  return (
    <Hero
      eyebrow="Contacto"
      title="Hablemos"
      description="Háblanos sobre ti y descubre cómo podemos llevar tu proyecto al siguiente nivel."
    >
      <ContactInfo />
    </Hero>
  );
}
