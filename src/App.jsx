import { useState } from 'react';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import { Canvas } from '@react-three/fiber';
import FlyingModel from './components/models/FlyingModel';
import FlyingOldComputer from './components/models/FlyingOldComputer';
import FlyingBackpack from './components/models/FlyingBackpack';
import RamenBowl from './components/models/RamenBowl';
import Navigation from './components/ui/Navigation';
import Projects from './components/ui/Projects';
import useTyped from './components/hooks/UseTyped';
import CameraControls from './components/three/CameraControls';
import { CSSTransition } from 'react-transition-group';

function App() {
  const [clicked, setClicked] = useState(false);
  const typedRef = useTyped();

  const handleModelClick = () => {
    setClicked(true);
  };

  return (
    <Container
      fluid
      style={{
        padding: 0,
        height: '100vh',
        overflowY: 'scroll',
        overflowX: 'hidden',
        position: 'relative',
        backgroundColor: '#000',
      }}
    >
      <Navigation />

      <CSSTransition
        in={!clicked}
        timeout={500}
        classNames="fade"
        unmountOnExit
      >
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
            <RamenBowl />
            <FlyingModel clicked={clicked} onClick={handleModelClick} />
            <FlyingBackpack />
            <FlyingOldComputer />
            <ambientLight intensity={1} />
            <directionalLight position={[10, 10, 10]} intensity={1} />
          </Canvas>

          <Col
            className="d-flex align-items-center"
            style={{
              height: '100vh',
              textAlign: 'left',
              position: 'absolute',
              left: 0,
              top: 0,
              width: '50%',
              pointerEvents: 'none',
            }}
          >
            <h1
              className="typing-header led-heading fs-2 w-50 ps-5 pb-3"
              style={{ display: 'inline-block' }}
            >
              Enjoy the ramen...
              <br />
              <br />
              Welcome to my portfolio.
            </h1>
          </Col>

          <Col
            className="d-flex align-items-center"
            style={{
              height: '100vh',
              textAlign: 'left',
              position: 'absolute',
              right: 0,
              top: 0,
              width: '50%',
              pointerEvents: 'none',
            }}
          >
            <h1
              className="typing-header led-heading fs-5 w-50"
              style={{
                display: 'inline-block',
                marginLeft: '40%',
              }}
            >
              &nbsp;
              <span
                ref={typedRef}
                className="typed-text typed-fade-out"
              ></span>
            </h1>
          </Col>

          <Projects />
        </Row>
      </CSSTransition>

      <CSSTransition
        in={clicked}
        timeout={500}
        classNames="fade"
        unmountOnExit
      >
        <Row
          className="no-gutters"
          style={{ height: '100vh', width: '100vw', margin: 0 }}
        >
          <Col
            className="d-flex align-items-center justify-content-center"
            style={{
              width: '50%',
              height: '100vh',
              background: '#0c0c0c',
            }}
          >
            <Canvas
            >
              <CameraControls clicked={clicked} />
              <FlyingModel clicked={clicked} onClick={handleModelClick} />
              <ambientLight intensity={1} />
              <directionalLight position={[10, 10, 10]} intensity={1} />
            </Canvas>
          </Col>
          <Col
            className="d-flex align-items-center justify-content-center"
            style={{
              width: '50%',
              height: '100vh',
              background: '#0c0c0c',
            }}
          >
            <h1>Hello World</h1>
          </Col>
        </Row>
      </CSSTransition>
    </Container>
  );
}

export default App;
