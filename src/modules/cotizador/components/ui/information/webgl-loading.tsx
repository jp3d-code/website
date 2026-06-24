"use client";

export function WebGLLoading() {
  return (
    <div className="flex h-72 w-full animate-pulse items-center justify-center rounded-xl border border-border bg-card/30 sm:h-96 md:h-125">
      <span className="font-medium text-muted-foreground text-sm">
        Detectando soporte 3D...
      </span>
    </div>
  );
}
