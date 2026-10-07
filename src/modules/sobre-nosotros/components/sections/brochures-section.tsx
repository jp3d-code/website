import { BrochureCard } from "@/modules/sobre-nosotros/components/ui/brochure-card";
import {
  Container,
  Section,
  SectionEyebrow,
  SectionHeader,
  SectionMainTitle,
  SectionTitle,
} from "@/shared/components/ui/section";
import { routes } from "@/shared/config/routes";
import { brochures } from "@/shared/data/brochures";

export function BrochuresSection() {
  const { brochures: brochuresRoute } = routes.sobreNosotros.sections;

  return (
    <Section id={brochuresRoute.hash}>
      <Container>
        <SectionHeader className="mb-16">
          <SectionTitle>
            <SectionEyebrow>Documentos</SectionEyebrow>
            <SectionMainTitle>Nuestros Brochures</SectionMainTitle>
          </SectionTitle>
          <p className="text-muted-foreground text-xs uppercase tracking-[0.2em]">
            Ingeniería y manufactura
          </p>
        </SectionHeader>

        <div className="mt-8 grid w-full gap-8 md:grid-cols-2">
          {brochures.map((brochure, index) => (
            <BrochureCard key={brochure.id} brochure={brochure} index={index} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
