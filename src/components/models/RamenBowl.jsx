/* eslint-disable react/no-unknown-property */
import { useRef, useEffect } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

function RamenBowl({ scrollPosition }) {
  const gltf = useLoader(GLTFLoader, 'scene.gltf');
  const modelRef = useRef();
  const scrollPositionRef = useRef(scrollPosition);

  // Update the scrollPositionRef when scrollPosition changes
  useEffect(() => {
    scrollPositionRef.current = scrollPosition;
  }, [scrollPosition]);


  return (
    <primitive
      ref={modelRef}
      object={gltf.scene}
      scale={[0.1, 0.1, 0.1]}
      position={[0, -1, 0]}
    />
  );
}

export default RamenBowl;
