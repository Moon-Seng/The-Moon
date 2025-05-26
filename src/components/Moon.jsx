// Moon Component (updated with rotation)
import { useFrame, useLoader } from "@react-three/fiber";
import React, { useRef } from "react";
import { useTexture } from "@react-three/drei";
import { TextureLoader } from "three";

const Moon = () => {
  const moonRef = useRef();
  const [colorMap, bumpMap] = useTexture([
    "/textures/moon-color.jpg",
    "/textures/moon-bump.jpg",
  ]);

  useFrame(() => {
    moonRef.current.rotation.y += 0.0002; // Slow rotation
  });

  return (
    <mesh ref={moonRef} position={[0, -window.innerHeight * 0.004, 0]}>
      <sphereGeometry args={[7, 64, 64]} />
      <meshStandardMaterial
        map={colorMap}
        bumpMap={bumpMap}
        bumpScale={0.05}
        roughness={0.8}
        metalness={0.2}
      />
    </mesh>
  );
};

// Preload textures
useTexture.preload("/textures/moon-color.jpg");
useTexture.preload("/textures/moon-bump.jpg");

export default Moon;
