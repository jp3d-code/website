"use client";

import * as React from "react";
import * as THREE from "three";
import type { ActiveModel } from "../../../types/active-model";

interface ModelProps {
  model: ActiveModel;
  color: string;
}

export function Model({ model, color }: ModelProps) {
  const material = React.useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color(color),
      roughness: 0.4,
      metalness: 0.1,
      side: THREE.DoubleSide,
    });
  }, [color]);

  React.useEffect(() => {
    if (model.scene) {
      model.scene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          mesh.material = material;
          mesh.castShadow = true;
          mesh.receiveShadow = true;
        }
      });
    }
  }, [model.scene, material]);

  if (model.scene) {
    return <primitive object={model.scene} />;
  }

  return (
    <mesh
      geometry={model.geometry}
      material={material}
      castShadow
      receiveShadow
    />
  );
}
