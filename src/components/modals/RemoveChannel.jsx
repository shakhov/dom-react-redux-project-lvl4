import React from 'react';

import {
  Modal,
  FormGroup,
  Button,
} from 'react-bootstrap';

function RemoveChannel({ channel, onHide }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Remove channel ${channel.name}`);
    onHide();
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
