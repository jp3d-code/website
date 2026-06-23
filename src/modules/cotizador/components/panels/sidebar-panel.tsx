"use client";

import { InfillSlider } from "@/modules/cotizador/components/ui/controls/infill-slider";
import { MaterialPicker } from "@/modules/cotizador/components/ui/controls/material-picker";
import { QuantityInput } from "@/modules/cotizador/components/ui/controls/quantity-input";
import { ScaleControls } from "@/modules/cotizador/components/ui/controls/scale-controls";
import { CostBreakdown } from "@/modules/cotizador/components/ui/details/cost-breakdown";
import { GeometryInfo } from "@/modules/cotizador/components/ui/details/geometry-info";
import { useQuotation } from "@/modules/cotizador/hooks/use-quotation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/components/ui/accordion";
import { Card, CardContent, CardHeader } from "@/shared/components/ui/card";

export function SidebarPanel() {
  const { state, selectedMaterial } = useQuotation();
  const { model, config } = state;

  if (!model) return null;

  return (
    <div className="flex flex-col gap-4">
      <Card>
        {/*<CardHeader>
        <div className="min-w-0 pr-2">
          <CardTitle
            className="truncate font-semibold text-foreground text-lg"
            title={model.name}
          >
            {model.name}
          </CardTitle>
          <CardDescription className="text-muted-foreground text-xs">
            {(model.size / 1024 / 1024).toFixed(2)} MB
          </CardDescription>
        </div>
        <CardAction>
          <Button
            variant="destructive"
            size="icon-sm"
            onClick={removeModel}
            title="Eliminar modelo"
            aria-label="Eliminar modelo"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </CardAction>
      </CardHeader>*/}
        <CardHeader>
          <h3 className="font-semibold text-foreground text-sm uppercase tracking-wider">
            Configuración de Impresións
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
        </CardContent>
      </Card>
    </div>
  );
}
