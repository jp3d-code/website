import { useCallback, useEffect, useRef } from "react";
import type { PrintConfig } from "../types/print-config";
import type { QuotationAction } from "../types/quotation-state";

export function useScaleSync(
  config: PrintConfig,
  dispatch: React.Dispatch<QuotationAction>,
): (patch: Partial<PrintConfig>) => void {
  const configRef = useRef(config);

  useEffect(() => {
    configRef.current = config;
  }, [config]);

  return useCallback(
    (patch: Partial<PrintConfig>) => {
      const current = configRef.current;
      const merged = { ...current, ...patch };
      let finalPatch: Partial<PrintConfig> = patch;

      if (patch.scaleUniform !== undefined) {
        const factor = patch.scaleUniform / 100.0;
        finalPatch = {
          ...patch,
          scaleX: factor,
          scaleY: factor,
          scaleZ: factor,
        };
      } else if (
        patch.scaleX !== undefined ||
        patch.scaleY !== undefined ||
        patch.scaleZ !== undefined
      ) {
        const isUniform =
          merged.scaleX === merged.scaleY && merged.scaleY === merged.scaleZ;
        if (isUniform) {
          const newUniform = Math.round(merged.scaleX * 100);
          if (newUniform !== current.scaleUniform) {
            finalPatch = { ...patch, scaleUniform: newUniform };
          }
        }
      }

      dispatch({ type: "UPDATE_CONFIG", payload: finalPatch });
    },
    [dispatch],
  );
}
