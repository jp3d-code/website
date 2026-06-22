import configPromise from "@payload-config";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPayload } from "payload";
import ServicioDetailPage from "@/modules/servicios/components/pages/servicio-detail-page";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const payload = await getPayload({ config: configPromise });
  const { docs } = await payload.find({
    collection: "services",
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  });

  const service = docs[0];

  if (!service) {
    return {};
  }

  return {
    title: service.title,
    description: service.title,
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
    collection: "services",
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  });

  const service = docs[0];

  if (!service) {
    notFound();
  }

  return <ServicioDetailPage service={service} />;
}
