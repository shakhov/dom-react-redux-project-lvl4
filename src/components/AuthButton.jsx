import React from 'react';

import {
  Link,
  useLocation,
} from 'react-router-dom';

import {
  Button,
  Navbar,
  Nav,
} from 'react-bootstrap';

import useAuth from '../hooks/useAuth.jsx';

function AuthButton() {
  const auth = useAuth();
  const location = useLocation();

  if (auth.loggedIn) {
    const { username } = JSON.parse(localStorage.getItem('userId'));

    return (
      <Nav>
        <Navbar.Text>
          Logged in as
          {' '}
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

export default AuthButton;
