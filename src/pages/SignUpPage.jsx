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

import { useTranslation } from 'react-i18next';

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

  const { t } = useTranslation();

  const usernameRef = useRef();
  const [signupError, setSignupError] = useState(null);
  const { from } = location.state || state || { from: '/' };

  const loginSchema = Yup.object({
    username: Yup
      .string()
      .required(t('forms.username.validation.required'))
      .min(3, t('forms.username.validation.lengthRange', { min: 3, max: 20 }))
      .max(20, t('forms.username.validation.lengthRange', { min: 3, max: 20 })),
    password: Yup
      .string()
      .required(t('forms.password.validation.required'))
      .min(6, t('forms.password.validation.lengthMin', { min: 6 })),
    confirmPassword: Yup
      .string()
      .required(t('forms.confirmPassword.validation.required'))
      .oneOf([Yup.ref('password')], t('forms.confirmPassword.validation.match')),
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
            message: t('error.userExists', { username: username }),
          });
          usernameRef.current.select();
          return;
        }
        // TODO network error
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
            label={t('forms.username.label')}
          >
            <Form.Control
              id="username"
              name="username"
              placeholder={t('frorms.username.placeholder')}
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
            label={t('forms.password.label')}
          >
            <Form.Control
              type="password"
              id="password"
              name="password"
              placeholder={t('forms.password.placeholder')}
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
            label={t('forms.confirmPassword.label')}
          >
            <Form.Control
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder={t('forms.confirmPassword.placeholder')}
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
        {t('signup.button.signup')}
      </Button>
    </Form>
  );
}

function SignUpPage({ state }) {
  const auth = useAuth();
  const { t } = useTranslation();

  const cardContents = (auth.loggedIn)
        ? <AuthButton /> // eslint-disable-line
        : <SignUpForm state={state} />; // eslint-disable-line

  return (
    <Container fluid className="h-100">
      <Row className="h-100 justify-content-center align-content-center">
        <Col className="col-12 col-md-8 col-xxl-6">
          <Card className="shadow">
            <Card.Header className="text-center p-3">
              <h2>
                {t('signup.title')}
              </h2>
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
