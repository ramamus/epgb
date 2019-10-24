import React from 'react';
import './App.css';
import { Button, Badge, Container, Col, Form, Row } from 'react-bootstrap';
// import PlayersHotloaders from '../src/components/hotloaders/PlayersHotloaders';
import Players from '../src/pages/Players';

function App() {
  return (
    <Container>
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
        crossorigin="anonymous"
      />
      <Row>
        <Col xs={6} md={4}>
          <Form.Control size="lg" type="text" placeholder="Large text" />
        </Col>
        <Col xs={3} md={4}>
          <Button variant="primary">
            Profile <Badge variant="light">9</Badge>
            <span className="sr-only">unread messages</span>
          </Button>
        </Col>
        <Col xs={6} md={4}>
          <Players />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
