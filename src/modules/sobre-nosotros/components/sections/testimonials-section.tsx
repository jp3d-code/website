import configPromise from "@payload-config";
import { getPayload } from "payload";
import { TestimonialsMarquee } from "@/modules/sobre-nosotros/components/ui/testimonials-marquee";
import {
  Section,
  SectionEyebrow,
  SectionHeader,
  SectionMainTitle,
  SectionTitle,
} from "@/shared/components/ui/section";
import { routes } from "@/shared/config/routes";

export async function TestimonialsSection() {
  const { testimonios } = routes.sobreNosotros.sections;

  const payload = await getPayload({ config: configPromise });
  const { docs: testimonials } = await payload.find({
    collection: "testimonials",
    sort: "order",
  });

  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  return (
    <Section
      id={testimonios.hash}
      className="grid-background flex flex-col items-start items-center px-0 pt-32 pb-36"
    >
      <SectionHeader className="mb-16 max-w-6xl flex-col items-start px-6">
        <SectionTitle>
          <SectionEyebrow>Testimonios</SectionEyebrow>
          <SectionMainTitle>Nuestros aliados confían</SectionMainTitle>
        </SectionTitle>
      </SectionHeader>

      <TestimonialsMarquee testimonials={testimonials} />
    </Section>
  );
}
