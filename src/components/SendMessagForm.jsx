import React,
{
  useEffect,
  useRef,
} from 'react';

import {
  Form,
  Button,
} from 'react-bootstrap';

import {
  useDispatch,
} from 'react-redux';

import { useFormik } from 'formik';

import useSocket from '../hooks/useSocket.jsx';

import {
  actions as messagesActions,
} from '../slices/messagesSlice.js';

function SendMessageForm({ currentUsername, currentChannelId }) {
  const messageRef = useRef();
  const socket = useSocket();

  const formik = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: async (values, { setSubmitting, setErrors, resetForm }) => {
      const message = {
        id: Math.random(),
        username: currentUsername,
        channelId: currentChannelId,
        body: values.message,
      };

      setSubmitting(true);
      socket.addMessage(message);
      setSubmitting(false);
      setErrors(null);
      resetForm();
      messageRef.current.focus();
    },
  });

  useEffect(() => {
    if (messageRef.current) {
      formik.resetForm();
      messageRef.current.focus();
    }
  }, [currentChannelId]);

  return (
    <Form
      autoComplete="off"
      className="py-1 border rounded-2 d-flex"
      onSubmit={formik.handleSubmit}
    >
      <input
        name="message"
        placeholder="Your message..."
        className="border-0 p-0 ps-2 form-control"
        type="text"
        required
        ref={messageRef}
        value={formik.values.message}
        onChange={formik.handleChange}
        disabled={formik.isSubmitting}
      />
      <Button
        type="submit"
        disabled={formik.isSubmitting}
      >
        Send
      </Button>
    </Form>
  );
}

export default SendMessageForm;
