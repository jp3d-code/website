import * as React from "react";
import { QuotationContext } from "../context/quotation-context";

export function useQuotation() {
  const context = React.useContext(QuotationContext);
  if (!context) {
    throw new Error("useQuotation debe usarse dentro de un QuotationProvider");
  }
  return context;
}
