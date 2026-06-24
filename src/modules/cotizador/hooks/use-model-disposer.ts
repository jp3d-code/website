import { useEffect, useRef } from "react";
import type * as THREE from "three";
import type { ActiveModel } from "../types/active-model";

export function useModelDisposer(model: ActiveModel | null) {
  const prevModelRef = useRef<ActiveModel | null>(null);

  useEffect(() => {
    const prevModel = prevModelRef.current;
    const currentModel = model;

    if (prevModel && prevModel !== currentModel) {
      try {
        if (prevModel.geometry) {
          prevModel.geometry.dispose();
        }
        if (prevModel.scene) {
          prevModel.scene.traverse((child) => {
            const mesh = child as THREE.Mesh;
            if (mesh.isMesh) {
              if (mesh.geometry) {
                mesh.geometry.dispose();
              }
              if (mesh.material) {
                if (Array.isArray(mesh.material)) {
                  for (const mat of mesh.material) {
                    mat.dispose();
                  }
                } else {
                  mesh.material.dispose();
                }
              }
            }
          });
        }
        // biome-ignore lint/suspicious/noConsole: Log GPU disposal to confirm memory cleanup
        console.log(
          `[useModelDisposer] Disposed GPU memory for model: ${prevModel.name}`,
        );
      } catch (error) {
        // biome-ignore lint/suspicious/noConsole: Log disposal errors to console
        console.error(
          "[useModelDisposer] Error disposing model resources:",
          error,
        );
      }
    }

    prevModelRef.current = currentModel;
  }, [model]);
}
