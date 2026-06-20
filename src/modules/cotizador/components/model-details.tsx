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
import type { ActiveModel } from "../types";

interface ModelDetailsProps {
  model: ActiveModel;
  onRemove: () => void;
}

export function ModelDetails({ model, onRemove }: ModelDetailsProps) {
  return (
    <div className="grid w-full grid-cols-1 items-start gap-8 md:grid-cols-12">
      <div className="flex h-100 w-full items-center justify-center rounded-xl border border-border bg-card/30 md:col-span-8 md:h-125">
        <p className="text-muted-foreground text-sm">
          Visor 3D (Espacio reservado - Fase 2)
        </p>
      </div>

      <div className="flex w-full flex-col gap-4 md:col-span-4">
        <Card>
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
                onClick={onRemove}
                title="Eliminar modelo"
                aria-label="Eliminar modelo"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </CardAction>
          </CardHeader>

          <CardContent className="flex flex-col gap-4 divide-y divide-border">
            <div className="pt-2 first:pt-0">
              <span className="block font-medium text-muted-foreground text-xs uppercase tracking-wider">
                Dimensiones
              </span>
              <span className="mt-1 block font-mono font-semibold text-base text-foreground">
                {model.stats.dimensions.x.toFixed(1)} x{" "}
                {model.stats.dimensions.y.toFixed(1)} x{" "}
                {model.stats.dimensions.z.toFixed(1)} mm
              </span>
            </div>

            {/* Volumen */}
            <div className="pt-4">
              <span className="block font-medium text-muted-foreground text-xs uppercase tracking-wider">
                Volumen
              </span>
              <span className="mt-1 block font-mono font-semibold text-base text-foreground">
                {model.stats.volume.toFixed(2)} cm³
              </span>
            </div>

            {/* Área Superficial */}
            <div className="pt-4">
              <span className="block font-medium text-muted-foreground text-xs uppercase tracking-wider">
                Área Superficial
              </span>
              <span className="mt-1 block font-mono font-semibold text-base text-foreground">
                {model.stats.surfaceArea.toFixed(2)} cm²
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Notificación temporal de la Fase 1 */}
        <div className="rounded-lg border border-primary/10 bg-primary/5 p-4 text-center">
          <p className="text-primary text-xs leading-relaxed">
            🎉 Módulo base de la <b>Fase 1</b> operativo. Los datos de la
            geometría se han impreso en la consola de desarrollador (F12).
          </p>
        </div>
      </div>
    </div>
  );
}
