import { Container, Section } from "@/shared/components/ui/section";
import { routes } from "@/shared/config/routes";

export function VisionMission() {
  return (
    <Section>
      <Container className="grid items-start justify-items-center gap-10 md:grid-cols-2">
        <div
          id={routes.marca.sections.mision.hash}
          className="justify-center-safe flex w-full max-w-md flex-col items-center space-y-4"
        >
          <h2 className="font-medium text-2xl uppercase tracking-widest md:text-3xl">
            MISION
          </h2>
          <div className="flex flex-col gap-4">
            <p className="text-center text-muted-foreground">
              Nuestra misión es transformar ideas en soluciones tangibles
              mediante la combinación de ingeniería de precisión, fabricación
              digital y programas formativos que empoderan a la próxima
              generación de innovadores.
            </p>
            <p className="text-center text-muted-foreground">
              Integraremos diseño, simulación y producción bajo demanda en un
              flujo 100 % digital, reduciendo tiempos de desarrollo y elevando
              el estándar de calidad para nuestros clientes.
            </p>
          </div>
        </div>
        <div
          id={routes.marca.sections.vision.hash}
          className="justify-center-safe flex w-full max-w-md flex-col items-center space-y-4"
        >
          <h2 className="font-medium text-2xl uppercase tracking-widest md:text-3xl">
            VISION
          </h2>
          <div className="flex flex-col gap-4">
            <p className="text-center text-muted-foreground">
              Ser referentes latinoamericanos en innovación 3D, liderando la
              transición hacia fábricas inteligentes y ecosistemas educativos
              orientados a la manufactura avanzada.
            </p>
            <p className="text-center text-muted-foreground">
              Aspiramos a expandir nuestra presencia en minería, energía y
              salud, ofreciendo servicios que aceleren la adopción de
              tecnologías aditivas y mejoren la competitividad de la región.
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
