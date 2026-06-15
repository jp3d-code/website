import { RichText } from "@payloadcms/richtext-lexical/react";
import { Tag as TagIcon } from "lucide-react";
import type { Project } from "@/payload-types";
import { Badge } from "@/shared/components/ui/badge";
import { Container, Section } from "@/shared/components/ui/section";
import { getCollections, getMediaUrl } from "@/shared/lib/utils";

interface ProjectDetailProps {
  project: Project;
}

export async function ProjectDetail({ project }: ProjectDetailProps) {
  const imageUrl = getMediaUrl(project.image);
  const tags = getCollections(project.tags);

  return (
    <Section>
      <Container className="max-w-4xl items-start">
        <article className="space-y-8">
          <header className="space-y-4">
            <h1 className="text-3xl uppercase tracking-widest md:text-5xl">
              {project.title}
            </h1>
            <p className="text-muted-foreground text-sm">{project.excerpt}</p>
            {tags.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 border-border/40 border-t pt-4">
                <TagIcon className="h-3.5 w-3.5 text-muted-foreground/70" />
                {tags.map((tag) => (
                  <Badge
                    key={tag.id}
                    variant="secondary"
                    className="bg-secondary/50 px-2 py-0.5 font-normal text-xs"
                  >
                    {tag.name}
                  </Badge>
                ))}
              </div>
            )}
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
        </article>
      </Container>
    </Section>
  );
}
