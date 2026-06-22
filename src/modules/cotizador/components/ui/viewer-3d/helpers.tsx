"use client";

import { Grid } from "@react-three/drei";

export function SceneHelpers() {
  return (
    <>
      <hemisphereLight color="#ffffff" groundColor="#222222" intensity={0.4} />

      <directionalLight
        castShadow
        position={[100, 150, 80]}
        intensity={1.2}
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0005}
        shadow-camera-left={-150}
        shadow-camera-right={150}
        shadow-camera-top={150}
        shadow-camera-bottom={-150}
        shadow-camera-near={0.5}
        shadow-camera-far={400}
      />

      <directionalLight position={[-100, 80, 50]} intensity={0.4} />

      <directionalLight position={[0, 100, -120]} intensity={0.3} />

      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.5, 0]}
        receiveShadow
      >
        <planeGeometry args={[400, 400]} />
        <shadowMaterial opacity={0.35} />
      </mesh>

      <Grid
        position={[0, -0.1, 0]}
        args={[300, 300]}
        cellSize={5}
        cellThickness={1.0}
        cellColor="#353535"
        sectionSize={25}
        sectionThickness={1.5}
        sectionColor="#4d4d4d"
        fadeDistance={250}
        fadeStrength={1}
        infiniteGrid
        frustumCulled={false}
      />
    </>
  );
}
