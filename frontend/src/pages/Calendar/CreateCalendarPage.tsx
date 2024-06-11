import { Col, Row } from 'react-bootstrap';
import { Field, Form } from 'react-final-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import Button from '../../components/ui/Button/Button';
import Heading from '../../components/ui/Heading/Heading';
import Icon from '../../components/ui/Icon/Icon';
import Input from '../../components/ui/Input/Input';
import useSetTitle from '../../hooks/setTitle';
import useAuth from '../../hooks/useAuth';
import useFetch from '../../hooks/useFetch';
import Validators from '../../utils/Validators';
import { CalendarContext } from '../../store/CalendarContext';
import { useContext } from 'react';
import { Calendar } from '../../@types/Calendar';

const CreateCalendar = () => {
  const { t } = useTranslation(['calendar']);
  const { user_id } = useAuth();
  useSetTitle(t('calendar-create.title'));
  const calendarContext = useContext(CalendarContext);

  const { fetchData: addCalendar, loading: isLoading } = useFetch('POST', [
    'calendars',
  ]);

  const handleAddCalendar = async (values: any) => {
    try {
      const response = await addCalendar(
        {},
        {
          ...values,
          owner_id: user_id,
        }
      );

      if (response.ok) {
        const newCalendar = (await response.json()) as Calendar;
        toast.success(t('calendar:toasts.success'));
        calendarContext.setCalendars((prevCalendars: Calendar[]) => [
          ...prevCalendars,
          newCalendar,
        ]);
      } else {
        toast.error(t('calendar:toasts.error'));
      }
    } catch (error) {
      toast.error(t('calendar:toasts.error'));
      console.error('Failed to add calendar', error);
    }
  };

  return (
    <div>
      <Heading
        level={1}
        title=""
        className={`heading--lg clr-primary mb-base`}
      />

      <Form
        onSubmit={handleAddCalendar}
        render={({ handleSubmit }) => (
          <form className={`event-form`} onSubmit={handleSubmit}>
            {/* General */}
            <Heading
              level={2}
              children={t('calendar-create.general')}
              className={`heading--sm clr-primary-400 mb-small-neg`}
            />

            <Field name="title" validate={Validators.required()}>
              {({ input, meta }) => (
                <Input
                  {...input}
                  meta={meta}
                  title={t('calendar-create.name-input')}
                  className={`heading--sm clr-primary-400 mb-small-neg`}
                />
              )}
            </Field>

            <Field name="description" validate={Validators.maxLength(50)}>
              {({ input, meta }) => (
                <Input
                  {...input}
                  meta={meta}
                  title={t('calendar-create.description-input')}
                  isBig
                />
              )}
            </Field>

            {/* People */}
            <Heading
              level={2}
              children={t('calendar-create.people')}
              className={`heading--sm clr-primary-400 mb-small`}
            />
            <span className={`mb-base`}>
              {t('calendar-create.people-description')}
            </span>

            <div className={`d-flex align-items-center gap-3`}>
              <Icon src="/icons/add-image.svg" alt="Add image icon" />

              <Button
                className="btn--primary"
                icon={<Icon src="/icons/plus-bright.svg" alt="Plus icon" />}
                text={t('calendar-create.invite-btn')}
                disabled
              />
            </div>

            {/* Date Range */}
            <Heading
              level={2}
              children={t('calendar-create.date-range')}
              className={`heading--sm clr-primary-400 mt-small`}
            />
            <span className={`mb-base`}>
              {t('calendar-create.date-range-description')}
            </span>

            <Row className="mt-0">
              <Col sm={12} md={6} className="m-0">
                <Field name="date_start">
                  {({ input, meta }) => (
                    <Input
                      {...input}
                      meta={meta}
                      type="datetime-local"
                      title={t('calendar-create.start-date')}
                      isBig
                    />
                  )}
                </Field>
              </Col>
              <Col sm={12} md={6}>
                <Field name="date_stop">
                  {({ input, meta }) => (
                    <Input
                      {...input}
                      meta={meta}
                      type="datetime-local"
                      title={t('calendar-create.end-date')}
                      isBig
                    />
                  )}
                </Field>
              </Col>
            </Row>

            <div className="pad-left-neg mt-4 mb-5 d-flex justify-content-start">
              <Button
                className="btn--success inline-block"
                icon={<Icon src="/icons/plus-bright.svg" alt="Plus icon" />}
                text={t('calendar-create.title')}
                type="submit"
                disabled={isLoading}
                isLoading={isLoading}
              />
            </div>
          </form>
        )}
      />
    </div>
  );
};

export default CreateCalendar;
