"use client";

import { Mail } from "lucide-react";
import { useState } from "react";
import { InfillSlider } from "@/modules/cotizador/components/ui/controls/infill-slider";
import { MaterialPicker } from "@/modules/cotizador/components/ui/controls/material-picker";
import { QuantityInput } from "@/modules/cotizador/components/ui/controls/quantity-input";
import { ScaleControls } from "@/modules/cotizador/components/ui/controls/scale-controls";
import { CostBreakdown } from "@/modules/cotizador/components/ui/details/cost-breakdown";
import { GeometryInfo } from "@/modules/cotizador/components/ui/details/geometry-info";
import { SendQuoteModal } from "@/modules/cotizador/components/ui/dialogs/send-quote-dialog";
import { useQuotation } from "@/modules/cotizador/hooks/use-quotation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/components/ui/accordion";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardHeader } from "@/shared/components/ui/card";

export function SidebarPanel() {
  const { state, selectedMaterial } = useQuotation();
  const { model, config, lastSentConfig } = state;
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!model) return null;

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
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader className="pt-0">
          <h3 className="font-semibold text-foreground text-sm uppercase tracking-wider">
            Configuración de Impresión
          </h3>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <GeometryInfo />
          <Accordion multiple defaultValue={["material"]}>
            <AccordionItem value="material">
              <AccordionTrigger className="w-full">
                <div className="flex flex-1 items-center justify-between pr-4">
                  <span>Material</span>
                  <div className="flex items-center gap-2">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: selectedMaterial.color }}
                    />
                    <span className="font-medium text-muted-foreground text-xs">
                      {selectedMaterial.name}
                    </span>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <MaterialPicker />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="infill">
              <AccordionTrigger className="w-full">
                <div className="flex flex-1 items-center justify-between pr-4">
                  <span>Relleno</span>
                  <span className="font-mono font-semibold text-muted-foreground text-xs">
                    {config.infill}%
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <InfillSlider />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="scale">
              <AccordionTrigger className="w-full">
                <div className="flex flex-1 items-center justify-between pr-4">
                  <span>Escala</span>
                  <span className="font-mono font-semibold text-muted-foreground text-xs">
                    {config.scaleUniform}%
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <ScaleControls />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="quantity">
              <AccordionTrigger className="w-full">
                <div className="flex flex-1 items-center justify-between pr-4">
                  <span>Cantidad</span>
                  <span className="font-mono font-semibold text-muted-foreground text-xs">
                    {config.quantity}{" "}
                    {config.quantity === 1 ? "unidad" : "unidades"}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <QuantityInput />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="font-semibold text-foreground text-sm uppercase tracking-wider">
            Desglose de Cotización
          </h3>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <CostBreakdown />
          <Button
            onClick={() => setIsModalOpen(true)}
            disabled={isAlreadySent}
            className="mt-2 w-full gap-2"
          >
            <Mail className="size-4" />
            {isAlreadySent ? "Cotización Enviada" : "Enviar Cotización"}
          </Button>
          {isAlreadySent && (
            <p className="mt-1 text-center text-[10px] text-muted-foreground">
              Esta cotización ya fue enviada. Modifica algún parámetro para
              habilitar un nuevo envío.
            </p>
          )}
        </CardContent>
      </Card>

      <SendQuoteModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </div>
  );
}
