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
  useSelector,
  useDispatch,
} from 'react-redux';

import useAuth from '../hooks/useAuth.jsx';
import fetchData from '../slices/fetchData.js';

import {
  selectLoadingStatus,
  selectLoadingError,
} from '../slices/channelsSlice.js';

import ChannelsNav from '../components/ChannelsNav.jsx';
import ChatWindow from '../components/ChatWindow.jsx';

function LoadingSpinner() {
  return <h1>Loading...</h1>;
}

function Error({ message }) {
  return (
    <>
      <h1>Error</h1>
      <p>{message}</p>
    </>
  );
}

function ChatPage() {
  const auth = useAuth();
  const dispatch = useDispatch();

  const { userId } = auth;
  const currentUsername = userId.username;

  const loadingStatus = useSelector(selectLoadingStatus);
  const loadingError = useSelector(selectLoadingError);

  useEffect(() => {
    const { token } = auth.userId;
    const header = { Authorization: `Bearer ${token}` };
    dispatch(fetchData({ header }));
  }, []);

  if (loadingStatus === 'loading') {
    return <LoadingSpinner />;
  }

  if (loadingStatus === 'error') {
    return <Error message={loadingError} />;
  }

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
