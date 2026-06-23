"use client";

import { useQuotation } from "@/modules/cotizador/hooks/use-quotation";
import { Slider } from "@/shared/components/ui/slider";

export function InfillSlider() {
  const { state, updateConfig } = useQuotation();
  const { config } = state;

  return (
    <div className="flex flex-col gap-3 px-3 pt-1 pb-8">
      <div className="flex items-center justify-between text-muted-foreground text-xs">
        <span className="font-mono font-semibold text-foreground text-sm">
          {config.infill}%
        </span>
      </div>
      <Slider
        id="infill-percent"
        min={0}
        max={100}
        step={5}
        value={[config.infill]}
        onValueChange={(val) => {
          const numVal = Array.isArray(val) ? val[0] : val;
          updateConfig({ infill: numVal });
        }}
      />
    </div>
  );
}
