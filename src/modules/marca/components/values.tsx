import configPromise from "@payload-config";
import { getPayload } from "payload";
import { Container, Section } from "@/shared/components/ui/section";
import { routes } from "@/shared/config/routes";

export async function OurValues() {
  const payload = await getPayload({ config: configPromise });
  const { docs: values } = await payload.find({
    collection: "values",
    sort: "order",
  });

  return (
    <Section id={routes.marca.sections.valores.hash} className="bg-card">
      <Container className="grid items-center justify-items-center gap-10 md:grid-cols-2">
        <h2 className="font-medium text-2xl uppercase tracking-widest md:text-3xl">
          NUESTROS VALORES
        </h2>
        <div className="flex w-full max-w-md flex-col items-start gap-6">
          {values.map((value) => (
            <div key={value.id} className="mb-6">
              <h3 className="font-medium text-lg uppercase tracking-widest">
                {value.title}
              </h3>
              <p className="text-muted-foreground">{value.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
