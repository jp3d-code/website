import { RichText } from "@payloadcms/richtext-lexical/react";
import type { Project } from "@/payload-types";
import { Container, Section } from "@/shared/components/ui/section";
import { getMediaUrl } from "@/shared/lib/utils";

interface ProjectDetailProps {
  project: Project;
}

export function ProjectDetail({ project }: ProjectDetailProps) {
  const imageUrl = getMediaUrl(project.image);

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

          {imageUrl && (
            <img
              src={imageUrl}
              alt={project.title}
              className="aspect-video w-full rounded-lg object-cover"
            />
          )}

          <div className="paragraph">
            {project.content && <RichText data={project.content} />}
          </div>
        </div>
      </Container>
    </Section>
  );
}
