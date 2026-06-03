import Link from "next/link";
import { Container, Section } from "@/shared/components/ui/section";
import { routes } from "@/shared/config/routes";
import { homeData } from "@/shared/data/home";

export function ServicesSection() {
  return (
    <Section className="bg-card">
      <Container>
        <div className="flex w-full items-center justify-between">
          <h2 className="text-xl uppercase tracking-widest">Servicios</h2>
          <Link
            href={routes.servicios.path}
            className="text-muted-foreground text-xs uppercase tracking-[0.2em]"
          >
            Ver detalle
          </Link>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {homeData.services.map((service) => (
            <Link
              key={service.title}
              href={`${routes.servicios.path}${service.hash}`}
              className="inset-shadow-md rounded-3xl border border-border/60 bg-background p-6 shadow-sm shadow-white transition hover:-translate-y-1 hover:shadow-zinc-200"
            >
              <p className="text-muted-foreground text-xs uppercase tracking-widest">
                {service.number}
              </p>
              <h3 className="mt-3 font-semibold text-lg">{service.title}</h3>
              <p className="mt-3 text-muted-foreground text-sm">
                {service.description}
              </p>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}
