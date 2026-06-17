import configPromise from "@payload-config";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPayload } from "payload";
import { ProjectDetail } from "@/modules/proyectos/components/project-detail";
import { RelatedProjects } from "@/modules/proyectos/components/related-projects";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const payload = await getPayload({ config: configPromise });
  const { docs } = await payload.find({
    collection: "projects",
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  });

  const project = docs[0];

  if (!project) {
    return {};
  }

  return {
    title: project.title,
    description: project.excerpt,
  };
}

export default async function ProyectoDetallePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const payload = await getPayload({ config: configPromise });
  const { docs } = await payload.find({
    collection: "projects",
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  });

  const project = docs[0];

  if (!project) {
    notFound();
  }

  return (
    <>
      <ProjectDetail project={project} />
      <RelatedProjects excludeId={project.id} />
    </>
  );
}
