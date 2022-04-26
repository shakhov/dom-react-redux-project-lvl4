import React from 'react';

import {
  Modal,
  FormGroup,
  Button,
} from 'react-bootstrap';

import { useTranslation } from 'react-i18next';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import useSocket from '../../hooks/useSocket.jsx';

const toastOptions = {
  position: 'bottom-center',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

function RemoveChannel({ channel, onHide }) {
  const socket = useSocket();
  const { t } = useTranslation();

  const handleSubmit = (e) => {
    e.preventDefault();

    const toastId = toast.loading(t('notification.channel.removing'), toastOptions);

    socket.removeChannel(
      channel,
      (/* response */) => {
        toast.update(
          toastId,
          {
            ...toastOptions,
            render: t('notification.channel.removed'),
            type: 'success',
            isLoading: false,
            closeButton: true,
          },
        );
        onHide();
      },
      (/* error */) => {
        toast.update(
          toastId,
          {
            ...toastOptions,
            render: t('error.network'),
            type: 'error',
            isLoading: false,
            closeButton: true,
          },
        );
      },
    );
  };

  return (
    <Modal centered show>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>
          {t('modals.removeChannel.title', { name: channel.name })}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Button
              variant="danger"
              type="submit"
            >
              {t('modals.removeChannel.button.remove')}
            </Button>
          </FormGroup>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default RemoveChannel;
