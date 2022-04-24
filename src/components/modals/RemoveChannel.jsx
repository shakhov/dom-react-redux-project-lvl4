import React, { useRef, useState } from 'react';

import {
  Modal,
  FormGroup,
  Button,
  Overlay,
} from 'react-bootstrap';

import useSocket from '../../hooks/useSocket.jsx';

function RemoveChannel({ channel, onHide }) {
  const socket = useSocket();
  const submitRef = useRef();
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.removeChannel(
      channel,
      (response) => {
        onHide();
      },
      (error) => {
        setErrors({ network: error });
      },
    );
  };

  const networkError = errors.network;

  return (
    <Modal centered show>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>
          Remove channel&nbsp;
          &quot;
          {channel.name}
          &quot;
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Overlay
              target={submitRef.current}
              show={networkError ? true : false} // eslint-disable-line
              placement="right"
              offset={[0, 10]}
            >
              {({
                placement, arrowProps, show: _show, popper, ...props
              }) => (
                <div
                  {...props} // eslint-disable-line
                  style={{
                    position: 'absolute',
                    backgroundColor: 'rgba(255, 50, 50, 0.85)',
                    padding: '5px 10px',
                    color: 'white',
                    borderRadius: 4,
                    zIndex: 1080,
                    ...props.style,
                  }}
                >
                  {networkError && networkError.message}
                </div>
              )}
            </Overlay>
            <Button
              ref={submitRef}
              variant="danger"
              type="submit"
            >
              Remove
            </Button>
          </FormGroup>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default RemoveChannel;
