import configPromise from "@payload-config";
import * as motion from "motion/react-client";
import { getPayload } from "payload";
import {
  Container,
  Section,
  SectionEyebrow,
  SectionHeader,
  SectionMainTitle,
  SectionTitle,
} from "@/shared/components/ui/section";
import { routes } from "@/shared/config/routes";
import { cn } from "@/shared/lib/utils";

export async function HistorySection() {
  const { historia } = routes.sobreNosotros.sections;

  const payload = await getPayload({ config: configPromise });
  const { docs: events } = await payload.find({
    collection: "timeline",
    sort: "date",
  });

  if (!events || events.length === 0) {
    return null;
  }

  return (
    <Section id={historia.hash} className="">
      <Container>
        <SectionHeader className="mb-16">
          <SectionTitle>
            <SectionEyebrow>Trayectoria</SectionEyebrow>
            <SectionMainTitle>Nuestra Historia</SectionMainTitle>
          </SectionTitle>
          <p className="text-muted-foreground text-xs uppercase tracking-[0.2em]">
            Nuestra trayectoria
          </p>
        </SectionHeader>

        <div className="relative w-full max-w-6xl">
          <div className="absolute top-0 bottom-0 left-6 w-px bg-border md:left-1/2 md:-translate-x-px" />

          <div className="flex flex-col gap-12">
            {events.map((event, index) => {
              const isEven = index % 2 === 0;

              return (
                <div key={event.id} className="relative flex items-start">
                  <div className="absolute top-1 left-4.5 z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-background md:left-1/2 md:-translate-x-1/2">
                    <div className="h-3 w-3 rounded-full bg-primary" />
                  </div>
                  <motion.div
                    whileInView={{ opacity: 1, y: 0 }}
                    initial={{ opacity: 0, y: 10 }}
                    viewport={{ once: true, amount: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className={cn(
                      "ml-16 w-full md:ml-0",
                      isEven
                        ? "md:mr-[calc(50%+2rem)] md:w-[calc(50%-2rem)]"
                        : "md:ml-[calc(50%+2rem)] md:w-[calc(50%-2rem)]",
                    )}
                  >
                    <div className="rounded-lg border border-border bg-background p-6 shadow-sm transition-all duration-300 hover:border-primary/50 hover:shadow-md">
                      <span className="font-black font-condensed text-primary text-xl">
                        {event.date
                          ? new Date(event.date).getFullYear()
                          : event.date}
                      </span>
                      <h3 className="mt-1 font-bold font-condensed text-secondary uppercase tracking-wide">
                        {event.title}
                      </h3>
                      <p className="mt-2 text-muted-foreground text-sm leading-relaxed">
                        {event.description}
                      </p>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </Section>
  );
}
