import type * as THREE from "three";

export interface Material {
  id: string;
  name: string;
  density: number; // in g/cm³
  pricePerKg: number; // in PEN/kg
  color: string; // hex code for UI picker
  costAdjustmentFactor: number;
}

export interface PrintConfig {
  scaleUniform: number; // percentage: 0 to 1000
  scaleX: number; // multiplier: e.g. 1.0
  scaleY: number; // multiplier: e.g. 1.0
  scaleZ: number; // multiplier: e.g. 1.0
  infill: number; // percentage: 0 to 100
  materialId: string;
  quantity: number; // integer >= 1
}

export interface QuoteBreakdown {
  baseVolume: number; // cm³ (original volume)
  scaledVolume: number; // cm³ (volume after scaling)
  infillVolume: number; // cm³ (volume adjusted by infill)
  estimatedWeight: number; // grams
  materialCost: number; // PEN
  fixedCost: number; // PEN
  margin: number; // multiplier (e.g. 1.2 for 20%)
  finalPrice: number; // PEN
}

export interface GeometryStats {
  volume: number; // cm³
  surfaceArea: number; // cm²
  dimensions: {
    x: number; // mm
    y: number; // mm
    z: number; // mm
  };
}

export interface ActiveModel {
  name: string;
  size: number; // bytes
  geometry: THREE.BufferGeometry;
  stats: GeometryStats;
  scene?: THREE.Group;
}
