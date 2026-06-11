import { getPayloadClient } from "./payload";

const timelineData = [
  {
    date: "2018-01-01",
    title: "Laboratorio de Prototipado",
    description:
      "Comenzamos como un laboratorio de prototipado rápido con enfoque educativo.",
  },
  {
    date: "2020-01-01",
    title: "Expansión Industrial",
    description:
      "Expandimos servicios de ingeniería y fabricación digital para minería y energía.",
  },
  {
    date: "2026-06-10",
    title: "Liderazgo Latam",
    description:
      "Aspiramos a liderar la adopción de tecnologías 3D en Latinoamérica, impulsando innovación sostenible.",
  },
  {
    date: "2000-01-01",
    title: "Fundación",
    description:
      "El Ing. Manuel Ortega Rubin funda Heap Leaching Consulting en Lima, Perú, con enfoque en soluciones para el tratamiento de minerales preciosos.",
  },
  {
    date: "2005-01-01",
    title: "Expansión de servicios",
    description:
      "La empresa amplía su portafolio hacia ingeniería civil y construcción de infraestructura minera, consolidando su presencia nacional.",
  },
  {
    date: "2010-01-01",
    title: "Planta de Fabricación",
    description:
      "Inauguramos nuestra planta de fabricaciones metalmecánicas en el distrito de Lurigancho-Chosica, Lima, con tecnología de última generación.",
  },
  {
    date: "2015-01-01",
    title: "Certificaciones ISO",
    description:
      "Obtención de las certificaciones ISO 9001 e ISO 45001, reafirmando nuestro compromiso con la calidad y la seguridad.",
  },
  {
    date: "2018-01-01",
    title: "Rebranding HLC",
    description:
      "La empresa se transforma en HLC Ingeniería y Construcción S.A.C., reflejando su evolución y diversificación de servicios.",
  },
  {
    date: "2025-01-01",
    title: "25 Años de Excelencia",
    description:
      "Celebramos 25 años de vida institucional con más de 767 proyectos, 312 clientes y una posición de liderazgo en el sector.",
  },
];

export async function seedTimeline() {
  const payload = await getPayloadClient();

  for (const event of timelineData) {
    const existing = await payload.find({
      collection: "timeline",
      where: {
        date: { equals: event.date },
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
