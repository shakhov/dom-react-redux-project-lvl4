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

import AuthButton from '../components/AuthButton.jsx';

import useAuth from '../hooks/useAuth.jsx';

function SignUpForm({ state }) {
  const auth = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const usernameRef = useRef();
  const [signupError, setSignupError] = useState(null);
  const { from } = location.state || state || { from: '/' };

  const loginSchema = Yup.object({
    username: Yup
      .string()
      .required('Username is required')
      .min(3, 'Username length must be 3 to 20 characters')
      .max(20, 'Username length must be 3 to 20 characters'),
    password: Yup
      .string()

      .required('Password is required')
      .min(6, 'Password length must be at least 6 characters'),
    confirmPassword: Yup
      .string()
      .required('Password is required')
      .oneOf([Yup.ref('password')], 'Passwords should match'),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: loginSchema,
    onSubmit: async ({ username, password }) => {
      setSignupError({});
      try {
        const { data } = await axios.post(routes.signupPath(), { username, password });
        auth.logIn(data);
        navigate(from);
      } catch (error) {
        if (error.isAxiosError && error.response.status === 409) {
          setSignupError({
            status: 409,
            message: `User "${username}" is already registered`,
          });
          usernameRef.current.select();
          return;
        }
        throw (error);
      }
    },
  });

  const isUsernameValid = !(formik.touched.username && formik.errors.username);
  const isPasswordValid = !(formik.touched.password && formik.errors.password);
  const isConfirmPasswordValid = !(formik.touched.confirmPassword
                                   && formik.errors.confirmPassword);

  const isFormValid = isUsernameValid && isPasswordValid && isConfirmPasswordValid;

  useEffect(() => {
    usernameRef.current.focus();
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
              ref={usernameRef}
              isInvalid={signupError || !isUsernameValid}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
            />
            <Form.Control.Feedback type="invalid">
              {!isUsernameValid && formik.errors.username}
            </Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              {signupError && signupError.message}
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
              autoComplete="new-password"
              required
              isInvalid={!isPasswordValid}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            <Form.Control.Feedback type="invalid">
              {!isPasswordValid && formik.errors.password}
            </Form.Control.Feedback>
          </Form.FloatingLabel>
        </Form.Group>
        <Form.Group>
          <Form.FloatingLabel
            className="mb-4"
            label="Confirm password"
          >
            <Form.Control
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm password"
              autoComplete="new-password"
              required
              isInvalid={!isConfirmPasswordValid}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
            />
            <Form.Control.Feedback type="invalid">
              {!isConfirmPasswordValid && formik.errors.confirmPassword}
            </Form.Control.Feedback>
          </Form.FloatingLabel>
        </Form.Group>
      </Form.Group>
      <Button
        type="submit"
        variant="outline-primary"
        className="w-100 mb-3 p-2"
        disabled={!isFormValid}
      >
        Sign In
      </Button>
    </Form>
  );
}

function SignUpPage({ state }) {
  const auth = useAuth();

  const cardContents = (auth.loggedIn)
        ? <AuthButton /> // eslint-disable-line
        : <SignUpForm state={state} />; // eslint-disable-line

  return (
    <Container fluid className="h-100">
      <Row className="h-100 justify-content-center align-content-center">
        <Col className="col-12 col-md-8 col-xxl-6">
          <Card className="shadow">
            <Card.Header className="text-center p-3">
              <h2>Register</h2>
            </Card.Header>
            <Card.Body className="text-center p-5">
              {cardContents}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default SignUpPage;
