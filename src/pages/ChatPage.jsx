import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Container,
  Row,
  Col,
  Button,
  Nav,
} from 'react-bootstrap';

import useAuth from '../hooks/useAuth.jsx';
import fetchData from '../slices/fetchData.js';

import {
  selectors as channelsSelectors,
  selectLoadingStatus,
  selectLoadingError,
  selectCurrentChannelId,
  setCurrentChannelId,
} from '../slices/channelsSlice.js';

import { selectors as messagesSelectors } from '../slices/messagesSlice.js';

function ChatPage() {
  const auth = useAuth();
  const dispatch = useDispatch();
  const channels = useSelector(channelsSelectors.selectAll);

  const currentChannelId = useSelector(selectCurrentChannelId);
  const loadingStatus = useSelector(selectLoadingStatus);
  const loadingError = useSelector(selectLoadingError);

  const currentChannel = useSelector((state) => (
    channelsSelectors.selectById(state, currentChannelId)
  ));

  const currentMessages =useSelector(messagesSelectors.selectAll)
        .filter(({ channelId }) => channelId === currentChannelId);

  useEffect(() => {
    const { token } = auth.userId;
    const header = { Authorization: `Bearer ${token}` };
    dispatch(fetchData({ header }));
  }, []);

  if (loadingStatus === 'loading') {
    return <h1>Loading</h1>;
  }

  if (loadingStatus === 'error') {
    return (
      <>
        <h1>Error</h1>
        <p>{loadingError}</p>
      </>
    );
  }

  return (
    <Container className="h-100 overflow-hidden rounded my-4 shadow">
      <Row className="h-100 ng-white flex-md-row">
        <Col className="col-4 col-md-2 bg-light h-100 pt-4 px-0">
          <div className="d-flex justify-content-between align-content-center mb-2 ps-4 pe-2">
            <span>Channels</span>
            <Button className="p-0 btn-group-vertical p-1" variant="outline-dark">+</Button>
          </div>
          <Nav className="flex-column nav-pills nav-fill">
            {channels.map(({ id, name }) => (
              <Nav.Item key={`channel_${id}`} className="w-100">
                <Button
                  className="w-100 rounded-0 text-start"
                  variant={id === currentChannelId ? 'primary' : 'light'}
                  onClick={() => dispatch(setCurrentChannelId({ id }))}
                >
                  <span className="me-3">#</span>
                  {name}
                </Button>
              </Nav.Item>
            ))}
          </Nav>
        </Col>
        <Col className="p-0 h-100">
          <div className="d-flex flex-column h-100">
            <div className="bg-light mb-4 p-3 shadow-sm small">
              <p className="m-0">
                <b>
                  #&nbsp;
                  {currentChannel && currentChannel.name}
                </b>
              </p>
              <span className="text-muted">{currentMessages && currentMessages.count || 0} messages</span>
            </div>
            <div id="messages-box" className="chat-messages overflow-auto">
              Messages Here
            </div>
            <div className="mt-auto">
              <form className="py-1 border rounded-2 d-flex">
                <input className="border-0 p-0 ps-2 form-control" type="text" />
                <Button>&gt;</Button>
              </form>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default ChatPage;
