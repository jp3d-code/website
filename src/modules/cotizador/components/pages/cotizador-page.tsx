"use client";

import { WorkspaceSection } from "@/modules/cotizador/components/sections/workspace-section";
import { QuotationProvider } from "@/modules/cotizador/context/quotation-context";

export default function CotizadorPage() {
  return (
    <QuotationProvider>
      <WorkspaceSection />
    </QuotationProvider>
  );
}
