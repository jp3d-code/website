import { marked } from "marked";
import { imageByName, imageSrc } from "@/shared/data/images";
import { servicesData } from "@/shared/data/services";

marked.setOptions({});

export default function ServicesPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-16">
      <div className="grid gap-10">
        <div className="space-y-40">
          {servicesData.items.map((service) => {
            const image = imageByName[service.image];
            const htmlContent = marked.parse(service.content) as string;
            return (
              <section key={service.title} className="space-y-4">
                <h2 className="text-5xl tracking-widest md:text-6xl">
                  {service.title}
                </h2>
                <div className="prose prose-sm max-w-none text-muted-foreground">
                  <p>{service.excerpt}</p>
                  <div
                    className="paragraph"
                    dangerouslySetInnerHTML={{ __html: htmlContent }}
                  />
                  {image && (
                    <img
                      src={imageSrc(image)}
                      alt={service.title}
                      className="mx-auto aspect-video w-full rounded-lg object-cover"
                    />
                  )}
                </div>
              </section>
            );
          })}
        </div>
        {/*<aside className="space-y-6 rounded-3xl border border-border/60 bg-muted/30 p-6">
          <h3 className="text-muted-foreground text-xs uppercase tracking-[0.3em]">
            Servicios
          </h3>
          <div className="space-y-3 text-muted-foreground text-sm">
            <p>{servicesData.description}</p>
          </div>
          <div className="rounded-2xl border border-border/60 bg-background p-5">
            <blockquote className="text-foreground text-sm">
              {servicesData.testimonial.quote}
            </blockquote>
            <div className="mt-4 text-muted-foreground text-xs uppercase tracking-[0.3em]">
              {servicesData.testimonial.name}
            </div>
            <p className="text-muted-foreground text-xs">
              {servicesData.testimonial.role}
            </p>
            <p className="mt-2 text-muted-foreground text-xs">
              {servicesData.testimonial.phone}
            </p>
            <p className="text-muted-foreground text-xs">
              {servicesData.testimonial.email}
            </p>
          </div>
        </aside>*/}
      </div>
    </div>
  );
}
