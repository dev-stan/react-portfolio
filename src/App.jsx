import React, { useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import Typed from 'typed.js';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './Navigation';
import Projects from './Projects';
import { Container, Row, Col, Navbar } from 'react-bootstrap';

function App() {
  return (
<Container fluid style={{ padding: 0, height: '100vh', overflowY: 'scroll', overflowX: 'hidden' }}>
  <Navigation />
  <Row
    className="no-gutters"
    style={{ background: '#161616', color: '#CCC9DC', margin: 0, height: '100vh', width: '100vw', overflowX: 'hidden' }}
  >
    {/* Left Side with the 3D Model */}
    <Col style={{ padding: 0 }}>
      <Canvas camera={{ position: [0, 2, 4] }} style={{ height: '100vh', width: '100%' }} dpr={[1, 1.5]}>
        <Scene />
        <ambientLight intensity={1} />
        <directionalLight position={[10, 10, 10]} intensity={1} />
      </Canvas>
    </Col>

    {/* Right Side with Typing Animation */}
    <Col className="d-flex align-items-center" style={{ height: '100vh', textAlign: 'left' }}>
      <h1 className="typing-header led-heading fs-5 w-50 mx-auto" style={{ display: 'inline-block' }}>
        &nbsp;
        <span ref={useTyped()} className="typed-text typed-fade-out"></span>
      </h1>
    </Col>
  </Row>
  <Row style={{ height: 'auto', width: '100vw', overflowX: 'hidden' }}>
    <Projects />
  </Row>
</Container>

  );
}

function Scene() {
  const gltf = useLoader(GLTFLoader, '/models/stylized_ramen_bowl/scene.gltf');
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

function useTyped() {
  const typedElement = useRef(null);

  useEffect(() => {
    if (!typedElement.current) return;

    const typed = new Typed(typedElement.current, {
      strings: [
        "Hey, I'm Stan - a Full Stack Developer!",
        "I've been coding for over 5 years now!",
        "I love building cool stuff with code, Ruby on Rails and React...",
        'Scroll down and check out my projects!',
      ],
      typeSpeed: 28,
      backSpeed: 10,
      loop: false,
      backDelay: 2500,
      startDelay: 500,
      showCursor: true,
      fadeOut: true,
      fadeOutClass: 'typed-fade-out',
      fadeOutDelay: 500,
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return typedElement;
}

export default App;
