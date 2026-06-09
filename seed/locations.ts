import { getPayloadClient } from "./payload";

export async function seedLocations() {
  const payload = await getPayloadClient();

  const locations = [
    {
      name: "Oficina Principal",
      address: "Pasaje Cayro J12, Paucarpata 04002 Arequipa.",
      lat: -16.4227358,
      lng: -71.5006739,
    },
  ];

  for (const location of locations) {
    const existing = await payload.find({
      collection: "locations",
      where: {
        name: {
          equals: location.name,
        },
      },
      limit: 1,
    });

    if (existing.totalDocs > 0) {
      await payload.update({
        collection: "locations",
        id: existing.docs[0].id,
        data: location,
        overrideAccess: true,
      });
      continue;
    }

    await payload.create({
      collection: "locations",
      data: location,
      overrideAccess: true,
    });
  }

  payload.logger.info("Seed completed: locations.");
}
