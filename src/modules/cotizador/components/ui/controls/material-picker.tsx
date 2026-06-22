"use client";

import { Label } from "@/shared/components/ui/label";
import { cn } from "@/shared/lib/utils";
import { MATERIALS } from "../../../config/materials";
import { useQuotation } from "../../../hooks/use-quotation";

export function MaterialPicker() {
  const { state, updateConfig } = useQuotation();
  const { config } = state;

  return (
    <div className="flex flex-col gap-3 border-border border-t pt-4">
      <Label className="font-semibold text-foreground text-xs uppercase tracking-wider">
        Material
      </Label>
      <div className="grid grid-cols-2 gap-2">
        {MATERIALS.map((material) => {
          const isSelected = config.materialId === material.id;
          return (
            <button
              key={material.id}
              type="button"
              onClick={() => updateConfig({ materialId: material.id })}
              className={cn(
                "flex cursor-pointer items-center gap-2 rounded-lg border p-2.5 text-left font-medium text-xs transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary",
                isSelected
                  ? "border-primary bg-primary/10 text-foreground"
                  : "border-border bg-card text-foreground hover:bg-accent/50",
              )}
            >
              <span
                className="h-3 w-3 shrink-0 rounded-full border border-black/10 dark:border-white/10"
                style={{ backgroundColor: material.color }}
              />
              <span className="truncate">{material.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
