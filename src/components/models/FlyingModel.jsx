import { useFrame, useLoader } from '@react-three/fiber';
import React, { useRef, useState } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';

function FlyingModel() {
    const speed = 0.05; // Speed of the model
    const gltf = useLoader(GLTFLoader, '/models/joint/scene.gltf');
    const modelRef = useRef();
    const [position, setPosition] = useState([-30, 0, 0]);
    const directionRef = useRef(1); // 1 for right, -1 for left
  
    useFrame(() => {
      if (modelRef.current) {
        // Rotate the model in all directions
        modelRef.current.rotation.x += speed * 0.1;
        modelRef.current.rotation.y += speed * 0.2;
        modelRef.current.rotation.z += speed * 0.1;
  
        // Move the model from left to right across the entire screen and reset direction when offscreen
        setPosition(([x, y, z]) => {
          if (x > 30 || x < -30) {
            directionRef.current *= -1; // Reverse direction
          }
          return [x + speed * directionRef.current, y, z];
        });
      }
    });
  
    return (
      <primitive
        ref={modelRef}
        object={gltf.scene}
        scale={[0.4, 0.4, 0.4]}
        position={position}
      />
    );
  }

export default FlyingModel