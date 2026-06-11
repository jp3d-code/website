import configPromise from "@payload-config";
import { PlayCircle } from "lucide-react";
import Link from "next/link";
import { getPayload } from "payload";
import {
  Container,
  Section,
  SectionDescription,
  SectionHeader,
  SectionTitle,
} from "@/shared/components/ui/section";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { routes } from "@/shared/config/routes";
import { getMediaUrl } from "@/shared/lib/utils";

export async function VideosSection() {
  const payload = await getPayload({ config: configPromise });
  const { docs: videos } = await payload.find({
    collection: "videos",
    sort: "order",
    depth: 1,
  });

  const { videos: videosRoute } = routes.sobreNosotros.sections;

  if (!videos || videos.length === 0) {
    return null;
  }

  return (
    <Section id={videosRoute.hash}>
      <Container>
        <SectionHeader className="mb-16">
          <SectionTitle first="Nuestros" second="Videos" />
          <SectionDescription>
            Conoce más sobre nuestro proceso, casos de éxito y el impacto de
            nuestro trabajo en la industria.
          </SectionDescription>
        </SectionHeader>

        <div className="grid w-full gap-8 md:grid-cols-2 lg:grid-cols-3">
          {videos.map((video) => {
            const imageUrl = getMediaUrl(video.image);

            return (
              <div
                key={video.id}
                className="group flex flex-col gap-4 overflow-hidden"
              >
                <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-muted">
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={video.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <Skeleton className="h-full w-full rounded-none" />
                  )}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/10 transition-colors group-hover:bg-black/20">
                    <PlayCircle className="size-12 text-white/80 transition-transform group-hover:scale-110" />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <h4 className="line-clamp-2 font-bold text-lg leading-tight">
                    {video.title}
                  </h4>
                  <p className="line-clamp-3 text-muted-foreground text-sm">
                    {video.excerpt}
                  </p>
                  <Link
                    href={video.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 w-max font-semibold text-primary text-sm uppercase tracking-wider hover:underline"
                  >
                    Ver en YouTube
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
