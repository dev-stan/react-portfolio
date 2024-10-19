import { useFrame, useLoader } from '@react-three/fiber';
import React, { useRef } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

function FlyingOldComputer() {
  const speed = 0.05; // Speed of the model
  const gltf = useLoader(GLTFLoader, '/models/old_computer/scene.gltf');
  const modelRef = useRef();
  const directionRef = useRef(-1); // 1 for right, -1 for left

  useFrame(() => {
    if (modelRef.current) {
      // Rotate the model in all directions
      modelRef.current.rotation.x += 0.02;
      modelRef.current.rotation.y += 0.04;
      modelRef.current.rotation.z += 0.02;

      // Move the model from right to left across the entire screen
      modelRef.current.position.x += speed * directionRef.current;

      // Reverse direction when offscreen
      if (modelRef.current.position.x > 30 || modelRef.current.position.x < -30) {
        directionRef.current *= -1; // Reverse direction
      }
    }
  });

  return (
    <primitive
      ref={modelRef}
      object={gltf.scene}
      scale={[0.2, 0.2, 0.2]}
      position={[10, 0, 0]}
    />
  );
}

export default FlyingOldComputer;
