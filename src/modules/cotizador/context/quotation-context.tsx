"use client";

import { createContext, useCallback, useMemo, useReducer } from "react";
import { toast } from "sonner";
import {
  DEFAULT_MATERIAL_ID,
  MATERIALS,
} from "@/modules/cotizador/config/materials";
import { useModelDisposer } from "@/modules/cotizador/hooks/use-model-disposer";
import { useModelLoader } from "@/modules/cotizador/hooks/use-model-loader";
import { useScaleSync } from "@/modules/cotizador/hooks/use-scale-sync";
import { calculateQuote } from "@/modules/cotizador/services/quotation-engine";
import type { Material } from "@/modules/cotizador/types/material";
import type { PrintConfig } from "@/modules/cotizador/types/print-config";
import type {
  QuotationAction,
  QuotationState,
} from "@/modules/cotizador/types/quotation-state";
import type { QuoteBreakdown } from "@/modules/cotizador/types/quote-breakdown";

const initialConfig: PrintConfig = {
  scaleUniform: 100,
  scaleX: 1.0,
  scaleY: 1.0,
  scaleZ: 1.0,
  infill: 20,
  materialId: DEFAULT_MATERIAL_ID,
  quantity: 1,
};

const initialState: QuotationState = {
  model: null,
  config: initialConfig,
  lastSentConfig: null,
};

function quotationReducer(
  state: QuotationState,
  action: QuotationAction,
): QuotationState {
  switch (action.type) {
    case "SET_MODEL":
      return {
        ...state,
        model: action.payload,
        config: initialConfig,
        lastSentConfig: null,
      };
    case "REMOVE_MODEL":
      return {
        ...state,
        model: null,
        config: initialConfig,
        lastSentConfig: null,
      };
    case "UPDATE_CONFIG":
      return {
        ...state,
        config: { ...state.config, ...action.payload },
      };
    case "RESET_SCALE":
      return {
        ...state,
        config: {
          ...state.config,
          scaleUniform: 100,
          scaleX: 1.0,
          scaleY: 1.0,
          scaleZ: 1.0,
        },
      };
    case "SET_LAST_SENT_CONFIG":
      return {
        ...state,
        lastSentConfig: action.payload,
      };
    default:
      return state;
  }
}

export interface QuotationContextProps {
  state: QuotationState;
  quote: QuoteBreakdown | null;
  selectedMaterial: Material;
  isProcessing: boolean;
  loadModel: (file: File) => Promise<void>;
  removeModel: () => void;
  updateConfig: (config: Partial<PrintConfig>) => void;
  resetScale: () => void;
  setLastSentConfig: (config: PrintConfig) => void;
}

export const QuotationContext = createContext<
  QuotationContextProps | undefined
>(undefined);

export function QuotationProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(quotationReducer, initialState);
  const { loadModel, isProcessing } = useModelLoader(dispatch);
  const updateConfig = useScaleSync(state.config, dispatch);
  useModelDisposer(state.model);

  const selectedMaterial = useMemo(() => {
    return (
      MATERIALS.find((m) => m.id === state.config.materialId) || MATERIALS[0]
    );
  }, [state.config.materialId]);

  const quote = useMemo(() => {
    if (!state.model) return null;

    return calculateQuote({
      baseVolume: state.model.stats.volume,
      surfaceArea: state.model.stats.surfaceArea,
      scaleX: state.config.scaleX,
      scaleY: state.config.scaleY,
      scaleZ: state.config.scaleZ,
      infill: state.config.infill,
      material: selectedMaterial,
      quantity: state.config.quantity,
    });
  }, [state.model, state.config, selectedMaterial]);

  const removeModel = useCallback(() => {
    dispatch({ type: "REMOVE_MODEL" });
    toast.info("Modelo removido");
  }, []);

  const resetScale = useCallback(() => {
    dispatch({ type: "RESET_SCALE" });
  }, []);

  const setLastSentConfig = useCallback((config: PrintConfig) => {
    dispatch({ type: "SET_LAST_SENT_CONFIG", payload: config });
  }, []);

  return (
    <QuotationContext.Provider
      value={{
        state,
        quote,
        selectedMaterial,
        isProcessing,
        loadModel,
        removeModel,
        updateConfig,
        resetScale,
        setLastSentConfig,
      }}
    >
      {children}
    </QuotationContext.Provider>
  );
}
