import * as React from "react";
import { QuotationContext } from "@/modules/cotizador/context/quotation-context";

export function useQuotation() {
  const context = React.useContext(QuotationContext);
  if (!context) {
    throw new Error("useQuotation debe usarse dentro de un QuotationProvider");
  }
  return context;
}
