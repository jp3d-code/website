import { Container, Section } from "@/shared/components/ui/section";
import { images } from "@/shared/data/images";

const visionMissionData = [
  {
    title: "MISION",
    image: images.marca_mision.name,
    excerpt:
      "Nuestra misión es transformar ideas en soluciones tangibles mediante la combinación de ingeniería de precisión, fabricación digital y programas formativos que empoderan a la próxima generación de innovadores.",
    content: [
      "Integraremos diseño, simulación y producción bajo demanda en un flujo 100 % digital, reduciendo tiempos de desarrollo y elevando el estándar de calidad para nuestros clientes.",
      "Cada proyecto entregado busca generar impacto real: optimizar procesos, reducir costos y aportar valor sostenible a la industria peruana y latino-americana.",
    ],
  },
  {
    title: "VISION",
    image: images.marca_vision.name,
    excerpt:
      "Ser referentes latinoamericanos en innovación 3D, liderando la transición hacia fábricas inteligentes y ecosistemas educativos orientados a la manufactura avanzada.",
    content: [
      "Aspiramos a expandir nuestra presencia en minería, energía y salud, ofreciendo servicios que aceleren la adopción de tecnologías aditivas y mejoren la competitividad de la región.",
      "Para 2030 proyectamos operar hubs de fabricación distribuidos y un centro de I+D capaz de desarrollar materiales y procesos propios con enfoque en sostenibilidad.",
    ],
  },
];

export function VisionMission() {
  return (
    <Section>
      <Container className="grid items-start justify-items-center gap-10 md:grid-cols-2">
        {visionMissionData.map((item) => (
          <div
            key={item.title}
            className="justify-center-safe flex w-full max-w-md flex-col items-center space-y-4"
          >
            <h2 className="font-medium text-2xl uppercase tracking-widest md:text-3xl">
              {item.title}
            </h2>
            <div className="flex flex-col gap-4">
              {item.content.map((text, index) => (
                <p
                  key={`${item.title}-content-${index}`}
                  className="text-center text-muted-foreground"
                >
                  {text}
                </p>
              ))}
            </div>
          </div>
        ))}
      </Container>
    </Section>
  );
}
