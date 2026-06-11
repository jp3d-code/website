import { slugify } from "@/shared/lib/utils";
import { getPayloadClient } from "./payload";

const categoriesData = [
  "Ingeniería Estructural",
  "Minería",
  "Energía",
  "Infraestructura Portuaria",
];

export async function seedCategories() {
  const payload = await getPayloadClient();
  const categoriesBySlug = new Map<string, number>();

  for (const name of categoriesData) {
    const slug = slugify(name);

    const existing = await payload.find({
      collection: "categories",
      where: {
        slug: {
          equals: slug,
        },
      },
      limit: 1,
    });

    const data = {
      name,
      slug,
    };

    if (existing.totalDocs > 0) {
      const updated = await payload.update({
        collection: "categories",
        id: existing.docs[0].id,
        data,
        overrideAccess: true,
      });
      categoriesBySlug.set(slug, updated.id);
      payload.logger.info(`Updated category: ${name}`);
      continue;
    }

    const created = await payload.create({
      collection: "categories",
      data,
      overrideAccess: true,
    });

    categoriesBySlug.set(slug, created.id);
    payload.logger.info(`Created category: ${name}`);
  }

  payload.logger.info("Seed completed: categories.");
  return categoriesBySlug;
}
