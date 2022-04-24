import React from 'react';

import {
  Modal,
  FormGroup,
  Button,
} from 'react-bootstrap';

import useSocket from '../../hooks/useSocket.jsx';

function RemoveChannel({ channel, onHide }) {
  const socket = useSocket();

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.removeChannel(
      channel,
      (response) => {
        onHide();
      },
      (error) => {
        console.error(error.message);
      },
    );
  };

  return (
    <Modal centered show>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>
          Remove channel&nbsp;
          {channel.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Button variant="danger" type="submit">
              Remove
            </Button>
          </FormGroup>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default RemoveChannel;
