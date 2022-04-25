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

import { useTranslation } from 'react-i18next';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useSelector } from 'react-redux';

import {
  selectors as channelsSelectors,
} from '../../slices/channelsSlice.js';

import useSocket from '../../hooks/useSocket.jsx';

const toastOptions = {
  position: 'bottom-center',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

function AddChannel({ onHide }) {
  const inputRef = useRef();
  const socket = useSocket();

  const { t } = useTranslation();

  const existingNames = useSelector(channelsSelectors.selectAll).map((channel) => channel.name);

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: Yup.object({
      name: Yup
        .string()
        .required(t('forms.channelName.validation.required'))
        .min(3, t('forms.channelName.validation.lengthRange', { min: 3, max: 20 }))
        .max(20, t('forms.channelName.validation.lengthRange', { min: 3, max: 20 }))
        .test(
          'name exists',
          t('forms.channelName.validation.exists'),
          (value) => value && !existingNames.includes(value.trim()),
        ),
    }),
    onSubmit: ({ name }, { setSubmitting }) => {
      const channel = {
        name: name.trim(),
      };

      setSubmitting(true);

      const toastId = toast.loading(t('notification.channel.creating'), toastOptions);
      socket.newChannel(
        channel,
        (/* response */) => {
          setSubmitting(false);
          toast.update(
            toastId,
            {
              ...toastOptions,
              render: t('notification.channel.created'),
              type: 'success',
              isLoading: false,
              closeButton: true,
            },
          );
          onHide();
        },
        (/* error  */) => {
          setSubmitting(false);
          toast.update(
            toastId,
            {
              ...toastOptions,
              render: t('error.network'),
              type: 'error',
              isLoading: false,
              closeButton: true,
            },
          );
        },
      );
    },
  });

  useEffect(() => {
    inputRef.current.value = '';
    inputRef.current.focus();
  }, []);

  const isNameValid = !(formik.touched.name && formik.errors.name);

  return (
    <Modal show centered>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>
          {t('modals.addChannel.title')}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={formik.handleSubmit}>
          <FormGroup className="mb-3">
            <FormControl
              name="name"
              autoComplete="off"
              placeholder={t('forms.channelName.placeholder')}
              required
              ref={inputRef}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              disabled={formik.isSubmitting}
              isInvalid={!isNameValid}
            />
            <FormControl.Feedback type="invalid">
              {!isNameValid && formik.errors.name}
            </FormControl.Feedback>
          </FormGroup>
          <Button
            variant="primary"
            type="submit"
            disabled={formik.isSubmitting || !isNameValid}
          >
            {t('modals.addChannel.button.add')}
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default AddChannel;
