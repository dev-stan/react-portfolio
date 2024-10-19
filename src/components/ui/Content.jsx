// components/ui/Content.js
import { Row, Col } from 'react-bootstrap';
import { Canvas } from '@react-three/fiber';
import CameraControls from '../three/CameraControls';
import FlyingModel from '../models/FlyingModel';

const Content = ({ setClicked }) => {
  return (
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
          camera={{ position: [0, 2, 4] }}
          style={{ height: '100vh', width: '100%' }}
          dpr={[1, 1.5]}
        >
          <CameraControls clicked={true} />
          <FlyingModel clicked={true} onClick={() => setClicked(false)} />
          <ambientLight intensity={1} />
          <directionalLight position={[10, 10, 10]} intensity={1} />
        </Canvas>
      </Col>
      <Col
        className="d-flex align-items-center justify-content-center"
        style={{
          width: '50%',
          height: '100vh',
          background: '#FFF',
        }}
      >
        <h1>Hello World</h1>
      </Col>
    </Row>
  );
};

export default Content;