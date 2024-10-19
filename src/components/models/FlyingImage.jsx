import { useFrame, useLoader } from '@react-three/fiber';
import React, { useRef } from 'react';
import * as THREE from 'three';

function FlyingImage() {
  const speed = 0.005; // Speed of the image rotation
  const texture = useLoader(THREE.TextureLoader, 'https://avatars.githubusercontent.com/u/67323109?s=400&u=9a0445a323a0ab3fee6e50b04bef3126408f34ac&v=4');
  const planeRef = useRef();
  const radius = 0.5; // Radius of the circular path
  const angleRef = useRef(0); // Angle for circular rotation

  useFrame(() => {
    if (planeRef.current) {
      // Rotate the image slightly
      planeRef.current.rotation.y += speed * 0.5;
      planeRef.current.rotation.z += speed * 0.5;

      // Update the angle for circular movement
      angleRef.current += speed;

      // Calculate the new position based on the angle for a more dynamic movement around the center
      const x = (radius + 5 * Math.sin(angleRef.current * 0.5)) * Math.cos(angleRef.current);
      const z = (radius + 5 * Math.sin(angleRef.current * 0.5)) * Math.sin(angleRef.current);

      planeRef.current.position.set(x, 0, z);
    }
  });

  return (
    <mesh ref={planeRef}>
      <planeGeometry args={[0.85, 0.85]} />
      <meshBasicMaterial map={texture} side={THREE.DoubleSide} transparent />
    </mesh>
  );
}

export default FlyingImage;
