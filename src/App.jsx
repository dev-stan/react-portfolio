/* eslint-disable react/no-unknown-property */


import { useRef } from 'react';

// Style imports
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';

// ThreeJs imports
import { Canvas} from '@react-three/fiber';

// ThreeJs model imports
import FlyingOldComputer from './components/models/FlyingOldComputer';
import FlyingModel from './components/models/FlyingModel';
import FlyingBackpack from './components/models/FlyingBackpack';
import RamenBowl from './components/models/RamenBowl';

// UI imports
import Navigation from './components/ui/Navigation';
import Projects from './components/ui/Projects';

// Hook imports
import useTyped from './components/hooks/UseTyped';


function App() {

  const projectsRef = useRef(null);
  return (
    <Container fluid style={{ padding: 0, height: '100vh', overflowY: 'scroll', overflowX: 'hidden', position: 'relative' }}>

      <Navigation />

      <Row className="no-gutters" style={{ background: '#0c0c0c', color: '#CCC9DC', margin: 0, minHeight: '100vh', width: '100vw', overflowX: 'hidden', position: 'relative' }}>
        <Canvas camera={{ position: [0, 2, 4] }} style={{ height: '100vh', width: '100vw' }} dpr={[1, 1.5]}>
          <RamenBowl />
          <FlyingModel />
          <FlyingBackpack />
          <FlyingOldComputer />
          <ambientLight intensity={1} />
          <directionalLight position={[10, 10, 10]} intensity={1} />
        </Canvas>

        <Col className="d-flex align-items-center" style={{ height: '100vh', textAlign: 'left', position: 'absolute', left: 0, top: 0, width: '50%' }}>
          <h1 className="typing-header led-heading fs-2 w-50 ps-5 pb-3" style={{ display: 'inline-block' }}>
              Enjoy the ramen...
              <br/><br/>
              Welcome to my portfolio.
          </h1>
        </Col>

        <Col className="d-flex align-items-center" style={{ height: '100vh', textAlign: 'left', position: 'absolute', right: 0, top: 0, width: '50%' }}>
          <h1 className="typing-header led-heading fs-5 w-50" style={{ display: 'inline-block', marginLeft: '40%' }}>
            &nbsp;
            <span ref={useTyped()} className="typed-text typed-fade-out"></span>
          </h1>
        </Col>

      </Row>

      <Row ref={projectsRef} style={{ height: 'auto', width: '100vw', overflowX: 'hidden' }}>
        <Projects />
      </Row>
    </Container>
  );
}

export default App;
