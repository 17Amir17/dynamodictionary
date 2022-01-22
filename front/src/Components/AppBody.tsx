import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Random from "./Random";
import Search from "./Search";

export default function AppBody() {
  return (
    <div className="appbody">
      <Container fluid="md">
        <Row>
          <Col><Search /></Col>
        </Row>
        <Row>
          <Col>
          <Random />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
