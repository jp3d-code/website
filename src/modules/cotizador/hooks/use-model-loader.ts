import * as React from "react";
import { toast } from "sonner";
import type * as THREE from "three";
import { calculateGeometryStats } from "../lib/geometry";
import { loadGLTF, loadSTL } from "../lib/loaders";
import type { ActiveModel } from "../types";

export function useModelLoader() {
  const [model, setModel] = React.useState<ActiveModel | null>(null);
  const [isProcessing, setIsProcessing] = React.useState(false);

  const handleFileSelect = React.useCallback(async (file: File) => {
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

      // Exponer en consola tal como pide el hito de la Fase 1
      // biome-ignore lint/suspicious/noConsole: Requisito de la Fase 1 para exponer los datos de geometría en consola
      console.log("=== MODELO 3D CARGADO CON ÉXITO ===");
      // biome-ignore lint/suspicious/noConsole: Requisito de la Fase 1 para exponer los datos de geometría en consola
      console.log(`Archivo: ${name}`);
      // biome-ignore lint/suspicious/noConsole: Requisito de la Fase 1 para exponer los datos de geometría en consola
      console.log(`Tamaño: ${(size / 1024 / 1024).toFixed(2)} MB`);
      // biome-ignore lint/suspicious/noConsole: Requisito de la Fase 1 para exponer los datos de geometría en consola
      console.log("Dimensiones (mm):", stats.dimensions);
      // biome-ignore lint/suspicious/noConsole: Requisito de la Fase 1 para exponer los datos de geometría en consola
      console.log(`Volumen: ${stats.volume.toFixed(4)} cm³`);
      // biome-ignore lint/suspicious/noConsole: Requisito de la Fase 1 para exponer los datos de geometría en consola
      console.log(`Área Superficial: ${stats.surfaceArea.toFixed(4)} cm²`);
      // biome-ignore lint/suspicious/noConsole: Requisito de la Fase 1 para exponer los datos de geometría en consola
      console.log("===================================");

      setModel({
        name,
        size,
        geometry,
        stats,
        scene,
      });

      toast.success("Modelo 3D cargado correctamente", { id: "loading-model" });
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
  }, []);

  const handleRemove = React.useCallback(() => {
    setModel(null);
    toast.info("Modelo removido");
  }, []);

  return {
    model,
    isProcessing,
    handleFileSelect,
    handleRemove,
  };
}
