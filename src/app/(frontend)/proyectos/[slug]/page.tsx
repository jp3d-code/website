import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectDetail } from "@/modules/proyectos/components/project-detail";
import { projects } from "@/shared/data/projects";
import { slugify } from "@/shared/lib/utils";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.items.map((project) => ({
    slug: slugify(project.title),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.items.find((item) => slugify(item.title) === slug);

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
  const project = projects.items.find((item) => slugify(item.title) === slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetail project={project} />;
}
