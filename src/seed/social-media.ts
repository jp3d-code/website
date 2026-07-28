import { getPayloadClient } from "./payload";

const socialMediaData = [
  {
    label: "LinkedIn",
    url: "https://www.linkedin.com/company/jp-3d/?viewAsMember=true",
    icon: "IconBrandLinkedin",
    order: 10,
  },
  {
    label: "Instagram",
    url: "https://www.instagram.com/jp_3d_makers?igsh=Zmo4cW55NmloZm43",
    icon: "IconBrandInstagram",
    order: 20,
  },
  {
    label: "TikTok",
    url: "https://www.tiktok.com/@jp_3d_makers",
    icon: "IconBrandTiktok",
    order: 30,
  },
  {
    label: "Facebook",
    url: "https://web.facebook.com/kamaywasi3d",
    icon: "IconBrandFacebook",
    order: 40,
  },
] as const;

export async function seedSocialMedia() {
  const payload = await getPayloadClient();

  for (const social of socialMediaData) {
    const existing = await payload.find({
      collection: "social-media",
      where: {
        label: {
          equals: social.label,
        },
      },
      limit: 1,
    });

    if (existing.totalDocs > 0) {
      await payload.update({
        collection: "social-media",
        id: existing.docs[0].id,
        data: {
          label: social.label,
          url: social.url,
          icon: social.icon,
          order: social.order,
        },
        overrideAccess: true,
      });
      continue;
    }

    await payload.create({
      collection: "social-media",
      data: {
        label: social.label,
        url: social.url,
        icon: social.icon,
        order: social.order,
      },
      overrideAccess: true,
    });
  }

  payload.logger.info("Seed completed: social-media.");
}
