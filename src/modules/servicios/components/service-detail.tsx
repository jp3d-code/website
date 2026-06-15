import { RichText } from "@payloadcms/richtext-lexical/react";
import type { Service } from "@/payload-types";
import { Container, Section } from "@/shared/components/ui/section";
import { getMediaUrl } from "@/shared/lib/utils";

interface ServiceDetailProps {
  service: Service;
}

export function ServiceDetail({ service }: ServiceDetailProps) {
  const imageUrl = getMediaUrl(service.image);

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

          {imageUrl && (
            <img
              src={imageUrl}
              alt={service.title}
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
