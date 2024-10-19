import { useFrame, useThree } from '@react-three/fiber';
import { useRef, useEffect } from 'react';

function CameraControls({ clicked }) {
  const { camera } = useThree();
  const angleRef = useRef(0); // Ref to store the current angle for rotation
  const rotationSpeed = 0.01; // Adjust rotation speed as needed

  useEffect(() => {
    if (clicked) {
      // Set initial camera position and target after layout change
      camera.position.set(0, 0.5, 1);
      camera.lookAt(0, 0.4, 0); // Adjust this if needed to look at the model
    }
  }, [clicked, camera]);

  useFrame(() => {
    if (clicked) {
      // Increment the angle for smooth rotation
      angleRef.current += rotationSpeed;

      // Calculate new camera position based on the angle
      const x = 1 * Math.sin(angleRef.current); // Adjust the radius as needed
      const z = 1 * Math.cos(angleRef.current); // Adjust the radius as needed

      // Set the camera's new position (rotating around the model)
      camera.position.set(x, 0.5, z);

      // Keep the camera looking at the model's center
      camera.lookAt(0, 0.4, 0);
    }
  });

  return null;
}

export default CameraControls;
