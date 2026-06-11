import configPromise from "@payload-config";
import Link from "next/link";
import { getPayload } from "payload";
import {
  Container,
  Section,
  SectionHeader,
  SectionLink,
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

  return (
    <Section className="">
      <Container>
        <SectionHeader>
          <SectionTitle first="Ultimos" second="Videos"></SectionTitle>
          <SectionLink href={routes.contacto.path}>Descubre mas</SectionLink>
        </SectionHeader>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {videos.map((video) => {
            const imageUrl = getMediaUrl(video.image);

            return (
              <Link
                key={video.id}
                href={video.url}
                target="_blank"
                className="overflow-hidden rounded-lg border border-border bg-card"
              >
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={video.title}
                    className="aspect-video w-full object-cover"
                  />
                ) : (
                  <Skeleton className="aspect-video w-full rounded-none" />
                )}
                <div className="p-5">
                  <p className="text-xs uppercase tracking-widest">Video</p>
                  <h3 className="mt-3 font-semibold text-lg">{video.title}</h3>
                  <p className="mt-3 line-clamp-2 text-muted-foreground text-sm">
                    {video.excerpt}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
