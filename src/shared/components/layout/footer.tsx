import configPromise from "@payload-config";
import Image from "next/image";
import Link from "next/link";
import { getPayload } from "payload";
import type { Location, SocialMedia } from "@/payload-types";
import { LinkBtm } from "@/shared/components/ui/link";
import { Container } from "@/shared/components/ui/section";
import { routes } from "@/shared/config/routes";
import { socialIcons } from "@/shared/config/social-icons";
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
        <Link href={routes.path} className="flex items-center">
          <Image src="/logo.webp" width={50} height={50} alt="logo jp3d" />
          <div className="flex flex-col items-start justify-center gap-1">
            <span className="font-bold text-2xl text-primary uppercase tracking-widest">
              JP3D
            </span>
            <span className="text-muted-foreground text-xs leading-1.5">
              Ingenieria y fabricacion
            </span>
          </div>
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
            {socials.map((social) => {
              const Icon = social.icon ? socialIcons[social.icon] : null;
              return (
                <LinkBtm
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  size="icon"
                  variant="outline"
                  aria-label={social.label}
                >
                  {Icon && <Icon className="size-5" />}
                </LinkBtm>
              );
            })}
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
