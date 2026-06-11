import { slugify } from "@/shared/lib/utils";
import { getPayloadClient } from "./payload";
import { uploadMediaFromExternalUrl } from "./utils";

const clientsData = [
  {
    name: "Minera Los Andes",
    logo: "https://placehold.co/400x200/1a1a2e/FFFFFF?text=Minera+Los+Andes",
    website: "https://ejemplo.com",
  },
  {
    name: "PetroPerú S.A.",
    logo: "https://placehold.co/400x200/16213e/FFFFFF?text=PetroPer%C3%BA",
    website: "https://ejemplo.com",
  },
  {
    name: "Industria del Norte",
    logo: "https://placehold.co/400x200/0f3460/FFFFFF?text=Industria+del+Norte",
    website: "https://ejemplo.com",
  },
  {
    name: "Puerto del Pacífico",
    logo: "https://placehold.co/400x200/533483/FFFFFF?text=Puerto+del+Pacifico",
    website: "https://ejemplo.com",
  },
];

export async function seedClients() {
  const payload = await getPayloadClient();
  const clientsBySlug = new Map<string, number>();

  for (const client of clientsData) {
    const slug = slugify(client.name);

    const existing = await payload.find({
      collection: "clients",
      where: {
        slug: {
          equals: slug,
        },
      },
      limit: 1,
    });

    const logoId = await uploadMediaFromExternalUrl(
      payload,
      client.logo,
      client.name,
    );

    if (!logoId) {
      payload.logger.error(`Failed to upload logo for client: ${client.name}`);
      continue;
    }

    const data = {
      name: client.name,
      slug,
      logo: logoId,
      website: client.website,
    };

    if (existing.totalDocs > 0) {
      const updated = await payload.update({
        collection: "clients",
        id: existing.docs[0].id,
        data,
        overrideAccess: true,
      });
      clientsBySlug.set(slug, updated.id);
      payload.logger.info(`Updated client: ${client.name}`);
      continue;
    }

    const created = await payload.create({
      collection: "clients",
      data,
      overrideAccess: true,
    });

    clientsBySlug.set(slug, created.id);
    payload.logger.info(`Created client: ${client.name}`);
  }

  payload.logger.info("Seed completed: clients.");
  return clientsBySlug;
}
