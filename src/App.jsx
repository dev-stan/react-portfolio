// App.js
import React, { useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from '@react-three/drei';
import Typed from 'typed.js'; // Import Typed.js
import './index.css'; // Ensure Tailwind CSS is imported
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function App() {
  return (
    <Row>

      {/* Left Side with the 3D Model */}
      <Col>

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

      </Col>

      {/* Right Side with Typing Animation */}
      <Col className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}> 
        <h1 className="typing-header">
          "Hey, I'm Stan&nbsp;
          <span ref={useTyped()}></span>
        </h1>
      </Col>
    </Row>
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

function useTyped() {
  const typedElement = useRef(null);

  useEffect(() => {
    if (!typedElement.current) return;

    const typed = new Typed(typedElement.current, {
      strings: ["{JavaScript}", "{Ruby on Rails}", "{React}", "HTML", "CSS"],
      typeSpeed: 20,
      backSpeed: 25,
      loop: false,
      startDelay: 500,
      showCursor: false,
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return typedElement;
}

export default App;
