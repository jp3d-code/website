import * as React from "react";
import { toast } from "sonner";
import type * as THREE from "three";
import type { ActiveModel } from "../types/active-model";
import type { QuotationAction } from "../types/quotation-state";
import { calculateGeometryStats } from "../utils/geometry";
import { loadGLTF, loadSTL } from "../utils/loaders";

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

        // biome-ignore lint/suspicious/noConsole: Requisito de la Fase 1 para exponer los datos de geometría en consola
        console.log("=== MODELO 3D CARGADO CON ÉXITO ===");
        // biome-ignore lint/suspicious/noConsole: Requisito de la Fase 1 para exponer los datos de geometría en consola
        console.log(`Archivo: ${name}`);
        // biome-ignore lint/suspicious/noConsole: Requisito de la Fase 1 para exponer los datos de geometría en consola
        console.log(`Tamaño: ${(size / 1024 / 1024).toFixed(2)} MB`);
        // biome-ignore lint/suspicious/noConsole: Requisito de la Fase 1 para exponer los datos de geometría en consola
        console.log(
          `Dimensiones (mm): X=${stats.dimensions.x.toFixed(2)}, Y=${stats.dimensions.y.toFixed(2)}, Z=${stats.dimensions.z.toFixed(2)}`,
        );
        // biome-ignore lint/suspicious/noConsole: Requisito de la Fase 1 para exponer los datos de geometría en consola
        console.log(`Volumen: ${stats.volume.toFixed(4)} cm³`);
        // biome-ignore lint/suspicious/noConsole: Requisito de la Fase 1 para exponer los datos de geometría en consola
        console.log(`Área Superficial: ${stats.surfaceArea.toFixed(4)} cm²`);
        // biome-ignore lint/suspicious/noConsole: Requisito de la Fase 1 para exponer los datos de geometría en consola
        console.log("===================================");

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
