import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

const HorizontalFlybyShip = () => {
  const shipRef = useRef();
  const { scene } = useGLTF("/models/spaceship.glb");
  const [flybyParams, setFlybyParams] = useState({
    position: new THREE.Vector3(0, 0, 0),
    velocity: new THREE.Vector3(0, 0, 0),
    active: false,
  });

  // Initialize a new horizontal flyby
  const initFlyby = () => {
    const startX = Math.random() > 0.5 ? -40 : 40; // Left or right side
    const endX = -startX; // Opposite side

    // Random Y position (height)
    const yPos = -4 + Math.random() * 10; // Between moon base and top of screen

    // Fixed Z position (depth) - same as moon
    const zPos = 0;

    // Calculate direction and speed
    const direction = new THREE.Vector3(endX - startX, 0, 0).normalize();
    const speed = 0.6; // Random speed
    // const speed = 0.5 + Math.random() * 0.01; // Random speed

    setFlybyParams({
      position: new THREE.Vector3(startX, yPos, zPos),
      velocity: direction.multiplyScalar(speed),
      active: true,
    });

    // Schedule next flyby (15-45 seconds)
    setTimeout(initFlyby, 10000);
    // setTimeout(initFlyby, 15000 + Math.random() * 30000);
  };

  // Start first flyby
  useEffect(() => initFlyby(), []);

  // Animation loop
  useFrame((_, delta) => {
    if (!flybyParams.active) return;

    shipRef.current.position.add(
      new THREE.Vector3().copy(flybyParams.velocity).multiplyScalar(delta * 20)
    );

    // Face movement direction (point nose left/right)
    shipRef.current.lookAt(
      shipRef.current.position.clone().add(flybyParams.velocity)
    );

    // Disable when far beyond screen edges
    if (Math.abs(shipRef.current.position.x) > 50) {
      setFlybyParams((p) => ({ ...p, active: false }));
    }
  });

  if (!flybyParams.active) return null;

  return (
    <primitive
      ref={shipRef}
      object={scene}
      position={flybyParams.position}
      scale={0.3}
      rotation={[0, Math.PI / 2, 0]} // Adjust based on model's forward direction
    />
  );
};

export default HorizontalFlybyShip;
