import configPromise from "@payload-config";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { getPayload } from "payload";
import { LinkBtm } from "@/shared/components/ui/link";
import {
  Container,
  Section,
  SectionHeader,
  SectionTitle,
  SectionTitleForeground,
  SectionTitlePrimary,
} from "@/shared/components/ui/section";
import { routes } from "@/shared/config/routes";
import { getMediaUrl } from "@/shared/lib/utils";

export default async function ServicesSections() {
  const payload = await getPayload({ config: configPromise });
  const { docs: services } = await payload.find({
    collection: "services",
    sort: "order",
  });

  return (
    <>
      {services.map((service, index) => {
        const imageUrl = getMediaUrl(service.image);
        const reversed = index % 2 === 1;
        return (
          <Section
            key={service.id}
            id={service.slug}
            className={index % 2 === 0 ? "bg-card" : ""}
          >
            <Container className="grid items-center gap-10 md:grid-cols-2">
              <div
                className={`flex w-full flex-col items-start gap-4 ${
                  reversed ? "md:order-2" : ""
                }`}
              >
                <SectionHeader>
                  <SectionTitle>
                    <SectionTitlePrimary>{`0${index + 1}`}</SectionTitlePrimary>
                    <SectionTitleForeground>
                      {service.title}
                    </SectionTitleForeground>
                  </SectionTitle>
                </SectionHeader>
                <div className="paragraph w-full max-w-xl text-muted-foreground">
                  <RichText data={service.excerpt} />
                </div>
                <LinkBtm
                  href={routes.servicios.detail.build({ slug: service.slug })}
                  variant="outline"
                  className="uppercase tracking-[0.2em]"
                >
                  Ver más
                </LinkBtm>
              </div>
              {imageUrl && (
                <div className={reversed ? "md:order-1" : ""}>
                  <img
                    src={imageUrl}
                    alt={service.title}
                    className="aspect-4/3 w-full rounded-lg border border-border/60 object-cover"
                  />
                </div>
              )}
            </Container>
          </Section>
        );
      })}
    </>
  );
}
