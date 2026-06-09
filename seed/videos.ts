import { getPayloadClient } from "./payload";

const videosData = [
  {
    title: "Innovación en Fabricación con Impresión 3D",
    url: "https://www.tiktok.com/@jp_3d_makers/video/7444650552417439032",
    platform: "tiktok" as const,
    excerpt:
      "La impresión 3D permite crear objetos personalizados utilizando materiales como plásticos, metal y resinas. Es útil en medicina, arquitectura e industria aeroespacial.",
    content: [
      { text: "Fomenta la sostenibilidad al generar menos desperdicio y ofrece oportunidades educativas, creativas y de prototipado rápido, revolucionando la fabricación global." },
    ],
    order: 10,
  },
  {
    title: "Decoraciones Navideñas con Corte Láser",
    url: "https://www.tiktok.com/@jp_3d_makers/video/7447658942441770245",
    platform: "tiktok" as const,
    excerpt:
      "Usa el corte láser para crear decoraciones navideñas personalizadas como adornos, tarjetas tridimensionales, centros de mesa, guirnaldas y más.",
    content: [
      { text: "Estas ideas permiten darle a tu hogar un toque único y creativo durante la Navidad." },
    ],
    order: 20,
  },
  {
    title: "Impresiones 3D Destacadas de Diciembre",
    url: "https://www.tiktok.com/@jp_3d_makers/video/7445877055603887365",
    platform: "tiktok" as const,
    excerpt:
      "Las mejores impresiones 3D de JP3D en diciembre incluyeron creaciones para la competencia de anime Omisoka.",
    content: [
      { text: "Además de estas piezas, también se realizaron adornos navideños, prototipos industriales y modelos educativos, reflejando la versatilidad y creatividad de JP3D." },
    ],
    order: 30,
  },
];

export async function seedVideos() {
  const payload = await getPayloadClient();

  for (const video of videosData) {
    const existing = await payload.find({
      collection: "videos",
      where: {
        title: {
          equals: video.title,
        },
      },
      limit: 1,
    });

    if (existing.totalDocs > 0) {
      await payload.update({
        collection: "videos",
        id: existing.docs[0].id,
        data: video,
        overrideAccess: true,
      });
      continue;
    }

    await payload.create({
      collection: "videos",
      data: video,
      overrideAccess: true,
    });
  }

  payload.logger.info("Seed completed: videos.");
}
