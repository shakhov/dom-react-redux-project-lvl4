import React from 'react';
import { useLocation } from 'react-router-dom';
import { Card } from 'react-bootstrap';

import { useTranslation } from 'react-i18next';

function NotFoundPage() {
  const location = useLocation();
  const { t } = useTranslation();

  return (
    <Card className="text-center m-5 shadow">
      <Card.Header className="text-muted h1">
        404
      </Card.Header>
      <Card.Body className="text-center h3">
        {t('404.message', { page: location.pathname })}
      </Card.Body>
      <Card.Footer>
        <a className="h4" href="/">
          {t('404.goHome')}
        </a>
      </Card.Footer>
    </Card>
  );
}

export default NotFoundPage;
