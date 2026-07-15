import configPromise from "@payload-config";
import { getPayload } from "payload";
import {
  Container,
  Section,
  SectionEyebrow,
  SectionHeader,
  SectionLink,
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

  return (
    <Section>
      <Container>
        <SectionHeader>
          <SectionTitle>
            <SectionEyebrow>Contenido</SectionEyebrow>
            <SectionMainTitle>Últimos Videos</SectionMainTitle>
          </SectionTitle>
          <SectionLink href={routes.contacto.path}>Descubre mas</SectionLink>
        </SectionHeader>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
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
