"use client";

export function ModelLoading() {
  return (
    <div className="flex w-full flex-col items-center justify-center rounded-xl border-2 border-border border-dashed bg-card/30 py-24 text-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        <div className="space-y-1.5 px-4">
          <p className="font-semibold text-foreground text-sm">
            Analizando modelo 3D...
          </p>
          <p className="max-w-xs text-muted-foreground text-xs leading-normal">
            Estamos calculando el volumen, área superficial y dimensiones
            geométricas en tu navegador. Esto puede tardar unos segundos para
            mallas complejas.
          </p>
        </div>
      </div>
    </div>
  );
}
