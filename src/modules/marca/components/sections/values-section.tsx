import configPromise from "@payload-config";
import { Leaf, Lightbulb, Target, Users } from "lucide-react";
import * as motion from "motion/react-client";
import { getPayload } from "payload";
import {
  Container,
  Section,
  SectionEyebrow,
  SectionMainTitle,
  SectionTitle,
} from "@/shared/components/ui/section";
import { routes } from "@/shared/config/routes";

const iconMap = { Lightbulb, Target, Users, Leaf };

export async function ValuesSection() {
  const payload = await getPayload({ config: configPromise });
  const { docs: values } = await payload.find({
    collection: "values",
    sort: "order",
  });

  return (
    <Section
      id={routes.marca.sections.valores.hash}
      className="grid-background"
    >
      <Container className="flex flex-col items-center gap-10">
        <SectionTitle>
          <SectionEyebrow>Principios</SectionEyebrow>
          <SectionMainTitle>Nuestros Valores</SectionMainTitle>
        </SectionTitle>
        <div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value, i) => {
            const Icon = value.icon
              ? iconMap[value.icon as keyof typeof iconMap]
              : null;
            return (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                key={value.id}
                className="flex flex-col items-start gap-3 rounded-lg border border-border/50 bg-background/50 p-6"
              >
                {Icon && <Icon className="size-8 text-primary" />}
                <h3 className="font-medium text-lg uppercase tracking-widest">
                  {value.title}
                </h3>
                <p className="line-clamp-4 text-muted-foreground text-sm">
                  {value.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
