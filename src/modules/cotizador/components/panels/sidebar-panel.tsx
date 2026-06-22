"use client";

import { Trash2 } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { useQuotation } from "../../hooks/use-quotation";
import { InfillSlider } from "../ui/controls/infill-slider";
import { MaterialPicker } from "../ui/controls/material-picker";
import { QuantityInput } from "../ui/controls/quantity-input";
import { ScaleControls } from "../ui/controls/scale-controls";
import { CostBreakdown } from "../ui/details/cost-breakdown";
import { GeometryInfo } from "../ui/details/geometry-info";

export function SidebarPanel() {
  const { state, removeModel } = useQuotation();
  const { model } = state;

  if (!model) return null;

  return (
    <Card className="max-h-[calc(100vh-14rem)] overflow-y-auto pr-1">
      <CardHeader>
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
      </CardHeader>

      <CardContent className="flex flex-col gap-4 pb-6">
        <GeometryInfo />

        <MaterialPicker />
        <InfillSlider />
        <ScaleControls />
        <QuantityInput />

        <CostBreakdown />
      </CardContent>
    </Card>
  );
}
