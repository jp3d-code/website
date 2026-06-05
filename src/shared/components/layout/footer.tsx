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
        </div>
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.25em]">Contacto</p>
          <ul className="space-y-2 pl-2 text-sm">
            <li>{contactData.email}</li>
            <li>{contactData.phone}</li>
            <li>{contactData.location}</li>
          </ul>
        </div>
      </Container>
    </footer>
  );
}
