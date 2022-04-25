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

function RenameChannel({ channel, onHide }) {
  const inputRef = useRef();
  const socket = useSocket();

  const { t } = useTranslation();

  const existingNames = useSelector(channelsSelectors.selectAll)
        .map((item) => item.name)
        .filter((name) => name !== channel.name);

  const formik = useFormik({
    initialValues: {
      name: channel.name,
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
      const data = {
        ...channel,
        name: name.trim(),
      };

      setSubmitting(true);
      const toastId = toast.loading(t('notification.channel.renaming'), toastOptions);

      socket.renameChannel(
        data,
        (/* response */) => {
          setSubmitting(false);
          toast.update(
            toastId,
            {
              ...toastOptions,
              render: t('notification.channel.renamed'),
              type: 'success',
              isLoading: false,
              closeButton: true,
            },
          );
          onHide();
        },
        (/* error */) => {
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
    inputRef.current.select();
  }, []);

  const isNameValid = !(formik.touched.name && formik.errors.name);
  const networkError = formik.errors.network;

  return (
    <Modal centered show>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>
          {t('modals.renameChannel.title', { name: channel.name })}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={formik.handleSubmit}>
          <FormGroup className="mb-3">
            <FormControl
              name="name"
              placeholder={t('forms.channelName.placeholder')}
              autoComplete="off"
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
            {t('modals.renameChannel.button.rename')}
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default RenameChannel;
