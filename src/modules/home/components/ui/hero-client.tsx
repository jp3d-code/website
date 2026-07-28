"use client";

import { ChevronDown } from "lucide-react";
import type { Contact, Location, SocialMedia } from "@/payload-types";
import { Hero } from "@/shared/components/ui/hero";
import { LinkBtm } from "@/shared/components/ui/link";
import { socialIcons } from "@/shared/config/social-icons";

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
  return (
    <Hero
      eyebrow="Precisión en cada capa"
      title="JP 3D / Ingeniería & Fabricación"
      description="Especialistas en diseño 3D y fabricación digital, fusionando innovación, creatividad, ingeniería y tecnología para el sector industrial y minero."
      className="min-h-[90vh]"
    >
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
              >
                {Icon && <Icon className="size-7 stroke-1" />}
              </LinkBtm>
            );
          })}
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <ChevronDown className="animate-bounce text-primary" size={32} />
      </div>
    </Hero>
  );
}
