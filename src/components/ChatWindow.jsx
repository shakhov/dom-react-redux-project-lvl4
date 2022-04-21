import React,
{
  useEffect,
  useRef,
} from 'react';

import {
  Container,
  Row,
  Col,
} from 'react-bootstrap';

import {
  useSelector,
} from 'react-redux';

import cn from 'classnames';

import {
  selectCurrentChannelId,
  selectChannelById,
} from '../slices/channelsSlice.js';

import {
  selectMessagesByChannelId,
} from '../slices/messagesSlice.js';

import SendMessageForm from './SendMessagForm.jsx';

function ChatHeader({ currentChannel, channelMessages }) {
  const messageCount = channelMessages?.length || 0;
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

  const rowClassName = cn(
    'w-100', 'd-flex', 'flex-row', // eslint-disable-line
    {
      'justify-content-start': !isCurrentUser,
      'justify-content-end': isCurrentUser,
    },
  );

  const messageClassName = cn(
    'text-break', 'mb-2','p-2', 'alert', // eslint-disable-line
    {
      'alert-success': isCurrentUser,
      'alert-warning': !isCurrentUser,
    },
  );

  return (
    <Row className={rowClassName}>
      <Col className="col-md-10">
        <div className={messageClassName}>
          <b>
            {username}
            :&nbsp;
          </b>
          {body}
        </div>
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

function ChatWindow({
  currentChannelId = useSelector(selectCurrentChannelId),
  currentUsername,
}) {
  const currentChannel = useSelector(selectChannelById(currentChannelId));
  const channelMessages = useSelector(selectMessagesByChannelId(currentChannelId));

  return (
    <div className="d-flex flex-column h-100">
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
    </div>
  );
}

export default ChatWindow;
