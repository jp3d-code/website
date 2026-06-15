import configPromise from "@payload-config";
import { getPayload } from "payload";
import { ProjectCard } from "@/shared/components/ui/project-card";
import { Container, Section } from "@/shared/components/ui/section";

export async function ProjectsGrid() {
  const payload = await getPayload({ config: configPromise });
  const { docs: projects } = await payload.find({
    collection: "projects",
    sort: "order",
    depth: 2,
  });

  return (
    <Section>
      <Container>
        <div className="flex w-full items-center justify-between">
          <h2 className="text-xl uppercase tracking-widest">
            Orgullosos de nuestros proyectos
          </h2>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
