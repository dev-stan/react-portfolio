/* eslint-disable react/no-unknown-property */
import { useRef, useEffect } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

function RamenBowl({ scrollPosition }) {
  const gltf = useLoader(GLTFLoader, '/scene.gltf');
  const modelRef = useRef();
  const scrollPositionRef = useRef(scrollPosition);

  // Update the scrollPositionRef when scrollPosition changes
  useEffect(() => {
    scrollPositionRef.current = scrollPosition;
  }, [scrollPosition]);

  useFrame(() => {
    if (modelRef.current) {
      // Rotate the model
      modelRef.current.rotation.y += 0.005;

      // Compute the target position
      const targetX = scrollPositionRef.current * 0.01; // Adjust the factor as needed

      // Interpolate the current position towards the target position
      modelRef.current.position.x += (targetX - modelRef.current.position.x) * 0.01; // Adjust 0.1 for smoothness

      // Optionally, you can dampen the movement even more by decreasing the factor
      // modelRef.current.position.x += (targetX - modelRef.current.position.x) * 0.05;
    }
  });

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
