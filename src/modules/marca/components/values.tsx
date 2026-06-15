import configPromise from "@payload-config";
import * as motion from "motion/react-client";
import { getPayload } from "payload";
import {
  Container,
  Section,
  SectionTitle,
  SectionTitleForeground,
  SectionTitlePrimary,
} from "@/shared/components/ui/section";
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
        <SectionTitle>
          <SectionTitleForeground>Nuestros</SectionTitleForeground>
          <SectionTitlePrimary>Valores</SectionTitlePrimary>
        </SectionTitle>
        <div className="flex w-full max-w-md flex-col items-start">
          {values.map((value, i) => (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{
                once: true,
              }}
              transition={{ delay: i * 0.2 }}
              key={value.id}
              className="group mb-6 py-3"
            >
              <h3 className="font-medium text-lg uppercase tracking-widest transition-colors duration-75 group-hover:text-primary">
                {value.title}
              </h3>
              <p className="text-muted-foreground text-sm">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
