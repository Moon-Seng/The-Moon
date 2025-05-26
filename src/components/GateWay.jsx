import { useRef, useEffect } from "react";
import { useGLTF, OrbitControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const GatewayCore = ({
  moonPosition = [0, 0, 0],
  orbitRadius = 5,
  speed = 0.5,
}) => {
  const groupRef = useRef();
  const orbitAngle = useRef(0);

  // Load your model - replace with your actual model path
  const { scene } = useGLTF("/models/gateway-core.glb");

  // Animation loop
  useFrame((state, delta) => {
    orbitAngle.current += delta * speed;

    // Calculate orbit position
    const x = moonPosition[0] + Math.cos(orbitAngle.current) * orbitRadius;
    const z = moonPosition[2] + Math.sin(orbitAngle.current) * orbitRadius;

    if (groupRef.current) {
      groupRef.current.position.set(x, moonPosition[1], z);

      // Make the core always face the moon
      groupRef.current.lookAt(new THREE.Vector3(...moonPosition));
    }
  });

  return (
    <primitive
      ref={groupRef}
      object={scene}
      dispose={null}
      scale={[0.05, 0.05, 0.05]} // Adjust scale as needed
      position={[0, 0, 0]}
      rotation={[0, 0, 0]}
    />
  );
};

// <group ref={groupRef}>
{
  /* Replace this with your actual model structure */
}
{
  /* <mesh geometry={nodes.gatewayCore.geometry} material={materials.metal} /> */
}
// </group>
// Preload the model (optional but recommended)
useGLTF.preload("/models/gateway-core.glb");

export default GatewayCore;
