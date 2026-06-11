import configPromise from "@payload-config";
import { getPayload } from "payload";
import {
  Container,
  Section,
  SectionHeader,
  SectionLink,
  SectionTitle,
} from "@/shared/components/ui/section";
import { routes } from "@/shared/config/routes";
import { ServicesGrid } from "./services-grid";

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
          <SectionTitle first="Nuestros" second="Servicios"></SectionTitle>
          <SectionLink href={routes.servicios.path}>Explorar más</SectionLink>
        </SectionHeader>

        <ServicesGrid services={services} />
      </Container>
    </Section>
  );
}
