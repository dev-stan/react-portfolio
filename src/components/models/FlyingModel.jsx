/* eslint-disable react/no-unknown-property */
import { useFrame, useLoader } from '@react-three/fiber';
import { useRef } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

function FlyingModel({ clicked, onClick }) {
  const gltf = useLoader(GLTFLoader, '/models/tree/scene.gltf');
  const modelRef = useRef();
  const orbitRadius = 2.2;
  const speed = 0.01;
  const angleRef = useRef(0);
  const initialAngleOffset = 0;

  useFrame(() => {
    if (modelRef.current && !clicked) {
      angleRef.current += speed;
      const x = orbitRadius * Math.cos(angleRef.current + initialAngleOffset);
      const z = orbitRadius * Math.sin(angleRef.current + initialAngleOffset);
      modelRef.current.position.set(x, 0, z);
      modelRef.current.rotation.y = -(angleRef.current + initialAngleOffset);
      
    }
  });

  const handleClick = (e) => {
    e.stopPropagation();
    if (!clicked) {
      modelRef.current.position.set(0, 0, 0); // Center the model immediately
      modelRef.current.rotation.y = 0;
      // Change the scale to 5,5,5
      onClick(); // Notify parent component about the click
    }
  };

  return (
    <group ref={modelRef} onClick={handleClick}>
      <primitive object={gltf.scene} scale={[0.6, 0.6, 0.6]} castShadow receiveShadow />
    </group>
  );
}

export default FlyingModel;
