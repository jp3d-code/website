import {
  Container,
  Section,
  SectionDescription,
  SectionHeader,
  SectionTitle,
} from "@/shared/components/ui/section";
import { routes } from "@/shared/config/routes";

export function TeamSection() {
  const { equipo } = routes.sobreNosotros.sections;

  return (
    <Section id={equipo.hash}>
      <Container>
        <SectionHeader className="mb-16">
          <SectionTitle first="Nuestro" second="Equipo" />
          <SectionDescription>
            JP 3D está formado por ingenieros, diseñadores y educadores que unen
            experiencia y pasión por la fabricación digital.
          </SectionDescription>
        </SectionHeader>

        <div className="grid gap-8 md:grid-cols-2 lg:items-center lg:gap-16">
          <div className="space-y-4 text-muted-foreground">
            <p>
              Trabajamos de manera colaborativa, usando impresión 3D y
              simulación para validar ideas en tiempo récord. El resultado:
              proyectos que cumplen normas internacionales y crean valor
              tangible para nuestros clientes.
            </p>
          </div>
          <div className="relative aspect-video w-full overflow-hidden rounded-3xl lg:aspect-square">
            <img
              src="https://jp3doficial.com/editar/imagenes/sobre-nosotros/equipo_jp3d.png"
              alt="Nuestro Equipo"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}
