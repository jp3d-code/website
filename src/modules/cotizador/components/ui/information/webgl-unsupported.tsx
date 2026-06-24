"use client";

import { AlertCircle } from "lucide-react";

export function WebGLUnsupported() {
  return (
    <div className="flex h-100 w-full flex-col items-center justify-center gap-4 rounded-xl border border-destructive/20 bg-destructive/5 p-6 text-center md:h-125">
      <AlertCircle className="h-10 w-10 animate-pulse text-destructive" />
      <div className="max-w-md space-y-2">
        <h4 className="font-semibold text-base text-foreground">
          Entorno 3D No Soportado
        </h4>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Tu navegador o tarjeta gráfica no soportan WebGL 2, necesario para
          visualizar el modelo 3D.
        </p>
        <p className="text-muted-foreground text-xs leading-relaxed">
          Aún puedes configurar los parámetros de impresión en el panel lateral
          y obtener la cotización normalmente.
        </p>
      </div>
    </div>
  );
}
