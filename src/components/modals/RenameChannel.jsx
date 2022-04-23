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

function RenameChannel({ channel, onHide }) {
  const inputRef = useRef();

  const formik = useFormik({
    initialValues: {
      name: channel.name,
    },
    onSubmit: (values) => {
      console.log(`Rename channel ${channel.name} to ${values.name}`);
      onHide();
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
              required
              ref={inputRef}
              onChange={formik.handleChange}
              value={formik.values.name}
            />
          </FormGroup>
          <Button variant="primary" type="submit">
            Rename
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default RenameChannel;
