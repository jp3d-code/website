"use client";

import { Building2, ExternalLink, MapPin } from "lucide-react";
import type { MapLocation } from "@/modules/contacto/types/map-location";
import { Button } from "@/shared/components/ui/button";
import {
  Map as MapComp,
  MapMarker,
  MarkerContent,
  MarkerPopup,
  MarkerTooltip,
} from "@/shared/components/ui/map";

interface LocationRowProps {
  location: MapLocation;
  phone?: string;
}

export function LocationRow({ location, phone }: LocationRowProps) {
  return (
    <section
      id={`location-${location.id}`}
      className="grid w-full items-start gap-10 border-border/60 border-b py-20 md:grid-cols-2 md:gap-16"
    >
      <div className="flex flex-col items-start gap-5 md:items-end md:justify-self-end">
        <div className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Building2 className="size-5" />
          </span>
          <h3 className="font-semibold text-2xl">{location.name}</h3>
        </div>

        <div className="space-y-1 md:text-end">
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest">
            Dirección
          </p>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {location.address}
          </p>
        </div>

        <div className="space-y-1 md:text-end">
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest">
            Teléfono
          </p>
          <span className="inline-flex items-center gap-1.5 text-muted-foreground text-sm">
            {phone}
          </span>
        </div>

        <a
          href={`https://www.google.com/maps?q=${location.lat},${location.lng}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="default" size="default">
            <ExternalLink className="size-4" />
            Cómo llegar
          </Button>
        </a>
      </div>
      <div className="aspect-4/3 overflow-hidden rounded-3xl border border-border/60 shadow-sm">
        <MapComp center={[location.lng, location.lat]} zoom={15}>
          <MapMarker longitude={location.lng} latitude={location.lat}>
            <MarkerContent>
              <MapPin className="size-8 text-primary" />
            </MarkerContent>
            <MarkerTooltip>{location.name}</MarkerTooltip>
            <MarkerPopup>
              <div className="space-y-1">
                <p className="font-medium text-foreground">{location.name}</p>
                <p className="text-muted-foreground text-xs">
                  {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
                </p>
                <p className="text-muted-foreground text-xs">
                  {location.address}
                </p>
              </div>
            </MarkerPopup>
          </MapMarker>
        </MapComp>
      </div>
    </section>
  );
}
