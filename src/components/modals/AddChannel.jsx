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

function AddChannel({ onHide }) {
  const inputRef = useRef();
  const socket = useSocket();

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    onSubmit: (values, { setSubmitting, setErrors }) => {
      const channel = {
        name: values.name,
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

  return (
    <Modal show centered>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>
          Add new channel
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
            Add
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default AddChannel;
