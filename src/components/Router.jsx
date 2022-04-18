import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Link,
  useLocation,
} from 'react-router-dom';

import {
  Navbar,
  Container,
} from 'react-bootstrap';

import AuthButton from './AuthButton.jsx';

import ChatPage from '../pages/ChatPage.jsx';
import LoginPage from '../pages/LoginPage.jsx';
import NotFoundPage from '../pages/NotFoundPage.jsx';

import useAuth from '../hooks/useAuth.jsx';

function PrivateRoute({ children }) {
  const auth = useAuth();
  const location = useLocation();

  return (
    auth.loggedIn ? children : <Navigate to="/login" state={{ from: location }} />
  );
}

function Router() {
  return (
    <BrowserRouter>
      <Navbar className="shadow-sm navba-expand-lg navbar-light bg-white p-3">
        <Container>
          <Navbar.Brand as={Link} to="/" className="fs-2">
            Chat
          </Navbar.Brand>
          <AuthButton />
        </Container>
      </Navbar>
      <Routes>
        <Route
          path="/"
          element={(
            <PrivateRoute>
              <ChatPage />
            </PrivateRoute>
          )}
        />
        <Route
          path="/login"
          element={<LoginPage state={{ from: location }} />}
        />
        <Route
          path="*"
          element={<NotFoundPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
