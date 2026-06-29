"use client";

import * as motion from "motion/react-client";
import { useLayoutEffect, useRef, useState } from "react";
import type { Contact, Location, SocialMedia } from "@/payload-types";
import { LinkBtm } from "@/shared/components/ui/link";
import { Section } from "@/shared/components/ui/section";

interface HeroSectionClientProps {
  firstLocation: Location;
  contact: Contact;
  socials: SocialMedia[];
}

export function HeroSectionClient({
  contact,
  firstLocation,
  socials,
}: HeroSectionClientProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoSlotRef = useRef<HTMLDivElement>(null);

  const [videoRect, setVideoRect] = useState<{
    left: number;
    top: number;
    width: number;
    height: number;
  } | null>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current || !videoSlotRef.current) return;
    const update = () => {
      if (!sectionRef.current || !videoSlotRef.current) return;
      const sectionRect = sectionRef.current.getBoundingClientRect();
      const slotRect = videoSlotRef.current.getBoundingClientRect();

      setVideoRect({
        left: slotRect.left - sectionRect.left,
        top: slotRect.top - sectionRect.top,
        width: slotRect.width,
        height: slotRect.height,
      });
    };

    update();

    const resize = new ResizeObserver(update);

    resize.observe(sectionRef.current);
    resize.observe(videoSlotRef.current);

    return () => resize.disconnect();
  }, []);

  return (
    <Section
      className="relative overflow-hidden bg-card pt-20 md:pt-40 md:pb-40"
      ref={sectionRef}
    >
      <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_top,rgba(245,200,70,0.35),transparent_55%)]" />
      <div className="absolute top-16 right-30 z-10 h-64 w-64 rounded-full bg-secondary/40 blur-3xl" />
      <div className="z-20 grid max-w-fit justify-items-center gap-8 md:grid-cols-2">
        <div className="z-20 w-full space-y-10">
          <div className="flex flex-col items-start gap-3">
            <p className="text-muted-foreground text-xs uppercase tracking-[0.35em]">
              Tecnología
            </p>
            <h1 className="font-semibold text-6xl text-shadow-soft">JP 3D</h1>
            <p className="max-w-xl text-base text-muted-foreground md:text-lg">
              Ingeniería, Modelado 3D, Fabricación 3D, Máquinas, Insumos y
              Repuestos.
            </p>
          </div>
          <div className="flex flex-wrap gap-6 text-muted-foreground text-sm">
            {firstLocation && (
              <div>
                <p className="text-foreground text-xs uppercase tracking-[0.2em]">
                  Ubicacion
                </p>
                <p>{firstLocation.address}</p>
              </div>
            )}
            <div>
              <p className="text-foreground text-xs uppercase tracking-[0.2em]">
                Contacto
              </p>
              <p>{contact.phone}</p>
            </div>
          </div>
          <div className="flex flex-col items-start gap-3">
            <p className="text-foreground text-xs uppercase tracking-[0.2em]">
              Redes sociales
            </p>
            <div className="flex flex-wrap gap-2">
              {socials.map((social) => (
                <LinkBtm
                  key={social.id}
                  href={social.url}
                  variant="outline"
                  target="_blank"
                  className="uppercase tracking-[0.2em]"
                >
                  {social.label}
                </LinkBtm>
              ))}
            </div>
          </div>
        </div>
        <div ref={videoSlotRef} className="h-100 w-full rounded-2xl" />
      </div>
      {videoRect && (
        <motion.video
          src="/videos/hero.mp4"
          autoPlay
          muted
          playsInline
          className="absolute z-10 object-cover"
          initial={{
            left: videoRect.left,
            top: videoRect.top,
            width: videoRect.width,
            height: videoRect.height,
            borderRadius: "1rem",
          }}
          animate={{
            left: 0,
            top: 0,
            width: "100%",
            height: "100%",
            borderRadius: 0,
          }}
          transition={{
            delay: 3,
            duration: 1.2,
            ease: "easeInOut",
          }}
        />
      )}
    </Section>
  );
}
