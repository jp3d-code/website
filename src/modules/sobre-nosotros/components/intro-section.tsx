import configPromise from "@payload-config";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { Star } from "lucide-react";
import { getPayload } from "payload";
import {
  Container,
  Section,
  SectionDescription,
  SectionHeader,
  SectionTitle,
} from "@/shared/components/ui/section";

export async function IntroSection() {
  const payload = await getPayload({ config: configPromise });
  const { docs: testimonials } = await payload.find({
    collection: "testimonials",
    sort: "order",
  });

  return (
    <Section className="bg-card">
      <Container>
        <div className="grid gap-x-8 md:grid-cols-2">
          <SectionHeader className="flex-col items-start justify-center">
            <SectionTitle
              first="Nuestra"
              second="Esencia"
              className="justify-start"
            />
            <SectionDescription className="w-full max-w-md text-left">
              Un equipo que combina ingeniería, diseño y fabricación digital
              para dar vida a ideas que impulsan a la industria peruana. Creemos
              que la mejor manera de innovar es crear-haciendo, validando
              conceptos con prototipos funcionales y datos medibles. Nuestra
              pasión por la tecnología y el diseño se traduce en soluciones
              tangibles que transforman desafíos en oportunidades.
            </SectionDescription>
          </SectionHeader>

          <div className="flex justify-center gap-4">
            {testimonials.slice(0, 1).map((t) => (
              <div
                key={t.id}
                className="relative rounded-3xl bg-primary/5 p-8 sm:p-10"
              >
                <div className="mb-6 flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="size-5 fill-yellow-300/70 text-yellow-300/70"
                    />
                  ))}
                </div>
                <blockquote className="mb-8 font-medium text-foreground text-lg leading-relaxed sm:text-xl">
                  {t.quote && <RichText data={t.quote} />}
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 font-bold text-primary">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-foreground">{t.name}</div>
                    <div className="text-muted-foreground text-sm">
                      {t.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
