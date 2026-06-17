import { getPayloadClient } from "./payload";

export async function seedContact() {
  const payload = await getPayloadClient();

  const existing = await payload.findGlobal({
    slug: "contact",
    depth: 0,
  });

  if (existing && (existing.email || existing.phone)) {
    payload.logger.info(
      "Seed skipped: contact global already populated; preserving existing data.",
    );
    return;
  }

  const locationsResult = await payload.find({
    collection: "locations",
    limit: 100,
  });

  const socialsResult = await payload.find({
    collection: "social-media",
    limit: 100,
  });

  const contactData = {
    smallTitle: "Hablanos sobre ti",
    bigTitle: "Ponte en contacto con nosotros",
    phone: "+51 951 890 330",
    email: "oficina@jp3doficial.com",
    locations: locationsResult.docs.map((doc) => doc.id),
    socials: socialsResult.docs.map((doc) => doc.id),
    copyright: "© 2025 JP 3D. Todos los Derechos Reservados.",
  };

  await payload.updateGlobal({
    slug: "contact",
    data: contactData,
  });

  payload.logger.info("Seed completed: contact global.");
}
