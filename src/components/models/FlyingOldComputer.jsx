/* eslint-disable react/no-unknown-property */
import { useFrame, useLoader } from '@react-three/fiber';
import { useRef } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

function FlyingOldComputer() {
  const speed = 0.01; // Speed of the model
  const gltf = useLoader(GLTFLoader, '/models/old_computer/scene.gltf');
  const modelRef = useRef();
  const angleRef = useRef(0); // Track the current angle of rotation
  const orbitRadius = 2.2; // Radius of the circular orbit around the bowl
  const initialAngleOffset = (2 * Math.PI) / 3 * 2; // Offset to ensure equal spacing with 3 models

  useFrame(() => {
    if (modelRef.current) {
      // Increment the angle for smooth orbiting
      angleRef.current += speed;

      // Update the position of the model based on the angle for circular orbit
      const x = orbitRadius * Math.cos(angleRef.current + initialAngleOffset);
      const z = orbitRadius * Math.sin(angleRef.current + initialAngleOffset);
      modelRef.current.position.set(x, 0, z);

      // Rotate the model to face towards the bowl as it orbits
      modelRef.current.rotation.y = -(angleRef.current + initialAngleOffset);
    }
  });

  return (
    <primitive
      ref={modelRef}
      object={gltf.scene}
      scale={[0.2, 0.2, 0.2]}
    />
  );
}

export default FlyingOldComputer;