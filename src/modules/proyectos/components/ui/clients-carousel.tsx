"use client";

import { motion } from "motion/react";
import Image from "next/image";
import type { Client } from "@/payload-types";
import {
  Container,
  Section,
  SectionEyebrow,
  SectionMainTitle,
  SectionTitle,
} from "@/shared/components/ui/section";
import { getMediaUrl } from "@/shared/lib/utils";

interface ClientsCarouselProps {
  clients: Client[];
}

export function ClientsCarousel({ clients }: ClientsCarouselProps) {
  const duplicatedClients = [...clients, ...clients];

  return (
    <Section>
      <Container>
        <SectionTitle className="mb-12">
          <SectionEyebrow>Confianza</SectionEyebrow>
          <SectionMainTitle>Nuestros Clientes</SectionMainTitle>
        </SectionTitle>

        <div className="relative w-full overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-background to-transparent" />

          <motion.div
            className="flex w-max gap-12"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              x: {
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                duration: 25,
                ease: "linear",
              },
            }}
          >
            {duplicatedClients.map((client, index) => (
              <ClientLogo key={`${client.id}-${index}`} client={client} />
            ))}
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}

interface ClientLogoProps {
  client: Client;
}

function ClientLogo({ client }: ClientLogoProps) {
  const logoUrl = getMediaUrl(client.logo);

  return (
    <a
      href={client.website || "#"}
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-24 w-40 shrink-0 items-center justify-center opacity-50 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
    >
      {logoUrl ? (
        <Image
          src={logoUrl}
          alt={client.name}
          width={300}
          height={96}
          className="object-contain"
        />
      ) : (
        <span className="font-semibold text-muted-foreground text-sm">
          {client.name}
        </span>
      )}
    </a>
  );
}
