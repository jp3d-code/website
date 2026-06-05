import { ProjectCard } from "@/shared/components/ui/project-card";
import { Container, Section } from "@/shared/components/ui/section";
import { routes } from "@/shared/config/routes";
import { imageByName, imageSrc } from "@/shared/data/images";
import { projects } from "@/shared/data/projects";
import { slugify } from "@/shared/lib/utils";

export function ProjectsGrid() {
  return (
    <Section>
      <Container>
        <div className="flex w-full items-center justify-between">
          <h2 className="text-xl uppercase tracking-widest">
            Orgullosos de nuestros proyectos
          </h2>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {projects.items.map((project) => {
            const image = imageByName[project.image];
            return (
              <ProjectCard
                key={project.title}
                title={project.title}
                image={imageSrc(image)}
                description={project.excerpt}
                links={{
                  demo: `${routes.proyectos.path}/${slugify(project.title)}`,
                }}
              />
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
