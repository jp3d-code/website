import configPromise from "@payload-config";
import { getPayload } from "payload";
import Link from "next/link";
import { Container, Section } from "@/shared/components/ui/section";
import { routes } from "@/shared/config/routes";

export default async function ServicesPage() {
  const payload = await getPayload({ config: configPromise });
  const { docs: services } = await payload.find({
    collection: "services",
    sort: "order",
  });

  return (
    <Section className="bg-card">
      <Container>
        <div className="flex w-full items-center justify-between">
          <h2 className="text-xl uppercase tracking-widest">Nuestros Servicios</h2>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {services.map((service, index) => {
            const serviceNumber = (index + 1).toString().padStart(3, "0");
            return (
              <Link
                key={service.id}
                href={routes.servicios.detail.build({ slug: service.slug })}
                className="inset-shadow-md rounded-lg border border-border/60 bg-background p-6 shadow-sm shadow-white transition hover:-translate-y-1 hover:shadow-zinc-200"
              >
                <p className="text-muted-foreground text-xs uppercase tracking-widest">
                  {serviceNumber}
                </p>
                <h3 className="mt-3 font-semibold text-lg">{service.title}</h3>
                <p className="mt-3 text-muted-foreground text-sm">
                  {service.excerpt}
                </p>
              </Link>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
