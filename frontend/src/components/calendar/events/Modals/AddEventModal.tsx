import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import moment from 'moment';
import { Field, Form } from 'react-final-form';
import { Col, Row } from 'react-bootstrap';
import useAuth from '../../../../hooks/useAuth';
import useFetchedEvents from '../../../../hooks/UseFetchedEvents';
import Validators from '../../../../utils/Validators';
import Button from '../../../ui/Button/Button';
import Input from '../../../ui/Input/Input';
import Modal from '../../../ui/Modals/Modal';
import EndEventTimeSelector from '../Selectors/EndEventTimeSelector';
import EventPrioritySelector from '../Selectors/EventPrioritySelector';
import StartEventTimeSelector from '../Selectors/StartEventTimeSelector';
import './EventModal.scss';

const AddEventModal = ({ onClose, start, end, setEvents }) => {
  const { t } = useTranslation(['events']);
  const { user_id } = useAuth();
  const params = useParams();
  const calendarId = params.id;

  const [startTime, setStartTime] = useState(new Date(start));
  const [endTime, setEndTime] = useState(new Date(end));

  const { addEvent } = useFetchedEvents();

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

      const addedEvent = await addEvent(newEvent);
      toast.success(t('events:toasts.added'));
      setEvents((prevEvents) => [...prevEvents, addedEvent]);
      onClose();
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
              <Button className="btn--success mt-3 d-flex" isBig type="submit">
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
