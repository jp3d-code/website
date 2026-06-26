import type { ActiveModel } from "@/modules/cotizador/types/active-model";
import type { PrintConfig } from "@/modules/cotizador/types/print-config";

export interface QuotationState {
  model: ActiveModel | null;
  config: PrintConfig;
  lastSentConfig: PrintConfig | null;
}

export type QuotationAction =
  | { type: "SET_MODEL"; payload: ActiveModel }
  | { type: "REMOVE_MODEL" }
  | { type: "UPDATE_CONFIG"; payload: Partial<PrintConfig> }
  | { type: "RESET_SCALE" }
  | { type: "SET_LAST_SENT_CONFIG"; payload: PrintConfig };
