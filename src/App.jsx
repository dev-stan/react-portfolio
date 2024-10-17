// App.js
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from '@react-three/drei';
import './index.css'; // Ensure Tailwind CSS is imported

function App() {
  return (
    <div className="flex h-screen">

      {/* Right Side with the 3D Model */}
      <div className="w-1/2">

          <Canvas
            camera={{ position: [0, 0, 5] }}
            style={{ width: '50vw', height: '100vh' }}
          >
            {/* Load and display the GLTF model */}
            <Scene />

            {/* Add sufficient lighting */}
            <ambientLight intensity={1} />
            <directionalLight position={[10, 10, 10]} intensity={1} />

            {/* Add basic controls */}
            <OrbitControls />
          </Canvas>

      </div>
      <div className="w-1/2"> 
        <h1>hello</h1>

      </div>
    </div>
  );
}

function Scene() {
  // Load the GLTF model from the public/models directory
  const gltf = useLoader(GLTFLoader, '/models/old_computer/scene.gltf');

  // Adjust scale and position
  return (
    <primitive
      object={gltf.scene}
      scale={[2, 2, 2]}
      position={[0, -1, 0]}
    />
  );
}

export default App;
