import {
  Container,
  Section,
  SectionDescription,
  SectionHeader,
  SectionTitle,
} from "@/shared/components/ui/section";
import { routes } from "@/shared/config/routes";

export function HistorySection() {
  const { historia } = routes.sobreNosotros.sections;

  const milestones = [
    {
      year: "2018",
      description:
        "Comenzamos como un laboratorio de prototipado rápido con enfoque educativo.",
    },
    {
      year: "2020",
      description:
        "Expandimos servicios de ingeniería y fabricación digital para minería y energía.",
    },
    {
      year: "Hoy",
      description:
        "Aspiramos a liderar la adopción de tecnologías 3D en Latinoamérica, impulsando innovación sostenible.",
    },
  ];

  return (
    <Section id={historia.hash} className="bg-muted/30">
      <Container>
        <SectionHeader className="mb-16">
          <SectionTitle first="Nuestra" second="Historia" />
          <SectionDescription>
            Comenzamos en 2018 como un laboratorio de prototipado rápido con
            enfoque educativo y hoy aspiramos a liderar la adopción de
            tecnologías 3D en Latinoamérica.
          </SectionDescription>
        </SectionHeader>

        <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div className="relative order-2 aspect-video w-full overflow-hidden rounded-3xl lg:order-1 lg:aspect-square">
            <img
              src="https://jp3doficial.com/editar/imagenes/sobre-nosotros/historia_jp3d.png"
              alt="Nuestra Historia"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>

          <div className="order-1 flex flex-col gap-8 lg:order-2">
            {milestones.map((milestone) => (
              <div
                key={milestone.year}
                className="flex flex-col gap-2 rounded-2xl border border-border/60 bg-background p-6"
              >
                <div className="font-condensed font-extrabold text-2xl text-primary">
                  {milestone.year}
                </div>
                <p className="text-muted-foreground">{milestone.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
