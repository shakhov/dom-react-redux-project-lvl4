import React from 'react';

import {
  Navbar,
  Container,
} from 'react-bootstrap';

import {
  Link,
} from 'react-router-dom';

import AuthButton from './AuthButton.jsx';

function Header() {
  return (
    <Navbar className="shadow-sm navba-expand-lg navbar-light bg-white p-3">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fs-2">
          Chat
        </Navbar.Brand>
        <AuthButton />
      </Container>
    </Navbar>
  );
}

export default Header;
