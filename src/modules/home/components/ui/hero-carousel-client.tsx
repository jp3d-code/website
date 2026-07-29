"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import {
  heroContentVariants,
  heroItemVariants,
  heroTitleVariants,
} from "@/modules/home/animations/hero-stagger";
import type { Contact, Location, SocialMedia } from "@/payload-types";
import { LinkBtm } from "@/shared/components/ui/link";
import {
  Section,
  SectionDescription,
  SectionEyebrow,
} from "@/shared/components/ui/section";
import { socialIcons } from "@/shared/config/social-icons";
import { cn } from "@/shared/lib/utils";

const slides = [
  {
    id: 1,
    highlight: "DIGITAL",
    image: "https://jp3d-website.ynoacamino.me/api/media/file/imag.webp",
  },
  {
    id: 2,
    highlight: "Y DISEÑO 3D",
    image: "https://hygacon-preview.ynoacamino.me/assets/d145c549-edb3-4168-9a24-f2692b01c3ef.webp",
  },
  {
    id: 3,
    highlight: "TECNOLÓGICA",
    image: "https://jp3d-website.ynoacamino.me/api/media/file/imag.webp",
  },
  {
    id: 4,
    highlight: "STEM",
    image: "https://hygacon-preview.ynoacamino.me/assets/f1df974d-d711-4656-89d6-87df797f8779.webp",
  },
  {
    id: 5,
    highlight: "EN 3D",
    image: "https://hygacon-preview.ynoacamino.me/assets/c25d5735-b29c-4dcc-9ca1-32977f6e664b.webp",
  },
  {
    id: 6,
    highlight: "INTEGRALES",
    image: "https://hygacon-preview.ynoacamino.me/assets/f6547048-8ff9-4eed-8bf1-2eb13cbd6527.webp",
  },
];

interface HeroCarouselClientProps {
  firstLocation: Location;
  contact: Contact;
  socials: SocialMedia[];
}

export function HeroCarouselClient({
  contact,
  firstLocation,
  socials,
}: HeroCarouselClientProps) {
  const [index, setIndex] = useState(0);

  // biome-ignore lint/correctness/useExhaustiveDependencies: We want this effect to run only when the index changes, not on every render.
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [index]);

  const currentSlide = slides[index];

  return (
    <Section className="grid-background relative h-[90vh] overflow-hidden border-none bg-background px-0 pt-0 pb-0">
      <div className="pointer-events-none bg-grad" />
      <div className="pointer-events-none bg-grad-white" />

      <AnimatePresence mode="sync">
        <motion.div
          key={currentSlide.id}
          className="absolute inset-0"
          initial={{ opacity: index === 0 ? 1 : 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 1.2,
            ease: "easeInOut",
          }}
        >
          <img
            src={currentSlide.image}
            alt=""
            className="h-full w-full object-cover"
            fetchPriority={index === 0 ? "high" : "auto"}
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/50 to-transparent" />

      <div className="relative z-10 flex h-full w-full items-center px-6 md:px-52">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide.id}
            variants={heroContentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex w-full max-w-2xl flex-col items-start gap-6"
          >
            <motion.div variants={heroItemVariants}>
              <SectionEyebrow>Precisión en cada capa</SectionEyebrow>
            </motion.div>

            <motion.h1
              variants={heroTitleVariants}
              className="flex flex-col gap-2"
            >
              <motion.span
                variants={heroItemVariants}
                className="font-bold text-5xl text-white"
              >
                JP 3D / Ingeniería & Fabricación
              </motion.span>
              <motion.span
                variants={heroItemVariants}
                className="font-extrabold text-4xl text-primary uppercase md:text-6xl"
              >
                {currentSlide.highlight}
              </motion.span>
            </motion.h1>

            <motion.div variants={heroItemVariants}>
              <SectionDescription className="text-start text-white/80">
                Especialistas en diseño 3D y fabricación digital, fusionando
                innovación, creatividad, ingeniería y tecnología para el sector
                industrial y minero.
              </SectionDescription>
            </motion.div>

            <motion.div
              variants={heroItemVariants}
              className="flex flex-wrap gap-6 text-sm text-white/70"
            >
              {firstLocation && (
                <div>
                  <p className="text-white text-xs uppercase tracking-[0.2em]">
                    Ubicacion
                  </p>
                  <p>{firstLocation.address}</p>
                </div>
              )}
              <div>
                <p className="text-white text-xs uppercase tracking-[0.2em]">
                  Contacto
                </p>
                <p>{contact.phone}</p>
              </div>
            </motion.div>

            <motion.div
              variants={heroItemVariants}
              className="flex flex-col items-start gap-3"
            >
              <p className="text-white text-xs uppercase tracking-[0.2em]">
                Redes sociales
              </p>
              <div className="flex flex-wrap gap-2">
                {socials.map((social) => {
                  const Icon = social.icon ? socialIcons[social.icon] : null;
                  return (
                    <LinkBtm
                      key={social.id}
                      href={social.url}
                      variant="outline"
                      size="icon"
                      target="_blank"
                      aria-label={social.label}
                      className="border-white/30 text-white hover:border-primary hover:text-primary"
                    >
                      {Icon && <Icon className="size-7 stroke-1" />}
                    </LinkBtm>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-10 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {slides.map((_, i) => (
          <button
            type="button"
            key={i}
            onClick={() => setIndex(i)}
            className={cn(
              "h-3 w-3 rounded-full bg-white/40 transition-all duration-300",
              {
                "w-10 bg-primary": i === index,
              },
            )}
          />
        ))}
      </div>
    </Section>
  );
}
