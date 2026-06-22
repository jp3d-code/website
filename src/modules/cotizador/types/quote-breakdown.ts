export interface QuoteBreakdown {
  baseVolume: number;
  scaledVolume: number;
  infillVolume: number;
  estimatedWeight: number;
  materialCost: number;
  fixedCost: number;
  margin: number;
  finalPrice: number;
}
