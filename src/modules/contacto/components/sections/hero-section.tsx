import { ContactInfo } from "@/modules/contacto/components/ui/contact-info";
import { Container, Section } from "@/shared/components/ui/section";

export async function HeroSection() {
  return (
    <Section className="bg-card">
      <Container className="grid gap-10 md:grid-cols-2">
        <ContactInfo />
      </Container>
    </Section>
  );
}
