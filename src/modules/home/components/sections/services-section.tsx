import configPromise from "@payload-config";
import { getPayload } from "payload";
import { ServicesGrid } from "@/modules/home/components/ui/services-grid";
import {
  Container,
  Section,
  SectionHeader,
  SectionLink,
  SectionTitle,
  SectionTitleForeground,
  SectionTitlePrimary,
} from "@/shared/components/ui/section";
import { routes } from "@/shared/config/routes";

export async function ServicesSection() {
  const payload = await getPayload({ config: configPromise });
  const { docs: services } = await payload.find({
    collection: "services",
    sort: "order",
    depth: 1,
  });

  return (
    <Section className="">
      <Container>
        <SectionHeader>
          <SectionTitle>
            <SectionTitleForeground>Nuestros</SectionTitleForeground>
            <SectionTitlePrimary>Servicios</SectionTitlePrimary>
          </SectionTitle>
          <SectionLink href={routes.servicios.path}>Explorar más</SectionLink>
        </SectionHeader>

        <ServicesGrid services={services} />
      </Container>
    </Section>
  );
}
