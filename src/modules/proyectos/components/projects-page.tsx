import configPromise from "@payload-config";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { getPayload } from "payload";
import { getMediaUrl } from "@/shared/lib/utils";

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
  });

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-16">
      <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-16">
          {projects.map((project) => {
            const imageUrl = getMediaUrl(project.image);
            return (
              <section key={project.id} className="space-y-4">
                <h2 className="text-3xl uppercase tracking-widest md:text-4xl">
                  {project.title}
                </h2>
                {imageUrl && (
                  <img
                    src={imageUrl}
                    alt={project.title}
                    className="aspect-video w-full rounded-lg object-cover"
                  />
                )}
                <p className="text-muted-foreground text-sm">
                  {project.excerpt}
                </p>
                <div className="paragraph">
                  {project.content && <RichText data={project.content} />}
                </div>
              </section>
            );
          })}
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
            <p className="text-muted-foreground text-xs">{testimonial.role}</p>
            <p className="mt-2 text-muted-foreground text-xs">
              {testimonial.phone}
            </p>
            <p className="text-muted-foreground text-xs">{testimonial.email}</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
