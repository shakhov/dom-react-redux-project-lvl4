import React, { useState, useRef, useEffect } from 'react';

import {
  Form,
  Button,
  Container,
  Card,
  Row,
  Col,
} from 'react-bootstrap';

import {
  useLocation,
  useNavigate,
} from 'react-router-dom';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import axios from 'axios';
import routes from '../routes.js';

import useAuth from '../hooks/useAuth.jsx';

function LoginForm({ state }) {
  const inputRef = useRef();
  const [authFailed, setAuthFailed] = useState(false);
  const auth = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { from } = location.state || state || { from: '/' };

  const loginSchema = Yup.object({
    username: Yup.string()
                 .required('Username is required'),
    password: Yup.string()
                 .required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      setAuthFailed(false);
      try {
        const { data } = await axios.post(routes.loginPath(), values);
        localStorage.setItem('userId', JSON.stringify(data));
        auth.logIn();
        navigate(from);
      } catch (error) {
        if (error.isAxiosError && error.response.status === 401) {
          setAuthFailed(true);
          inputRef.current.select();
          return;
        }
        throw (error);
      }
    },
  });

  const isUsernameValid = !(formik.touched.username && formik.errors.username);
  const isPasswordValid = !(formik.touched.password && formik.errors.password);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <Form onSubmit={formik.handleSubmit}>
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
              ref={inputRef}
              isInvalid={authFailed || !isUsernameValid}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
            />
            <Form.Control.Feedback type="invalid">
              {!isUsernameValid && formik.errors.username}
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
              isInvalid={authFailed || !isPasswordValid}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            <Form.Control.Feedback type="invalid">
              {!isPasswordValid && formik.errors.password}
            </Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              {authFailed && 'Wrong username or password'}
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

function LoginPage({ state }) {
  return (
    <Container fluid className="h-100">
      <Row className="h-100 justify-content-center align-content-center">
        <Col className="col-12 col-md-8 col-xxl-6">
          <Card className="">
            <Card.Header className="text-center p-3">
              <h1>Log In</h1>
            </Card.Header>
            <Card.Body className="p-5">
              <LoginForm state={state}/>
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
