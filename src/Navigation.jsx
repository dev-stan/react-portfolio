import { Navbar, Container } from 'react-bootstrap';

function Navigation() {
  return (
    <Navbar variant="dark" expand="lg" style={{ backgroundColor: "#000000"}}>
      <Container className="d-flex justify-content-center my-2">
        <Navbar.Brand href="#home" className="led-heading">
          Stanislaw Zalewski
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default Navigation;
