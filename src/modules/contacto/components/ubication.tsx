import { MapPin } from "lucide-react";
import {
  Map as MapComp,
  MapMarker,
  MarkerContent,
  MarkerPopup,
  MarkerTooltip,
} from "@/shared/components/ui/map";
import { contactData } from "@/shared/data/contact";

const jp3dLocation = {
  name: "JP 3D",
  lat: -16.4168453,
  lng: -71.5092279,
};

export function Ubication() {
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
                {contactData.location}
              </p>
            </div>
          </MarkerPopup>
        </MapMarker>
      </MapComp>
    </div>
  );
}
