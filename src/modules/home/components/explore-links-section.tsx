import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Container, Section } from "@/shared/components/ui/section";
import { routes } from "@/shared/config/routes";

const exploreLinks = [
  { title: "NOSOTROS", href: routes.sobreNosotros.path },
  { title: "PROYECTOS", href: routes.proyectos.path },
  { title: "CONTACTO", href: routes.contacto.path },
];

export function ExploreLinksSection() {
  return (
    <Section className="bg-card">
      <Container className="flex justify-between gap-10 md:flex-row">
        <h2 className="text-4xl uppercase tracking-widest md:text-7xl">
          Sigue explorando
        </h2>
        <div className="grid gap-2">
          {exploreLinks.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group flex items-center gap-2 py-1 text-muted-foreground transition-all duration-150 hover:translate-x-2 hover:text-foreground"
            >
              <h3 className="font-medium text-lg">{item.title}</h3>
              <ArrowRight className="stroke-2 opacity-0 transition-all group-hover:opacity-100" />
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}
