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

function LoginForm({ state }) {
  const auth = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const { t } = useTranslation();

  const usernameRef = useRef();
  const [authFailed, setAuthFailed] = useState(false);
  const { from } = location.state || state || { from: '/' };

  const loginSchema = Yup.object({
    username: Yup
      .string()
      .required(t('forms.username.validation.required')),
    password: Yup
      .string()
      .required(t('forms.password.validation.required')),
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
        auth.logIn(data);
        navigate(from);
      } catch (error) {
        if (error.isAxiosError && error.response.status === 401) {
          setAuthFailed(true);
          usernameRef.current.select();
          return;
        }
        throw (error);
      }
    },
  });

  const isUsernameValid = !(formik.touched.username && formik.errors.username);
  const isPasswordValid = !(formik.touched.password && formik.errors.password);
  const isFormValid = isUsernameValid && isPasswordValid;

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
              placeholder={t('forms.username.placeholder')}
              autoComplete="username"
              required
              ref={usernameRef}
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
            label={t('forms.password.label')}
          >
            <Form.Control
              type="password"
              id="password"
              name="password"
              placeholder={t('forms.password.placeholder')}
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
              {authFailed && t('error.authFailed')}
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
        {t('login.button.login')}
      </Button>
    </Form>
  );
}

function LoginPage({ state }) {
  const auth = useAuth();
  const { t } = useTranslation();

  const cardContents = (auth.loggedIn)
        ? <AuthButton /> // eslint-disable-line
        : <LoginForm state={state} />; // eslint-disable-line

  return (
    <Container fluid className="h-100">
      <Row className="h-100 justify-content-center align-content-center">
        <Col className="col-12 col-md-8 col-xxl-6">
          <Card className="shadow">
            <Card.Header className="text-center p-3">
              <h2>
                {t('login.title')}
              </h2>
            </Card.Header>
            <Card.Body className="text-center p-5">
              {cardContents}
            </Card.Body>
            <Card.Footer className="text-center p-3">
              <span>
                {t('login.noAccount')}
              </span>
              &nbsp;
              <a href="/signup">
                {t('login.signup')}
              </a>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginPage;
