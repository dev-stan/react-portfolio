/* eslint-disable react/no-unknown-property */
import { useFrame, useLoader } from '@react-three/fiber';
import { useRef } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

function FlyingModel({ onClick }) {
  const gltf = useLoader(GLTFLoader, '/models/tree/scene.gltf');
  const modelRef = useRef();
  const orbitRadius = 2.2; // Radius of the circular orbit around the bowl
  const speed = 0.01; // Speed of the orbit
  const angleRef = useRef(0); // Track the current angle of rotation
  const initialAngleOffset = 0; // Offset to ensure equal spacing with 3 models

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
    <group ref={modelRef} onClick={onClick}>
      <primitive
        object={gltf.scene}
        scale={[0.6, 0.6, 0.6]}
        castShadow
        receiveShadow
      />
    </group>
  );
}

export default FlyingModel;
