import React from 'react';
import { Container , Row,Col, Button } from 'react-bootstrap';

function Home() {
  return (
    <div className="text-center">
      <Container expand="lg" className='App'>
        <Row className='align-items-center'>
            <Col>
            
        <h1>Welcome to Simple React Website</h1>
        <p>
          This is a simple homepage created using React and React-Bootstrap.
        </p>
        <p>
          <Button variant="primary" href="/about">Learn more about us</Button>
        </p>
        </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
