import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Container,
  Row,
  Col,
} from 'react-bootstrap';

import cn from 'classnames';

import { useRef } from 'react'
import { Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';

import useAuth from '../hooks/useAuth.jsx';
import fetchData from '../slices/fetchData.js';

import {
  selectors as channelsSelectors,
  selectLoadingStatus,
  selectLoadingError,
  selectCurrentChannelId,
} from '../slices/channelsSlice.js';

import {
  selectors as messagesSelectors,
  actions as messagesActions,
} from '../slices/messagesSlice.js';

import ChannelsNav from '../components/ChannelsNav.jsx';

function ChatHeader({ currentChannel, currentMessages }) {
  const messageCount = currentMessages?.length || 0;
  const channelName = currentChannel?.name;

  return (
    <div className="bg-light mb-0 p-3 shadow-sm small">
      <p className="m-0">
        <b>
          #&nbsp;
          {channelName}
        </b>
      </p>
      <span className="text-muted">
        {messageCount}
        &nbsp;
        messages
      </span>
    </div>
  );
}

function Message({ isCurrentUser, message }) {
  const { username, body } = message;
  const className = cn(
    'mb-3',
    'p-3',
    'alert',
    {
      'alert-success': isCurrentUser,
      'alert-warning': !isCurrentUser,
    });

  return (
    <div className={className}>
      <b>
        {username}
        :&nbsp;
      </b>
      {body}
    </div>
  );
}

function ChatWindow({ currentMessages, currentUsername }) {
  const messagesRef = useRef();

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [currentMessages]);

  return (
    <div ref={messagesRef} className="chat-messages overflow-auto p-3">
      {currentMessages.map((message) => (
        <Message
          key={`message_${message.id}`}
          isCurrentUser={message.username === currentUsername}
          message={message}
        />
      ))}
    </div>
  );
}

function ChatForm({ currentUsername, currentChannelId }) {
  const messageRef = useRef();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: async (values, { setSubmitting, setErrors, resetForm }) => {
      const message = {
        id: Math.random(),
        username: currentUsername,
        channelId: currentChannelId,
        body: values.message,
      };

      setSubmitting(true);
      dispatch(messagesActions.sendMessage(message));
      setSubmitting(false);
      setErrors(null);
      resetForm();
      messageRef.current.focus();
    },
  });

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.focus();
    }
  }, [currentChannelId]);

  return (
    <Form
      autoComplete="off"
      className="py-1 border rounded-2 d-flex"
      onSubmit={formik.handleSubmit}
    >
      <input
        name="message"
        placeholder="Your message..."
        className="border-0 p-0 ps-2 form-control"
        type="text"
        required
        ref={messageRef}
        value={formik.values.message}
        onChange={formik.handleChange}
        disabled={formik.isSubmitting}
      />
      <Button
        type="submit"
        disabled={formik.isSubmitting}
      >
        Send
      </Button>
    </Form>
  );
}

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
  const currentChannelId = useSelector(selectCurrentChannelId);

  const currentChannel = useSelector((state) => (
    channelsSelectors.selectById(state, currentChannelId)
  ));

  const currentMessages = useSelector(messagesSelectors.selectAll)
        .filter(({ channelId }) => channelId === currentChannelId);

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
        <Col className="col-4 col-md-2 bg-light h-100 pt-4 px-2">
          <ChannelsNav />
        </Col>
        <Col className="p-0 h-100">
          <div className="d-flex flex-column h-100">
            <ChatHeader
              currentChannel={currentChannel}
              currentMessages={currentMessages}
            />
            <ChatWindow
              currentUsername={currentUsername}
              currentMessages={currentMessages}
            />
            <div className="mt-auto">
              <ChatForm
                currentUsername={currentUsername}
                currentChannelId={currentChannelId}
              />
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default ChatPage;
