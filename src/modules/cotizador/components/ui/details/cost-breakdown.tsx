"use client";

import { useQuotation } from "../../../hooks/use-quotation";
import { formatPEN } from "../../../utils/format";

export function CostBreakdown() {
  const { quote, state } = useQuotation();
  const { config } = state;

  if (!quote) return null;

  return (
    <div className="flex flex-col gap-4 border-border border-t pt-4">
      <h3 className="font-semibold text-foreground text-sm uppercase tracking-wider">
        Desglose de Cotización
      </h3>
      <div className="flex flex-col text-muted-foreground text-xs">
        <div className="flex justify-between py-2.5">
          <span>Volumen ajustado ({config.infill}% relleno):</span>
          <span className="font-medium font-mono text-foreground">
            {quote.infillVolume.toFixed(2)} cm³
          </span>
        </div>

        <div className="flex justify-between border-border/40 border-t py-2.5">
          <span>Peso estimado:</span>
          <span className="font-medium font-mono text-foreground">
            {quote.estimatedWeight.toFixed(1)} g
          </span>
        </div>

        <div className="flex justify-between border-border/40 border-t py-2.5">
          <span>Costo estimado material:</span>
          <span className="font-medium font-mono text-foreground">
            {formatPEN(quote.materialCost)}
          </span>
        </div>

        <div className="flex justify-between border-border/40 border-t py-2.5">
          <span>Costo fijo de impresión:</span>
          <span className="font-medium font-mono text-foreground">
            {formatPEN(quote.fixedCost)}
          </span>
        </div>

        <div className="flex justify-between border-border/40 border-t py-2.5">
          <span>Cantidad copias:</span>
          <span className="font-medium font-mono text-foreground">
            x{config.quantity}
          </span>
        </div>

        <div className="flex items-baseline justify-between border-border border-t border-dashed pt-3 font-semibold text-foreground">
          <span className="text-sm">Precio Estimado Total:</span>
          <span className="font-mono text-primary text-xl">
            {formatPEN(quote.finalPrice)}
          </span>
        </div>
      </div>
    </div>
  );
}
