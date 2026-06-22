"use client";

import { Minus, Plus } from "lucide-react";
import type * as React from "react";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { useQuotation } from "../../../hooks/use-quotation";

export function QuantityInput() {
  const { state, updateConfig } = useQuotation();
  const { config } = state;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number.parseInt(e.target.value, 10);
    if (!Number.isNaN(val) && val >= 1) {
      updateConfig({ quantity: val });
    }
  };

  const handleAdjust = (adjustment: number) => {
    const newVal = config.quantity + adjustment;
    if (newVal >= 1) {
      updateConfig({ quantity: newVal });
    }
  };

  return (
    <div className="flex flex-col gap-3 border-border border-t pt-4">
      <Label
        htmlFor="print-quantity"
        className="font-semibold text-foreground text-xs uppercase tracking-wider"
      >
        Cantidad
      </Label>
      <div className="flex w-full items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          type="button"
          onClick={() => handleAdjust(-1)}
          disabled={config.quantity <= 1}
          className="h-8 w-8 rounded-lg"
        >
          <Minus className="h-3 w-3" />
        </Button>

        <Input
          id="print-quantity"
          type="number"
          min={1}
          value={config.quantity}
          onChange={handleChange}
          className="h-8 text-center font-medium font-mono focus-visible:ring-0"
        />

        <Button
          variant="outline"
          size="icon"
          type="button"
          onClick={() => handleAdjust(1)}
          className="h-8 w-8 rounded-lg"
        >
          <Plus className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
}
