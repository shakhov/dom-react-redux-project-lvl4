import React from 'react';
import { useLocation } from 'react-router-dom';
import { Card } from 'react-bootstrap';

function NotFoundPage() {
  const location = useLocation();

  return (
    <Card className="text-center m-5 shadow">
      <Card.Header className="text-muted h1">
        404
      </Card.Header>
      <Card.Body className="text-center h3">
        Page
        {' '}
        <code>{location.pathname}</code>
        {' '}
        not found
      </Card.Body>
      <Card.Footer>
        <a className="h4" href="/">Go back home</a>
      </Card.Footer>
    </Card>
  );
};

export default NotFoundPage;
