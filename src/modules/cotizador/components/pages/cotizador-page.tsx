"use client";

import { QuotationProvider } from "../../context/quotation-context";
import { WorkspaceSection } from "../sections/workspace-section";

export default function CotizadorPage() {
  return (
    <QuotationProvider>
      <WorkspaceSection />
    </QuotationProvider>
  );
}
