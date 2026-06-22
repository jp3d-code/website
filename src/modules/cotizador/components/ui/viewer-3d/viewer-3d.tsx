"use client";

import { Bounds, Center, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { useQuotation } from "../../../hooks/use-quotation";
import { SceneHelpers } from "./helpers";
import { Model } from "./model";

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
