"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import type { Client } from "@/payload-types";
import {
  SectionTitle,
  SectionTitleForeground,
  SectionTitlePrimary,
} from "@/shared/components/ui/section";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { getMediaUrl } from "@/shared/lib/utils";

interface ClientsCarouselProps {
  clients: Client[];
}

export function ClientsCarousel({ clients }: ClientsCarouselProps) {
  const targetRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: targetRef });
  const x = useTransform(scrollYProgress, [0, 1], ["10%", "-110%"]);

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-neutral-900">
      <div className="sticky top-0 flex h-screen w-full flex-col items-center justify-center gap-10 overflow-hidden">
        <SectionTitle className="z-20 flex w-full max-w-6xl items-center justify-start gap-2">
          <SectionTitleForeground>Nuestros</SectionTitleForeground>
          <SectionTitlePrimary>Clientes</SectionTitlePrimary>
        </SectionTitle>

        <motion.div
          style={{ x }}
          className="flex w-full items-start justify-start gap-4 px-10"
        >
          {clients.map((client) => (
            <ClientCard key={client.id} client={client} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

interface ClientCardProps {
  client: Client;
}

function ClientCard({ client }: ClientCardProps) {
  const logoUrl = getMediaUrl(client.logo);

  return (
    <a
      href={client.website || "#"}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative aspect-video w-100 shrink-0 overflow-hidden rounded-lg bg-neutral-800"
    >
      <Skeleton className="absolute inset-0 rounded-xl" />
      {logoUrl && (
        <div
          style={{
            backgroundImage: `url(${logoUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="absolute inset-0 z-10 opacity-60 grayscale transition-all duration-300 group-hover:scale-110 group-hover:opacity-100 group-hover:grayscale-0"
        />
      )}

      {!logoUrl && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-neutral-700">
          <span className="font-semibold text-lg text-neutral-300">
            {client.name}
          </span>
        </div>
      )}

      <div className="absolute inset-0 z-20 bg-black/40" />
    </a>
  );
}
