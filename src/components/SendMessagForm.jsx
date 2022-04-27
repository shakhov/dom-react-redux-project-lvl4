import React,
{
  useEffect,
  useRef,
} from 'react';

import {
  Form,
  FormControl,
  Button,
  Overlay,
} from 'react-bootstrap';

import { useTranslation } from 'react-i18next';

import { useFormik } from 'formik';

import useSocket from '../hooks/useSocket.jsx';

function SendMessageForm({ currentUsername, currentChannelId }) {
  const messageRef = useRef();
  const socket = useSocket();

  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: (values, { setSubmitting, setErrors, resetForm }) => {
      const message = {
        username: currentUsername,
        channelId: currentChannelId,
        body: values.message,
      };

      setSubmitting(true);

      socket.newMessage(
        message,
        () => {
          setSubmitting(false);
          resetForm();
          messageRef.current.focus();
        },
        (error) => {
          setSubmitting(false);
          setErrors({ network: error });
          messageRef.current.focus();
        },
      );
    },
  });

  useEffect(() => {
    if (messageRef.current) {
      formik.resetForm();
      messageRef.current.focus();
    }
  }, []);

  const networkError = formik.errors.network;

  return (
    <Form
      autoComplete="off"
      className="py-1 border rounded-2 d-flex"
      onSubmit={formik.handleSubmit}
    >
      <Overlay
        target={messageRef.current}
        show={networkError ? true : false} // eslint-disable-line
        placement="top"
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
              ...props.style,
            }}
          >
            {networkError && t('error.network')}
          </div>
        )}
      </Overlay>
      <FormControl
        id="message"
        name="message"
        label={t('chat.form.message.label')}
        aria-label={t('chat.form.message.label')}
        placeholder={t('chat.form.message.placeholder')}
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
        {t('chat.form.button.send')}
      </Button>
    </Form>
  );
}

export default SendMessageForm;
