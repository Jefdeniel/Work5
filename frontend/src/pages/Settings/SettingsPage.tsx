import { Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import useFetch from '../../hooks/useFetch';
import useSetTitle from '../../hooks/setTitle';
import { useTranslation } from 'react-i18next';
import { Field, Form } from 'react-final-form';
import { useSettings } from '../../hooks/useSettings';
import useAuth from '../../hooks/useAuth';
import Validators from '../../utils/Validators';

import Button from '../../components/ui/Button/Button';
import Heading from '../../components/ui/Heading/Heading';
import ThemeSelector from '../../components/settings/general/ThemeSelector';
import TimeZoneSelector from '../../components/settings/general/TimeZoneSelector';
import LanguageSelector from '../../components/settings/general/LanguageSelector';
import TimeFormatSelector from '../../components/settings/general/TimeFormatSelector';
import WeekStartsOnSelector from '../../components/settings/agendaView/WeekStartOnSelector';
import EventReminderSelector from '../../components/settings/notifications/EventReminderSelector';
import WeekendVisbilityOnSelector from '../../components/settings/agendaView/WeekendVisibiltySelector';
import ActivityNotification from '../../components/settings/notifications/ActivityNotificationsSelector';

const SettingsPage = () => {
  const { t } = useTranslation(['settings']);
  useSetTitle(t('settings:title'));
  const settings = useSettings();
  const auth = useAuth();

  const { fetchData: updateDeviceSettings, loading: isLoading } = useFetch(
    'PUT',
    [`user_settings/${auth.user_id}/`]
  );

  const handleSaveSettings = async (values) => {
    console.log(values);
    console.log('start form submit');
    try {
      const response = await updateDeviceSettings(
        {},
        {
          user: auth.user_id,
          language: values.language,
          time_zone: values.timezone,
          time_format: values.time_format,
          theme: values.theme,
          event_reminder: values.event_reminder,
          activity_notifications: values.activity_notifications,
          week_start_day: values.week_start_day,
          weekend_visibility: values.weekend_visibility ? true : false,
        }
      );

      if (response.ok) {
        toast.success(t('settings:saved'));
      } else {
        toast.error(t('settings:failed'));
        throw new Error('Failed to save settings' + response.statusText);
      }
    } catch (error) {
      toast.error(t('settings:failed'));
      console.error(error);
    }
  };

  return (
    <>
      <Form
        onSubmit={handleSaveSettings}
        initialValues={
          settings
            ? {
                language: settings.language,
                timezone: settings.timezone,
                time_format: settings.timeFormat,
                theme: settings.theme,
                event_reminder: settings.eventReminderEnabled,
                activity_notifications: settings.activityNotificationEnabled,
                week_start_day: settings.weekStartsOn,
                weekend_visibility: settings.weekendVisibility,
              }
            : {}
        }
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Row className="settings-block">
              <Heading level={2} isUnderlined>
                {t('settings:general.title')}
              </Heading>
              <Field name="language" validate={Validators.compose()}>
                {({ input, meta }) => (
                  <LanguageSelector
                    {...input}
                    meta={meta}
                    initialValue={settings.language}
                  />
                )}
              </Field>
              <Field name="timezone" validate={Validators.required()}>
                {({ input, meta }) => (
                  <TimeZoneSelector
                    {...input}
                    meta={meta}
                    initialValue={settings.timezone}
                  />
                )}
              </Field>
              <Field name="time_format" validate={Validators.required()}>
                {({ input, meta }) => (
                  <TimeFormatSelector
                    {...input}
                    meta={meta}
                    initialValue={settings.timeFormat}
                  />
                )}
              </Field>
              <Field name="theme" validate={Validators.required()}>
                {({ input, meta }) => (
                  <ThemeSelector
                    {...input}
                    meta={meta}
                    initialValue={settings.theme}
                  />
                )}
              </Field>
            </Row>

            <Row className="settings-block">
              <Heading level={2} isUnderlined>
                {t('settings:notifications.title')}
              </Heading>
              <Field name="event_reminder" validate={Validators.required()}>
                {({ input }) => (
                  <EventReminderSelector
                    {...input}
                    eventReminderEnabled={settings.eventReminderEnabled}
                    onChange={input.onChange}
                  />
                )}
              </Field>
              <Field
                name="activity_notifications"
                validate={Validators.required()}
              >
                {({ input }) => (
                  <ActivityNotification
                    {...input}
                    activityNotificationEnabled={
                      settings.activityNotificationEnabled
                    }
                    onChange={input.onChange}
                  />
                )}
              </Field>
            </Row>

            <Row className="settings-block">
              <Heading level={2} isUnderlined className="border-bottom">
                {t('settings:calendarView.title')}
              </Heading>
              <Field name="week_start_day" validate={Validators.required()}>
                {({ input, meta }) => (
                  <WeekStartsOnSelector
                    {...input}
                    meta={meta}
                    initialValue={settings.weekStartsOn}
                    onChange={input.onChange}
                  />
                )}
              </Field>
              <Field name="weekend_visibility">
                {({ input, meta }) => (
                  <WeekendVisbilityOnSelector
                    {...input}
                    meta={meta}
                    initialValue={settings.weekendVisibility}
                    onChange={input.onChange}
                  />
                )}
              </Field>
              <button type="submit">Submit</button>
            </Row>
            <Row className="mt-large"></Row>
          </form>
        )}
      />
    </>
  );
};

export default SettingsPage;
