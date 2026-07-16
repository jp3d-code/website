"use client";

import { RichText } from "@payloadcms/richtext-lexical/react";
import { MoveRight } from "lucide-react";
import * as motion from "motion/react-client";
import Link from "next/link";
import type { Service } from "@/payload-types";
import { routes } from "@/shared/config/routes";
import { getMediaUrl } from "@/shared/lib/utils";

interface ServicesGridProps {
  services: Service[];
}

export function ServicesGrid({ services }: ServicesGridProps) {
  return (
    <div className="mt-8 grid w-full gap-8 md:grid-cols-2">
      {services.map((service, index) => {
        const imageUrl = getMediaUrl(service.image);

        return (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
          >
            <Link
              href={routes.servicios.detail.build({ slug: service.slug })}
              className="group relative flex aspect-5/6 w-full flex-col items-start justify-end gap-4 overflow-hidden rounded-lg p-8"
            >
              <div
                className="absolute inset-0 -z-20 bg-center bg-cover transition-transform duration-500 group-hover:scale-105"
                style={{
                  backgroundImage: imageUrl ? `url(${imageUrl})` : undefined,
                }}
              />
              <div className="absolute inset-0 -z-10 bg-linear-to-t from-black/90 via-black/60 to-black/10" />
              <div className="absolute inset-0 -z-10 bg-linear-to-t from-black/60 via-black/50 to-black/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="flex flex-col items-start gap-2">
                <span className="text-primary">[ Ecosistema Tecnológico ]</span>
                <span className="font-bold text-2xl text-white uppercase">
                  {service.title}
                </span>
              </div>

              <div className="h-0.5 w-10 rounded-full bg-primary transition-[width] duration-300 group-hover:w-20" />

              <div className="grid grid-rows-[0fr] opacity-0 transition-all duration-300 group-hover:grid-rows-[1fr] group-hover:opacity-100">
                <RichText
                  data={service.excerpt}
                  className="line-clamp-3 overflow-hidden text-sm text-white/70"
                />
              </div>

              <div className="flex translate-y-4 items-center gap-2 opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                <span className="text-primary text-sm uppercase tracking-widest">
                  Ver más
                </span>
                <MoveRight
                  className="text-primary transition-transform duration-300 group-hover:translate-x-1"
                  size={15}
                />
              </div>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}
