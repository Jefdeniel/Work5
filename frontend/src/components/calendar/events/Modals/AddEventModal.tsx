import moment from 'moment';
import { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Field, Form } from 'react-final-form';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import useAuth from '../../../../hooks/useAuth';
import useFetch from '../../../../hooks/useFetch';
import Validators from '../../../../utils/Validators';

import Button from '../../../ui/Button/Button';
import Input from '../../../ui/Input/Input';
import LoadingScreen from '../../../ui/Loading/LoadingScreen';
import Modal from '../../../ui/Modals/Modal';
import EndEventTimeSelector from '../Selectors/EndEventTimeSelector';
import EventPrioritySelector from '../Selectors/EventPrioritySelector';
import StartEventTimeSelector from '../Selectors/StartEventTimeSelector';

import './EventModal.scss';
import Spinner from '../../../ui/Loading/Spinner';

const AddEventModal = ({ onClose, start, end }) => {
  const { t } = useTranslation(['events']);
  const { user_id } = useAuth();
  const params = useParams();
  const calendarId = params.id;

  const [startTime, setStartTime] = useState(new Date(start));
  const [endTime, setEndTime] = useState(new Date(end));

  const { fetchData: addEvent, loading: isLoading } = useFetch('POST', [
    'events',
  ]);

  const handleAddEvent = async (values) => {
    try {
      const newEvent = {
        ...values,
        start_time: moment(startTime).format('YYYY-MM-DD HH:mm:ssZ'),
        end_time: moment(endTime).format('YYYY-MM-DD HH:mm:ssZ'),
        owner: user_id,
        calendar: calendarId,
        status: 'pending',
        category: '1',
        priority: values.priority,
        location: 'none',
        is_recurring: false,
      };

      const response = await addEvent({}, newEvent);

      if (response.ok) {
        toast.success(t('events:toasts.added'));
        onClose && onClose();
      } else {
        toast.error(t('events:toasts.error'));
        throw new Error('Failed to save event: ' + response.statusText);
      }
    } catch (error) {
      toast.error(t('events:toasts.addError') + ': ' + error.message);
      console.error('Error adding event:', error);
    }
  };

  const onHandleStartTime = (start) => {
    setStartTime(new Date(start));
  };

  const onHandleEndTime = (end) => {
    setEndTime(new Date(end));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Modal
      show={true}
      onClose={onClose}
      title={t('events:modals.add.title')}
      size="sm"
    >
      <Form
        onSubmit={handleAddEvent}
        render={({ handleSubmit }) => (
          <form className={`event-form`} onSubmit={handleSubmit}>
            <Field name="title" validate={Validators.required()}>
              {({ input, meta }) => (
                <Input
                  {...input}
                  meta={meta}
                  title={t('events:eventInfo.title')}
                  isBig
                />
              )}
            </Field>

            <Row>
              <Col sm={12}>
                <Field name="start_time">
                  {({ input, meta }) => (
                    <StartEventTimeSelector
                      {...input}
                      meta={meta}
                      value={startTime}
                      onChange={(date) => onHandleStartTime(new Date(date))}
                    />
                  )}
                </Field>
              </Col>
              <Col sm={12}>
                <Field name="end_time">
                  {({ input, meta }) => (
                    <EndEventTimeSelector
                      {...input}
                      meta={meta}
                      value={endTime}
                      onChange={(date) => onHandleEndTime(new Date(date))}
                    />
                  )}
                </Field>
              </Col>
            </Row>

            <Field name="priority" validate={Validators.required()}>
              {({ input, meta }) => (
                <EventPrioritySelector
                  {...input}
                  meta={meta}
                  onChange={input.onChange}
                  value={input.value}
                />
              )}
            </Field>

            <Field name="description" validate={Validators.maxLength(50)}>
              {({ input, meta }) => (
                <Input
                  {...input}
                  meta={meta}
                  title={t('events:eventInfo.description')}
                  isBig
                />
              )}
            </Field>

            <div className="d-flex">
              <Button
                className="btn--success mt-3 d-flex"
                isBig
                type="submit"
                disabled={isLoading}
              >
                {t('settings:save')}
              </Button>
            </div>
          </form>
        )}
      />
    </Modal>
  );
};

export default AddEventModal;
