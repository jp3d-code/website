import configPromise from "@payload-config";
import { getPayload } from "payload";
import { ProjectCard } from "@/shared/components/ui/project-card";
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

export async function ProjectsSection() {
  const payload = await getPayload({ config: configPromise });
  const { docs: projects } = await payload.find({
    collection: "projects",
    limit: 3,
    sort: "order",
    depth: 2,
  });

  return (
    <Section>
      <Container>
        <SectionHeader>
          <SectionTitle>
            <SectionTitleForeground>Ultimos</SectionTitleForeground>
            <SectionTitlePrimary>proyectos</SectionTitlePrimary>
          </SectionTitle>
          <SectionLink href={routes.proyectos.path}>Ver todos</SectionLink>
        </SectionHeader>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
