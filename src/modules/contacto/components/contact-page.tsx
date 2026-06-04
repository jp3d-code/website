import { MapPin } from "lucide-react";
import Link from "next/link";
import { LinkBtm } from "@/shared/components/ui/link";
import {
  Map as MapComp,
  MapMarker,
  MarkerContent,
  MarkerPopup,
  MarkerTooltip,
} from "@/shared/components/ui/map";
import { Container, Section } from "@/shared/components/ui/section";
import { contactData } from "@/shared/data/contact";

const jp3dLocation = {
  name: "JP 3D",
  lat: -16.4168453,
  lng: -71.5092279,
};

export default function ContactPage() {
  return (
    <Section>
      <Container className="grid gap-10 md:grid-cols-2">
        <div className="space-y-6">
          <p className="text-muted-foreground text-xs uppercase tracking-[0.35em]">
            {contactData.smallTitle}
          </p>
          <h1 className="font-medium text-3xl uppercase tracking-widest md:text-6xl">
            {contactData.bigTitle}
          </h1>
          <div className="space-y-2 text-muted-foreground text-sm">
            <p>{contactData.location}</p>
            <p>{contactData.phone}</p>
            <p>
              <Link
                href={`mailto:${contactData.email}`}
                className="underline-offset-4 hover:underline"
              >
                {contactData.email}
              </Link>
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {contactData.socials.map((social) => (
              <LinkBtm
                key={social.url}
                href={social.url}
                target="_blank"
                variant="outline"
                className="uppercase tracking-widest"
              >
                {social.label}
              </LinkBtm>
            ))}
          </div>
        </div>
        <div className="aspect-4/3 overflow-hidden rounded-3xl border border-border/60 shadow-sm">
          <MapComp center={[jp3dLocation.lng, jp3dLocation.lat]} zoom={15}>
            <MapMarker longitude={jp3dLocation.lng} latitude={jp3dLocation.lat}>
              <MarkerContent>
                <MapPin className="size-8 text-primary" />
              </MarkerContent>
              <MarkerTooltip>{jp3dLocation.name}</MarkerTooltip>
              <MarkerPopup>
                <div className="space-y-1">
                  <p className="font-medium text-foreground">
                    {jp3dLocation.name}
                  </p>
                  <p className="text-muted-foreground text-xs">
                    {jp3dLocation.lat.toFixed(4)}, {jp3dLocation.lng.toFixed(4)}
                  </p>
                  <p className="text-muted-foreground text-xs">
                    {contactData.location}
                  </p>
                </div>
              </MarkerPopup>
            </MapMarker>
          </MapComp>
        </div>
      </Container>
    </Section>
  );
}
