import type { Material } from "@/modules/cotizador/types/material";

export const MATERIALS: Material[] = [
  {
    id: "pla",
    name: "PLA",
    density: 1.24,
    pricePerKg: 85.0,
    color: "#f59e0b",
    costAdjustmentFactor: 1.0,
  },
  {
    id: "petg",
    name: "PETG",
    density: 1.27,
    pricePerKg: 95.0,
    color: "#3b82f6",
    costAdjustmentFactor: 1.05,
  },
  {
    id: "abs",
    name: "ABS",
    density: 1.04,
    pricePerKg: 90.0,
    color: "#ef4444",
    costAdjustmentFactor: 1.05,
  },
  {
    id: "tpu",
    name: "TPU (Flexible)",
    density: 1.21,
    pricePerKg: 130.0,
    color: "#10b981",
    costAdjustmentFactor: 1.8,
  },
];

export const DEFAULT_MATERIAL_ID = "pla";
