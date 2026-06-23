"use client";

import { Viewer3D } from "@/modules/cotizador/components/ui/viewer-3d/viewer-3d";
import { useQuotation } from "@/modules/cotizador/hooks/use-quotation";

export function ViewerPanel() {
  const { state } = useQuotation();
  const { model } = state;

  if (!model) return null;

  return <Viewer3D />;
}
