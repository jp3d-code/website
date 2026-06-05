import { marked } from "marked";
import { imageByName, imageSrc } from "@/shared/data/images";
import { projects } from "@/shared/data/projects";

marked.setOptions({});

export default function ProjectsPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-16">
      <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-16">
          {projects.items.map((project) => {
            const image = imageByName[project.image];
            const htmlContent = marked.parse(project.content) as string;
            return (
              <section key={project.title} className="space-y-4">
                <h2 className="text-3xl uppercase tracking-widest md:text-4xl">
                  {project.title}
                </h2>
                {image && (
                  <img
                    src={imageSrc(image)}
                    alt={project.title}
                    className="aspect-video w-full rounded-lg object-cover"
                  />
                )}
                <p className="text-muted-foreground text-sm">
                  {project.excerpt}
                </p>
                <div
                  className="paragraph"
                  dangerouslySetInnerHTML={{ __html: htmlContent }}
                />
              </section>
            );
          })}
        </div>
        <aside className="space-y-6 rounded-3xl border border-border/60 bg-muted/30 p-6">
          <h3 className="text-muted-foreground text-xs uppercase tracking-[0.3em]">
            Proyectos
          </h3>
          <div className="space-y-3 text-muted-foreground text-sm">
            <p>{projects.description}</p>
          </div>
          <div className="rounded-2xl border border-border/60 bg-background p-5">
            <blockquote className="text-foreground text-sm">
              {projects.testimonial.quote}
            </blockquote>
            <div className="mt-4 text-muted-foreground text-xs uppercase tracking-[0.3em]">
              {projects.testimonial.name}
            </div>
            <p className="text-muted-foreground text-xs">
              {projects.testimonial.role}
            </p>
            <p className="mt-2 text-muted-foreground text-xs">
              {projects.testimonial.phone}
            </p>
            <p className="text-muted-foreground text-xs">
              {projects.testimonial.email}
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
