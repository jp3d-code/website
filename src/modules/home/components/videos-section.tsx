import Link from "next/link";
import { Container, Section } from "@/shared/components/ui/section";
import { routes } from "@/shared/config/routes";
import { aboutData } from "@/shared/data/about-us";

export function VideosSection() {
  const videoCards = aboutData.items.filter((item) => item.video);

  return (
    <Section className="bg-foreground py-16 text-background">
      <Container>
        <div className="flex w-full items-center justify-between">
          <h2 className="text-xl uppercase tracking-widest">JP3D Videos</h2>
          <Link
            href={routes.sobreNosotros.path}
            className="text-background/60 text-xs uppercase tracking-[0.2em]"
          >
            Ir a la historia
          </Link>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {videoCards.map((item) => (
            <Link
              key={item.title}
              href={item.video ?? "#"}
              target="_blank"
              className="rounded-2xl border border-background/20 bg-background/5 p-5 backdrop-blur"
            >
              <p className="text-background/60 text-xs uppercase tracking-widest">
                Video
              </p>
              <h3 className="mt-3 font-semibold text-lg">{item.title}</h3>
              <p className="mt-3 line-clamp-3 text-background/70 text-sm">
                {item.excerpt}
              </p>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}
