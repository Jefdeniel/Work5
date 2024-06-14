import { useEffect, useState } from 'react';
import { Field, Form } from 'react-final-form';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Category } from '../../../../@types/Calendar';
import { Event } from '../../../../@types/Events';
import useAuth from '../../../../hooks/useAuth';
import useFetch from '../../../../hooks/useFetch';
import Validators from '../../../../utils/Validators';

import Button from '../../../ui/Button/Button';
import Input from '../../../ui/Input/Input';
import LoadingScreen from '../../../ui/Loading/LoadingScreen';
import Modal from '../../../ui/Modals/Modal';
import Select from '../../../ui/Select/Select';
import EventTimeSelector from '../Selectors/EventTimeSelector';

import './EventModal.scss';

interface Props {
  onClose: () => void;
  // setEvent: (event: Event) => void;
}

// TODO: Add translations
const AddEventModal = ({ onClose }: Props) => {
  const { t } = useTranslation(['events']);
  const params = useParams();
  const calendarId = params.id;
  const { user_id } = useAuth();

  // State
  const [startTime, setStartTime] = useState<string>('');
  const [endTime, setEndTime] = useState<string>('');
  const [labelList, setLabelList] = useState<Category[]>([]);

  // Fetch
  const { fetchData: getCurrentCalendar } = useFetch('GET', [
    `calendars/${calendarId}`,
  ]);
  const { fetchData: addEvent, loading: isLoading } = useFetch('POST', [
    'events',
  ]);

  useEffect(() => {
    const getCalendar = async () => {
      try {
        const response = await getCurrentCalendar();
        if (response.ok) {
          const currentCalendar = await response.json();
          setLabelList(currentCalendar.categories);
          console.log('Calendar:', currentCalendar);
        } else {
          console.error('Error fetching calendar');
        }
      } catch (error) {
        console.error(error);
      }
    };

    getCalendar();
  }, []);

  const handleAddEvent = async (values: Event) => {
    try {
      const response = await addEvent(
        {},
        {
          ...values,
          start_time: startTime,
          end_time: endTime,
          owner: user_id,
          status: 'pending',
          category: '1',
          priority: 'low',
        }
      );

      if (response.ok) {
        console.log('New event:', values);
        toast.success(t('events:toasts.addSuccess'));
        if (onClose) {
          onClose();
        }
      } else {
        toast.error(t('events:toasts.addError'));
        throw new Error('Failed to save event: ' + response.statusText);
      }
    } catch (error) {
      toast.error(t('events:toasts.addError') + ': ' + error.message);
      console.error('Error adding event:', error);
    }
  };

  const options = labelList.map((label) => ({
    value: label.id,
    title: label.title,
    color: label.color_code,
  }));

  const onHandleStartTime = (start: string) => {
    // setStartTime(new Date(start));
    console.log('start', start);
  };

  const onHandleEndTime = (end: string) => {
    console.log('end', end);
    setEndTime(end);
  };

  // const handleChangeEventLabel = (event: any) => {
  //   console.log('event', event);
  // };

  if (isLoading) {
    return <LoadingScreen />;
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

            <Field name="description" validate={Validators.required()}>
              {({ input, meta }) => (
                <Input
                  {...input}
                  meta={meta}
                  title={t('events:eventInfo.description')}
                  isBig
                />
              )}
            </Field>

            <div className={`time-selectors`}>
              <EventTimeSelector
                onChange={onHandleStartTime}
                value={startTime}
              />

              <span>-</span>

              <EventTimeSelector onChange={onHandleEndTime} value={endTime} />
            </div>

            <div className={`mb-4`}>
              <span className="mt-3 mb-1">Label choice select</span>

              <Select
                options={options}
                // style={{
                //   background: ColorConversion.convertHexToRGBA('#FF00FF', 0.2),
                // }}
              />
            </div>

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
