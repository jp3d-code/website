import type { Material } from "../types";

export const MATERIALS: Material[] = [
  {
    id: "pla",
    name: "PLA",
    density: 1.24, // g/cm³
    pricePerKg: 85.0, // PEN/kg
    color: "#f59e0b", // Amber/Gold (representando filamento standard)
    costAdjustmentFactor: 1.0,
  },
  {
    id: "petg",
    name: "PETG",
    density: 1.27, // g/cm³
    pricePerKg: 95.0, // PEN/kg
    color: "#3b82f6", // Blue
    costAdjustmentFactor: 1.1,
  },
  {
    id: "abs",
    name: "ABS",
    density: 1.04, // g/cm³
    pricePerKg: 90.0, // PEN/kg
    color: "#ef4444", // Red
    costAdjustmentFactor: 1.15,
  },
  {
    id: "tpu",
    name: "TPU (Flexible)",
    density: 1.21, // g/cm³
    pricePerKg: 130.0, // PEN/kg
    color: "#10b981", // Emerald/Green
    costAdjustmentFactor: 1.3,
  },
];

export const DEFAULT_MATERIAL_ID = "pla";
