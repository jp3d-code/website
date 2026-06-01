import { LinkBtm } from "@/shared/components/ui/link";
import { Container, Section } from "@/shared/components/ui/section";
import { routes } from "@/shared/config/routes";

export function BrandTokensSection() {
  return (
    <Section>
      <Container className="grid gap-14">
        <p className="text-foreground text-xs uppercase tracking-[0.2em]">
          Sobre JP3D
        </p>
        <h2 className="flex flex-wrap text-4xl text-foreground/40">
          <span className="mr-2">Especialistas en diseño 3D y</span>
          <span className="text-secondary">fabricación digital</span>
          <span className="mr-2">, fusionando</span>
          <span className="text-secondary">innovación</span>
          <span className="mr-2">,</span>
          <span className="text-secondary">creatividad</span>
          <span className="mr-2">,</span>
          <span className="mr-2 text-secondary">ingeniería</span>
          <span className="mr-2">y</span>
          <span className="text-secondary">tecnología.</span>
        </h2>
        <div className="flex flex-wrap gap-4">
          <LinkBtm
            href={routes.sobreNosotros.path}
            variant="secondary"
            className="rounded-full"
          >
            Más sobre la empresa
          </LinkBtm>
          <LinkBtm href={routes.proyectos.path} variant="outline">
            Ver nuestros los proyectos
          </LinkBtm>
        </div>
        {/*<div className="grid gap-3">
          {homeData.brandTokens
            .filter((token) => token.type === "highlight")
            .map((token) => {
              const image = imageByName[token.image];
              return (
                <div
                  key={token.image}
                  className="glow-sweep relative overflow-hidden rounded-2xl border border-border/60 bg-muted/40 p-4"
                >
                  <p className="text-muted-foreground text-xs uppercase tracking-[0.3em]">
                    {token.value}
                  </p>
                  {image && (
                    <img
                      src={imageSrc(image)}
                      alt={token.value}
                      className="mt-4 h-24 w-full rounded-xl object-cover"
                    />
                  )}
                </div>
              );
            })}
        </div>*/}
      </Container>
    </Section>
  );
}
