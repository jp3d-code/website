import Link from "next/link";
import { aboutData } from "@/shared/data/about-us";
import { imageByName, imageSrc } from "@/shared/data/images";

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-16">
      <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-10">
          {aboutData.items.map((item) => {
            const image = item.image ? imageByName[item.image] : null;
            return (
              <section key={item.title} className="space-y-4">
                <h2 className="font-semibold text-xl">{item.title}</h2>
                {image && (
                  <img
                    src={imageSrc(image)}
                    alt={item.title}
                    className="h-56 w-full rounded-3xl object-cover"
                  />
                )}
                {item.video ? (
                  <Link
                    href={item.video}
                    target="_blank"
                    className="inline-flex items-center gap-2 rounded-full border border-foreground/30 px-4 py-2 text-xs uppercase tracking-[0.2em]"
                  >
                    Ver video
                  </Link>
                ) : null}
                <div className="space-y-3 text-muted-foreground text-sm">
                  <p>{item.excerpt}</p>
                  {item.content.map((text, index) => (
                    <p key={`${item.title}-${index}`}>{text}</p>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
        <aside className="space-y-6 rounded-3xl border border-border/60 bg-muted/30 p-6">
          <h3 className="text-muted-foreground text-xs uppercase tracking-[0.3em]">
            Sobre nosotros
          </h3>
          <div className="space-y-3 text-muted-foreground text-sm">
            <p>{aboutData.description}</p>
          </div>
          <div className="rounded-2xl border border-border/60 bg-background p-5">
            <blockquote className="text-foreground text-sm">
              {aboutData.testimonial.quote}
            </blockquote>
            <div className="mt-4 text-muted-foreground text-xs uppercase tracking-[0.3em]">
              {aboutData.testimonial.name}
            </div>
            <p className="text-muted-foreground text-xs">
              {aboutData.testimonial.role}
            </p>
            <p className="mt-2 text-muted-foreground text-xs">
              {aboutData.testimonial.phone}
            </p>
            <p className="text-muted-foreground text-xs">
              {aboutData.testimonial.email}
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
