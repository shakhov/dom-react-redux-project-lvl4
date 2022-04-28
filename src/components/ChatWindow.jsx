import React,
{
  useEffect,
  useRef,
} from 'react';

import {
  Container,
  Row,
  Col,
  Spinner,
  Badge,
} from 'react-bootstrap';

import {
  useSelector,
} from 'react-redux';

import { useTranslation } from 'react-i18next';

import cn from 'classnames';

import useFilter from '../hooks/useFilter.jsx';

import {
  selectCurrentChannelId,
  selectChannelById,
} from '../slices/channelsSlice.js';

import {
  selectMessagesByChannelId,
  selectLoadingStatus,
  selectLoadingError,
} from '../slices/messagesSlice.js';

import SendMessageForm from './SendMessagForm.jsx';

function ChatHeader({ currentChannel, channelMessages }) {
  const messageCount = channelMessages?.length || 0;
  const channelName = currentChannel?.name;

  const { t } = useTranslation();

  return (
    <div className="bg-light mb-0 p-3 shadow-sm small">
      <p className="m-0">
        <b>
          #&nbsp;
          {channelName}
        </b>
      </p>
      <span className="text-muted">
        {t('chat.messages', { count: messageCount })}
      </span>
    </div>
  );
}

function Message({ isCurrentUser, message }) {
  const { username, body, timestamp } = message;
  const filter = useFilter();

  const date = new Date(timestamp);

  const rowClassName = cn(
    'w-100', 'flex-row', 'py-2', 'align-items-center', // eslint-disable-line
    {
      'flex-row': !isCurrentUser,
      'flex-row-reverse': isCurrentUser,
    },
  );

  const messageClassName = cn(
    'text-break', 'rounded', 'col-auto', 'p-2', // eslint-disable-line
    {
      'ms-auto': isCurrentUser,
      'alert-success': isCurrentUser,
      'me-auto': !isCurrentUser,
      'alert-warning': !isCurrentUser,
    },
  );

  const badgeClassName = cn(
    'text-dark', 'fs-6', // eslint-disable-line
    {
      'bg-success': isCurrentUser,
      'bg-warning': !isCurrentUser,
    },
  );

  return (
    <Row className={rowClassName}>
      <Col className="col-8 px-1">
        <Row className="w-100 m-0">
          <Col className={messageClassName}>
            <Badge className={badgeClassName}>
              {username[0].toUpperCase()}
            </Badge>
            &nbsp;
            <b>
              {username}
            </b>
            &nbsp;
            <small className="text-muted ms-3">
              {date.toLocaleString('ru')}
            </small>
            <hr className="my-1" />
            {filter.clean(body)}
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

function ChatMessages({ channelMessages, currentUsername }) {
  const messagesRef = useRef();

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [channelMessages]);

  return (
    <Container ref={messagesRef} className="chat-messages d-flex flex-column overflow-auto p-3">
      {channelMessages.map((message) => (
        <Message
          key={`message_${message.id}`}
          isCurrentUser={message.username === currentUsername}
          message={message}
        />
      ))}
    </Container>
  );
}

function LoadingSpinner() {
  const { t } = useTranslation();

  return (
    <div className="w-100 h-100 d-flex justify-content-center align-items-center">
      <Spinner animation="border" role="status" className="me-3">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
      <b>
        {t('notification.messages.loading')}
      </b>
    </div>
  );
}

function Error({ message }) {
  return (
    <>
      <h1>Error</h1>
      <p>{message}</p>
    </>
  );
}

function ChatWindow({
  currentUsername,
}) {
  const currentChannelId = useSelector(selectCurrentChannelId);
  const currentChannel = useSelector(selectChannelById(currentChannelId));
  const channelMessages = useSelector(selectMessagesByChannelId(currentChannelId));

  const loadingStatus = useSelector(selectLoadingStatus);
  const loadingError = useSelector(selectLoadingError);

  if (loadingStatus === 'loading') {
    return <LoadingSpinner />;
  }

  if (loadingStatus === 'error') {
    return <Error message={loadingError} />;
  }

  return (
    <Container className="d-flex flex-column h-100">
      <ChatHeader
        currentChannel={currentChannel}
        channelMessages={channelMessages}
      />
      <ChatMessages
        currentUsername={currentUsername}
        channelMessages={channelMessages}
      />
      <div className="mt-auto">
        <SendMessageForm
          currentUsername={currentUsername}
          currentChannelId={currentChannelId}
        />
      </div>
    </Container>
  );
}

export default ChatWindow;
