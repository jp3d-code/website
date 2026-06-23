"use client";

import { useMemo } from "react";
import * as THREE from "three";
import type { ActiveModel } from "@/modules/cotizador/types/active-model";

interface ModelProps {
  model: ActiveModel;
  color: string;
}

export function Model({ model, color }: ModelProps) {
  const material = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color(color),
      roughness: 0.3,
      metalness: 0.15,
      side: THREE.DoubleSide,
    });
  }, [color]);

  return (
    <mesh
      geometry={model.geometry}
      material={material}
      castShadow
      receiveShadow
    />
  );
}
