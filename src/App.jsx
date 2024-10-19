import React, { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import Typed from 'typed.js';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './components/ui/Navigation';
import Projects from './components/ui/Projects';
import { Container, Row, Col } from 'react-bootstrap';
import { BsArrowDown } from 'react-icons/bs';
import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import FlyingImage from './components/models/FlyingImage';
import * as THREE from 'three';

const bounceAnimation = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(10px);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const BouncingArrow = styled(BsArrowDown)`
  animation: ${bounceAnimation} 3s ease-in-out infinite, ${props => props.fade ? fadeIn : fadeOut} 1s ease;
  opacity: ${props => props.visible ? 1 : 0};
`;

function App() {
  const [arrowVisible, setArrowVisible] = useState(false);
  const [fade, setFade] = useState(true);
  const projectsRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setArrowVisible(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const scrollToProjects = () => {
    setFade(false);
    setTimeout(() => {
      if (projectsRef.current) {
        projectsRef.current.scrollIntoView({ behavior: 'smooth' });
      }
      setArrowVisible(false);
    }, 1000);
  };

  return (
    <Container fluid style={{ padding: 0, height: '100vh', overflowY: 'scroll', overflowX: 'hidden', position: 'relative' }}>
      <Navigation />
      <Row
        className="no-gutters"
        style={{ background: '#0c0c0c', color: '#CCC9DC', margin: 0, minHeight: '100vh', width: '100vw', overflowX: 'hidden', position: 'relative' }}
      >
        {/* Canvas with the 3D Models */}
        <Canvas camera={{ position: [0, 2, 4] }} style={{ height: '100vh', width: '100vw' }} dpr={[1, 1.5]}>
          <Scene />
          <FlyingModel />
          <FlyingOldComputer />
          <FlyingImage />
          <ambientLight intensity={1} />
          <directionalLight position={[10, 10, 10]} intensity={1} />
        </Canvas>
        <Col className="d-flex align-items-center" style={{ height: '100vh', textAlign: 'left', position: 'absolute', left: 0, top: 0, width: '50%' }}>
        <h1 className="typing-header led-heading fs-2 w-50 ps-5 pb-3" style={{ display: 'inline-block' }}>
            Welcome to my portfolio. <br/><br/>
            Enjoy the ramen...
          </h1>
        </Col>

        <Col className="d-flex align-items-center" style={{ height: '100vh', textAlign: 'left', position: 'absolute', right: 0, top: 0, width: '50%' }}>
          <h1 className="typing-header led-heading fs-5 w-50" style={{ display: 'inline-block', marginLeft: '40%' }}>
            &nbsp;
            <span ref={useTyped()} className="typed-text typed-fade-out"></span>
          </h1>
        </Col>


      </Row>
      {arrowVisible && (
        <div style={{ position: 'absolute', bottom: '20px', width: '100%', textAlign: 'center' }}>
          <BouncingArrow
            className="scroll-arrow mb-4"
            style={{ color: '#CCC9DC', cursor: 'pointer', fontSize: '2rem' }}
            onClick={scrollToProjects}
            visible={arrowVisible}
            fade={fade}
          />
        </div>
      )}
      <Row ref={projectsRef} style={{ height: 'auto', width: '100vw', overflowX: 'hidden' }}>
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

function FlyingModel() {
  const speed = 0.05; // Speed of the model
  const gltf = useLoader(GLTFLoader, '/models/joint/scene.gltf');
  const modelRef = useRef();
  const [position, setPosition] = useState([-30, 0, 0]);
  const directionRef = useRef(1); // 1 for right, -1 for left

  useFrame(() => {
    if (modelRef.current) {
      // Rotate the model in all directions
      modelRef.current.rotation.x += speed * 0.1;
      modelRef.current.rotation.y += speed * 0.2;
      modelRef.current.rotation.z += speed * 0.1;

      // Move the model from left to right across the entire screen and reset direction when offscreen
      setPosition(([x, y, z]) => {
        if (x > 30 || x < -30) {
          directionRef.current *= -1; // Reverse direction
        }
        return [x + speed * directionRef.current, y, z];
      });
    }
  });

  return (
    <primitive
      ref={modelRef}
      object={gltf.scene}
      scale={[0.4, 0.4, 0.4]}
      position={position}
    />
  );
}

function FlyingOldComputer() {
  const speed = 0.05; // Speed of the model
  const gltf = useLoader(GLTFLoader, '/models/old_computer/scene.gltf');
  const modelRef = useRef();
  const [position, setPosition] = useState([10, 0, 0]);
  const directionRef = useRef(-1); // 1 for right, -1 for left

  useFrame(() => {
    if (modelRef.current) {
      // Rotate the model in all directions
      modelRef.current.rotation.x += 0.02;
      modelRef.current.rotation.y += 0.04;
      modelRef.current.rotation.z += 0.02;

      // Move the model from right to left across the entire screen and reset direction when offscreen
      setPosition(([x, y, z]) => {
        if (x > 30 || x < -30) {
          directionRef.current *= -1; // Reverse direction
        }
        return [x + speed * directionRef.current, y, z];
      });
    }
  });

  return (
    <primitive
      ref={modelRef}
      object={gltf.scene}
      scale={[0.2, 0.2, 0.2]}
      position={position}
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
        "Oh wow! Something flew by!",
        "I love building cool stuff with Ruby on Rails and React...",
        "Welcome to my portfolio, damn I've got some nice stuff here",
        "What you see are 3D models, thank Three.js for that...",
        'Scroll down and check out my projects!',
      ],
      typeSpeed: 28,
      backSpeed: 10,
      loop: false,
      backDelay: 7000,
      startDelay: 500,
      showCursor: true,
      fadeOut: true,
      fadeOutClass: 'typed-fade-out',
      fadeOutDelay: 1000,
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return typedElement;
}

export default App;
