"use client";

import { RotateCcw } from "lucide-react";
import { useQuotation } from "@/modules/cotizador/hooks/use-quotation";
import { Button } from "@/shared/components/ui/button";
import { Label } from "@/shared/components/ui/label";
import { Slider } from "@/shared/components/ui/slider";

export function ScaleControls() {
  const { state, updateConfig, resetScale } = useQuotation();
  const { config } = state;

  const handleUniformChange = (val: number | readonly number[]) => {
    const value = Array.isArray(val) ? val[0] : val;
    updateConfig({ scaleUniform: value });
  };

  const handleAxisChange = (
    axis: "scaleX" | "scaleY" | "scaleZ",
    val: number | readonly number[],
  ) => {
    const value = Array.isArray(val) ? val[0] : val;
    updateConfig({ [axis]: value });
  };

  return (
    <div className="flex flex-col gap-5 px-3 pt-1 pb-8">
      <div className="flex items-center justify-between gap-4">
        <div className="flex w-full flex-col gap-2">
          <div className="flex items-center justify-between text-muted-foreground text-xs">
            <Label htmlFor="scale-uniform">Uniforme</Label>
            <span className="font-medium font-mono">
              {config.scaleUniform}%
            </span>
          </div>
          <Slider
            id="scale-uniform"
            min={10}
            max={1000}
            step={1}
            value={[config.scaleUniform]}
            onValueChange={handleUniformChange}
          />
        </div>
        <Button
          variant="outline"
          size="sm"
          className="h-7 gap-1 text-xs"
          onClick={resetScale}
        >
          <RotateCcw className="h-3 w-3" />
          Restablecer
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between text-[11px] text-muted-foreground">
            <Label htmlFor="scale-x">Eje X</Label>
            <span className="font-mono">x{config.scaleX.toFixed(1)}</span>
          </div>
          <Slider
            id="scale-x"
            min={0.1}
            max={10}
            step={0.1}
            value={[config.scaleX]}
            onValueChange={(val) => handleAxisChange("scaleX", val)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between text-[11px] text-muted-foreground">
            <Label htmlFor="scale-y">Eje Y</Label>
            <span className="font-mono">x{config.scaleY.toFixed(1)}</span>
          </div>
          <Slider
            id="scale-y"
            min={0.1}
            max={10}
            step={0.1}
            value={[config.scaleY]}
            onValueChange={(val) => handleAxisChange("scaleY", val)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between text-[11px] text-muted-foreground">
            <Label htmlFor="scale-z">Eje Z</Label>
            <span className="font-mono">x{config.scaleZ.toFixed(1)}</span>
          </div>
          <Slider
            id="scale-z"
            min={0.1}
            max={10}
            step={0.1}
            value={[config.scaleZ]}
            onValueChange={(val) => handleAxisChange("scaleZ", val)}
          />
        </div>
      </div>
    </div>
  );
}
