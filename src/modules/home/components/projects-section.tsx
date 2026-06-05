import Link from "next/link";
import { ProjectCard } from "@/shared/components/ui/project-card";
import { Container, Section } from "@/shared/components/ui/section";
import { routes } from "@/shared/config/routes";
import { imageByName, imageSrc } from "@/shared/data/images";
import { projects } from "@/shared/data/projects";

export function ProjectsSection() {
  const recentProjects = projects.items.slice(0, 3);

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
          {recentProjects.map((project) => {
            const image = imageByName[project.image];
            return (
              <ProjectCard
                key={project.title}
                title={project.title}
                image={imageSrc(image)}
                description={project.excerpt}
                links={{ demo: routes.proyectos.path }}
              />
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
