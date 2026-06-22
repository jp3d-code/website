import type * as THREE from "three";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";
import * as BufferGeometryUtils from "three/examples/jsm/utils/BufferGeometryUtils.js";

let dracoLoader: DRACOLoader | null = null;
let gltfLoader: GLTFLoader | null = null;
let stlLoader: STLLoader | null = null;

function getDRACOLoader(): DRACOLoader {
  if (!dracoLoader) {
    dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("/draco/");
  }
  return dracoLoader;
}

function getGLTFLoader(): GLTFLoader {
  if (!gltfLoader) {
    gltfLoader = new GLTFLoader();
    gltfLoader.setDRACOLoader(getDRACOLoader());
  }
  return gltfLoader;
}

function getSTLLoader(): STLLoader {
  if (!stlLoader) {
    stlLoader = new STLLoader();
  }
  return stlLoader;
}

export function extractGLTFGeometry(
  scene: THREE.Object3D,
): THREE.BufferGeometry {
  const geometries: THREE.BufferGeometry[] = [];
  scene.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) {
      const mesh = child as THREE.Mesh;
      if (mesh.geometry) {
        mesh.updateMatrixWorld(true);
        const clonedGeom = mesh.geometry.clone();
        clonedGeom.applyMatrix4(mesh.matrixWorld);
        geometries.push(clonedGeom);
      }
    }
  });

  if (geometries.length === 0) {
    throw new Error("El archivo GLB no contiene ninguna malla (mesh) 3D.");
  }

  if (geometries.length === 1) {
    return geometries[0];
  }

  const merged = BufferGeometryUtils.mergeGeometries(geometries, true);
  if (!merged) {
    throw new Error("No se pudieron combinar las mallas del archivo GLB.");
  }
  merged.computeVertexNormals();
  return merged;
}

export function loadSTL(url: string): Promise<THREE.BufferGeometry> {
  const loader = getSTLLoader();
  return new Promise((resolve, reject) => {
    loader.load(
      url,
      (geometry) => {
        geometry.computeVertexNormals();
        resolve(geometry);
      },
      undefined,
      (error) => reject(error),
    );
  });
}

export interface LoadedGLTF {
  geometry: THREE.BufferGeometry;
  scene: THREE.Group;
}

export function loadGLTF(url: string): Promise<LoadedGLTF> {
  const loader = getGLTFLoader();
  return new Promise((resolve, reject) => {
    loader.load(
      url,
      (gltf) => {
        try {
          const geometry = extractGLTFGeometry(gltf.scene);
          resolve({
            geometry,
            scene: gltf.scene,
          });
        } catch (err) {
          reject(err);
        }
      },
      undefined,
      (error) => reject(error),
    );
  });
}

export function disposeLoaders() {
  if (dracoLoader) {
    dracoLoader.dispose();
    dracoLoader = null;
  }
  gltfLoader = null;
  stlLoader = null;
}
