import { getPayload } from "payload";
import configPromise from "@payload-config";
import Link from "next/link";
import { ProjectCard } from "@/shared/components/ui/project-card";
import { Container, Section } from "@/shared/components/ui/section";
import { getMediaUrl } from "@/shared/lib/utils";
import { routes } from "@/shared/config/routes";

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
        <div className="flex w-full items-center justify-between">
          <h2 className="text-xl uppercase tracking-widest">
            Nuestros ultimos proyectos
          </h2>
          <Link
            href={routes.proyectos.path}
            className="text-muted-foreground text-xs uppercase tracking-[0.3em]"
          >
            Ver todos
          </Link>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {projects.map((project) => {
            return (
              <ProjectCard
                key={project.id}
                title={project.title}
                image={getMediaUrl(project.image)}
                description={project.excerpt}
                links={{ demo: routes.proyectos.detail.build({ slug: project.slug }) }}
              />
            );
          })}
        </div>
      </Container>
    </Section>
  );
}

