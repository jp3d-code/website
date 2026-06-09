import { getPayloadClient } from "./payload";

const timelineData = [
  {
    year: "2018",
    title: "Laboratorio de Prototipado",
    description: "Comenzamos en 2018 como un laboratorio de prototipado rápido con enfoque educativo.",
    order: 10,
  },
  {
    year: "2020",
    title: "Expansión Industrial",
    description: "Expandimos servicios de ingeniería y fabricación digital para minería y energía.",
    order: 20,
  },
  {
    year: "Hoy",
    title: "Liderazgo Latam",
    description: "Aspiramos a liderar la adopción de tecnologías 3D en Latinoamérica, impulsando innovación sostenible.",
    order: 30,
  },
];

export async function seedTimeline() {
  const payload = await getPayloadClient();

  for (const event of timelineData) {
    const existing = await payload.find({
      collection: "timeline",
      where: {
        year: {
          equals: event.year,
        },
      },
      limit: 1,
    });

    if (existing.totalDocs > 0) {
      await payload.update({
        collection: "timeline",
        id: existing.docs[0].id,
        data: event,
        overrideAccess: true,
      });
      continue;
    }

    await payload.create({
      collection: "timeline",
      data: event,
      overrideAccess: true,
    });
  }

  payload.logger.info("Seed completed: timeline.");
}
