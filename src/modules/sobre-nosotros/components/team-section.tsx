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
        <div className="grid gap-8 md:grid-cols-2 lg:items-center lg:gap-16">
          <SectionHeader className="mb-16 flex-col items-start">
            <SectionTitle first="Nuestro" second="Equipo" />
            <SectionDescription className="text-start">
              JP 3D está formado por ingenieros, diseñadores y educadores que
              unen experiencia y pasión por la fabricación digital.
            </SectionDescription>
            <SectionDescription className="text-start">
              Trabajamos de manera colaborativa, usando impresión 3D y
              simulación para validar ideas en tiempo récord. El resultado:
              proyectos que cumplen normas internacionales y crean valor
              tangible para nuestros clientes.
            </SectionDescription>
          </SectionHeader>
          <img
            src="https://jp3doficial.com/editar/imagenes/sobre-nosotros/equipo_jp3d.png"
            alt="Nuestro Equipo"
            className="w-full max-w-md justify-self-end rounded-lg object-cover"
          />
        </div>
      </Container>
    </Section>
  );
}
