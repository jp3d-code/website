import { imageByName, imageSrc } from "@/shared/data/images";
import { projects } from "@/shared/data/projects";

export default function ProjectsPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-16">
      <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-10">
          {projects.items.map((project) => {
            const image = imageByName[project.image];
            return (
              <section key={project.title} className="space-y-4">
                <h2 className="font-semibold text-xl">{project.title}</h2>
                {image && (
                  <img
                    src={imageSrc(image)}
                    alt={project.title}
                    className="h-56 w-full rounded-3xl object-cover"
                  />
                )}
                <div className="space-y-3 text-muted-foreground text-sm">
                  <p>{project.excerpt}</p>
                  {project.content.map((text, index) => (
                    <p key={`${project.title}-${index}`}>{text}</p>
                  ))}
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
