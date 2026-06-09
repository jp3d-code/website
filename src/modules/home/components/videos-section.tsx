import configPromise from "@payload-config";
import Link from "next/link";
import { getPayload } from "payload";
import { Container, Section } from "@/shared/components/ui/section";
import { routes } from "@/shared/config/routes";

export async function VideosSection() {
  const payload = await getPayload({ config: configPromise });
  const { docs: videos } = await payload.find({
    collection: "videos",
    sort: "order",
  });

  return (
    <Section className="">
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
          {videos.map((video) => (
            <Link
              key={video.id}
              href={video.url}
              target="_blank"
              className="rounded-2xl border border-border bg-card p-5 backdrop-blur"
            >
              <p className="text-xs uppercase tracking-widest">Video</p>
              <h3 className="mt-3 font-semibold text-lg">{video.title}</h3>
              <p className="mt-3 line-clamp-3 text-muted-foreground text-sm">
                {video.excerpt}
              </p>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}
