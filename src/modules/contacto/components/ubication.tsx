import configPromise from "@payload-config";
import { MapPin } from "lucide-react";
import { getPayload } from "payload";
import type { Location } from "@/payload-types";
import {
  Map as MapComp,
  MapMarker,
  MarkerContent,
  MarkerPopup,
  MarkerTooltip,
} from "@/shared/components/ui/map";
import { getCollections } from "@/shared/lib/utils";

export async function Ubication() {
  const payload = await getPayload({ config: configPromise });
  const contact = await payload.findGlobal({
    slug: "contact",
    depth: 1,
  });

  const locations = getCollections<Location>(contact.locations);
  const firstLocation = locations[0];

  if (!firstLocation) return null;

  const jp3dLocation = {
    name: firstLocation.name,
    lat: firstLocation.lat,
    lng: firstLocation.lng,
    address: firstLocation.address,
  };

  return (
    <div className="aspect-4/3 overflow-hidden rounded-3xl border border-border/60 shadow-sm">
      <MapComp center={[jp3dLocation.lng, jp3dLocation.lat]} zoom={15}>
        <MapMarker longitude={jp3dLocation.lng} latitude={jp3dLocation.lat}>
          <MarkerContent>
            <MapPin className="size-8 text-primary" />
          </MarkerContent>
          <MarkerTooltip>{jp3dLocation.name}</MarkerTooltip>
          <MarkerPopup>
            <div className="space-y-1">
              <p className="font-medium text-foreground">{jp3dLocation.name}</p>
              <p className="text-muted-foreground text-xs">
                {jp3dLocation.lat.toFixed(4)}, {jp3dLocation.lng.toFixed(4)}
              </p>
              <p className="text-muted-foreground text-xs">
                {jp3dLocation.address}
              </p>
            </div>
          </MarkerPopup>
        </MapMarker>
      </MapComp>
    </div>
  );
}
