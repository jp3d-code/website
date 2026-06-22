import configPromise from "@payload-config";
import { getPayload } from "payload";
import { LocationRow } from "@/modules/contacto/components/ui/location-row";
import type { MapLocation } from "@/modules/contacto/types/map-location";
import type { Location } from "@/payload-types";
import {
  Container,
  Section,
  SectionHeader,
  SectionTitle,
  SectionTitleForeground,
  SectionTitlePrimary,
} from "@/shared/components/ui/section";
import { getCollections } from "@/shared/lib/utils";

export async function LocationsListSection() {
  const payload = await getPayload({ config: configPromise });
  const contact = await payload.findGlobal({
    slug: "contact",
    depth: 1,
  });

  const locations = getCollections<Location>(contact.locations);

  if (locations.length === 0) return null;

  return (
    <Section className="flex flex-col">
      <Container>
        <SectionHeader className="mb-4">
          <SectionTitle>
            <SectionTitleForeground>Nuestras</SectionTitleForeground>
            <SectionTitlePrimary>Ubicaciones</SectionTitlePrimary>
          </SectionTitle>
        </SectionHeader>
      </Container>

      {locations.map((location) => {
        const mapLocation: MapLocation = {
          id: location.id,
          name: location.name,
          address: location.address,
          lat: location.lat,
          lng: location.lng,
        };

        return (
          <Container
            key={location.id}
            className="border-border/60 border-b last:border-b-0"
          >
            <LocationRow location={mapLocation} phone={contact.phone} />
          </Container>
        );
      })}
    </Section>
  );
}
