import configPromise from "@payload-config";
import Link from "next/link";
import { getPayload } from "payload";
import type { Location, SocialMedia } from "@/payload-types";
import { LinkBtm } from "@/shared/components/ui/link";
import { getCollections } from "@/shared/lib/utils";

export async function ContactInfo() {
  const payload = await getPayload({ config: configPromise });
  const contact = await payload.findGlobal({
    slug: "contact",
    depth: 1,
  });

  const locations = getCollections<Location>(contact.locations);
  const firstLocation = locations[0];
  const socials = getCollections<SocialMedia>(contact.socials);

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-muted-foreground text-sm">
        {firstLocation && <p>{firstLocation.address}</p>}
        <p>{contact.phone}</p>
        <p>
          <Link
            href={`mailto:${contact.email}`}
            className="underline-offset-4 hover:underline"
          >
            {contact.email}
          </Link>
        </p>
      </div>
      <div className="flex flex-wrap gap-3">
        {socials.map((social) => (
          <LinkBtm
            key={social.id}
            href={social.url}
            target="_blank"
            variant="outline"
            className="uppercase tracking-widest"
          >
            {social.label}
          </LinkBtm>
        ))}
      </div>
    </div>
  );
}
