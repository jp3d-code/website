import * as THREE from "three";
import type { GeometryStats } from "../types/geometry-stats";

export function calculateGeometryStats(
  geometry: THREE.BufferGeometry,
): GeometryStats {
  geometry.computeBoundingBox();
  const bbox = geometry.boundingBox;
  const dimensions = { x: 0, y: 0, z: 0 };
  if (bbox) {
    dimensions.x = bbox.max.x - bbox.min.x;
    dimensions.y = bbox.max.y - bbox.min.y;
    dimensions.z = bbox.max.z - bbox.min.z;
  }

  const position = geometry.attributes.position;
  if (!position || position.count === 0) {
    return { volume: 0, surfaceArea: 0, dimensions };
  }

  let totalVolume = 0;
  let totalArea = 0;

  const p1 = new THREE.Vector3();
  const p2 = new THREE.Vector3();
  const p3 = new THREE.Vector3();
  const v12 = new THREE.Vector3();
  const v13 = new THREE.Vector3();
  const cross = new THREE.Vector3();

  const index = geometry.index;
  if (index) {
    const count = index.count;
    for (let i = 0; i < count; i += 3) {
      const idx1 = index.getX(i);
      const idx2 = index.getX(i + 1);
      const idx3 = index.getX(i + 2);

      p1.fromBufferAttribute(position, idx1);
      p2.fromBufferAttribute(position, idx2);
      p3.fromBufferAttribute(position, idx3);

      const vSigned =
        (p1.x * (p2.y * p3.z - p2.z * p3.y) +
          p1.y * (p2.z * p3.x - p2.x * p3.z) +
          p1.z * (p2.x * p3.y - p2.y * p3.x)) /
        6.0;
      totalVolume += vSigned;

      v12.subVectors(p2, p1);
      v13.subVectors(p3, p1);
      cross.crossVectors(v12, v13);
      totalArea += cross.length() / 2.0;
    }
  } else {
    const count = position.count;
    for (let i = 0; i < count; i += 3) {
      p1.fromBufferAttribute(position, i);
      p2.fromBufferAttribute(position, i + 1);
      p3.fromBufferAttribute(position, i + 2);

      const vSigned =
        (p1.x * (p2.y * p3.z - p2.z * p3.y) +
          p1.y * (p2.z * p3.x - p2.x * p3.z) +
          p1.z * (p2.x * p3.y - p2.y * p3.x)) /
        6.0;
      totalVolume += vSigned;

      v12.subVectors(p2, p1);
      v13.subVectors(p3, p1);
      cross.crossVectors(v12, v13);
      totalArea += cross.length() / 2.0;
    }
  }

  return {
    volume: Math.abs(totalVolume) / 1000.0,
    surfaceArea: totalArea / 100.0,
    dimensions,
  };
}
