import { ContactInfo } from "@/modules/contacto/components/contact-info";
import { Ubication } from "@/modules/contacto/components/ubication";
import { Container, Section } from "@/shared/components/ui/section";

export function Hero() {
  return (
    <Section className="bg-card">
      <Container className="grid gap-10 md:grid-cols-2">
        <ContactInfo />
        <Ubication />
      </Container>
    </Section>
  );
}
