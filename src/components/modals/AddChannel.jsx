import React,
{
  useEffect,
  useRef,
} from 'react';

import {
  Modal,
  FormGroup,
  FormControl,
  Button,
  Overlay,
} from 'react-bootstrap';

import { useFormik } from 'formik';

import { useSelector } from 'react-redux';

import {
  selectors as channelsSelectors,
} from '../../slices/channelsSlice.js';

import useSocket from '../../hooks/useSocket.jsx';

function AddChannel({ onHide }) {
  const inputRef = useRef();
  const submitRef = useRef();
  const socket = useSocket();

  const existingNames = useSelector(channelsSelectors.selectAll).map((channel) => channel.name);

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    onSubmit: ({ name }, { setSubmitting, setErrors }) => {
      const channel = {
        name: name.trim(),
      };

      setSubmitting(true);

      socket.newChannel(
        channel,
        (response) => {
          setSubmitting(false);
          onHide();
        },
        (error) => {
          setSubmitting(false);
          setErrors({ network: error });
        },
      );
    },
  });

  useEffect(() => {
    inputRef.current.value = '';
    inputRef.current.focus();
  }, []);

  const isInvalidName = existingNames.includes(formik.values.name.trim());
  const networkError = formik.errors.network;

  return (
    <Modal show centered>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>
          Add new channel
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={formik.handleSubmit}>
          <FormGroup className="mb-3">
            <FormControl
              name="name"
              autoComplete="off"
              required
              ref={inputRef}
              onChange={formik.handleChange}
              value={formik.values.name}
              disabled={formik.isSubmitting}
              isInvalid={isInvalidName}
            />
            <FormControl.Feedback type="invalid">
              {`Channel named "${formik.values.name}" exists`}
            </FormControl.Feedback>
          </FormGroup>
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
            variant="primary"
            type="submit"
            disabled={formik.isSubmitting || isInvalidName}
          >
            Add
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default AddChannel;
