import { useRef, useEffect, useMemo } from "react";
import { useGLTF, OrbitControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const SpaceDust = ({ count = 1000, moonPosition }) => {
  const particles = useRef();
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      pos[i] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, [count]);

  useFrame(() => {
    if (particles.current) {
      particles.current.rotation.x += 0.0005;
      particles.current.rotation.y += 0.001;
    }
  });

  return (
    <points ref={particles} position={moonPosition}>
      <bufferGeometry attach="geometry">
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        attach="material"
        color="#aaaaaa"
        size={0.02}
        sizeAttenuation={true}
        transparent
        opacity={0.8}
      />
    </points>
  );
};

export default SpaceDust;
