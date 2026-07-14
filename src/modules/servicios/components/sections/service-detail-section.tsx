import { RichText } from "@payloadcms/richtext-lexical/react";
import Image from "next/image";
import type { Service } from "@/payload-types";
import { Container, Section } from "@/shared/components/ui/section";
import { getMediaImageProps } from "@/shared/lib/utils";

interface ServiceDetailProps {
  service: Service;
}

export function ServiceDetailSection({ service }: ServiceDetailProps) {
  const imageProps = getMediaImageProps(service.image);

  return (
    <Section>
      <Container className="max-w-4xl items-start">
        <div className="space-y-8">
          <header className="space-y-4">
            <h1 className="text-3xl uppercase tracking-widest md:text-5xl">
              {service.title}
            </h1>
            <div className="paragraph text-muted-foreground text-sm">
              <RichText data={service.excerpt} />
            </div>
          </header>

          {imageProps && (
            <Image
              src={imageProps.src}
              alt={imageProps.alt}
              width={imageProps.width}
              height={imageProps.height}
              sizes="(max-width: 896px) 100vw, 896px"
              className="aspect-video w-full rounded-lg object-cover"
            />
          )}

          <div className="paragraph">
            {service.content && <RichText data={service.content} />}
          </div>
        </div>
      </Container>
    </Section>
  );
}
