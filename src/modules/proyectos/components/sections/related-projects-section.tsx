import configPromise from "@payload-config";
import { getPayload, type Where } from "payload";
import { ProjectCard } from "@/shared/components/ui/project-card";
import {
  Container,
  Section,
  SectionEyebrow,
  SectionHeader,
  SectionMainTitle,
  SectionTitle,
} from "@/shared/components/ui/section";

interface RelatedProjectsProps {
  excludeId: number;
  tags?: number[];
}

export async function RelatedProjectsSection({
  excludeId,
  tags,
}: RelatedProjectsProps) {
  const payload = await getPayload({ config: configPromise });

  const where: Where = {
    id: { not_equals: excludeId },
  };

  if (tags && tags.length > 0) {
    where.tags = { in: tags };
  }

  const { docs: related } = await payload.find({
    collection: "projects",
    where,
    sort: "order",
    limit: 2,
    depth: 2,
  });

  if (!related || related.length === 0) {
    return null;
  }

  return (
    <Section className="bg-card">
      <Container className="max-w-4xl">
        <SectionHeader className="mb-12">
          <SectionTitle>
            <SectionEyebrow>Similares</SectionEyebrow>
            <SectionMainTitle>Proyectos Relacionados</SectionMainTitle>
          </SectionTitle>
        </SectionHeader>

        <div className="grid gap-6 sm:grid-cols-2">
          {related.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
