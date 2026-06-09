import configPromise from "@payload-config";
import { getPayload } from "payload";
import type { Location, SocialMedia } from "@/payload-types";
import { LinkBtm } from "@/shared/components/ui/link";
import { Container, Section } from "@/shared/components/ui/section";
import { getCollections } from "@/shared/lib/utils";

export async function HeroSection() {
  const payload = await getPayload({ config: configPromise });
  const contact = await payload.findGlobal({
    slug: "contact",
    depth: 1,
  });

  const locations = getCollections<Location>(contact.locations);
  const firstLocation = locations[0];
  const socials = getCollections<SocialMedia>(contact.socials);

  return (
    <Section className="relative -z-20 overflow-hidden bg-card">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(245,200,70,0.35),transparent_55%)]" />
      <div className="absolute top-16 right-30 h-64 w-64 rounded-full bg-secondary/40 blur-3xl" />
      <Container className="w-full">
        <div className="w-full space-y-10">
          <div className="flex flex-col items-start gap-3">
            <p className="text-muted-foreground text-xs uppercase tracking-[0.35em]">
              Tecnología
            </p>
            <h1 className="font-semibold text-6xl text-shadow-soft">JP 3D</h1>
            <p className="max-w-xl text-base text-muted-foreground md:text-lg">
              Ingeniería, Modelado 3D, Fabricación 3D, Máquinas, Insumos y
              Repuestos.
            </p>
          </div>
          <div className="flex flex-wrap gap-6 text-muted-foreground text-sm">
            {firstLocation && (
              <div>
                <p className="text-foreground text-xs uppercase tracking-[0.2em]">
                  Ubicacion
                </p>
                <p>{firstLocation.address}</p>
              </div>
            )}
            <div>
              <p className="text-foreground text-xs uppercase tracking-[0.2em]">
                Contacto
              </p>
              <p>{contact.phone}</p>
            </div>
          </div>
          <div className="flex flex-col items-start gap-3">
            <p className="text-foreground text-xs uppercase tracking-[0.2em]">
              Redes sociales
            </p>
            <div className="flex flex-wrap gap-2">
              {socials.map((social) => (
                <LinkBtm
                  key={social.id}
                  href={social.url}
                  variant="outline"
                  target="_blank"
                  className="uppercase tracking-[0.2em]"
                >
                  {social.label}
                </LinkBtm>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
