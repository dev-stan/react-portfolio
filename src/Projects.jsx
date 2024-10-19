import { Row, Col } from 'react-bootstrap';
import ProjectCard from './ProjectCard';
function Projects() {
  return (
    <Row style={{ backgroundColor: "#CCC9DC", height: '100vh', width: '100vw', margin: 0 }}>
        <Col className="ms-5">
            < ProjectCard />
        </Col>
    </Row>
  );
}

export default Projects;