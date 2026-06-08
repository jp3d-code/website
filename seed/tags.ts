import type { Tag } from "@/payload-types";
import { slugify } from "@/shared/lib/utils";
import { getPayloadClient } from "./payload";

const tagNames = [
  "Ingeniería",
  "Gestión",
  "Sostenibilidad",
  "Proyectos",
  "Innovación",
  "Construcción",
  "Infraestructura",
  "Tecnología",
];

export async function seedTags() {
  const payload = await getPayloadClient();
  const tagsBySlug = new Map<string, number>();

  for (const name of tagNames) {
    const slug = slugify(name);

    const existing = await payload.find({
      collection: "tags",
      where: {
        slug: {
          equals: slug,
        },
      },
      depth: 0,
      limit: 1,
    });

    const data: Pick<Tag, "name" | "slug"> = {
      name,
      slug,
    };

    if (existing.totalDocs > 0) {
      const updated = await payload.update({
        collection: "tags",
        id: existing.docs[0].id,
        data,
        overrideAccess: true,
      });
      tagsBySlug.set(slug, updated.id);
      continue;
    }

    const created = await payload.create({
      collection: "tags",
      data,
      overrideAccess: true,
    });

    tagsBySlug.set(slug, created.id);
  }

  payload.logger.info("Seed completed: tags.");
  return tagsBySlug;
}
