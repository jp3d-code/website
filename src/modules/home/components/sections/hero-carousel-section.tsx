import configPromise from "@payload-config";
import { getPayload } from "payload";
import { HeroCarouselClient } from "@/modules/home/components/ui/hero-carousel-client";
import type { Location, SocialMedia } from "@/payload-types";
import { getCollections } from "@/shared/lib/utils";

export async function HeroCarouselSection() {
  const payload = await getPayload({ config: configPromise });
  const contact = await payload.findGlobal({
    slug: "contact",
    depth: 1,
  });

  const locations = getCollections<Location>(contact.locations);
  const firstLocation = locations[0];
  const socials = getCollections<SocialMedia>(contact.socials);

  return (
    <HeroCarouselClient
      contact={contact}
      firstLocation={firstLocation}
      socials={socials}
    />
  );
}
