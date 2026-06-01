import Link from "next/link";
import { ProjectCard } from "@/components/uitripled/project-card-shadcnui";
import { Container, Section } from "@/shared/components/ui/section";
import { routes } from "@/shared/config/routes";
import { imageByName, imageSrc } from "@/shared/data/images";
import { projects } from "@/shared/data/projects";

export function ProjectsSection() {
  return (
    <Section>
      <Container>
        <div className="flex w-full items-center justify-between">
          <p className="text-foreground text-xs uppercase tracking-[0.2em]">
            Nuestros proyectos
          </p>
          <Link
            href={routes.proyectos.path}
            className="text-muted-foreground text-xs uppercase tracking-[0.3em]"
          >
            Ver todos
          </Link>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {projects.items.map((project) => {
            const image = imageByName[project.image];
            return (
              <ProjectCard
                key={project.title}
                title={project.title}
                image={imageSrc(image)}
                description={project.description}
                links={{ demo: routes.proyectos.path }}
              />
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
