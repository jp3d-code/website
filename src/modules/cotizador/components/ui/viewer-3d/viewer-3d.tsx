"use client";

import { Bounds, Center, OrbitControls, Stats } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { SceneHelpers } from "@/modules/cotizador/components/ui/viewer-3d/helpers";
import { Model } from "@/modules/cotizador/components/ui/viewer-3d/model";
import { useQuotation } from "@/modules/cotizador/hooks/use-quotation";

if (typeof window !== "undefined") {
  // biome-ignore lint/suspicious/noConsole: Interceptor seguro para silenciar advertencias de deprecación
  const originalWarn = console.warn;
  console.warn = (...args) => {
    const firstArg = args[0];
    const isClockDeprecation =
      (typeof firstArg === "string" &&
        firstArg.includes("Clock: This module has been deprecated")) ||
      (firstArg instanceof Error &&
        firstArg.message.includes("Clock: This module has been deprecated")) ||
      (typeof firstArg === "object" &&
        firstArg !== null &&
        String(firstArg).includes("Clock: This module has been deprecated"));

    if (isClockDeprecation) {
      return;
    }
    originalWarn(...args);
  };
}

export function Viewer3D() {
  const { state, selectedMaterial } = useQuotation();
  const { model, config } = state;

  if (!model) return null;

  return (
    <div className="relative flex h-100 w-full items-center justify-center rounded-xl border border-border bg-card/30 md:h-125">
      <Canvas
        shadows={{ type: THREE.PCFShadowMap }}
        camera={{ position: [0, 80, 150], fov: 45 }}
      >
        <SceneHelpers />
        <Stats />
        <Bounds fit clip observe margin={1.25}>
          <group
            position={[0, (model.stats.dimensions.y * config.scaleY) / 2, 0]}
          >
            <Center
              cacheKey={`${config.scaleX}-${config.scaleY}-${config.scaleZ}-${model.name}`}
            >
              <group scale={[config.scaleX, config.scaleY, config.scaleZ]}>
                <Model model={model} color={selectedMaterial.color} />
              </group>
            </Center>
          </group>
        </Bounds>

        <OrbitControls
          makeDefault
          minDistance={10}
          maxDistance={500}
          enableDamping
        />
      </Canvas>
    </div>
  );
}
