import configPromise from "@payload-config";
import { RichText } from "@payloadcms/richtext-lexical/react";
import Image from "next/image";
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
import { getMediaImageProps } from "@/shared/lib/utils";

export async function ServicesSection() {
  const payload = await getPayload({ config: configPromise });
  const { docs: services } = await payload.find({
    collection: "services",
    sort: "order",
  });

  return (
    <>
      {services.map((service, index) => {
        const imageProps = getMediaImageProps(service.image);
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
              {imageProps && (
                <div className={reversed ? "md:order-1" : ""}>
                  <Image
                    src={imageProps.src}
                    alt={imageProps.alt}
                    width={imageProps.width}
                    height={imageProps.height}
                    sizes="(max-width: 768px) 100vw, 50vw"
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
