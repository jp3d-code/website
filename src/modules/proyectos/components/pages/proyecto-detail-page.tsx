import { ProjectDetailSection } from "@/modules/proyectos/components/sections/project-detail-section";
import { RelatedProjectsSection } from "@/modules/proyectos/components/sections/related-projects-section";
import type { Project } from "@/payload-types";

interface ProyectoDetailPageProps {
  project: Project;
}

export default function ProyectoDetailPage({
  project,
}: ProyectoDetailPageProps) {
  const tagIds = (project.tags ?? []).map((t) =>
    typeof t === "number" ? t : t.id,
  );

  return (
    <>
      <ProjectDetailSection project={project} />
      <RelatedProjectsSection excludeId={project.id} tags={tagIds} />
    </>
  );
}
