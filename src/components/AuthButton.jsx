import React from 'react';

import {
  Link,
  useLocation,
} from 'react-router-dom';

import {
  Button,
} from 'react-bootstrap';

import useAuth from '../hooks/useAuth.jsx';

function AuthButton() {
  const auth = useAuth();
  const location = useLocation();

  if (auth.loggedIn) {
    const { username } = JSON.parse(localStorage.getItem('userId'));

    return (
      <div>
        <span>
          Logged in as
          {' '}
          <a href="#login">{username}</a>
        </span>
        <Button className="m-3" onClick={auth.logOut}>
          Log Out
        </Button>
      </div>
    );
  }
  return <Button as={Link} to="/login" state={{ from: location }}>Log In</Button>;
}

export default AuthButton;
