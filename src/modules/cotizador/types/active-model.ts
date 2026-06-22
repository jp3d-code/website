import type * as THREE from "three";
import type { GeometryStats } from "./geometry-stats";

export interface ActiveModel {
  name: string;
  size: number;
  geometry: THREE.BufferGeometry;
  stats: GeometryStats;
  scene?: THREE.Group;
}
