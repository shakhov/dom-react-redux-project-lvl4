import React from 'react';

import {
  Navbar,
  Container,
} from 'react-bootstrap';

import {
  Link,
} from 'react-router-dom';

import { useTranslation } from 'react-i18next';

import AuthButton from './AuthButton.jsx';

import ChatLogo from '../../assets/chat_logo.svg';

function Header() {
  const { t } = useTranslation();

  return (
    <Navbar className="shadow-sm navba-expand-lg navbar-light bg-white p-3">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fs-2">
          <img
            src={ChatLogo}
            alt="Chat logo"
            width={32}
            height={32}
            className="me-3"
          />
          {t('header.title')}
        </Navbar.Brand>
        <AuthButton />
      </Container>
    </Navbar>
  );
}

export default Header;
