import Link from "next/link";
import { Container, Section } from "@/shared/components/ui/section";
import { homeData } from "@/shared/data/home";
import { imageByName, imageSrc } from "@/shared/data/images";

export function SponsorsSection() {
  const sponsorRow = homeData.sponsors;

  return (
    <Section className="bg-card">
      <Container>
        <h2 className="w-full text-xl uppercase tracking-widest">Aliados</h2>
        <div className="flex flex-wrap items-center gap-6">
          {sponsorRow.map((sponsor) => {
            const image = imageByName[sponsor.img];
            return (
              <Link
                key={sponsor.name}
                href={sponsor.url}
                target="_blank"
                className="relative flex min-w-50 max-w-20 items-center justify-center"
              >
                {image && (
                  <>
                    <img
                      src={imageSrc(image)}
                      alt={sponsor.alt}
                      className="absolute inset-0 w-full blur-lg brightness-400"
                    />
                    <img
                      src={imageSrc(image)}
                      alt={sponsor.alt}
                      className="z-20 w-full"
                    />
                  </>
                )}
              </Link>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
