"use client";

import { useQuotation } from "@/modules/cotizador/hooks/use-quotation";
import { Label } from "@/shared/components/ui/label";

export function GeometryInfo() {
  const { state } = useQuotation();
  const { model, config } = state;

  if (!model) return null;

  const scaledDimensions = {
    x: model.stats.dimensions.x * config.scaleX,
    y: model.stats.dimensions.y * config.scaleY,
    z: model.stats.dimensions.z * config.scaleZ,
  };

  const volume =
    model.stats.volume * config.scaleX * config.scaleY * config.scaleZ;

  return (
    <div className="flex flex-col gap-3 text-xs">
      <div className="flex items-center justify-between">
        <Label className="font-medium text-muted-foreground text-xs">
          Dimensiones (mm):
        </Label>
        <span className="font-mono font-semibold text-foreground">
          {scaledDimensions.x.toFixed(1)} x {scaledDimensions.y.toFixed(1)} x{" "}
          {scaledDimensions.z.toFixed(1)}
        </span>
      </div>

      <div className="flex items-center justify-between">
        <Label className="font-medium text-muted-foreground text-xs">
          Volumen total:
        </Label>
        <span className="font-mono font-semibold text-foreground">
          {volume.toFixed(2)} cm³
        </span>
      </div>

      <div className="flex items-center justify-between">
        <Label className="font-medium text-muted-foreground text-xs">
          Área superficial:
        </Label>
        <span className="font-mono font-semibold text-foreground">
          {model.stats.surfaceArea.toFixed(2)} cm²
        </span>
      </div>
    </div>
  );
}
