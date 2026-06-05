import { marked } from "marked";
import { Container, Section } from "@/shared/components/ui/section";
import { imageByName, imageSrc } from "@/shared/data/images";
import type { ProjectItem } from "@/shared/types/data";

marked.setOptions({});

interface ProjectDetailProps {
  project: ProjectItem;
}

export function ProjectDetail({ project }: ProjectDetailProps) {
  const image = imageByName[project.image];
  const htmlContent = marked.parse(project.content) as string;

  return (
    <Section>
      <Container className="max-w-4xl items-start">
        <div className="space-y-8">
          <header className="space-y-4">
            <h1 className="text-3xl uppercase tracking-widest md:text-5xl">
              {project.title}
            </h1>
            <p className="text-muted-foreground text-sm">{project.excerpt}</p>
          </header>

          {image && (
            <img
              src={imageSrc(image)}
              alt={project.title}
              className="aspect-video w-full rounded-lg object-cover"
            />
          )}

          <div
            className="paragraph"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        </div>
      </Container>
    </Section>
  );
}
