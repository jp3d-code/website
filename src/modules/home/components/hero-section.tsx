import { LinkBtm } from "@/shared/components/ui/link";
import { Container, Section } from "@/shared/components/ui/section";
import { homeData } from "@/shared/data/home";

export function HeroSection() {
  return (
    <Section className="relative -z-20 overflow-hidden bg-card">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(245,200,70,0.35),transparent_55%)]" />
      <div className="absolute top-16 right-30 h-64 w-64 rounded-full bg-secondary/40 blur-3xl" />
      <Container className="w-full">
        <div className="w-full space-y-10">
          <div className="flex flex-col items-start gap-3">
            <p className="text-muted-foreground text-xs uppercase tracking-[0.35em]">
              {homeData.banner.subtitle}
            </p>
            <h1 className="font-semibold text-6xl text-shadow-soft">
              {homeData.banner.title}
            </h1>
            <p className="max-w-xl text-base text-muted-foreground md:text-lg">
              {homeData.banner.description}
            </p>
          </div>
          <div className="flex flex-wrap gap-6 text-muted-foreground text-sm">
            <div>
              <p className="text-foreground text-xs uppercase tracking-[0.2em]">
                Ubicacion
              </p>
              <p>{homeData.banner.location}</p>
            </div>
            <div>
              <p className="text-foreground text-xs uppercase tracking-[0.2em]">
                Contacto
              </p>
              <p>{homeData.banner.phone}</p>
            </div>
          </div>
          <div className="flex flex-col items-start gap-3">
            <p className="text-foreground text-xs uppercase tracking-[0.2em]">
              Redes sociales
            </p>
            <div className="flex flex-wrap gap-2">
              {homeData.banner.socials.map((social) => (
                <LinkBtm
                  key={social.url}
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
