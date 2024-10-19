/* eslint-disable react/no-unknown-property */
import { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

function RamenBowl() {
  const gltf = useLoader(GLTFLoader, '/models/ramen_bowl/scene.gltf');
  const modelRef = useRef();

  // Use useFrame for continuous animation
  useFrame(() => {
    if (modelRef.current) {
      // Slightly rotate the model on every frame
      modelRef.current.rotation.y += 0.005;
    }
  });

  return (
    <primitive
      ref={modelRef}
      object={gltf.scene}
      scale={[12, 12, 12]}
      position={[0, -1, 0]}
    />
  );
}

export default RamenBowl;
