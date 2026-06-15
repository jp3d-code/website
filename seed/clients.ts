import { slugify } from "@/shared/lib/utils";
import { getPayloadClient } from "./payload";
import { uploadMediaFromExternalUrl } from "./utils";

const clientsData = [
  {
    name: "AgroExport del Sur",
    logo: "https://placehold.co/400x200/2d6a4f/FFFFFF?text=AgroExport+del+Sur",
    website: "https://ejemplo.com",
  },
  {
    name: "Energía Andina",
    logo: "https://placehold.co/400x200/1b4332/FFFFFF?text=Energia+Andina",
    website: "https://ejemplo.com",
  },
  {
    name: "Constructora Inca",
    logo: "https://placehold.co/400x200/6c584c/FFFFFF?text=Constructora+Inca",
    website: "https://ejemplo.com",
  },
  {
    name: "Terminal Logístico del Sur",
    logo: "https://placehold.co/400x200/003049/FFFFFF?text=Terminal+Logistico+del+Sur",
    website: "https://ejemplo.com",
  },
  {
    name: "Tecnometal Perú",
    logo: "https://placehold.co/400x200/495057/FFFFFF?text=Tecnometal+Peru",
    website: "https://ejemplo.com",
  },
  {
    name: "Pesquera Horizonte",
    logo: "https://placehold.co/400x200/005f73/FFFFFF?text=Pesquera+Horizonte",
    website: "https://ejemplo.com",
  },
  {
    name: "Cementos del Pacífico",
    logo: "https://placehold.co/400x200/7f5539/FFFFFF?text=Cementos+del+Pacifico",
    website: "https://ejemplo.com",
  },
  {
    name: "Transportes Altiplano",
    logo: "https://placehold.co/400x200/3a0ca3/FFFFFF?text=Transportes+Altiplano",
    website: "https://ejemplo.com",
  },
  {
    name: "Grupo Industrial Quimera",
    logo: "https://placehold.co/400x200/4a4e69/FFFFFF?text=Grupo+Industrial+Quimera",
    website: "https://ejemplo.com",
  },
  {
    name: "Servicios Portuarios del Perú",
    logo: "https://placehold.co/400x200/264653/FFFFFF?text=Servicios+Portuarios+del+Peru",
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
