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
  Button,
  Navbar,
  Nav,
  Container,
} from 'react-bootstrap';

import ChatPage from '../pages/ChatPage.jsx';
import LoginPage from '../pages/LoginPage.jsx';
import NotFoundPage from '../pages/NotFoundPage.jsx';

import useAuth from '../hooks/useAuth.jsx';

function AuthButton() {
  const auth = useAuth();
  const location = useLocation();

  if (auth.loggedIn) {
    {/* TODO: store username in AuthContext */}
    const { username } = JSON.parse(localStorage.getItem('userId'));

    return (
      <Nav>
        <Navbar.Text>
          Logged in as
          &nbsp;
          <a href="#login">{username}</a>
        </Navbar.Text>
        &nbsp;
        <Button onClick={auth.logOut}>
          Log Out
        </Button>
      </Nav>
    );
  }
  return <Button as={Link} to="/login" state={{ from: location }}>Log In</Button>;
}

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
          element={
            <PrivateRoute>
              <ChatPage />
            </PrivateRoute>}
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
