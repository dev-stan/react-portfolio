// App.js
import { useRef, useState, useEffect } from 'react';

// Style imports
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';

// ThreeJs imports
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

// ThreeJs model imports
import RamenBowl from './components/models/RamenBowl';
import FlyingModel from './components/models/FlyingModel';
import TestJS from './components/models/TestJS';

// UI imports
import Navigation from './components/ui/Navigation';

// Hook imports
import useTyped from './components/hooks/UseTyped';

// Three.js imports
import * as THREE from 'three';

// CameraAnimation Component
function CameraAnimation({
  targetPosition,
  targetLookAt,
  animationComplete,
  setAnimationComplete,
  orbitControlsRef,
}) {
  const { camera } = useThree();

  useFrame(() => {
    if (!animationComplete && targetPosition && targetLookAt) {
      const direction = targetPosition.clone().sub(camera.position);
      const distance = direction.length();

      if (distance > 0.01) {
        const moveAmount = Math.min(0.1 * distance, 1);
        direction.normalize();
        camera.position.add(direction.multiplyScalar(moveAmount));

        const currentLookAt = new THREE.Vector3();
        camera.getWorldDirection(currentLookAt);
        currentLookAt.add(camera.position);

        const lookAtDirection = targetLookAt.clone().sub(currentLookAt);
        const lookAtDistance = lookAtDirection.length();

        if (lookAtDistance > 0.01) {
          lookAtDirection.normalize();
          const lookAtMoveAmount = Math.min(0.1 * lookAtDistance, 1);
          const newLookAt = currentLookAt.add(
            lookAtDirection.multiplyScalar(lookAtMoveAmount)
          );
          camera.lookAt(newLookAt);
        } else {
          camera.lookAt(targetLookAt);
        }

        if (orbitControlsRef.current) {
          orbitControlsRef.current.target.lerp(targetLookAt, 0.1);
          orbitControlsRef.current.update();
        }
      } else {
        camera.position.copy(targetPosition);
        camera.lookAt(targetLookAt);

        if (orbitControlsRef.current) {
          orbitControlsRef.current.target.copy(targetLookAt);
          orbitControlsRef.current.update();
        }

        setAnimationComplete(true);
      }
    }
  });

  return null;
}

function App() {
  const projectsRef = useRef(null);
  const containerRef = useRef(null); // Reference to the Container
  const typedRef = useTyped(); // Use the custom hook to get the reference
  const [scrollPosition, setScrollPosition] = useState(0);

  // Camera control states
  const initialCameraPosition = new THREE.Vector3(7 / 3, 14 / 3, 21 / 3);
  const [targetPosition, setTargetPosition] = useState(
    initialCameraPosition.clone()
  );
  const [targetLookAt, setTargetLookAt] = useState(new THREE.Vector3(0, 0, 0));
  const [animationComplete, setAnimationComplete] = useState(true);

  const orbitControlsRef = useRef();

  // Points of Interest
  const pointsOfInterest = [
    {
      position: new THREE.Vector3(7,2,-6),
      lookAt: new THREE.Vector3(0, 0, 0),
      color: 'blue',
    },
    {
      position: new THREE.Vector3(-2, 0, 0),
      lookAt: new THREE.Vector3(0, 0, 0),
      color: 'red',
    },
    {
      position: new THREE.Vector3(0, 0, 2),
      lookAt: new THREE.Vector3(0, 0, 0),
      color: 'green',
    },
  ];

  const handlePointClick = (point) => {
    setTargetPosition(point.position);
    setTargetLookAt(point.lookAt);
    setAnimationComplete(false);
  };

  // Accumulate wheel delta
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let accumulatedDelta = 0;

    const handleWheel = (event) => {
      accumulatedDelta += event.deltaY;
      // Limit the accumulatedDelta if needed
      accumulatedDelta = Math.max(0, accumulatedDelta);
      setScrollPosition(accumulatedDelta);
    };

    container.addEventListener('wheel', handleWheel);

    return () => {
      container.removeEventListener('wheel', handleWheel);
    };
  }, []);

  // Adjusted scrollPosition to prevent negative values
  const adjustedScrollPosition = Math.max(0, scrollPosition);

  // Calculate opacity for text fade-out and fade-in
  const textOpacity = Math.max(1 - adjustedScrollPosition / 300, 0); // Adjust 300 to control fade-out speed
  const newTextOpacity = Math.min(adjustedScrollPosition / 300, 1); // Adjust 300 as needed

  return (
    <Container
      ref={containerRef} // Attach the ref to the Container
      fluid
      style={{
        padding: 0,
        height: '100vh',
        overflowY: 'hidden', // Change to 'hidden' since we don't need scrolling
        overflowX: 'hidden',
        position: 'relative',
      }}
    >
      <Navigation />

      <Row
        className="no-gutters"
        style={{
          background: '#D1CCC2',
          color: '#CCC9DC',
          margin: 0,
          minHeight: '100vh',
          width: '100vw',
          overflowX: 'hidden',
          position: 'relative',
        }}
      >
        <Canvas
          camera={{ position: initialCameraPosition.toArray() }}
          style={{ height: '100vh', width: '100vw' }}
          dpr={[1, 1.5]}
          shadows
        >
          {/* Pass scrollPosition as a prop */}
          <TestJS scale={0.2} scrollPosition={adjustedScrollPosition} />
          <FlyingModel scrollPosition={adjustedScrollPosition} />
          <ambientLight intensity={1} />
          <directionalLight position={[5, 10, 7.5]} intensity={1} />
          {/* Points of Interest */}
          {pointsOfInterest.map((point, index) => (
            <mesh
              key={index}
              position={point.position}
              onClick={() => handlePointClick(point)}
            >
              <sphereGeometry args={[0.3, 32, 32]} />
              <meshStandardMaterial color={point.color} />
            </mesh>
          ))}
          {/* Orbit Controls */}
          <OrbitControls
            ref={orbitControlsRef}
            enableZoom={true}
            zoomSpeed={1.2}
            minDistance={2}
            maxDistance={1000}
            enableDamping={true}
            dampingFactor={0.1}
          />
          {/* Camera Animation */}
          {!animationComplete && (
            <CameraAnimation
              targetPosition={targetPosition}
              targetLookAt={targetLookAt}
              animationComplete={animationComplete}
              setAnimationComplete={setAnimationComplete}
              orbitControlsRef={orbitControlsRef}
            />
          )}
        </Canvas>

        {/* Existing Text */}
        <Col
          className="d-flex align-items-center"
          style={{
            height: '100vh',
            textAlign: 'left',
            position: 'absolute',
            left: 0,
            top: 0,
            width: '50%',
            opacity: textOpacity,
            transition: 'opacity 0.5s ease',
          }}
        >
          <h1
            className="typing-header led-heading fs-2 w-50 ps-5 pb-3"
            style={{ display: 'inline-block' }}
          >
            <span ref={typedRef}></span> {/* Attach the ref here */}
          </h1>
        </Col>

        {/* New Text */}
        <Col
          className="d-flex align-items-center"
          style={{
            height: '100vh',
            textAlign: 'left',
            position: 'absolute',
            left: 0,
            top: 0,
            width: '50%',
            opacity: newTextOpacity,
            transition: 'opacity 0.5s ease',
          }}
        >
          <h1
            className="new-text led-heading fs-2 w-50 ps-5 pb-3"
            style={{ display: 'inline-block' }}
          >
            Here is some new text.
          </h1>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
