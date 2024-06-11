import { Col, Row } from 'react-bootstrap';
import { Field, Form } from 'react-final-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { Calendar } from '../../@types/Calendar';
import Button from '../../components/ui/Button/Button';
import Heading from '../../components/ui/Heading/Heading';
import Icon from '../../components/ui/Icon/Icon';
import Input from '../../components/ui/Input/Input';
import useSetTitle from '../../hooks/setTitle';
import useAuth from '../../hooks/useAuth';
import useFetch from '../../hooks/useFetch';
import Validators from '../../utils/Validators';

const CreateCalendar = () => {
  const { t } = useTranslation(['calendar']);
  const { user_id } = useAuth();
  useSetTitle(t('calendar-create.title'));

  const { fetchData: addCalendar, loading: isLoading } = useFetch('POST', [
    'calendars',
  ]);

  const handleAddCalendar = async (values: Calendar) => {
    try {
      const response = await addCalendar(
        {},
        {
          ...values,
          title: values.title,
          description: values.description,
          owner_id: user_id,
          image:
            'https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTExL3JtNDY3YmF0Y2gyLWNhbGVuZGFyLTAwMS5wbmc.png',
          date_start: values.date_start?.toISOString()
            ? values.date_start?.toISOString()
            : null,
          date_stop: values.date_stop?.toISOString()
            ? values.date_stop?.toISOString()
            : null,
        }
      );

      if (response.ok) {
        toast.success(t('calendar:toasts.success'));
      }
    } catch (error) {
      toast.error(t('calendar:toasts.error'));
      throw new Error('Failed to add calendar');
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
            {/* GENERAL */}
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

            {/* PEOPLE */}

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
                icon={<Icon src="/icons/plus-bright.svg " alt="Plus icon" />}
                text={t('calendar-create.invite-btn')}
                disabled
              />
            </div>

            {/* DATE RANGE */}

            <Heading
              level={2}
              children={t('calendar-create.date-range')}
              className={`heading--sm clr-primary-400 mt-small`}
            />

            <span className={`mb-base`}>
              {t('calendar-create.date-range-description')}
            </span>
            {/* 
            <Field name="daterange" type="checkbox">
              {({ input }) => (
                <div className="form-check switch d-flex align-items-center">
                  <label className="switch-label">
                    <input
                      id="switch"
                      type="checkbox"
                      className="form-check-input"
                      {...input}
                    />
                    <div className="switch-slider"></div>
                  </label>
                </div>
              )}
            </Field> */}

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
                icon={<Icon src="/icons/plus-bright.svg " alt="Plus icon" />}
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
