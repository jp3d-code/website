import Link from "next/link";
import { LinkBtm } from "@/shared/components/ui/link";
import { Container } from "@/shared/components/ui/section";
import { routes } from "@/shared/config/routes";
import { contactData } from "@/shared/data/contact";

const quickLinks = [
  routes.marca,
  routes.proyectos,
  routes.servicios,
  routes.sobreNosotros,
  routes.contacto,
];

export function Footer() {
  return (
    <footer className="flex items-center justify-center border-foreground/20 border-t bg-background/5 px-6 py-10">
      <Container className="grid items-start gap-y-15 md:grid-cols-3">
        <div className="space-y-6">
          <Link href={routes.path} className="flex flex-col items-baseline">
            <span className="0.5 text-4xl uppercase tracking-widest">JP3D</span>
            <span className="text-muted-foreground leading-3.5">
              Ingenieria y fabricacion
            </span>
          </Link>
          <div className="space-y-1 text-sm">
            <p>{contactData.email}</p>
            <p>{contactData.phone}</p>
            <p>{contactData.location}</p>
          </div>
        </div>
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.25em]">Navegacion</p>
          <ul className="space-y-2 pl-4 text-sm">
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
            {contactData.socials.map((social) => (
              <LinkBtm
                key={social.url}
                href={social.url}
                target="_blank"
                className="text-xs uppercase tracking-[0.2em]"
                variant="outline"
              >
                {social.label}
              </LinkBtm>
            ))}
          </div>
          <p className="text-background/50 text-xs">{contactData.copyright}</p>
        </div>
      </Container>
    </footer>
  );
}
