import { PRICING_CONFIG } from "@/modules/cotizador/config/pricing";
import type { Material } from "@/modules/cotizador/types/material";
import type { QuoteBreakdown } from "@/modules/cotizador/types/quote-breakdown";

export function calculateQuote({
  baseVolume,
  surfaceArea,
  scaleX,
  scaleY,
  scaleZ,
  infill,
  material,
  quantity,
}: {
  baseVolume: number;
  surfaceArea: number;
  scaleX: number;
  scaleY: number;
  scaleZ: number;
  infill: number;
  material: Material;
  quantity: number;
}): QuoteBreakdown {
  const scaledVolume = baseVolume * scaleX * scaleY * scaleZ;

  const areaScaleFactor =
    (scaleX * scaleY + scaleY * scaleZ + scaleZ * scaleX) / 3;
  const scaledArea = surfaceArea * areaScaleFactor;

  const shellThicknessCm = 0.12;
  const shellVolume = Math.min(scaledArea * shellThicknessCm, scaledVolume);
  const internalVolume = Math.max(0, scaledVolume - shellVolume);

  let infillVolume = shellVolume + internalVolume * (infill / 100);
  infillVolume = Math.max(infillVolume, shellVolume);

  const estimatedWeight = infillVolume * material.density;

  const pricePerGram = material.pricePerKg / 1000.0;
  const materialCost =
    estimatedWeight * pricePerGram * material.costAdjustmentFactor;

  const fixedCost = PRICING_CONFIG.fixedCost;
  const costTotal = (materialCost + fixedCost) * quantity;

  const margin = PRICING_CONFIG.defaultMargin;
  const finalPriceRaw = costTotal * margin;

  const finalPrice = Math.round(finalPriceRaw * 100) / 100;

  return {
    baseVolume,
    scaledVolume,
    infillVolume,
    estimatedWeight,
    materialCost,
    fixedCost,
    margin,
    finalPrice,
  };
}
