import { LinkBtm } from "@/shared/components/ui/link";
import {
  Container,
  Section,
  SectionHeader,
  SectionTitle,
  SectionTitleForeground,
  SectionTitlePrimary,
} from "@/shared/components/ui/section";
import { routes } from "@/shared/config/routes";

export function AboutJp3dSection() {
  return (
    <Section>
      <Container className="grid gap-14">
        <SectionHeader>
          <SectionTitle>
            <SectionTitleForeground>Sobre</SectionTitleForeground>
            <SectionTitlePrimary>Nostros</SectionTitlePrimary>
          </SectionTitle>
        </SectionHeader>
        <h2 className="text-3xl text-foreground/40 leading-tight md:text-4xl">
          Especialistas en diseño 3D y{" "}
          <span className="text-secondary">fabricación digital</span>,
          fusionando <span className="text-secondary">innovación</span>,{" "}
          <span className="text-secondary">creatividad</span>,{" "}
          <span className="text-secondary">ingeniería</span> y{" "}
          <span className="text-secondary">tecnología</span>.
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
      </Container>
    </Section>
  );
}
