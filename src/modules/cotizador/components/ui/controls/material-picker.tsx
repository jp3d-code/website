"use client";

import { MATERIALS } from "@/modules/cotizador/config/materials";
import { useQuotation } from "@/modules/cotizador/hooks/use-quotation";
import { cn } from "@/shared/lib/utils";

export function MaterialPicker() {
  const { state, updateConfig } = useQuotation();
  const { config } = state;

  return (
    <div className="flex flex-col gap-3 px-3 pt-1 pb-8">
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
                className="h-3 w-3 shrink-0 rounded-full"
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
