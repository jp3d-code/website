import configPromise from "@payload-config";
import { getPayload } from "payload";
import { ProjectCard } from "@/shared/components/ui/project-card";
import {
  Container,
  Section,
  SectionHeader,
  SectionLink,
  SectionTitle,
} from "@/shared/components/ui/section";
import { routes } from "@/shared/config/routes";
import { getMediaUrl } from "@/shared/lib/utils";

export async function ProjectsSection() {
  const payload = await getPayload({ config: configPromise });
  const { docs: projects } = await payload.find({
    collection: "projects",
    limit: 3,
    sort: "order",
    depth: 1,
  });

  return (
    <Section>
      <Container>
        <SectionHeader>
          <SectionTitle first="Ultimos" second="proyectos"></SectionTitle>
          <SectionLink href={routes.proyectos.path}>Ver todos</SectionLink>
        </SectionHeader>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {projects.map((project) => {
            return (
              <ProjectCard
                key={project.id}
                title={project.title}
                image={getMediaUrl(project.image)}
                description={project.excerpt}
                links={{
                  demo: routes.proyectos.detail.build({ slug: project.slug }),
                }}
              />
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
