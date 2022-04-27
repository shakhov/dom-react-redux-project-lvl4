import React,
{
  useEffect,
} from 'react';

import {
  Container,
  Row,
  Col,
} from 'react-bootstrap';

import {
  useDispatch,
} from 'react-redux';

import useAuth from '../hooks/useAuth.jsx';
import fetchData from '../slices/fetchData.js';

import ChannelsNav from '../components/ChannelsNav.jsx';
import ChatWindow from '../components/ChatWindow.jsx';

function ChatPage() {
  const auth = useAuth();
  const dispatch = useDispatch();

  const { userId } = auth;
  const currentUsername = userId.username;

  useEffect(() => {
    const { token } = auth.userId;
    const header = { Authorization: `Bearer ${token}` };
    dispatch(fetchData({ header }));
  }, []);

  return (
    <Container className="h-100 overflow-hidden rounded my-4 shadow">
      <Row className="h-100 ng-white flex-md-row">
        <Col className="col-4 col-md-3 bg-light h-100 pt-4 px-2">
          <ChannelsNav />
        </Col>
        <Col className="p-0 h-100">
          <ChatWindow
            currentUsername={currentUsername}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default ChatPage;
