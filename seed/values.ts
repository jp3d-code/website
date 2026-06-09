import { getPayloadClient } from "./payload";

const valuesData = [
  {
    title: "Innovación",
    description:
      "Fomentamos la creatividad técnica respaldada por datos y estándares internacionales.",
    icon: "Lightbulb",
    order: 10,
  },
  {
    title: "Precisión",
    description:
      "Cada proyecto entregado busca generar impacto real: optimizar procesos y reducir costos.",
    icon: "Target",
    order: 20,
  },
  {
    title: "Colaboración",
    description:
      "Creemos en alianzas a largo plazo con clientes y en el trabajo multidisciplinario.",
    icon: "Users",
    order: 30,
  },
  {
    title: "Sostenibilidad",
    description:
      "Seleccionamos materiales reciclables y optimizamos procesos para reducir desperdicios.",
    icon: "Leaf",
    order: 40,
  },
];

export async function seedValues() {
  const payload = await getPayloadClient();

  for (const value of valuesData) {
    const existing = await payload.find({
      collection: "values",
      where: {
        title: {
          equals: value.title,
        },
      },
      limit: 1,
    });

    if (existing.totalDocs > 0) {
      await payload.update({
        collection: "values",
        id: existing.docs[0].id,
        data: value,
        overrideAccess: true,
      });
      continue;
    }

    await payload.create({
      collection: "values",
      data: value,
      overrideAccess: true,
    });
  }

  payload.logger.info("Seed completed: values.");
}
