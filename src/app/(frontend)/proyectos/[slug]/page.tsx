import configPromise from "@payload-config";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPayload } from "payload";
import ProyectoDetailPage from "@/modules/proyectos/components/pages/proyecto-detail-page";
import { routes } from "@/shared/config/routes";

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
    description: project.excerpt || routes.proyectos.description,
  };
}

export default async function Page({
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

  return <ProyectoDetailPage project={project} />;
}
