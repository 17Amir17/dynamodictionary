import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";

export default function MyNav() {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">Dictionary</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#search">Search</Nav.Link>
          <Nav.Link href="#random">Random</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
