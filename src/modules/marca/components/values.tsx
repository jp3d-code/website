import { Container, Section } from "@/shared/components/ui/section";

const ourValues = [
  {
    name: "Calidad",
    description:
      "Nos comprometemos a ofrecer productos y servicios de la más alta calidad, asegurando la satisfacción total de nuestros clientes.",
  },
  {
    name: "Innovación",
    description:
      "Fomentamos un ambiente de creatividad y mejora continua, buscando siempre nuevas formas de superar las expectativas.",
  },
  {
    name: "Sostenibilidad",
    description:
      "Promovemos prácticas responsables con el medio ambiente, integrando la sostenibilidad en cada aspecto de nuestro negocio.",
  },
  {
    name: "Colaboración",
    description:
      "Valoramos el trabajo en equipo y la colaboración, tanto dentro de nuestra empresa como con nuestros clientes y socios.",
  },
];

export function OurValues() {
  return (
    <Section className="bg-card">
      <Container className="grid items-center justify-items-center gap-10 md:grid-cols-2">
        <h2 className="font-medium text-2xl uppercase tracking-widest md:text-3xl">
          NUESTROS VALORES
        </h2>
        <div className="flex w-full max-w-md flex-col items-start gap-6">
          {ourValues.map((value) => (
            <div key={value.name} className="mb-6">
              <h3 className="font-medium text-lg uppercase tracking-widest">
                {value.name}
              </h3>
              <p className="text-muted-foreground">{value.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
