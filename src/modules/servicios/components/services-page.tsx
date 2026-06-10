import configPromise from "@payload-config";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { getPayload } from "payload";
import { routes } from "@/shared/config/routes";
import { getMediaUrl, slugify } from "@/shared/lib/utils";

export default async function ServicesPage() {
  const payload = await getPayload({ config: configPromise });
  const { docs: services } = await payload.find({
    collection: "services",
    sort: "order",
  });

  const sectionHashes: Record<string, string> = {
    INGENIERÍA: routes.servicios.sections.ingenieria.hash,
    EDUCACIÓN: routes.servicios.sections.educacion.hash,
    "FABRICACIÓN DIGITAL": routes.servicios.sections.fabricacionDigital.hash,
  };

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-16">
      <div className="grid gap-10">
        <div className="space-y-40">
          {services.map((service) => {
            const imageUrl = getMediaUrl(service.image);
            const sectionId =
              sectionHashes[service.title] || slugify(service.title);
            return (
              <section key={service.id} id={sectionId} className="space-y-4">
                <h2 className="text-5xl tracking-widest md:text-6xl">
                  {service.title}
                </h2>

                <div className="prose prose-sm max-w-none text-muted-foreground">
                  <p>{service.excerpt}</p>
                  <div className="paragraph">
                    {service.content && <RichText data={service.content} />}
                  </div>
                  {imageUrl && (
                    <img
                      src={imageUrl}
                      alt={service.title}
                      className="mx-auto aspect-video w-full rounded-lg object-cover"
                    />
                  )}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
