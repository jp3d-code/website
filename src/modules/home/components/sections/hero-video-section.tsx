import configPromise from "@payload-config";
import { getPayload } from "payload";
import { HeroVideoClient } from "@/modules/home/components/ui/hero-video-client";
import type { Location, SocialMedia } from "@/payload-types";
import { getCollections } from "@/shared/lib/utils";

export async function HeroVideoSection() {
  const payload = await getPayload({ config: configPromise });
  const contact = await payload.findGlobal({
    slug: "contact",
    depth: 1,
  });

  const locations = getCollections<Location>(contact.locations);
  const firstLocation = locations[0];
  const socials = getCollections<SocialMedia>(contact.socials);

  return (
    <HeroVideoClient
      contact={contact}
      firstLocation={firstLocation}
      socials={socials}
    />
  );
}
