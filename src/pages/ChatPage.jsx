import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Container,
  Row,
  Col,
} from 'react-bootstrap';

import useAuth from '../hooks/useAuth.jsx';
import fetchData from '../slices/fetchData.js';

import { selectors as channelsSelectors } from '../slices/channelsSlice.js';
import { selectors as messagesSelectors } from '../slices/messagesSlice.js';

function ChatPage() {
  const auth = useAuth();
  const dispatch = useDispatch();
  const channels = useSelector(channelsSelectors.selectAll);
  const messages = useSelector(messagesSelectors.selectAll);

  useEffect(() => {
    const { token } = auth.userId;
    const header = { Authorization: `Bearer ${token}` };
    dispatch(fetchData({ header }));
  }, []);

  return (
    <Container className="fluid h-100">
      <Row className="h-100">
        <Col className="col-2 bg-danger">
          <h4>Channels:</h4>
          <ul>
            {channels.map(({ id, name }) => <li key={id}>#{name}</li>)}
          </ul>
        </Col>
        <Col className="bg-warning">
          <h4>Messages:</h4>
          <ul>
            {messages.map(({ id, message, username }) => <li key={id}><b>{username}:</b>{' '}{message}</li>)}
          </ul>
        </Col>
      </Row>
    </Container>
  );
}

export default ChatPage;
