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
} from 'react-bootstrap';

import { useFormik } from 'formik';

import useSocket from '../../hooks/useSocket.jsx';

function RenameChannel({ channel, onHide }) {
  const inputRef = useRef();
  const socket = useSocket();

  const formik = useFormik({
    initialValues: {
      name: channel.name,
    },
    onSubmit: (values, { setSubmitting, setErrors }) => {
      const data = {
        ...channel,
        name: values.name,
      };

      setSubmitting(true);

      socket.renameChannel(
        data,
        (response) => {
          setSubmitting(false);
          onHide();
        },
        (error) => {
          setSubmitting(false);
          console.error(error.message);
        },
      );
    },
  });

  useEffect(() => {
    inputRef.current.select();
  }, []);

  return (
    <Modal centered show>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>
          Rename channel&nbsp;
          {channel.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={formik.handleSubmit}>
          <FormGroup>
            <FormControl
              className="mb-3"
              name="name"
              autoComplete="off"
              required
              ref={inputRef}
              onChange={formik.handleChange}
              value={formik.values.name}
              disabled={formik.isSubmitting}
            />
          </FormGroup>
          <Button
            variant="primary"
            type="submit"
            disabled={formik.isSubmitting}
          >
            Rename
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default RenameChannel;
