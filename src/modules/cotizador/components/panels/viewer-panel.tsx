"use client";

import { useQuotation } from "../../hooks/use-quotation";
import { Viewer3D } from "../ui/viewer-3d/viewer-3d";

export function ViewerPanel() {
  const { state } = useQuotation();
  const { model } = state;

  if (!model) return null;

  return <Viewer3D />;
}
