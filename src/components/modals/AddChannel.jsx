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

function AddChannel({ onHide }) {
  const inputRef = useRef();

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    onSubmit: (values) => {
      console.log(`Add channel ${values.name}`);
      onHide();
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
              required
              ref={inputRef}
              onChange={formik.handleChange}
              value={formik.values.name}
            />
          </FormGroup>
          <Button variant="primary" type="submit">
            Add
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default AddChannel;
