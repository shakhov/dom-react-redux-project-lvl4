import React from 'react';

import { Form, Button } from 'react-bootstrap';
import { Container, Card, Row, Col } from 'react-bootstrap';

function LoginForm() {
  return (
    <Form>
    <Form.Group>
      <Form.Group>
        <Form.FloatingLabel
          className="mb-4"
          label="Username"
        >
          <Form.Control
            id="username"
            name="username"
            placeholder="Username"
            autoComplete="username"
            required
            isInvalid={true}
          />
          <Form.Control.Feedback type="invalid">
            user not found
          </Form.Control.Feedback>
        </Form.FloatingLabel>
      </Form.Group>
      <Form.Group>
        <Form.FloatingLabel
          className="mb-4"
          label="Password"
        >
          <Form.Control
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            autoComplete="password"
            required
            isInvalid={true}
          />
          <Form.Control.Feedback type="invalid">
            wrond password
          </Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">
          {true && 'Wrong username or password'}
        </Form.Control.Feedback>
        </Form.FloatingLabel>

      </Form.Group>
    </Form.Group>
      <Button type="submit" variant="outline-primary" className="w-100 mb-3 p-2">
        Log In
      </Button>
    </Form>
  );
}

function LoginPage() {
  return (
    <Container fuid className="h-100">
      <Row className="h-100 justify-content-center align-content-center">
        <Col className="col-12 col-md-8 col-xxl-6">
          <Card className="">
            <Card.Header className="text-center p-3">
              <h1>Log In</h1>
            </Card.Header>
            <Card.Body className="p-5">
              <LoginForm />
            </Card.Body>
            <Card.Footer className="text-center p-3">
              <span>No account?</span>
              &nbsp;
              <a href="/signup">
                Register
              </a>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginPage;
