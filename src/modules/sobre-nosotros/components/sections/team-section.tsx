import configPromise from "@payload-config";
import { getPayload } from "payload";
import { TeamGrid } from "@/modules/sobre-nosotros/components/ui/team-grid";
import {
  Container,
  Section,
  SectionDescription,
  SectionEyebrow,
  SectionHeader,
  SectionMainTitle,
  SectionTitle,
} from "@/shared/components/ui/section";
import { routes } from "@/shared/config/routes";

export async function TeamSection() {
  const { equipo } = routes.sobreNosotros.sections;
  const payload = await getPayload({ config: configPromise });
  const { docs: members } = await payload.find({
    collection: "team-members",
    sort: "order",
    depth: 1,
  });

  return (
    <Section id={equipo.hash}>
      <Container>
        <SectionHeader className="mb-10 flex-col items-start">
          <SectionTitle>
            <SectionEyebrow>Equipo</SectionEyebrow>
            <SectionMainTitle>Nuestro Equipo</SectionMainTitle>
          </SectionTitle>
          <SectionDescription className="text-start">
            Un equipo de profesionales con experiencia en ingeniería, minería,
            educación y fabricación digital.
          </SectionDescription>
        </SectionHeader>

        <TeamGrid members={members} />
      </Container>
    </Section>
  );
}
