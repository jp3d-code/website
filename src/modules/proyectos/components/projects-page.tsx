import configPromise from "@payload-config";
import { getPayload } from "payload";
import { LinkBtm } from "@/shared/components/ui/link";
import { ProjectCard } from "@/shared/components/ui/project-card";
import {
  Container,
  Section,
  SectionHeader,
  SectionTitle,
  SectionTitleForeground,
  SectionTitlePrimary,
} from "@/shared/components/ui/section";
import { routes } from "@/shared/config/routes";

const pageDescription =
  "En Proyectos, encontrarás una selección de nuestros trabajos más destacados de memorias de cálculo, diseños industriales y piezas fabricadas en 3D que demuestran cómo convertimos ideas en soluciones reales. Nuestro equipo de expertos trabaja con herramientas de última generación para transformar ideas en grandes proyectos.";

const testimonial = {
  name: "Janio Oliver Quispe Ticona",
  role: "CEO JP3D",
  phone: "+51 951 890 330",
  email: "oficina@jp3doficial.com",
  quote:
    "Cada proyecto que desarrollamos demuestra que la imaginación, respaldada por ingeniería de precisión y fabricación digital, se convierte en valor tangible para nuestros clientes.",
};

export default async function ProjectsPage() {
  const payload = await getPayload({ config: configPromise });
  const { docs: projects } = await payload.find({
    collection: "projects",
    sort: "order",
    depth: 2,
  });

  return (
    <Section>
      <Container>
        <div className="grid gap-10 md:grid-cols-[1.5fr_0.5fr]">
          <div>
            <SectionHeader className="mb-8">
              <SectionTitle>
                <SectionTitleForeground>Orgullosos de</SectionTitleForeground>
                <SectionTitlePrimary>nuestros proyectos</SectionTitlePrimary>
              </SectionTitle>
            </SectionHeader>
            <div className="grid gap-6 sm:grid-cols-2">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
          <aside className="space-y-6 rounded-3xl border border-border/60 bg-muted/30 p-6">
            <h3 className="text-muted-foreground text-xs uppercase tracking-[0.3em]">
              Proyectos
            </h3>
            <div className="space-y-3 text-muted-foreground text-sm">
              <p>{pageDescription}</p>
            </div>
            <div className="rounded-2xl border border-border/60 bg-background p-5">
              <blockquote className="text-foreground text-sm">
                {testimonial.quote}
              </blockquote>
              <div className="mt-4 text-muted-foreground text-xs uppercase tracking-[0.3em]">
                {testimonial.name}
              </div>
              <p className="text-muted-foreground text-xs">
                {testimonial.role}
              </p>
              <p className="mt-2 text-muted-foreground text-xs">
                {testimonial.phone}
              </p>
              <p className="text-muted-foreground text-xs">
                {testimonial.email}
              </p>
            </div>
            <LinkBtm
              href={routes.contacto.path}
              variant="default"
              className="uppercase tracking-[0.2em]"
            >
              Iniciar un proyecto
            </LinkBtm>
          </aside>
        </div>
      </Container>
    </Section>
  );
}
