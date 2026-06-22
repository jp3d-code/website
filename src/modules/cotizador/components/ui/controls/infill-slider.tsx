"use client";

import { Label } from "@/shared/components/ui/label";
import { Slider } from "@/shared/components/ui/slider";
import { useQuotation } from "../../../hooks/use-quotation";

export function InfillSlider() {
  const { state, updateConfig } = useQuotation();
  const { config } = state;

  return (
    <div className="flex flex-col gap-3 border-border border-t pt-4">
      <div className="flex items-center justify-between text-muted-foreground text-xs">
        <Label
          htmlFor="infill-percent"
          className="font-semibold text-foreground text-xs uppercase tracking-wider"
        >
          Relleno (Infill)
        </Label>
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
