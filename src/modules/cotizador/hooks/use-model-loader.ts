import * as React from "react";
import { toast } from "sonner";
import type * as THREE from "three";
import type { ActiveModel } from "@/modules/cotizador/types/active-model";
import type { QuotationAction } from "@/modules/cotizador/types/quotation-state";
import { calculateGeometryStats } from "@/modules/cotizador/utils/geometry";
import { loadGLTF, loadSTL } from "@/modules/cotizador/utils/loaders";

interface UseModelLoaderResult {
  loadModel: (file: File) => Promise<void>;
  isProcessing: boolean;
}

export function useModelLoader(
  dispatch: React.Dispatch<QuotationAction>,
): UseModelLoaderResult {
  const [isProcessing, setIsProcessing] = React.useState(false);

  const loadModel = React.useCallback(
    async (file: File) => {
      setIsProcessing(true);
      const objectUrl = URL.createObjectURL(file);

      try {
        toast.loading("Procesando y analizando modelo 3D...", {
          id: "loading-model",
        });
        const name = file.name;
        const size = file.size;

        let geometry: THREE.BufferGeometry;
        let scene: THREE.Group | undefined;

        if (name.toLowerCase().endsWith(".stl")) {
          geometry = await loadSTL(objectUrl);
        } else {
          const gltf = await loadGLTF(objectUrl);
          geometry = gltf.geometry;
          scene = gltf.scene;
        }

        const stats = calculateGeometryStats(geometry);

        const payload: ActiveModel = {
          name,
          size,
          geometry,
          stats,
          scene,
        };

        dispatch({ type: "SET_MODEL", payload });

        toast.success("Modelo 3D cargado correctamente", {
          id: "loading-model",
        });
      } catch (error) {
        // biome-ignore lint/suspicious/noConsole: Log parsing error to developer console
        console.error("Error al procesar el archivo 3D:", error);
        toast.error(
          "Error al analizar el modelo. Asegúrate de que no esté corrupto.",
          {
            id: "loading-model",
          },
        );
      } finally {
        setIsProcessing(false);
        URL.revokeObjectURL(objectUrl);
      }
    },
    [dispatch],
  );

  return { loadModel, isProcessing };
}
