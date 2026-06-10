import configPromise from "@payload-config";
import Link from "next/link";
import { getPayload } from "payload";
import type { Location, SocialMedia } from "@/payload-types";
import { LinkBtm } from "@/shared/components/ui/link";
import { Container } from "@/shared/components/ui/section";
import { routes } from "@/shared/config/routes";
import { getCollections } from "@/shared/lib/utils";

const quickLinks = [
  routes.marca,
  routes.proyectos,
  routes.servicios,
  routes.sobreNosotros,
  routes.contacto,
];

export async function Footer() {
  const payload = await getPayload({ config: configPromise });
  const contact = await payload.findGlobal({
    slug: "contact",
    depth: 1,
  });

  const locations = getCollections<Location>(contact.locations);
  const firstLocation = locations[0];
  const socials = getCollections<SocialMedia>(contact.socials);

  return (
    <footer className="flex items-center justify-center border-foreground/20 border-t bg-background/5 px-6 py-20">
      <Container className="grid items-start gap-y-15 md:grid-cols-4">
        <Link href={routes.path} className="flex flex-col items-baseline">
          <span className="0.5 text-4xl uppercase tracking-widest">JP3D</span>
          <span className="text-muted-foreground leading-3.5">
            Ingenieria y fabricacion
          </span>
        </Link>

        <div className="space-y-5">
          <p className="text-xs uppercase tracking-[0.25em]">Navegacion</p>
          <ul className="space-y-4 pl-4 text-sm">
            {quickLinks.map((route) => (
              <li key={route.path}>
                <Link href={route.path} className="">
                  {route.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.25em]">Redes</p>
          <div className="flex flex-wrap gap-2">
            {socials.map((social) => (
              <LinkBtm
                key={social.id}
                href={social.url}
                target="_blank"
                className="text-xs uppercase tracking-[0.2em]"
                variant="outline"
              >
                {social.label}
              </LinkBtm>
            ))}
          </div>
        </div>
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.25em]">Contacto</p>
          <ul className="space-y-2 pl-2 text-sm">
            <li>{contact.email}</li>
            <li>{contact.phone}</li>
            {firstLocation && <li>{firstLocation.address}</li>}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
