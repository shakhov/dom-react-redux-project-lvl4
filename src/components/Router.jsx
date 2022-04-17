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

function AuthButton() {
  const auth = {loggedIn: false};
  const username = 'Username';
  const location = useLocation();

  if (auth.loggedIn) {
    return (
      <Nav>
        <Navbar.Text>
          Logged in as &nbsp;
          <a href="#login">{username}</a>
        </Navbar.Text>
        &nbsp;
        <Button>
          Log Out
        </Button>
      </Nav>
    );
  }
  return <Button as={Link} to="/login" state={{ from: location }}>Log In</Button>;
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
          element={<ChatPage />}
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
