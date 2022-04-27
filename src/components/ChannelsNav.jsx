import React, { useState } from 'react';

import {
  Button,
  ButtonGroup,
  Nav,
  Dropdown,
  Spinner,
} from 'react-bootstrap';

import { useTranslation } from 'react-i18next';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  useSelector,
  useDispatch,
} from 'react-redux';

import {
  selectors as channelsSelectors,
  actions as channelsActions,
  selectCurrentChannelId,
  selectLoadingStatus,
  selectLoadingError,
} from '../slices/channelsSlice.js';

import modals from './modals/index.jsx';

function ChannelItem({
  channel, onRename, onDelete,
}) {
  const { id, name, removable } = channel;
  const { t } = useTranslation();

  if (!removable) {
    return (
      <Nav.Item className="w-100">
        <Nav.Link
          as={Button}
          className="text-start"
          eventKey={id}
          variant="primary"
        >
          <span className="me-3">#</span>
          {name}
        </Nav.Link>
      </Nav.Item>
    );
  }

  return (
    <Dropdown as={Nav.Item}>
      <ButtonGroup className="w-100">
        <Nav.Link
          as={Button}
          className="text-start"
          eventKey={id}
          variant="primary"
        >
          <span className="me-3">#</span>
          {name}
        </Nav.Link>
        <Dropdown.Toggle
          as={Button}
          split
          variant="primary"
        >
          <span className="visually-hidden">
            {t('channels.dropdown')}
          </span>
        </Dropdown.Toggle>
      </ButtonGroup>
      <Dropdown.Menu>
        <Dropdown.Item onClick={onRename}>
          ✎&nbsp;
          {t('channels.rename')}
        </Dropdown.Item>
        <Dropdown.Item onClick={onDelete}>
          ✖&nbsp;
          {t('channels.remove')}
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
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
        {t('notification.channels.loading')}
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

function ChannelsNav() {
  const dispatch = useDispatch();

  const currentChannelId = useSelector(selectCurrentChannelId);
  const channels = useSelector(channelsSelectors.selectAll);

  const { t } = useTranslation();

  const [modalState, setModalState] = useState({ modal: null, channel: null });
  const ActiveModal = modalState.modal;

  const loadingStatus = useSelector(selectLoadingStatus);
  const loadingError = useSelector(selectLoadingError);

  const hideModal = () => setModalState({ modal: null, channel: null });

  const handleSelect = (eventKey) => {
    dispatch(channelsActions.setCurrentChannelId(Number(eventKey)));
  };

  if (loadingStatus === 'loading') {
    return <LoadingSpinner />;
  }

  if (loadingStatus === 'error') {
    return <Error message={loadingError} />;
  }

  return (
    <>
      <ToastContainer />
      <div className="d-flex justify-content-between align-content-center mb-2 ps-4 pe-2">
        <span>
          {t('channels.title')}
        </span>
        <Button
          className="sm p-0 btn-group-vertical"
          variant="text-primary"
          onClick={() => setModalState({ modal: modals.addChannel, channel: null })}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
          </svg>
          <span className="visually-hidden">+</span>
        </Button>
      </div>
      <Nav
        className="flex-column"
        variant="pills"
        fill
        activeKey={currentChannelId}
        onSelect={handleSelect}
      >
        {channels.map((channel) => (
          <ChannelItem
            key={`channel_${channel.id}`}
            channel={channel}
            onRename={() => setModalState({ modal: modals.renameChannel, channel })}
            onDelete={() => setModalState({ modal: modals.removeChannel, channel })}
          />
        ))}
      </Nav>
      {ActiveModal && <ActiveModal channel={modalState.channel} onHide={hideModal} />}
    </>
  );
}

export default ChannelsNav;
