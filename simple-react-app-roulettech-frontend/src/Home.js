import React from 'react';
import { Container , Row,Col, Button } from 'react-bootstrap';

function Home() {
  return (
    <div className="text-center">
      <Container expand="lg" className='App'>
        <Row className='align-items-center'>
            <Col>
            
        <h1>Welcome to Simple React Webapp</h1>
        <p>
          This is a simple homepage with login and signup components created using React, React-Bootstrap for Front-End, and Django with python for backend.
        </p>
        <p>
          <Button variant="primary" href="/signup">Signup</Button>
        </p>
        </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
