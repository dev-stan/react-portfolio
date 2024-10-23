import { useRef, useState, useEffect } from 'react';

// Style imports
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';

// ThreeJs imports
import { Canvas } from '@react-three/fiber';

// ThreeJs model imports
import RamenBowl from './components/models/RamenBowl';

// UI imports
import Navigation from './components/ui/Navigation';

// Hook imports
import useTyped from './components/hooks/UseTyped';

function App() {
  const projectsRef = useRef(null);
  const containerRef = useRef(null); // Reference to the Container
  const typedRef = useTyped(); // Use the custom hook to get the reference
  const [scrollPosition, setScrollPosition] = useState(0);

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
          background: '#0c0c0c',
          color: '#CCC9DC',
          margin: 0,
          minHeight: '100vh',
          width: '100vw',
          overflowX: 'hidden',
          position: 'relative',
        }}
      >
        <Canvas
          camera={{ position: [0, 2, 4] }}
          style={{ height: '100vh', width: '100vw' }}
          dpr={[1, 1.5]}
        >
          {/* Pass scrollPosition as a prop */}
          <RamenBowl scrollPosition={adjustedScrollPosition} />
          <ambientLight intensity={1} />
          <directionalLight position={[5, 10, 7.5]} intensity={1} />
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
