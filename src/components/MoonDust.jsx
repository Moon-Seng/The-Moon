import { Canvas, useFrame } from "@react-three/fiber";
import React, { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

const MoonDust = ({ count = 1000 }) => {
  const particles = useRef();
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      arr[i] = (Math.random() - 0.5) * 50; // Spread area
    }
    return arr;
  }, [count]);

  useFrame(() => {
    particles.current.rotation.y += 0.0005; // Slow drift
  });

  return (
    <points ref={particles}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#bbbbaa"
        size={0.05}
        sizeAttenuation
        transparent
        opacity={0.7}
        alphaTest={0.01}
      />
    </points>
  );
};

export default MoonDust;
