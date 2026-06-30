"use client";

import { Lock } from "lucide-react";
import { useQuotation } from "@/modules/cotizador/hooks/use-quotation";
import { formatPEN } from "@/modules/cotizador/utils/format";

export function CostBreakdown() {
  const { quote, state } = useQuotation();
  const { config, lastSentConfig } = state;

  if (!quote) return null;

  const isAlreadySent =
    lastSentConfig !== null &&
    config.scaleUniform === lastSentConfig.scaleUniform &&
    config.scaleX === lastSentConfig.scaleX &&
    config.scaleY === lastSentConfig.scaleY &&
    config.scaleZ === lastSentConfig.scaleZ &&
    config.infill === lastSentConfig.infill &&
    config.materialId === lastSentConfig.materialId &&
    config.quantity === lastSentConfig.quantity;

  return (
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
        {isAlreadySent ? (
          <span className="fade-in animate-in font-medium font-mono text-foreground duration-300">
            {formatPEN(quote.materialCost)}
          </span>
        ) : (
          <span className="pointer-events-none select-none font-medium font-mono text-foreground/30 blur-[4.5px]">
            {formatPEN(quote.materialCost)}
          </span>
        )}
      </div>

      <div className="flex justify-between border-border/40 border-t py-2.5">
        <span>Costo fijo de impresión:</span>
        {isAlreadySent ? (
          <span className="fade-in animate-in font-medium font-mono text-foreground duration-300">
            {formatPEN(quote.fixedCost)}
          </span>
        ) : (
          <span className="pointer-events-none select-none font-medium font-mono text-foreground/30 blur-[4.5px]">
            {formatPEN(quote.fixedCost)}
          </span>
        )}
      </div>

      <div className="flex justify-between border-border/40 border-t py-2.5">
        <span>Cantidad copias:</span>
        <span className="font-medium font-mono text-foreground">
          x{config.quantity}
        </span>
      </div>

      <div className="flex items-baseline justify-between border-border border-t border-dashed pt-3 font-semibold text-foreground">
        <span className="text-sm">Precio Estimado Total:</span>
        {isAlreadySent ? (
          <span className="fade-in animate-in font-mono text-primary text-xl duration-300">
            {formatPEN(quote.finalPrice)}
          </span>
        ) : (
          <div className="flex items-center gap-1.5">
            <span className="flex select-none items-center gap-1 rounded border border-amber-500/20 bg-amber-500/10 px-1.5 py-0.5 font-medium text-[9px] text-amber-500 uppercase tracking-wider">
              <Lock className="size-2.5" /> Bloqueado
            </span>
            <span className="pointer-events-none select-none font-mono text-lg text-muted-foreground/30 blur-[5px]">
              {formatPEN(quote.finalPrice)}
            </span>
          </div>
        )}
      </div>

      {!isAlreadySent && (
        <div className="mt-3 rounded-lg border border-border/80 border-dashed bg-muted/30 p-2.5 text-center text-[10.5px] text-muted-foreground leading-normal">
          El precio final y los costos detallados se enviarán en un reporte PDF
          y se desbloquearán en pantalla tras presionar{" "}
          <strong>Enviar Cotización</strong>.
        </div>
      )}
    </div>
  );
}
