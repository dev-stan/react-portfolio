/* eslint-disable react/no-unknown-property */
import { useRef } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

function ProjectCard() {
  return (
    <div className="w-25 h-25 rounded-3 d-flex" style={{ backgroundColor: '#0c0c0c' }}>
      <div className="w-50">
        <Canvas camera={{ position: [0, 0, 4] }} style={{ height: '100%', width: '100%' }} dpr={[1, 1.5]}>
          <ProjectModel />
          <ambientLight intensity={1} />
          <directionalLight position={[10, 10, 10]} intensity={1} />
        </Canvas>
      </div>
      <div className="w-50">
        <div className="ps-3 pt-3 text-white">
          <p>Shortify</p>
        </div>
        <div className="px-3 pt-1 text-white">
          <p>An automation app used for creating short-form story videos for social media.</p>
        </div>
      </div>
    </div>
  );
}

function ProjectModel() {
  const gltf = useLoader(GLTFLoader, '/models/joint/scene.gltf');
  const modelRef = useRef();

  // Use useFrame for continuous animation
  useFrame(() => {
    modelRef.current.rotation.y -= 0.005;
  });

  return (
    <primitive
      ref={modelRef}
      object={gltf.scene}
      scale={[2, 2, 2]}
      position={[0, 0, 0]}
    />
  );
}

export default ProjectCard;
