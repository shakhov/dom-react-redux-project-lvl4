import React from 'react';

import {
  Link,
  useLocation,
} from 'react-router-dom';

import {
  Button,
} from 'react-bootstrap';

import { useTranslation } from 'react-i18next';

import useAuth from '../hooks/useAuth.jsx';

function AuthButton() {
  const auth = useAuth();
  const location = useLocation();
  const { t } = useTranslation();

  if (auth.loggedIn) {
    const { username } = auth.userId;

    return (
      <div>
        <span>
          {t('auth.loggedAs')}
          <a href="#login">{username}</a>
        </span>
        <Button className="m-3" onClick={auth.logOut}>
          {t('auth.logout')}
        </Button>
      </div>
    );
  }
  return (
    <Button as={Link} to="/login" state={{ from: location }}>
      {t('auth.login')}
    </Button>
  );
}

export default AuthButton;
