import configPromise from "@payload-config";
import { getPayload } from "payload";
import {
  Container,
  Section,
  SectionEyebrow,
  SectionHeader,
  SectionMainTitle,
  SectionTitle,
} from "@/shared/components/ui/section";
import { VideoCard } from "@/shared/components/ui/video-card";
import { routes } from "@/shared/config/routes";

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
          <SectionTitle>
            <SectionEyebrow>Multimedia</SectionEyebrow>
            <SectionMainTitle>Nuestros Videos</SectionMainTitle>
          </SectionTitle>
          <p className="text-muted-foreground text-xs uppercase tracking-[0.2em]">
            Conoce más sobre nuestro proceso
          </p>
        </SectionHeader>

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {videos.map((video) => (
            <VideoCard
              key={video.id}
              title={video.title}
              excerpt={video.excerpt}
              url={video.url}
              image={video.image}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
