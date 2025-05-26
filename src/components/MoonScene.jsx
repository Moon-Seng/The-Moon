import { Canvas, useFrame } from "@react-three/fiber";
import React, { useEffect, useRef, useState } from "react";
import { OrbitControls, Stars, useGLTF } from "@react-three/drei";
import Moon from "./Moon";
import * as THREE from "three";
import { motion } from "framer-motion";
import HorizontalFlybyShip from "./Spaceship";
import MoonDust from "./MoonDust";
import GatewayCore from "./GateWay";
import SpaceDust from "./SpaceDust";

// const AnimatedStars = (props) => {
//   const starsRef = useRef();

//   useFrame((state, delta) => {
//     starsRef.current.rotation.x += delta * 0.01;
//     starsRef.current.rotation.y += delta * 0.005;
//   });

//   return <Stars ref={starsRef} {...props} />;
// };

const MoonScene = () => {
  return (
    <div className="h-screen overflow-hidden w-full">
      <Canvas camera={{ position: [0, 0, 15], fov: 45, near: 0.1, far: 1000 }}>
        <GatewayCore moonPosition={[0, 0, 0]} orbitRadius={8} speed={0.1} />
        <Moon />
        <MoonDust />
        <SpaceDust count={1000} moonPosition={[0, 0, 0]} />
        <HorizontalFlybyShip />

        <ambientLight intensity={2} />
        <spotLight
          position={[10, 15, 10]}
          angle={0.3}
          penumbra={1}
          intensity={2}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-bias={-0.0001}
          shadow-camera-near={0.5}
          shadow-camera-far={500}
          shadow-camera-fov={30}
          color={0xffffff}
        />

        <OrbitControls
          enableZoom={false}
          minPolarAngle={Math.PI / 2}
          maxPolarAngle={Math.PI / 2}
          enableRotate={false}
        />
      </Canvas>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className=" w-[100%] m-auto  absolute inset-0 z-10 flex flex-col items-center justify-center text-center p-8 text-white"
      >
        <div className=" w-[70%] h-[40vh] flex items-center justify-center flex-col p-8 rounded-lg shadow-lg backdrop-blur-sm bg-white/10 border border-white/20">
          <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-blue-400">
            Welcome to My Moon Portfolio
          </h1>

          <p className="text-xl w-full md:text-2xl max-w-2xl my-8 opacity-90">
            Exploring the cosmos through code and design. Click launch to
            discover my projects and journey through space.
          </p>

          <button
            className="px-8 py-3 bg-transparent border-2 border-blue-400 rounded-full text-blue-200 hover:bg-blue-900/30 hover:border-blue-300 transition-all duration-300 text-lg font-medium"
            onClick={() => console.log("Launch button clicked!")}
          >
            Launch Journey
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default MoonScene;
